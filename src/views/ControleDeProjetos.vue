<template>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 2px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">

                <div style="display: flex;">
                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Projetos Cadastrados</h3>
                    </div>
                    <button style="width: max-content; font-size: 30px;" @click="this.modalNovoProjeto = true"
                        class="botaoAdicionarSprint">
                        <i class="bi bi-plus-circle"></i>
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
                            </tr>
                        </thead>
                        <thead>
                            <tr v-for="item in projetos" :key="item.id" @mouseover="mostrarBotao(item.id, true)"
                                @click="verBacklogs(item.id, item.nome)" @mouseleave="mostrarBotao(item.id, false)">
                                <td>{{ item.nome }}</td>
                                <td><input type="date" v-model="item.dtInicio" disabled style="text-align: center;"></td>
                                <td><input v-if="item.dtTermino" type="date" v-model="item.dtTermino" disabled
                                        style="text-align: center;"> <span v-if="!item.dtTermino">Projeto em
                                        andamento...</span></td>
                                <td>
                                    <select id="gerente" v-model="item.gerente_id" disabled
                                        style="text-align: center; padding: none; width: 13rem;">
                                        <option v-for="pessoa in gerente" :key="pessoa.nome" :value="pessoa.id">
                                            {{ nomeEsobrenome(pessoa.nomeCompleto) }}
                                        </option>
                                    </select>
                                </td>
                                <td>{{ item.setor }}</td>
                                <td>
                                    <div style="width: max-content; visibility: hidden;" :id="'botaoEdicao' + item.id">
                                        <v-menu>
                                            <template v-slot:activator="{ props }">
                                                <v-btn style="width: 1.6rem; height: 1.6rem; border: 1px solid black;"
                                                    class="botaoAdicionarSprint" icon="mdi-dots-horizontal"
                                                    v-bind="props"></v-btn>
                                            </template>

                                            <v-list>
                                                <v-list-item>
                                                    <button style="margin: 0.2rem;"
                                                        @click="modalCompartilharProjeto = true, this.projetoEditado = item">
                                                        Compartilhar</button><br />
                                                </v-list-item>
                                                <v-list-item>
                                                    <button style="margin: 0.2rem;"
                                                        @click="modalEditarProjeto = true, this.projetoEditado = item">Editar
                                                    </button><br />
                                                </v-list-item>
                                                <v-list-item>
                                                    <button style="margin: 0.2rem;" :disabled="item.dtTermino"
                                                        :style="{ 'cursor': (item.dtTermino) ? 'not-allowed' : 'pointer', 'color': (item.dtTermino) ? 'grey' : 'black' }"
                                                        @click="modalFinalizarProjeto = true, this.projetoEditado.id =
                                                            item.id">
                                                        Finalizar</button><br />
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
                        <input id="nome" type="text" v-model="projetoEditado.nome" class="form-control"
                            @focusout="editarProjeto('nome', projetoEditado.nome)">
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="data">Data de Início</label>
                        <input id="data" type="date" ref="dtInicio" v-model="projetoEditado.dtInicio" class="form-control"
                            @change="editarProjeto('dtInicio', $event.target.value)">
                    </div>
                </div>

                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="gerente">Gerente Responsável</label>
                        <select id="gerente" @change="editarProjeto('gerente_id', $event.target.value)"
                            v-model="projetoEditado.gerente_id" class="form-select">
                            <option v-for="pessoa in gerente" :key="pessoa.nome" :value="pessoa.id">
                                {{ pessoa.nomeCompleto }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="setor">Setor Beneficiado</label>
                        <select id="setor" v-model="projetoEditado.setor_id" class="form-select"
                            @change="editarProjeto('setor_id', $event.target.value)">
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

    <!-- MODAL Finalizar Projeto-->
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
    <!--END MODAL-->


    <!-- MODAL compartilhar Projeto-->
    <div class="modal-mask" v-if="modalCompartilharProjeto" @click="fecharModalFora" style="padding: none;">
        <div class="modal-container" style="width: 50rem; margin-bottom: 5rem; padding: none !important;">
            <div>

                <h3 class="titulo">Compartilhar {{ projetoEditado.nome }} </h3>
                <hr>
                <br>
            </div>
            <div style="width: 100%; display: flex; justify-content: center;">
                <div style="display: flex; flex-flow: column; width: 100%; height: 10rem;">
                    <input type="text" v-model="pessoaSelecionada" class="form-control" @focusin="this.procurar()"
                        style="background-color: #f1f1f1; color: black; padding-top : 1.5rem; padding-bottom: 1.5rem;"
                        @input="this.procurar()" @focusout="fecharLista()" placeholder="Adicionar  Participante">

                    <div style="height: 11rem; overflow: auto; background-color: #f1f1f1; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; position: absolute; margin-top: 3rem; width: 30rem;"
                        v-if="listaPessoasFiltrada">
                        <ul style="list-style: none;">
                            <li @click="atualizarPermissão(item), this.listaPessoasFiltrada = null, this.pessoaSelecionada = null"
                                v-for="item in listaPessoasFiltrada" :key="item.id"><img
                                    :src="'http://192.168.0.5:8000/storage/' + item.path_image" class="cropped1"> {{
                                        item.nomeCompleto }}
                            </li>
                        </ul>
                    </div>
                    <br>
                    <h5>Pessoas com acesso:</h5>
                    <ul style="list-style: none; padding-left: 0rem !important;">
                        <select id="gerente" v-model="projetoEditado.gerente_id" disabled
                            style="text-align: left; padding-top : 1.5rem; padding-bottom: 1.5rem; width: 100%; border: 1px solid black; border-radius: 10px; padding: 5px; height: 3rem;">
                            <option style="padding-top : 1.5rem; padding-bottom: 1.5rem;" v-for="pessoa in gerente" :key="pessoa.nome" :value="pessoa.id">
                                {{ pessoa.nomeCompleto }} (Gerente) 
                            </option>
                        </select>
                        <li v-for="(item, index) in projetoEditado.permissao" :key="item.usuario_id">
                            <template v-if="index > 0">
                                <div
                                    style="display: flex; border: 1px solid black; align-items: center; justify-content: space-between; padding: 5px; border-radius: 10px;">
                                    {{ item.nome }}
                                    <select style="width: 7rem" class="form-select" v-model="item.nivel">
                                        <option value="1">Leitor</option>
                                        <option value="2">Editor</option>
                                    </select>
                                </div>
                            </template>
                        </li>
                        <br><br><br>
                    </ul>
                </div>

            </div>
        </div>
    </div>
    <!--END MODAL-->
</template>


<script>
import axios from 'axios'

export default {
    name: "ControleDeProjetos",

    data() {
        return {
            idUsuario: localStorage.getItem('id'),
            pessoaSelecionada: null,
            listaPessoasFiltrada: null,

            pessoasComAcessoPorProjeto: [],

            dataTerminoProjeto: null,
            teste: '?',
            projetos: [],
            modalCompartilharProjeto: false,
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
            pessoaCompartilhada: null,
            disabled: false,
            setores: [],
            projetoEditado: null,
            userName: ''
        }
    },

    mounted() {
        this.getProjetos(),
            this.getGerenteseSetor()
    },

    created() {
        this.userName = localStorage.getItem('userName')
    },

    methods: {
        nomeEsobrenome(nome) {
            const nomeESobrenome = nome.split(" ");


            if (nomeESobrenome.length >= 2) {
                const primeiroNome = nomeESobrenome[0];
                const segundoNome = nomeESobrenome[1];

                if (segundoNome.length <= 3 || segundoNome == 'Paula') {
                    return `${primeiroNome} ${segundoNome} ${nomeESobrenome[2] || ''}`;
                } else {
                    return `${primeiroNome} ${segundoNome}`;
                }
            } else {
                return nome;
            }
        },

        atualizarPermissão(item) {
            var novaPermissão = {
                usuario_id: item.id,
                nivel: 1,
                nome: item.nomeCompleto
            }
            this.projetoEditado.permissao.push(novaPermissão);

            // axios.post(`http://192.168.0.6:8000/api/permissao/projeto/${this.projetoEditado.id}`, {
            //     usuarios: this.projetoEditado.permissao.filter(item => item.usuario_id !== parseInt(this.idUsuario))
            // })
            //     .then(() => {
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });

        },

        fecharLista() {
            setTimeout(() => {
                this.listaPessoasFiltrada = null;
                this.pessoaSelecionada = null;
            }, 200);
        },

        procurar() {
            if (!this.pessoaSelecionada) {
                this.listaPessoasFiltrada = this.gerente
            } else {
                if (this.listaPessoasFiltrada !== null) {
                    this.listaPessoasFiltrada = this.listaPessoasFiltrada.filter(nome => nome.nomeCompleto.toLowerCase().startsWith(this.pessoaSelecionada.toLowerCase())
                    );
                }
            }

        },

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

            axios.put(`http://192.168.0.6:8000/api/projeto/atualizar/${this.projetoEditado.id}`, {
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

        verBacklogs(id, nomeProjeto) {
            this.$router.push({ name: "sprints" })
            sessionStorage.setItem('idProjeto', id)
            sessionStorage.setItem('nomeDoProjeto', nomeProjeto)
        },

        verPainel(id, nomeProjeto) {
            this.$router.push({ name: "painel" })
            sessionStorage.setItem('idProjeto', id)
            sessionStorage.setItem('nomeDoProjeto', nomeProjeto)
        },

        verProjetos() {
            this.$router.push({ name: "ControleDeProjetos" })
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalNovoProjeto = false;
                this.modalEditarProjeto = false
                this.modalFinalizarProjeto = false
                this.modalCompartilharProjeto = false
                return this.getProjetos()
            }
        },

        getGerenteseSetor() {
            // axios.get('http://192.168.0.6:8000/api/usuario/', {
            // })
            //     .then((response) => {
            //         this.gerente = response.data
            //         this.gerente = this.gerente.map(item => ({
            //             id: item.id,
            //             nomeCompleto: item.name
            //         }))
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });

            axios.get('http://192.168.0.5:8000/api/pessoa/', {
            })
                .then((response) => {
                    this.gerente = response.data
                    this.gerente = this.gerente.map(item => ({
                        id: item.id,
                        nomeCompleto: item.nomeCompleto,
                        path_image: item.path_image
                    }))
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
.cropped1 {
    width: 50px;
    /* width of container */
    height: 50px;
    /* height of container */
    object-fit: cover;
    border: 1px solid black;
    border-radius: 50%;
}


li {
    margin-top: 0.2rem;
    cursor: pointer;
}

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