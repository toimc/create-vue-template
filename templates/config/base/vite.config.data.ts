/* eslint-disable no-useless-escape */
// https://vitejs.dev/config/
export default function getData() {
  return {
    importers: [
      "import AutoImport from 'unplugin-auto-import/vite'",
      "import Components from 'unplugin-vue-components/vite'",
      "import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'",
      "import { VpAutoImports, VpComponentsResolver } from 'el-admin-components/vite'"
    ],
    params: [
      "const isProd = mode === 'production'",
      `const base = isProd ? process.env.BASE_PATH || '/' : './'`,
      `const isSourceMap = process.env.SOURCE_MAP === 'true'`,
      `const isAnalysis = process.env.ANALYSIS === 'true'`,
      'const EPComponentsResolver = isProd ? [] : [ElementPlusResolver()]'
    ],
    plugins: [
      `AutoImport({
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
          'vue-router',
          '@vueuse/core',
          VpAutoImports
        ],
        resolvers: isProd ? [] : [ElementPlusResolver()],
        vueTemplate: true
      })`,
      `
      Components({
        directoryAsNamespace: false,
        collapseSamePrefixes: true,
        resolvers: [...EPComponentsResolver, VpComponentsResolver]
      })`
    ]
  }
}
