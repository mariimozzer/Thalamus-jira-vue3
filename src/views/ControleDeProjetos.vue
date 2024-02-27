<template>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 1px solid black; border-radius: 5px; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; border-radius: 5px; width: 100%; ">


            <div class="col-sm-12" style="text-align: center;">

                <div style="display: flex;">
                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Projetos Cadastrados</h3>
                    </div>
                    <button style="width: max-content; font-size: 25px;" @click="this.modalNovoProjeto = true">
                        <i class="bi bi-plus-square"></i>
                    </button>
                </div>
            </div>
            <br>
            <div>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome do Projeto </th>
                                <th scope="col">Data de Início</th>
                                <th scope="col">Data de Termino</th>
                                <th scope="col">Gerente Responsável</th>
                                <th scope="col">Setor Beneficiário</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <thead>
                            <tr v-for="item in projetos" :key="item.id" @mouseover="mostrarBotao(item.id, true)"
                                @mouseleave="mostrarBotao(item.id, false)">
                                <td>{{ item.nome }}</td>
                                <td><input type="date" v-model="item.dtInicio" disabled style="text-align: center;"></td>
                                <td><input v-if="item.dtTermino" type="date" v-model="item.dtTermino" disabled
                                        style="text-align: center;"> <span v-if="!item.dtTermino">Projeto em
                                        andamento...</span></td>
                                <td>{{ item.gerente }}</td>
                                <td>{{ item.setor }}</td>
                                <td>
                                    <button style="font-size: larger;" @click="verBacklogs(item.id)">
                                        <i class="fa-solid fa-list"></i>
                                    </button>
                                    <button style="font-size: larger; margin-left: 1rem;" @click="verPainel(item.id)">
                                        <i class="bi bi-kanban"></i>
                                    </button>
                                </td>
                                <td>
                                    <div style="width: max-content; visibility: hidden;" :id="'botaoEdicao' + item.id">
                                        <v-menu>
                                            <template v-slot:activator="{ props }">
                                                <v-btn style="width: 1.6rem; height: 1.6rem; border: 1px solid black;"
                                                    icon="mdi-dots-horizontal" v-bind="props"></v-btn>
                                            </template>

                                            <v-list>
                                                <v-list-item>
                                                    <button style="margin: 0.2rem;"
                                                        @click="modalEditarProjeto = true, this.idProjetoEditado = item.id">Editar
                                                        Projeto</button><br />
                                                </v-list-item>
                                                <v-list-item>
                                                    <button style="margin: 0.2rem;" :disabled="item.dtTermino"
                                                        :style="{ 'cursor': (item.dtTermino) ? 'not-allowed' : 'pointer', 'color': (item.dtTermino) ? 'grey' : 'black' }"
                                                        @click="modalFinalizarProjeto = true, this.idProjetoEditado =
                                                            item.id">
                                                        Finalizar Projeto</button><br />
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </div>
                                </td>
                            </tr>
                        </thead>

                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- modal novo projeto -->
    <div style="overflow: auto" class="modal-mask" v-if="modalNovoProjeto" @click="fecharModalFora">
        <div style="max-height: 80%; width: 70%; padding: 3rem; " class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Cadastrar Projeto </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.modalNovoProjeto = false"></button>
                </div>
                <hr>
                <br>
                <div style="display: flex;">

                    <div class="form-group" style="width: 30rem;">
                        <label for="nome">Nome do Projeto</label>
                        <input id="nome" type="text" v-model="novoProjeto.nome" class="form-control">
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="data">Data de Início</label>
                        <input id="data" type="date" ref="dtInicio" v-model="novoProjeto.dtInicio" class="form-control">

                    </div>
                </div>

                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="gerente">Gerente Responsável</label>
                        <select id="gerente" v-model="novoProjeto.gerente_id" class="form-select">
                            <option v-for="item in gerente" :key="item.id" :value="item.id">
                                {{ item.nomeCompleto }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="setor">Setor Beneficiado</label>
                        <select id="setor" v-model="novoProjeto.setor_id" class="form-select">
                            <option v-for="item in setores" :key="item.id" :value="item.id">
                                {{ item.nome }}
                            </option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: right;">
                    <button style="height: 2.5rem;" class="btn btn-primary float-right mr-2"
                        @click="adicionarProjeto">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- fim modal novo projeto -->
    <!-- modal editar projeto -->
    <div style="overflow: auto" class="modal-mask" v-if="modalEditarProjeto" @click="fecharModalFora">
        <div style="max-height: 80%; width: 70%; padding: 3rem; " class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Editar Projeto </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.getProjetos, this.modalEditarProjeto = false"></button>
                </div>
                <hr>
                <br>
                <div style="display: flex;">

                    <div class="form-group" style="width: 30rem;">
                        <label for="nome">Nome do Projeto</label>
                        <input id="nome" type="text"
                            v-model="projetos.find(projeto => projeto.id === this.idProjetoEditado).nome"
                            class="form-control" @focusout="editarProjeto('nome', $event.target.value)">
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="data">Data de Início</label>
                        <input id="data" type="date" ref="dtInicio"
                            v-model="projetos.find(projeto => projeto.id === this.idProjetoEditado).dtInicio"
                            class="form-control" @change="editarProjeto('dtInicio', $event.target.value)">
                    </div>
                </div>

                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="gerente">Gerente Responsável</label>
                        <select id="gerente" @change="editarProjeto('gerente_id', $event.target.value)"
                            v-model="projetos.find(projeto => projeto.id === this.idProjetoEditado).gerente_id"
                            class="form-select">
                            <option v-for="item in gerente" :key="item.id" :value="item.id">
                                {{ item.nomeCompleto }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="setor">Setor Beneficiado</label>
                        <select id="setor" v-model="projetos.find(projeto => projeto.id === this.idProjetoEditado).setor_id"
                            class="form-select" @change="editarProjeto('setor_id', $event.target.value)">
                            <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                                {{ setor.nome }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- fim modal -->
    <!-- MODAL INICIAR SPRINT-->
    <div class="modal-mask" v-if="modalFinalizarProjeto" @click="fecharModalFora">
        <div class="modal-container" style="height: min-content; width: 50rem;">
            <div style="display: flex; justify-content: right;">
                <button type="button" class="btn-close" aria-label="Close" @click="fecharModal"></button>
            </div>

            <div style="width: 100%;">
                <div>
                    <label>Data de termino do projeto:</label>
                    <input :class="{ shake: disabled }" v-model="dataTerminoProjeto" id="dataTermino"
                        :min="new Date().toISOString().split('T')[0]" class="form-control" type="date">
                </div>
                <div style="margin-top: 1rem;">
                    <button class="button-default" @click="finalizarProjeto()"><i class="fa-solid fa-circle-plus"></i>&nbsp;
                        Finalizar Projeto</button>
                </div>
            </div>

        </div>
    </div>
    <!--END MODAL SPRINT-->
</template>


<script>
import axios from 'axios'

export default {
    name: "ControleDeProjetos",

    data() {
        return {
            dataTerminoProjeto: null,
            teste: null,
            projetos: [],
            modalNovoProjeto: false,
            modalEditarProjeto: false,
            modalFinalizarProjeto: false,
            novoProjeto: {
                "nome": "",
                "dtInicio": new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                "gerente_id": "",
                "setor_id": "",
            },
            gerente: [],
            disabled: false,
            setores: [],
            idProjetoEditado: null,
        }
    },

    mounted() {
        this.getProjetos(),
            this.getGerenteseSetor()
    },

    methods: {
        finalizarProjeto() {
            if (this.dataTerminoProjeto == null) {
                document.getElementById('dataTermino').style.border = '1px solid red';
                this.disabled = true
                setTimeout(() => {
                    this.disabled = false
                }, 1500)
                return
            }
            axios.put(`http://192.168.0.6:8000/api/projeto/atualizar/${this.idProjetoEditado}`, {
                dtTermino: this.dataTerminoProjeto,
            })
            this.modalFinalizarProjeto = false;
            setTimeout(() => {
                this.getProjetos();
            }, 500)

        },

        mostrarBotao(id, mostrar) {
            if (mostrar == true) {
                document.getElementById('botaoEdicao' + id).style.visibility = ''
            }
            if (mostrar == false) {
                document.getElementById('botaoEdicao' + id).style.visibility = 'hidden'
            }
        },

        editarProjeto(itemAlterado, novoValor) {

            axios.put(`http://192.168.0.6:8000/api/projeto/atualizar/${this.idProjetoEditado}`, {
                [itemAlterado]: novoValor,
            })
        },

        adicionarProjeto() {
            axios.post('http://192.168.0.6:8000/api/projeto/cadastrar', {
                nome: this.novoProjeto.nome,
                dtInicio: this.novoProjeto.dtInicio,
                gerente_id: this.novoProjeto.gerente_id,
                setor_id: this.novoProjeto.setor_id
            })
                .then(() => {
                    this.getProjetos();
                    this.modalNovoProjeto = false;
                    this.novoProjeto = {
                        "nome": "",
                        "dtInicio": new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                        "gerente_id": "",
                        "setor_id": "",
                    };
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        verBacklogs(id) {
            this.$router.push({ name: "sprints" })
            sessionStorage.setItem('idProjeto', id)
        },

        verPainel(id) {
            this.$router.push({ name: "painel" })
            sessionStorage.setItem('idProjeto', id)
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalNovoProjeto = false;
                this.modalEditarProjeto = false
                this.modalFinalizarProjeto = false
                return this.getProjetos()
            }
        },

        getGerenteseSetor() {
            axios.get('http://192.168.0.5:8000/api/pessoa/', {
            })
                .then((response) => {
                    this.gerente = response.data
                })
                .catch((error) => {
                    console.error(error);
                });

            axios.get('http://192.168.0.6:8000/api/setor', {
            })
                .then((response) => {
                    this.setores = response.data.data
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getProjetos() {
            axios.get('http://192.168.0.6:8000/api/projeto/listar', {
            })
                .then((response) => {
                    this.projetos = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

}
</script>

<style>
.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
}

@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}
</style>