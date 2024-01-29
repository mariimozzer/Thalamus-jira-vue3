<template>
    <div class="container">
        <div class="row">
    
            <div class="col-sm-12">
                <h3 class="titulo">{{modoCadastro ? "Cadastrar" : "Editar" }} Projeto </h3>
                <hr/>
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
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="setor">Setor Beneficiado</label>
                    <select id="id_setor" v-model="id_setor" class="form-select">
                        <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                            {{ setor.nome }}
                        </option>
                    </select>                </div>
            </div>
            <div class="col-sm-4">
                <!-- <div class="form-group">
                    <label for="tempo">Tempo da Sprint</label>
                    <input id="tempo" type="number" v-model="projeto" class="form-control">
                    <select type="combo" class="form-control" for="tempo">
                                <option>Selecione uma opção</option>
                                <option value="dias">Dia(s)</option>
                                <option value="semanas">Semana(s)</option>
                                <option value="meses">Mes(es)</option>
                            </select>
                </div> -->
    
            </div>
    
        </div>
        <br><br>
        <div class="form-group">
            <div class="col-sm-12">
    
                <button class="btn btn-default  float-right" @click="cancelar">Cancelar</button>
                <button class="btn btn-primary float-right mr-2" @click="adicionarProjeto">Salvar</button>
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
            setores: []




        }
    },

    mounted(){
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

<style scoped>

</style>
