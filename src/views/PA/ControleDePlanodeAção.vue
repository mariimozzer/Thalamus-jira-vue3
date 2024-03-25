<template>
    <br>

    <br><br><br>

    <div style="padding: 1rem;">
        <div class="container"
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">
            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">
                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Plano de Ação</h3>
                    </div>

                    <button :title="'Adicionar Plano de Ação'" style="width: max-content; font-size: 30px;"
                        @click="this.modalNovoPA = true" class="botaoAdicionarSprint">
                        <i class="bi bi-plus-circle"></i>
                    </button>

                </div>
            </div>

            <br>

            <div>
                <div class="table responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome do Plano de Ação </th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de Início</th>
                                <th scope="col">Data de Término</th>
                                <th scope="col">Gerente Responsável</th>
                                <th scope="col">Setor Envolvido</th>
                                <th scope="col"></th>

                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in planosAcao" :key="item.id" style="text-align: center;"
                                @mouseover="mostrarBotao(item.id, true)" @click="verBacklogs(item.id, item.nome)"
                                @mouseleave="mostrarBotao(item.id, false)">

                                <td>{{ item.nome }}</td>
                                <td><select v-model="item.status" class="form-select"
                                        :style="{ 'color': (item.status == 'Pendente') ? 'rgb(255, 145, 0)' : (item.status == 'Em andamento') ? 'rgb(0, 47, 255)' : (item.status == 'Concluído') ? 'rgb(0, 192, 0)' : 'red', }"
                                        style="width: 10rem; outline: none; text-align: center; border: none; background-color: transparent; "
                                        @click.stop @change="editarPlanoInline(item.id, 'status', item.status)">
                                        <option style="color: red;">Proposto</option>
                                        <option style="color: rgb(255, 145, 0);">Pendente</option>
                                        <option style="color: rgb(0, 47, 255);">Em andamento</option>
                                        <option style="color: rgb(0, 192, 0);">Concluído</option>
                                    </select></td>
                                <td> 
                                    <input type="date" :value="formatarDataHora(item.dtInicio)" disabled>
                                </td>
                                <td>{{ item.dtTermino }}</td>
                                <td>{{ item.gerente_name }}</td>
                                <td>{{ item.setor_nome }}</td>
                                <td>
                                    <div style="width: max-content; visibility: hidden;" :id="'botaoEdicao' + item.id">
                                        <v-menu v-if="Array.isArray(planosAcao) && planosAcao.length > 0">
                                            <template v-slot:activator="{ props }">
                                                <v-btn style="width: 1.6rem; height: 1.6rem; border: 1px solid black;"
                                                    class="botaoAdicionarSprint" icon="mdi-dots-horizontal"
                                                    v-bind="props"></v-btn>
                                            </template>

                                            <v-list>

                                                <v-list-item>
                                                    <button style="margin: 0.2rem;"
                                                        @click="modalEditarPlano = true, this.planoEditado = item, this.planoEditado.dtTermino !== null ? this.planoEditado.dtTermino = this.planoEditado.dtTermino.slice(0, 10) : '', this.planoEditado.dtInicio !== null ? this.planoEditado.dtInicio = this.planoEditado.dtInicio.slice(0, 10) : ''">Editar
                                                    </button><br />
                                                    <button style="margin: 0.2rem;"
                                                        @click="modalExcluirPlano = true, this.planoEditado = item">Excluir
                                                    </button><br />
                                                </v-list-item>

                                            </v-list>
                                        </v-menu>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL EXCLUIR PLANO DE AÇÃO -->
    <div style="overflow: auto" class="modal-mask" v-if="modalExcluirPlano" @click="fecharModalFora">
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; "
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h6 class="titulo">Deseja excluir o plano de ação {{ planoEditado.nome }}?</h6>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn button-cancel"
                        @click="fecharModalExcluirPrograma">Cancelar</button>
                    &nbsp;&nbsp;
                    <button type="button" class="btn btn-primary" @click="excluirPlano"
                        data-bs-dismiss="modal">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- MODAL EXCLUIR PLANO DE AÇÃO -->




    <!-- MODAL EDITAR PLANO DE AÇÃO -->
    <div style="overflow: auto" class="modal-mask" v-if="modalEditarPlano" @click="fecharModalFora">
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; "
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Editar: {{ planoEditado.nome }} </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.getPlanoAcao, this.modalEditarPlano = false"></button>
                </div>
                <hr>
                <br>

                <div style="display: flex; width: 100%;">
                    <div style="display: flex; flex-flow: column; width: 50%">
                        <div class="form-group">
                            <label for="nome">Nome do Plano de Ação</label>
                            <input id="nome" type="text" v-model="planoEditado.nome" class="form-control"
                                @focusout="editarPlano('nome', planoEditado.nome)">
                        </div>

                        <div class="form-group">
                            <label for="gerente">Gerente Responsável</label>
                            <select id="gerente" v-model="planoEditado.gerente_name" class="form-select">
                                <option v-for="item in gerente" :key="item.id" :value="item.nomeCompleto">
                                    {{ item.nomeCompleto }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="setor">Programa</label>
                            <select id="setor" class="form-select">
                                <option>
                                    Nenhum
                                </option>
                                <option>
                                    Ciclo
                                </option>
                            </select>
                        </div>


                    </div>
                    <div style="display: flex; flex-flow: column; width: 50%;">

                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                            <label for="dataInicio">Data de Início</label>
                            <input id="dataInicio" type="date" v-model="planoEditado.dtInicio" class="form-control"
                                @change="editarPlano('dtInicio', $event.target.value)">
                        </div>
                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                            <label for="dataTermino">Data de Término</label>
                            <input id="dataTermino" type="date" v-model="planoEditado.dtTermino" class="form-control"
                                @change="editarPlano('dtTermino', $event.target.value)">
                        </div>

                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                            <label for="setor">Setor Beneficiado</label>
                            <select v-model="planoEditado.setor_nome" class="form-select">
                                <option v-for="setor in setores" :key="setor.id" :value="setor.nome">{{ setor.nome }}
                                </option>
                            </select>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END MODAL EDITAR PLANO DE AÇÃO -->


    <!-- MODAL NOVO PLANO DE AÇÃO -->

    <div style="overflow: auto" class="modal-mask" v-if="modalNovoPA" @click="fecharModalFora">
        <div style="max-height: 80%; width: 70%; padding: 3rem; " class="modal-container">

            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Cadastrar Plano de Ação </h3>
                    <button type="button" @click="this.modalNovoPA = false" class="btn-close"
                        aria-label="Close"></button>

                </div>

                <hr>
                <br>

                <div style="display: flex;">

                    <div class="form-group" style="width: 30rem;">
                        <label for="nome">Nome</label>
                        <input id="nome" v-model="novoPlanoAcao.nome" type="text" class="form-control">
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="data">Data de Início</label>
                        <input id="data" v-model="novoPlanoAcao.dtInicio" type="date" ref="dtInicio"
                            class="form-control">
                    </div>
                </div>


                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="gerente">Gerente Responsável</label>
                        <select id="gerente" v-model="planoEditado.gerente_name" class="form-select">
                            <option v-for="item in gerente" :key="item.nome" :value="item.nome">
                                {{ item.nome }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="setor">Setor Responsável</label>
                        <select id="setor" v-model="novoPlanoAcao.setor_id" class="form-select">
                            <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                                {{ setor.nome }}
                            </option>
                        </select>
                    </div>
                </div>


                <div style="display: flex; justify-content: right;">
                    <button @click="adicionarPlanoAcao" style="height: 2.5rem;"
                        class="btn btn-primary float-right mr-2">Salvar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- END MODAL NOVO PLANO DE AÇÃO -->
</template>


<script>
import { devURL } from '../../services/api'
import { prodURL } from '../../services/api'

import axios from 'axios'

export default {
    name: "ControlePCM",

    data() {
        return {
            modalNovoPA: false,
            devURL: devURL,
            prodURL: prodURL,
            planosAcao: [],
            novoPlanoAcao: {
                "nome": '',
                "dtInicio": new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                "gerente_id": '',
                "setor_id": ''
            },
            gerente: [],
            setores: [],
            modalEditarPlano: false,
            modalExcluirPlano: false,
            planoEditado: null

        }
    },

    mounted() {
        this.getPlanoAcao()
        this.getGerenteseSetor()

    },

    methods: {

        excluirPlano() {
            const userId = localStorage.getItem('id')

            axios.put(`${this.prodURL}/planoAcao/excluir/${this.planoEditado.id}`, {
                usuario_id: userId
            })
                .then(() => {
                    this.getPlanoAcao();
                    this.modalExcluirPlano = false;
                })
                .catch((error) => {
                    console.error('Erro ao excluir plano:', error);
                });
        },

        fecharModalExcluirPrograma() {
            this.modalExcluirPlano = false;
        },

        formatarDataHora(valor) {
            return valor.slice(0, 10)
        },

        editarPlanoInline(idProjeto, itemAlterado, novoValor) {
            if (novoValor !== "Concluído") {


                axios.put(`${this.prodURL}/planoAcao/atualizar/${idProjeto}`, {
                    [itemAlterado]: novoValor,
                    dtTermino: null
                })
                    .then(() => {
                        this.getPlanoAcao()
                    })
            }
            if (novoValor == "Concluído") {
                var dataAtual = new Date().toISOString().split('T')[0];
                axios.put(`${this.prodURL}/planoAcao/atualizar/${idProjeto}`, {

                    [itemAlterado]: novoValor,
                    dtTermino: dataAtual
                })
                    .then(() => {
                        this.getPlanoAcao()
                    })
            }
        },


        editarPlano(itemAlterado, novoValor) {

            axios.put(`${this.prodURL}/planoAcao/atualizar/${this.planoEditado.id}`, {
                [itemAlterado]: novoValor,
            })
        },


        mostrarBotao(id, mostrar) {
            if (mostrar) {
                this.planoEditado = this.planosAcao.find(item => item.id === id);
                document.getElementById('botaoEdicao' + id).style.visibility = '';
            } else {
                document.getElementById('botaoEdicao' + id).style.visibility = 'hidden';
            }
        },



        adicionarPlanoAcao() {
            axios.post(`${this.prodURL}/planoAcao/cadastrar`, {

                nome: this.novoPlanoAcao.nome,
                dtInicio: this.novoPlanoAcao.dtInicio,
                gerente_id: this.novoPlanoAcao.gerente_id,
                setor_id: this.novoPlanoAcao.setor_id,
                status: "Proposto"
            })

                .then((response) => {
                    this.getPlanoAcao();
                    this.modalNovoPA = false;
                    this.novoPlanoAcao = {
                        "nome": "",
                        "dtInicio": new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                        "gerente_id": "",
                        "setor_id": "",
                    };
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });

        },

        getGerenteseSetor() {
            axios.get(`${this.prodURL}/usuario`, {

            })
                .then((response) => {
                    this.gerente = response.data
                    this.gerente = this.gerente.map(item => ({
                        id: item.id,
                        nomeCompleto: item.name
                    }))
                })
                .catch((error) => {
                    console.error(error);
                });

            axios.get(`${this.prodURL}/setor`, {

            })
                .then((response) => {
                    this.setores = response.data
                })
                .catch((error) => {
                    console.error(error);
                });
        },


        getPlanoAcao() {
            axios.get(`${this.prodURL}/planoAcao/listar`, {

            })
                .then((response) => {
                    this.planosAcao = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalNovoPA = false;
                this.modalEditarPlano = false;
                this.modalExcluirPlano = false;
                return this.getPlanoAcao()
            }
        },

        verBacklogs(id, nomeProjeto) {
            this.$router.push({ name: "PA" })
            sessionStorage.setItem('idProjeto', id)
            sessionStorage.setItem('nomeDoProjeto', nomeProjeto)
        },

        verPCM() {
            this.$router.push({ name: "PCM" })
        },

        verPCMvazio() {
            this.$router.push({ name: "PCMv" })
        }
    }

}
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>