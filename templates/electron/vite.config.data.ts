export default function getData() {
  return {
    // electronParams: `const isElectron = process.env.ELECTRON === 'true'`,
    // electronExternal: `
    // if (isElectron && id.includes('virtual:pwa-register/vue')) {
    //   return true
    // }
    // `,
    params: [
      `const isBuild = command === 'build'`,
      `const isServe = command === 'serve'`,
      `const sourcemap = isServe || !!process.env.VSCODE_DEBUG`
    ],
    importers: [
      `import electron from 'vite-plugin-electron'`,
      `import pkg from './package.json'`,
      `import { notBundle } from 'vite-plugin-electron/plugin'`
    ],
    plugins: [
      `electron([
        {
          entry: 'electron/main/index.ts',
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log('[startup] Electron App')
            } else {
              startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
              }
            },
            plugins: [
              isServe && notBundle()
            ]
          }
        },
        {
          entry: 'electron/preload/index.ts',
          onstart({ reload }) {
            reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, 
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
              }
            },
            plugins: [isServe && notBundle()]
          }
        }
      ])`
    ]
  }
}
