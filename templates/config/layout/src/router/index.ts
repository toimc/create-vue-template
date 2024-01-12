import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
// import { routes as routes1 } from 'vue-router/auto/routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => {
    // console.log('🚀 ~ file: index.ts:7 ~ routes:', routes1)
    return setupLayouts(routes)
  }
})

export default router
