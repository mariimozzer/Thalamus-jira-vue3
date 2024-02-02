<template>
    <div class="container">


        <div class="col-sm-12" style="text-align: center;">

            <div style="display: flex;">
                <div style="width: 100%;">
                    <h3 style="text-align: center; margin: 0;">Projetos Cadastrados</h3>
                </div>
                <button style="width: max-content; font-size: 25px;" @click="adicionarProjeto">
                    <i class="bi bi-plus-square"></i>
                </button>
            </div>

            <hr>
        </div>
        <br>
        <div>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome do Projeto </th>
                            <th scope="col">Data Início</th>
                            <th scope="col">Gerente Responsável</th>
                            <th scope="col">Setor Beneficiário</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <thead>
                            <tr v-for="item in projetos" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.nome }}</td>
                                <td>{{ item.dtInicio }}</td>
                                <td>{{ item.gerente }}</td>
                                <td>{{ item.setor }}</td>
                                <td>
                                    <button style="font-size: larger;" @click="verBacklogs()">
                                        <i class="fa-solid fa-list"></i>
                                    </button>
                                </td>
                            </tr>
                        </thead>
                            
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import api from '../services/api';
import Projeto from '@/models/Projeto'


export default {
    name: "ControleDeProjetos",

    data() {
        return {
            projeto: new Projeto(),
            modoCadastro: true,
            projetos: [{
                "id": "1",
                "nome": "Thalamus",
                "dtInicio": "14/11/2023",
                "gerente": "Darley",
                "setor": "Desenvolvimento",
            }]
        }
    },

    created() {
        let id = this.$route.params.id;
        if (id) {
            this.modoCadastro = false;
            this.obterProjetoId(id);
        } else {
            this.modoCadastro = true;
        }
    },

    methods: {


        adicionarProjeto() {
            this.$router.push({ name: "AdicionarProjeto" })
        },

        verBacklogs() {
            this.$router.push({ name: "backlogs" })
        },

        obterProjetoId(id) {
            axios.get(`${api.defaults.baseURL}/projeto/${id}`)
                .then(response => {
                    const projetoData = response.data;
                    this.nomeProjeto = projetoData.nomeProjeto;
                    this.dtInicio = projetoData.dtInicio;
                    this.gerente = projetoData.gerente;
                    this.setor = projetoData.setor;

                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

}
</script>

<style scoped></style>