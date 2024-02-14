import { createRouter, createWebHashHistory } from 'vue-router'


//Home
import HomeView from '../views/HomeView.vue'

//Projetos
import ProjetosView from '../views/ProjetosView.vue'
import ControleDeProjetos from '../views/ControleDeProjetos.vue'

//Backlogs
import PainelKanbanView from '../views/PainelKanban'
import SprintsView from '../views/SprintsView'


const routes = [



  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/sprints',
    name: 'sprints',
    component: SprintsView,
    props: { sharedVariable: 'backlogs' }
  },


  {
    path: '/projetos',
    name: 'ControleDeProjetos',
    component: ControleDeProjetos
  },

  {
    path: '/controle-de-projetos/novo',
    name: 'AdicionarProjeto',
    component: ProjetosView
  },
  {
    path: '/controle-de-projetos/editar/:id',
    name: 'EditarProjeto',
    component: ProjetosView
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
