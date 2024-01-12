import path from 'path'
import fs from 'fs'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import VueMacros from 'unplugin-vue-macros'

import { VueRouterAutoImports } from 'unplugin-vue-router'

import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import Layouts from 'vite-plugin-vue-layouts'
import UnoCSS from 'unocss/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { VitePWA } from 'vite-plugin-pwa'

import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import I18n from '@intlify/unplugin-vue-i18n/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { cdn } from 'vite-plugin-cdn2'

// electron
import pkg from './package.json'

import { VpAutoImports, VpComponentsResolver } from 'el-admin-components/vite'

// 过滤element-plus的.mjs的文件，不打包不需要的locales
// 判断，/locales中对应的文件名的.mjs文件作为过滤条件 -> 保留
function customExternals(id: string) {
  // return true -> external, false -> not external
  const localesDir = path.resolve(__dirname, 'locales')
  const localesFiles = fs
    .readdirSync(localesDir)
    .map((file) => file.match(/([\w-]+)\.json/)?.[1] || '')

  if (id.includes('element-plus/dist/locale')) {
    // 获取 id 的basename
    // 判断这个basename在不在上面的localesFiles中
    const basename = path.basename(id, '.mjs')
    return !localesFiles.some((o) => o.toLowerCase() === basename)
  }
  // 其他的外部依赖
  return false
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production'
  const base = isProd ? process.env.BASE_PATH || '/' : './'

  const isAnalysis = process.env.ANALYSIS === 'true'
  const isSourceMap = process.env.SOURCE_MAP === 'true'

  const isBuild = command === 'build'
  const isServe = command === 'serve'

  const sourcemap = isServe || !!process.env.VSCODE_DEBUG
  const EPComponentsResolver = isProd ? [] : [ElementPlusResolver()]
  return {
    base,
    build: {
      sourcemap: isSourceMap,
      rollupOptions: {
        external: (id) => customExternals(id)
      }
    },

    plugins: [
      VueRouter(),
      vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      }),
      vueJsx(),
      // Vue3.3以后，不需要这些新的特性了
      // VueMacros.vite({
      //   plugins: {
      //     vue: vue(),
      //     vueJsx: vueJsx() // 如果需要
      //   }
      // }),
      UnoCSS(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],

        // global imports to register
        imports: [
          // presets
          'vue',
          // 'vue-router'
          VueRouterAutoImports,
          '@vueuse/core',
          VpAutoImports
        ],
        resolvers: isProd ? [] : [ElementPlusResolver()],
        vueTemplate: true
      }),
      Components({
        directoryAsNamespace: false,
        collapseSamePrefixes: true,
        resolvers: [...EPComponentsResolver, VpComponentsResolver]
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'default'
      }),
      VitePWA({
        manifest: {
          name: 'Vite App',
          short_name: 'Vite App',
          theme_color: '#ffffff',
          icons: [
            {
              src: path.join(base, '/192x192.png'),
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: path.join(base, '/512x512.png'),
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        registerType: 'autoUpdate'
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: false
      }),
      cdn({
        url: 'https://unpkg.com',
        modules: [
          { name: 'vue', relativeModule: './dist/vue.global.prod.js' },
          'vue-demi',
          { name: 'pinia', relativeModule: './dist/pinia.iife.prod.js' },
          // 关注issue: https://github.com/nonzzz/vite-plugin-cdn/issues/30
          // { name: 'vue-router',aliases: ['auto', 'auto/routes'], relativeModule: './dist/vue-router.global.prod.js' },
          {
            name: 'element-plus',
            aliases: ['lib', 'es'],
            spare: [
              'https://unpkg.com/element-plus@2.4.2/dist/index.css',
              'https://unpkg.com/element-plus@2.4.2/theme-chalk/dark/css-vars.css'
            ]
          },
          {
            name: 'echarts',
            aliases: ['core', 'renderers', 'components', 'features', 'charts']
          },
          { name: 'vue-i18n', relativeModule: './dist/vue-i18n.global.prod.js' },
          { name: 'sortablejs', global: 'Sortable', relativeModule: './Sortable.min.js' },
          {
            name: 'vditor',
            global: 'Vditor',
            relativeModule: './dist/index.min.js',
            spare: ['https://unpkg.com/vditor@3.9.6/dist/index.css']
          },
          {
            name: 'video.js',
            global: 'videojs',
            relativeModule: './dist/video.min.js',
            spare: ['https://unpkg.com/video.js@8.6.1/dist/video-js.min.css']
          }
        ],
        transform: () => {
          return {
            script: (scriptNode) => {
              const { tag, name } = scriptNode
              if (tag === 'script') {
                if (name === 'sortablejs') {
                  scriptNode.async = true
                }
                if (['echarts', 'vditor', 'video.js'].includes(name)) {
                  scriptNode.defer = true
                }
              }
            }
          }
        }
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      I18n({
        include: [path.resolve(__dirname, './locales/**')],
        // 说明:由于配置了modules/i18n.ts中默认为legacy: false
        // 所以禁止修改
        compositionOnly: true,
        jitCompilation: true
      }),
      visualizer({
        open: isAnalysis
      })
      // FilterPlugin()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0'
    },
    define: {
      'process.env': process.env
    },
    optimizeDeps: {
      include: isProd
        ? []
        : [
            'element-plus',
            'dayjs',
            'element-plus/es/components/**/style/css',
            // 'element-plus/es/components/button/style/css',
            // 'element-plus/es/components/radio-button/style/css',
            // 'element-plus/es/components/radio-group/style/css',
            // 'element-plus/es/components/table/style/css',
            // 'element-plus/es/components/pagination/style/css',
            // 'element-plus/es/components/icon/style/css',
            // 'element-plus/es/components/input/style/css',
            // 'element-plus/es/components/popover/style/css',
            // 'element-plus/es/components/tag/style/css',
            // 'element-plus/es/components/loading/style/css',
            'sortablejs'
          ]
    }
  }
})
