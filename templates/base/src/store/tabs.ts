import type { VpAppRouteMenuItem as AppRouteMenuItem } from 'el-admin-components'
import { defineStore } from 'pinia'

interface TabsStoreType {
  tabs: AppRouteMenuItem[]
  current: string
}

export const useTabsStore = defineStore('tabs', {
  state: () =>
    ({
      tabs: [] as AppRouteMenuItem[],
      current: ''
    }) as TabsStoreType,
  actions: {
    addRoute(route: AppRouteMenuItem) {
      if (this.tabs.some((item) => item.name === route.name)) return
      this.tabs.push({ ...route })
    },
    removeRoute(path: string) {
      this.tabs = this.tabs.filter((item) => item.name !== path)
    }
  },
  persist: true
})
