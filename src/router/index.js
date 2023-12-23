import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategeoryVeiw from '../views/CategoryView.vue'
import Allposts from '../views/Allposts.vue'
import AuthorsVeiw from '../views/AuthorsView.vue'
import LoginVeiw from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about/:id',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/category/:id',
      name: 'category',
      component: CategeoryVeiw
    },
    {
      path: '/author/:id',
      name: 'author',
      component: AuthorsVeiw
    },
    {
      path: '/allposts',
      name: 'allposts',
      component: Allposts
    },
    {
      path:'/login',
      name: 'login',
      component: LoginVeiw
    }
  ]
})

export default router
