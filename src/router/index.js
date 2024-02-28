import { createRouter, createWebHashHistory } from 'vue-router'

//Projetos
import ControleDeProjetos from '../views/ControleDeProjetos.vue'

//Backlogs
import PainelKanbanView from '../views/PainelKanban'
import SprintsView from '../views/SprintsView'

import LoginViewVue from '@/views/LoginView.vue'

const routes = [


  {
    path: '/sprints',
    name: 'sprints',
    component: SprintsView,
    props: { sharedVariable: 'backlogs' }
  },

  {
    path: '/',
    name: 'login',
    component: LoginViewVue,
    meta: {
      hideMenu: true
    }
  },

  {
    path: '/projetos',
    name: 'ControleDeProjetos',
    component: ControleDeProjetos
  },

  {
    path: '/painel',
    name: 'painel',
    component: PainelKanbanView
  }

 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
