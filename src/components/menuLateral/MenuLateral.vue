<template>
    <div>
        <div class="submenu-administrativo1" style="text-align: center;">
            <br><br><br><br><br>

            <!-- <div v-for="item in sgp" :key="item.id">
                <div v-if="item.filho.length > 0">

                    <h6 style="color: rgb(255, 255, 255);"> {{ item.nome }}</h6>
                    <div v-for="filho in item.filho" :key="filho.id" class="submenu-column">
                        <a :href="devURL + filho.url" style="text-decoration: none; color: rgb(255, 255, 255);">
                            <div class="categorias1">
                                <span style="text-decoration: none; color: rgb(255, 255, 255);">{{ filho.nome }}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div> -->
            TESTE
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
    width: 300px;
    height: 1920px;
    position: absolute;
    /* z-index: -1; */
    top: 0;
    left: 0px;
    overflow-y: auto;
    /* scroll */
    padding: 20px;
    color: #f0f0f0;
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

.categorias1 {
    width: 100%;
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
    width: 250px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.categorias1:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px var(--second-color);
    cursor: pointer;
}
</style>