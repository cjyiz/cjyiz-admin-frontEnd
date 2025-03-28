import { createPinia } from 'pinia'
import type { App } from 'vue'

const store = createPinia()

// 注册store
export function setupStore(app: App<Element>) {
  app.use(store)
}
export * from './modules/app.store'
export * from './modules/settings.store'
export { store }
