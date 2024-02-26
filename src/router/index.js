import { createRouter, createWebHashHistory } from 'vue-router'

//Projetos
import ControleDeProjetos from '../views/ControleDeProjetos.vue'

//Backlogs
import PainelKanbanView from '../views/PainelKanban'
import SprintsView from '../views/SprintsView'


const routes = [


  {
    path: '/sprints',
    name: 'sprints',
    component: SprintsView,
    props: { sharedVariable: 'backlogs' }
  },


  {
    path: '/',
    name: 'ControleDeProjetos',
    component: ControleDeProjetos
  },

  // {
  //   path: '/backlogs',
  //   name: 'backlogs',
  //   component: BacklogsView,
  //   props: { sharedVariable: 'backlogs' }
  // },

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
