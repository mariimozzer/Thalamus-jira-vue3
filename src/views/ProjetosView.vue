<template>
    <div class="container">
        <div class="row">

            <div class="col-sm-12">
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">{{ modoCadastro ? "Cadastrar" : "Editar" }} Projeto </h3>
                    <button type="button" class="btn-close" aria-label="Close" @click="cancelar"></button>
                </div>
                <hr>
                <br>
            </div>

        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome do Projeto</label>
                    <input id="nome" type="text" v-model="projeto.nome" class="form-control">
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="data">Data de Início</label>
                    <input id="data" type="date" ref="dtInicio" v-model="dtInicio" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="gerente">Gerente Responsável</label>
                    <input id="gerente" type="text" v-model="projeto.gerente" class="form-control">
                </div>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <div style="width: 20rem;">
                    <label for="setor">Setor Beneficiado</label>
                    <select id="id_setor" v-model="id_setor" class="form-select">
                        <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                            {{ setor.nome }}
                        </option>
                    </select>
                </div>
                <button style="height: 2.5rem;" class="btn btn-primary float-right mr-2"
                    @click="adicionarProjeto">Salvar</button>
            </div>

        </div>
    </div>
</template>

<script>
import Projeto from '../models/Projeto'
import api from '../services/api';


export default {
    name: "ControleDeProjetos",

    data() {
        return {

            projeto: new Projeto(),
            modoCadastro: true,
            setores: [],
            dtInicio: null

        }
    },

    mounted() {
        this.getAllSetor();

    },

    created() {
        let id = this.$route.params.id;
        if (id) {
            this.modoCadastro = false;
        } else {
            this.modoCadastro = true;
        }
    },

    methods: {
        adicionarProjeto() {

        },
        
        cancelar() {
            this.$router.push({ name: 'ControleDeProjetos' })
        },

        getAllSetor() {
            //axios.get('http://192.168.0.6:8000/api/setor')
            api.get('/setor')
                .then(response => {
                    this.setores = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
            this.dataAtual()
        },

        dataAtual() {
            const hoje = new Date();
            const dd = String(hoje.getDate()).padStart(2, "0");
            const mm = String(hoje.getMonth() + 1).padStart(2, "0");
            const yyyy = hoje.getFullYear();

            const dataFormatada = `${yyyy}-${mm}-${dd}`;

            this.dtInicio = dataFormatada;
        },
    }


}
</script>

<style scoped></style>
