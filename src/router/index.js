import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: "/records",
      name: "records",
      component: () => import("../views/RecordView.vue")
    },
    {
      path: "/artists/:name?",
      name: "artists",
      component: () => import("../views/ArtistView.vue")
    },
    {
      path: "/records/:id",
      name: "recorddetail",
      component: () => import("../views/RecordDetailView.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsView.vue")
    }
  ]
})
export default router
