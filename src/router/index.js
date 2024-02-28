import { createRouter, createWebHashHistory } from 'vue-router'

//Projetos
import ControleDeProjetos from '../views/ControleDeProjetos.vue'

//Backlogs
import PainelKanbanView from '../views/PainelKanban'
import SprintsView from '../views/SprintsView'

//Login
import LoginViewVue from '@/views/LoginView.vue'

//Senha
import EsqueceuSenhaView from "@/views/Senha/EsqueceuSenhaView"
import ValidarSenhaView from "@/views/Senha/ValidarSenhaView"
import AlterarSenhaView from "@/views/Senha/AlterarSenhaView"
import ConfiguracaoUsuario from '@/views/Senha/ConfiguracaoUsuario.vue'


function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
if(localStorage.getItem('LoggedUser'))
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next(); 
 } 
 else
 {
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

  //Projetos
  {
    path: '/sprints',
    name: 'sprints',
    component: SprintsView,
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
