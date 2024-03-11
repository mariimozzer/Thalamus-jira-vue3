import { createRouter, createWebHashHistory } from 'vue-router'

//Projetos
import ControleDeProjetos from '../views/ControleDeProjetos.vue'

//Backlogs
import PainelKanbanView from '../views/PainelKanban'
import SprintsView from '../views/SprintsView'
import SprintsViewOnly from '@/views/SprintsView-Only.vue'

//Login
import LoginViewVue from '@/views/Login/LoginView.vue'

//Home
import HomeView from '@/views/Home/HomeView.vue'

//Senha
import EsqueceuSenhaView from "@/views/Senha/EsqueceuSenhaView"
import ValidarSenhaView from "@/views/Senha/ValidarSenhaView"
import AlterarSenhaView from "@/views/Senha/AlterarSenhaView"
import ConfiguracaoUsuario from '@/views/Senha/ConfiguracaoUsuario.vue'
import PainelKanbanViewOnlyVue from '@/views/PainelKanban-ViewOnly.vue'
import axios from 'axios'
import ControleDePCMs from '@/views/PCM/ControleDePCMs.vue'


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
    component: HomeView,
    beforeEnter: guardMyroute,


  },

  //PCM
  {
    path: '/PCM',
    name: 'PCM',
    component: ControleDePCMs,

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
