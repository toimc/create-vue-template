export default function getData() {
  return {
    importers: [`import Layouts from 'vite-plugin-vue-layouts'`],
    plugins: [
      `Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'default'
      })`
    ]
  }
}
