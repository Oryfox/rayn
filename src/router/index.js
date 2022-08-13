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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
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
      path: "/artist/:name",
      name: "artistdetail",
      component: () => import("../views/ArtistDetailView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("../views/LogoutView.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue")
    }
  ]
})
export default router
