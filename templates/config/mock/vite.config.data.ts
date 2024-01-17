export default function getData() {
  return {
    importers: [`import { viteMockServe } from 'vite-plugin-mock'`],
    plugins: [
      `viteMockServe({
        mockPath: 'mock',
        enable: false
      })`
    ]
  }
}
