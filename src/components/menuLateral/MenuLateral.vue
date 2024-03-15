<template>
    <div>
        <div class="submenu-administrativo1">
            <br><br><br><br><br>

            <div style="min-width: fit-content;">
                <div style="min-width: fit-content;">
                    <div>
                            <div class="categorias1" @click="verProgramas">
                                <span style="text-decoration: none; color: rgb(255, 255, 255);">Programas</span>
                            </div>
                            <div class="categorias1"  @click="verPCM">
                                <span style="text-decoration: none; color: rgb(255, 255, 255);">PCM</span>
                            </div>
                            <div class="categorias1" @click="verProjetos">
                                <span style="text-decoration: none; color: rgb(255, 255, 255);">Projetos</span>
                            </div>
                            <div class="categorias1" @click="verPA">
                                <span style="text-decoration: none; color: rgb(255, 255, 255);">Plano de Ação</span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from 'axios'
import Menu from '@/models/Menu.js'
import api from '../../services/api'

export default {
    name: "TesteSideMenuView",

    data() {
        return {
            sgp: '',
            devURL: api.defaults.devURL
        }
    },

    methods: {
        verProgramas() {
            this.$router.push('/Programas/controle');
        },
        verPCM() {
            this.$router.push('/PCM/Controle');
        },
        verProjetos() {
            this.$router.push('/projetos');
        },
        verPA() {
            this.$router.push('/PA/Controle');
        },


        getAllSidebar() {
            //axios.get(`http://192.168.0.6:8000/api/menu/estrutura/7`)
            api.get(`http://192.168.0.5:8000/api/menu/estrutura/7`)
                .then(response => {
                    this.sgp = response.data.data.map((p) => new Menu(p));
                    // console.log(this.sgp)
                    // console.log(this.devURL)
                })
        }
    },

    mounted() {
        this.getAllSidebar()
    }
}
</script>

<style scoped>
.category1 {
    margin-bottom: 10px;
    cursor: pointer;
}

.submenu-administrativo1 {
    background-color: #333;
    text-align: center;
    min-width: fit-content;
    width: 15%;
    max-width: 15rem;
    height: 100vh;
    position: fixed;
    /* z-index: -1; */
    top: 0;
    left: 0px;
    overflow-y: auto;
    /* scroll */
    padding: 20px;
    color: #f0f0f0;
    z-index: 2 ;
}

/* @media only screen and (max-width: 768px) {
    .submenu-administrativo1 {
        width: 100%;
    }
} */

.option2 {
    padding: 5px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dropdown {
    padding-left: 20px;
}

.dropdown .option2 {
    padding: 8px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dropdown .option2:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px var(--second-color);
    cursor: pointer;
}

.categorias1 {
    padding: 4px;
    background-color: #444;
    border: 1px solid #555;
    width: 100%;
    min-width: fit-content;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.categorias1:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px var(--second-color);
    cursor: pointer;
}</style>