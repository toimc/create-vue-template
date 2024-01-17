#!/usr/bin/env node
import prompts from 'prompts'
import fse from 'fs-extra'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'

async function init() {
  const response = await prompts([
    {
      type: 'text',
      name: 'pkgName',
      message: '请输入项目的名称'
    },
    {
      type: 'multiselect',
      name: 'config',
      message: '选择项目的基础配置模块',
      choices: [
        { title: 'unplugin-vue-router，自动路由', value: 'router' },
        {
          title: 'vite-plugin-vue-layouts，全局layout布局注册组件',
          value: 'layout'
        },
        { title: 'vite-plugin-mock，mock接口', value: 'mock' }
      ],
      hint: '- 空格用于 选择/取消选择 切换，回车用于确认选择'
    },
    {
      type: 'select',
      name: 'css',
      message: '请选择一个 css Framework：',
      choices: [
        {
          title: 'unocss',
          description: 'UnoCSS - Instant On-demand Atomic CSS Engine',
          value: 'unocss'
        },
        {
          title: 'tailwind',
          value: 'tailwind',
          description: 'TailWind CSS - A utility-first CSS framework'
        }
      ],
      initial: 0
    },
    {
      type: 'toggle',
      name: 'cdn',
      message: '是否需要配置 cdn加速？',
      initial: true,
      active: 'yes',
      inactive: 'no'
    },
    {
      type: 'toggle',
      name: 'electron',
      message: '是否需要配置 electron？',
      initial: false,
      active: 'yes',
      inactive: 'no'
    },
    {
      type: (prev) => (prev === false ? 'toggle' : null),
      name: 'pwa',
      message: '是否需要配置 pwa？',
      initial: true,
      active: 'yes',
      inactive: 'no'
    }
  ])
  // console.log(response) // => { value: 24 }
  await processTemplates(response)
}

const isSkippedFile = (filePath) => {
  return ['.data.ts', '.ejs'].some((o) => filePath.endsWith(o))
}

async function processTemplates(options) {
  const { pkgName, ...rest } = options
  const cwd = process.cwd()
  const sourceDir = path.join(__dirname, '../templates/base')
  // TODO 对用于的目录名加入校验 校验是不是中文字符等
  const destDir = path.join(cwd, pkgName)
  try {
    // TODO 判断目录是否存在，是否有文件，是否需要覆盖
    fse.removeSync(destDir)

    fse.copySync(sourceDir, destDir)
    fse.rename(path.join(destDir, 'vite.config.ts.ejs'), path.join(destDir, 'vite.config.ts'))

    const mapData = {}
    let templatesDir = path.join(__dirname, '../templates')
    const walkFiles = async (filePath, level = 0) => {
      if (level === 0) {
        templatesDir = filePath
      }
      for (const fileName of fse.readdirSync(filePath)) {
        const curPath = path.join(filePath, fileName)
        const stat = fse.statSync(curPath)
        if (stat.isDirectory()) {
          await walkFiles(curPath, level + 1)
        } else {
          // 处理文件
          const relativePath = curPath.replace(templatesDir, '')
          // 最终要拷贝的文件路由 + 文件名
          const destPath = path.join(destDir, relativePath)
          // 文件不存在
          if (!fse.existsSync(destPath) && !isSkippedFile(curPath)) {
            fse.ensureDirSync(path.dirname(destPath))
            fse.copyFileSync(curPath, destPath)
          } else {
            const pathExt = path.extname(curPath)
            // json, yaml, .. 直接拷贝合并的场景：1.文件不存在 2.文件如果是上面的这些类型直接合并
            if (pathExt === '.json') {
              const src = fse.readJSONSync(curPath)
              const dest = fse.readJSONSync(destPath)
              // const obj = _.merge(dest, src)
              // 遍历其中所有的属性
              for (const key of Object.keys(src)) {
                if (!dest[key]) {
                  dest[key] = src[key]
                } else {
                  // 判断是否value是数组
                  if (dest[key] instanceof Array) {
                    dest[key] = _.uniq([...dest[key], ...src[key]])
                  } else if (typeof dest[key] === 'object' && typeof src[key] === 'object') {
                    dest[key] = { ...dest[key], ...src[key] }
                  } else {
                    dest[key] = src[key]
                  }
                }
              }
              fse.writeJSONSync(destPath, dest)
            } else if (curPath.endsWith('.data.ts')) {
              // .data.ts的场景 -> 需要找到去掉data的 生成的原base目录 中的对应的文件，使用ejs，来render .data.ts 中的getData默认函数，响应回来的对象
              const getData = await import(curPath)
              const data = getData()
              if (mapData[relativePath] && mapData[relativePath].data) {
                // 已经有.data.ts的文件，需要优化相同目标的文件
                const originData = { ...mapData[relativePath].data }
                for (const key of Object.keys(data)) {
                  if (!originData[key]) {
                    originData[key] = data[key]
                  } else {
                    if (originData[key] instanceof Array) {
                      originData[key] = _.uniq([...originData[key], ...data[key]])
                    } else {
                      originData[key] = data[key]
                    }
                  }
                }
                mapData[relativePath].data = originData
              } else {
                mapData[relativePath] = { data }
              }
              // vite.config.data.ts -> vite.config.ts
              mapData[relativePath].destPath = destPath.replace('.data', '')
              mapData[relativePath].curPath = curPath
            } else if (curPath.endsWith('.ejs')) {
              // .ejs的场景 -> 需要传递options
              const template = fse.readFileSync(curPath, 'utf-8')
              const result = ejs.render(template, options)
              fse.writeFileSync(destPath.replace('.ejs', ''), result)
            } else if (curPath.endsWith('.d.ts')) {
              // 合并两个文件
              const src = fse.readFileSync(curPath, 'utf-8')
              const dest = fse.readFileSync(destPath, 'utf-8')
              fse.writeFileSync(destPath, dest + '\n' + src)
            } else {
              // 其他文件直接复制
              fse.copyFileSync(curPath, destPath)
            }
          }
        }
      }
    }

    for (const fileName of Object.keys(rest)) {
      if (rest[fileName] instanceof Array) {
        // options[fileName]类型是不是对象
        // 遍历子目录
        // 1.复制base目录
        const basePath = path.join(__dirname, `../templates/${fileName}/base`)
        await walkFiles(basePath)
        const arr = rest[fileName]
        if (!arr.length) {
          continue
        }
        // console.log('🚀 ~ processTemplates ~ basePath:', basePath)
        // 2.判断子元素-> 复制该目录中的文件到base生成的文件目录
        for (const filePath of arr) {
          const src = path.join(__dirname, `../templates/${fileName}/${filePath}`)
          await walkFiles(src)
        }
      } else if (rest[fileName]) {
        // 判断options[fileName] === true
        const src = path.join(
          __dirname,
          typeof rest[fileName] === 'string'
            ? `../templates/${fileName}/${rest[fileName]}`
            : `../templates/${fileName}`
        )
        // 遍历子目录
        await walkFiles(src)
      }
    }

    for (const fileName of Object.keys(mapData)) {
      const { data, destPath } = mapData[fileName]
      const template = fse.readFileSync(destPath, 'utf-8')
      const result = ejs.render(template, data)
      fse.writeFileSync(destPath, result)
    }
    // console.log(mapData)
    console.log('复制成功')
  } catch (error) {
    console.log('复制失败', error)
  }
}

init().catch((err) => {
  console.log(err)
})
