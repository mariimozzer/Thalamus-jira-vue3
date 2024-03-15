import { createRouter, createWebHashHistory } from 'vue-router'

//Projetos
import ControleDeProjetos from '../views/Projetos/ControleDeProjetos.vue'

//Backlogs
import PainelKanbanView from '../views/Projetos/PainelKanban'
import SprintsView from '../views/Projetos/SprintsView'
import SprintsViewOnly from '@/views/Projetos/SprintsView-Only.vue'
import PainelKanbanViewOnlyVue from '@/views/Projetos/PainelKanban-ViewOnly.vue'

//Login
import LoginViewVue from '@/views/Login/LoginView.vue'

//Home
// import HomeView from '@/views/Home/HomeView.vue'

//Senha
import EsqueceuSenhaView from "@/views/Senha/EsqueceuSenhaView"
import ValidarSenhaView from "@/views/Senha/ValidarSenhaView"
import AlterarSenhaView from "@/views/Senha/AlterarSenhaView"
import ConfiguracaoUsuario from '@/views/Senha/ConfiguracaoUsuario.vue'
import axios from 'axios'
import VisualizaçãoCriaçãoPCM from '@/views/PCM/VisualizaçãoCriaçãoPCM.vue'
import ControlePCM from '@/views/PCM/ControlePCM'
import PCMVazio from '@/views/PCM/PCMVazio'
import ControledePlanodeAção from '@/views/PA/ControleDePlanodeAção.vue'
import VisualizaçãoPlanodeAção from '@/views/PA/VisualizaçãoPlanodeAção.vue'
import controleProgramas from '@/views/Programas/ControleProgramas'
import homeGestãoDeProjetos from '../views/Home/HomeGestãoDeProjetos.vue'




function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('LoggedUser'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next();
  }
  else {
    next('/');
  }
}

function guardMyroute2(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('LoggedUser'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {

    var idUsuario = localStorage.getItem('id');
    var projetos = null
    var idProjeto = sessionStorage.getItem('idProjeto')
    axios.get(`http://192.168.0.5:8000/api/projeto/usuario/${idUsuario}`, {
    })
      .then((response) => {
        projetos = response.data;

        if ((projetos.find(projeto => projeto.id == idProjeto).permissao).find(pessoa => pessoa.usuario_id == idUsuario).nivel == 2) {
          next();
        } else {
          next('/projetos');
        }
      })
  }
  else {
    next('/');
  }
}


const routes = [

  //Login
  {
    path: '/',
    name: 'login',
    component: LoginViewVue,
    meta: {
      hideMenu: true
    },


  },

  //Home
  {
    path: '/home',
    name: 'home',
    component: homeGestãoDeProjetos,
    beforeEnter: guardMyroute,
  },

  //PCM
  {
    path: '/PCM',
    name: 'PCM',
    component: VisualizaçãoCriaçãoPCM,
  },

  {
    path: '/PCM/Controle',
    name: 'ControlePCM',
    component: ControlePCM,
  },

  {
    path: '/PCM/Vazio',
    name: 'PCMv',
    component: PCMVazio,
  },

  //Plano de Ação

  {
    path: '/PA/Controle',
    name: 'ControlePA',
    component: ControledePlanodeAção,
  },

  {
    path: '/PA',
    name: 'PA',
    component: VisualizaçãoPlanodeAção,
  },

  //programas

  {
    path: '/Programas/controle',
    name: 'controleProgramas',
    component: controleProgramas,
  },

  //Projetos
  {
    path: '/sprints',
    name: 'sprints',
    component: SprintsView,
    props: { sharedVariable: 'backlogs' },
    beforeEnter: guardMyroute2,

  },
  {
    path: '/sprintsVo',
    name: 'sprintsVo',
    component: SprintsViewOnly,
    props: { sharedVariable: 'backlogs' },
    beforeEnter: guardMyroute,

  },
  {
    path: '/projetos',
    name: 'ControleDeProjetos',
    component: ControleDeProjetos,
    beforeEnter: guardMyroute,

  },

  {
    path: '/painel',
    name: 'painel',
    component: PainelKanbanView,
    beforeEnter: guardMyroute2,

  },

  {
    path: '/painelVo',
    name: 'painelVo',
    component: PainelKanbanViewOnlyVue,
    beforeEnter: guardMyroute,

  },

  // Senha
  {
    path: '/alterarSenha',
    name: 'AlterarSenha',
    component: AlterarSenhaView,
    beforeEnter: guardMyroute,

  },

  {
    path: '/esqueceuSenha',
    name: 'EsqueceuSenha',
    component: EsqueceuSenhaView,
    meta: {
      hideMenu: true
    }

  },

  {
    path: '/validarSenha',
    name: 'ValidarSenha',
    component: ValidarSenhaView,
    meta: {
      hideMenu: true
    },

  },
  {
    path: '/configuracao',
    name: 'Configuracao',
    component: ConfiguracaoUsuario,
    beforeEnter: guardMyroute,
  },


  {
    path: '/:pathMatch(.*)*', redirect: '/'
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
