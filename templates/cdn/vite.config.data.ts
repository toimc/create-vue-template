export default function getData() {
  return {
    importers: ["import { cdn } from 'vite-plugin-cdn2'"],
    plugins: [
      `
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
              'https://unpkg.com/element-plus@2.4.2/theme-chalk/dark/css-vars.css',
            ],
          },
          {
            name: 'echarts',
            aliases: ['core', 'renderers', 'components', 'features', 'charts'],
          },
          {
            name: 'vue-i18n',
            relativeModule: './dist/vue-i18n.global.prod.js',
          },
          {
            name: 'sortablejs',
            global: 'Sortable',
            relativeModule: './Sortable.min.js',
          },
          {
            name: 'vditor',
            global: 'Vditor',
            relativeModule: './dist/index.min.js',
            spare: ['https://unpkg.com/vditor@3.9.6/dist/index.css'],
          },
          {
            name: 'video.js',
            global: 'videojs',
            relativeModule: './dist/video.min.js',
            spare: ['https://unpkg.com/video.js@8.6.1/dist/video-js.min.css'],
          },
        ],
        transform: () => {
          return {
            script: (scriptNode) => {
              const { tag, name } = scriptNode;
              if (tag === 'script') {
                if (name === 'sortablejs') {
                  scriptNode.async = true;
                }
                if (['echarts', 'vditor', 'video.js'].includes(name)) {
                  scriptNode.defer = true;
                }
              }
            },
          };
        },
      })
    `
    ]
  }
}
