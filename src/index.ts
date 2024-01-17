#!/usr/bin/env node
import prompts from 'prompts'
import fse from 'fs-extra'
import path from 'path'
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
        {
          title: 'vite-plugin-vue-layouts，全局layout布局注册组件',
          value: 'layout'
        },
        { title: 'vite-plugin-mock，mock接口', value: 'mock' },
        { title: 'unplugin-vue-router，自动路由', value: 'router' }
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

    for (const fileName of Object.keys(rest)) {
      if (typeof rest[fileName] === 'object') {
        // options[fileName]类型是不是对象
        // 遍历子目录
        // 1.复制base目录
        // console.log('🚀 ~ processTemplates ~ basePath:', basePath)
        // 2.判断子属性是否为true，为true -> 复制该目录中的文件到base生成的文件目录
        // 过滤Object.keys(rest[fileName])中为false的属性
      } else if (rest[fileName]) {
        // 判断options[fileName] === true
        // const src = path.join(__dirname, `../templates/${fileName}`);
        // 遍历子目录
        // json, yaml, .. 直接拷贝合并的场景：1.文件不存在 2.文件如果是上面的这些类型直接合并
        // .ejs的场景 -> 需要传递options
        // .data.ts的场景 -> 需要找到去掉data的 生成的原base目录 中的对应的文件，使用ejs，来render .data.ts 中的getData默认函数，响应回来的对象
      }
    }
    console.log('复制成功')
  } catch (error) {
    console.log('复制失败', error)
  }
}

init().catch((err) => {
  console.log(err)
})
