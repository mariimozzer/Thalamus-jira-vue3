<template>
    <div class="menu " id="menu">
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="color: white; ">
            <a class="navbar-brand" @click="logo">
                                    <img src="https://roboflex.com.br/wp-content/uploads/2023/05/logotipo-roboflex.png" alt="Logo"
                                        style="width: 75%; ">
                                </a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <button v-for="menu in menus" :key="menu.id" @mouseover="activateMenu(menu)" class="btn menu-block text-white mb-2 mr-2" :class="{ 'active': menu === activeMenu }" :style="{ backgroundColor: menu === activeMenu ? '' : '#343537' }">
                                            &nbsp; &nbsp;{{ menu.nome }}
                                        </button>
                </ul>
                <div>
                    <div class="navbar-nav ml-auto">
                        <b-nav-item-dropdown right style="color: white;">
                            <template v-slot:button-content><i style="color: white;" class="fa-solid fa-circle-user"></i>
                                                    <span class="username" style="color: white;">&nbsp; Olá, {{ userName }}</span>
</template>
                            <b-dropdown-item style="color: black" @click="configuracoesUsuario()">
                                <span style="color: black;"><i class="fa-solid fa-user-gear"></i>&nbsp; Configurações</span>
                            </b-dropdown-item>
                            <hr>
                            <b-dropdown-item style="color: black" @click="alterarSenha">
                                <span style="color: black;"><i class="fa-solid fa-user-gear"></i>&nbsp; Alterar
                                    Senha</span>
                            </b-dropdown-item>
                            <hr>
                            <b-dropdown-item style="color: black" @click="logout">
                                <span style="color: black;"><i class="fa-solid fa-right-from-bracket"></i>&nbsp;
                                    Logout</span>
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </div>
                </div>
            </div>
        </nav>

    
            <div v-if="activeMenu" class="menunovo" @mouseleave="closeContent">
      <div v-for="submenu in activeMenu.filho" :key="submenu.id">
        <h6 style="color: rgb(255, 255, 255)">{{ submenu.nome }}</h6>
        <ul style="list-style-type: none;">
    <li v-for="subsubmenu in submenu.filho" :key="subsubmenu.id">
        <a v-if="isSubSubMenuEnabled(subsubmenu)" @click="handleSubSubMenuClick(subsubmenu)" class="submenu-link">
            {{ subsubmenu.nome }}
        </a>
        <span v-else class="submenu-disabled">
            {{ subsubmenu.nome }}
        </span>
    </li>
</ul>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'
import Menu from '@/models/Menu.js'
import { createToaster } from "@meforma/vue-toaster";
import api from '../../services/api';


const toaster = createToaster({
    position: "top-right",
    duration: "4000",
});

export default {
    name: "TesteMenuView",

    data() {
        return {
            activeMenu: '',
            home: '',
            estruturaCortada: '',
            botoes: '#343537',
            menus: '',
            adm: '',
            fabrica: '',
            gestao: '',
            id: '',
            menuUrl: '',
            localData: [],
            localSelecionado: null,
            apiUrl: api.defaults.baseURL,
        }
    },

    methods: {

        getSubSubMenuUrl(subsubmenu) {
            if (subsubmenu.port) {
                return `${subsubmenu.porta}/${subsubmenu.url}/`;
            } else {
                console.error("Erro: A porta não está definida para o subsubmenu", subsubmenu);
                return '#';
            }
        },


        async activateMenu(menu) {
            this.activeMenu = menu;
            this.menus.forEach((m) => {
                m.active = m === menu;
            });

            const menuUrl = `http://192.168.0.5:8000/api/menu/usuario/${this.id}`;

            try {
                const menuResponse = await axios.get(menuUrl);

                if (Array.isArray(menuResponse.data)) {
                    const userPermissions = menuResponse.data.map((item) => item.nome.toLowerCase());
                    this.$store.dispatch('updateUserPermissions', userPermissions);

                    if (menu.submenus && menu.submenus.length > 0) {
                        this.activateSubMenu(menu.submenus[0]);
                    } else {
                        this.showSidebar = false;
                        this.sideBarMenus = [];
                    }
                } else {
                    console.error("Erro: Não é tem array");
                }
            } catch (error) {
                console.error("Erro ao obter dados do menu:", error);
            }
        },

        isSubSubMenuEnabled(subsubmenu) {
            const userPermissions = this.$store.getters.getUserPermissions;
            return userPermissions.includes(subsubmenu.nome.toLowerCase());
        },

        handleSubSubMenuClick(subsubmenu) {
        if (this.isSubSubMenuEnabled(subsubmenu)) {
            console.log(`Subsubmenu "${subsubmenu.nome}" clicked`);

            const fullUrl = subsubmenu.url;
            window.location.href = fullUrl; 
        } else {
            alert("Você não tem permissão para acessar este submenu.");
        }
    },
        getAllHome() {
            axios.get(`http://192.168.0.6:8000/api/menu/home`)
                .then(response => {


                    this.home = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllEstrutura() {
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura`)
                .then(response => {
                    this.menus = response.data.data.map((p) => new Menu(p));
                })
        },


        getAllAdm() {
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura/1`)
                .then(response => {
                    this.adm = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllFab() {
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura/44`)
                .then(response => {
                    this.fabrica = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllGestao() {
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura/52`)
                .then(response => {
                    this.gestao = response.data.data.map((p) => new Menu(p));
                })
        },


        logout() {
            const token = localStorage.getItem('token')
            axios
                .post('http://192.168.0.5:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    this.$router.push('/');
                    localStorage.removeItem('token')
                    localStorage.removeItem('userName')
                    localStorage.removeItem('id')
                    localStorage.removeItem('LoggedUser')


                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        },
        closeContent() {
            this.activeMenu = null;
        },

        async buscaLocal() {
            try {
                const response = await fetch(`${this.apiUrl}/local`);
                this.localData = await response.json();
            } catch (error) {
                console.error('Error ao buscar empresas', error);
                toaster.show(`Erro buscar empresa`, { type: "error" });
            }



        },
        configuracoesUsuario() {
            this.$router.push({ name: "Configuracao" })
        },

        alterarSenha() {
            this.$router.push({ name: "AlterarSenha" })
        }

    },

    created() {
        this.userName = localStorage.getItem('userName')
        this.id = localStorage.getItem('id')

        this.menuUrl = `http://192.168.0.5:8000/api/menu/usuario/${this.id}`

        axios.get(this.menuUrl).then(menuResponse => {
            const menuOptions = menuResponse.data
            console.log("Menu Acessos", menuOptions)
        })

    },

    mounted() {
        this.getAllHome()
        this.getAllEstrutura()
        this.getAllAdm()

    }
}
</script>
  
<style>


.navbar-nav {
    display: flex;
    justify-content: center;
    align-items: center;
}

.submenu-link {
    text-decoration: none;
    color: white;
    cursor: pointer;
}

.submenu-link:hover {
    color: rgb(131, 131, 131) !important;
    text-decoration: none;
}

.submenu-link:hover {
    color: rgb(131, 131, 131) !important;
}

.submenu-disabled {
    color: rgb(134, 132, 132) !important;
    cursor: not-allowed;
}

.teste:hover {
    color: white !important
}

.menunovo {
    background-color: #3b373b;
    display: flex;
    flex-flow: row-reverse;
    justify-content: space-around;
    padding: 1rem;
}

#menu {
    position: fixed;
    z-index: 1;
    width: 100%;
    margin-left: 0px;
    margin-top: 0;
}

.submenu-column {
    width: 20%;
    box-sizing: border-box;
    margin-bottom: 20px;
}

navbar {
    padding: 100%;
    width: 100%;
    top: 100px;
    cursor: pointer;
    height: 100px;
    position: fixed;
    z-index: 2;
}

.container {
    padding-top: 70px;
    cursor: pointer;
}

.menu-block.active {
    background-color: #f8f9fa;
}

.menu-block {
    background-color: #6c757d;
}

.menu-block:hover {
    background-color: #f8f9fa;
}

.content {
    width: 100%;
    min-height: 200px;
    padding: 20px;
    box-sizing: border-box;
}

submenu {
    background-color: inherit;
    padding: 10px;
    cursor: pointer;
}

.submenu h5 {
    /* font-size: 14px; */
    margin-bottom: 5px;
    color: #333;
}

.submenu-container {
    border: 2px solid;
    border-radius: 5px;
    margin-bottom: 10px;
}

.submenu ul {
    list-style: none;
    padding: 0;
    color: rgb(255, 255, 255) !important;
}

submenu a {
    color: rgb(134, 132, 132) !important;
    text-decoration: none;
}

.submenu li a {
    color: rgb(134, 132, 132) !important;
    text-decoration: none;
}

.submenu-link:hover {
    color: rgb(131, 131, 131) !important;
}

.icons {
    display: flex;
    align-items: center;
}

.icons a {
    margin-left: 10px;
    cursor: pointer;
    color: white
}
</style>
  