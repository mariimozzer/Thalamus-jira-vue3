<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="col-sm-12" style="text-align: center;">

                <h3 class="titulo"> Gerenciamento de Projetos </h3>
                <hr>
                </div>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-3">
    
                <button class="button-default" @click="adicionarProjeto">
                        <i class="fa-solid fa-circle-plus"></i>&nbsp; Adicionar Projeto
                    </button>
    
    
            </div>
    
        </div>
        <br>
        <div class="row">
            <div class="col-sm-16">
                <table class="table table-hover ">
    
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome do Projeto </th>
                            <th scope="col">Data Início</th>
                            <th scope="col">Gerente Responsável</th>
                            <th scope="col">Setor Beneficiário</th>
                            <th scope="col">
    
                            </th>
    
    
                        </tr>
    
    
                    </thead>
    
    
                    <tbody>
    
                        <!-- <tr v-for="item in projetos" :key="item.id">
            
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.nome }}</td>
                                    <td>{{ item.dataInicio }}</td>
        
                                    <td></td>
            
                                    <td class="icon-tabela" style="text-align: center;">
                                        <i @click="editarSetor(item)" class="fa fa-edit icones-tabela"></i> |
                                        <i @click="excluirSetor(item)" class="fa fa-trash icones-tabela"></i>
                                    </td>
                                </tr> -->
    
                        <tr>
                            <td>1</td>
                            <td>Thalamus</td>
                            <td>14/11/2023</td>
                            <td>Darley</td>
                            <td>Desenvolvimento</td>
                            <td>
                                <button class="button-default" @click="verBacklogs()">
                                        <i class="fa-solid fa-list"></i>&nbsp; Backlogs
                                    </button>
                            </td>
    
                        </tr>
                    </tbody>
    
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import api from '../services/api';
import Projeto from'@/models/Projeto'


export default {
    name: "ControleDeProjetos",

    data() {
        return {
            projeto: new Projeto(),
            modoCadastro: true,
            projetos: []
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

        obterProjetoId(id){
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

<style scoped>

</style>