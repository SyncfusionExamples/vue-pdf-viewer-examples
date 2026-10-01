import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/pdf-viewer', name: 'PDFViewer', component: () => import('../views/PDFViewerView.vue') }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
