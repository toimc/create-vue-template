// https://vitejs.dev/config/
export default function getData() {
  return {
    importers: [`import { VitePWA } from 'vite-plugin-pwa'`],
    plugins: [
      `VitePWA({
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
      })`
    ]
  }
}
