import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjetosView from '../views/ProjetosView.vue'
import ControleDeProjetos from '../views/ControleDeProjetos.vue'
import BacklogsView from '../views/BacklogsView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projetos',
    name: 'projetos',
    component: ProjetosView
  },

  {
    path: '/controle-de-projetos/novo',
    name: 'AdicionarProjeto',
    component: ControleDeProjetos
  },
  {
    path: '/backlogs',
    name: 'backlogs',
    component: BacklogsView
  },


  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
