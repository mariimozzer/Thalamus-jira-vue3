<template>
    <br>
    <br><br><br>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div class="input-group mb-3" style="width: 20rem; position: absolute;">
                        <span class="input-group-text" id="basic-addon1"><i
                                class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" placeholder="Pesquisar Programa" aria-label="Username"
                            aria-describedby="basic-addon1" v-model="programaSelecionado" @input="filtrarProgramas()">
                    </div>

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Programas</h3>
                    </div>
                    <button :title="'Adicionar Programa'" style="width: max-content; font-size: 30px;"
                        @click="this.modalNovoPrograma = true" class="botaoAdicionarSprint">
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
                                <th scope="col">Nome do Programa</th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de Inicio</th>
                                <th scope="col">Data de Término</th>
                                <th scope="col">Gerente Responsável</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in listaProgramasFiltrada" style="text-align: center;" :key="item.id"
                                @mouseover="mostrarBotao(item.id, true)" @click="programasAssociados(item.id)"
                                @mouseleave="mostrarBotao(item.id, false)">
                                <td style="vertical-align: middle;">{{ item.nome }}</td>
                                <td style="vertical-align: middle;"><select v-model="item.status" class="form-select"
                                        :style="{ 'color': (item.status == 'Pendente') ? 'rgb(255, 145, 0)' : (item.status == 'Em andamento') ? 'rgb(0, 47, 255)' : (item.status == 'Concluído') ? 'rgb(0, 192, 0)' : 'red', }"
                                        style="width: 10rem; outline: none; text-align: center; border: none; background-color: transparent; "
                                        @click.stop @change="editarProgramaInline(item.id, 'status', item.status)">
                                        <option style="color: red;">Proposto</option>
                                        <option style="color: rgb(255, 145, 0);">Pendente</option>
                                        <option style="color: rgb(0, 47, 255);">Em andamento</option>
                                        <option style="color: rgb(0, 192, 0);">Concluído</option>
                                    </select></td>
                                <td style="vertical-align: middle;">
                                    <input v-if="item.dtInicio" style="text-align: center;" type="date"
                                        :value="formatarDataHora(item.dtInicio)" disabled>
                                </td>
                                <td style="vertical-align: middle;">
                                    <input v-if="item.dtFim" style="text-align: center;" type="date"
                                        :value="formatarDataHora(item.dtFim)" disabled>
                                    <strong v-if="!item.dtFim">-</strong>
                                </td>
                                <td style="vertical-align: middle;">{{ item.gerente_nome }}</td>
                                <td style="vertical-align: middle;">
                                    <div style="width: max-content; visibility: hidden;" :id="'botaoEdicao' + item.id">
                                        <v-menu v-if="Array.isArray(programas) && programas.length > 0">
                                            <template v-slot:activator="{ props }">
                                                <v-btn style="width: 1.6rem; height: 1.6rem; border: 1px solid black;"
                                                    class="botaoAdicionarSprint" icon="mdi-dots-horizontal"
                                                    v-bind="props"></v-btn>
                                            </template>

                                            <v-list>
                                                <v-list-item
                                                    @click="modalEditarPrograma = true, this.programaEditado = item, this.programaEditado.dtFim !== null ? this.programaEditado.dtFim = this.programaEditado.dtFim.slice(0, 10) : '', this.programaEditado.dtInicio !== null ? this.programaEditado.dtInicio = this.programaEditado.dtInicio.slice(0, 10) : ''">
                                                    Editar
                                                </v-list-item>
                                                <v-list-item
                                                    @click="modalFinalizarPrograma = true, this.programaEditado = item">
                                                    Finalizar
                                                </v-list-item>
                                                <v-list-item
                                                    @click="modalExcluirPrograma = true, this.programaEditado = item">
                                                    Excluir
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

    <!-- MODAL FINALIZAR PROGRAMAS-->

    <div class="modal-mask" v-if="modalFinalizarPrograma" @click="fecharModalFora">
        <div class="modal-container" style="height: min-content; width: 50rem;">
            <div style="display: flex; justify-content: center">
                <h5>{{ programaEditado.nome }}</h5>
            </div>
            <br>

            <div style="width: 100%;">
                <div>
                    <label>Data de término do programa:</label>
                    <input :class="{ shake: disabled }" v-model="dataTerminoPrograma" id="dataTermino"
                        class="form-control" type="date">
                </div>
                <div style="margin-top: 1rem;">
                    <button class="button-default" @click="finalizarPrograma()">
                        Finalizar Programa</button>
                </div>
            </div>

        </div>
    </div>

    <!-- END MODAL FINALIZAR PROGRAMAS-->

    <!-- MODAL EXCLUIR PROGRAMAS -->

    <div style="overflow: auto" class="modal-mask" v-if="modalExcluirPrograma" @click="fecharModalFora">
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; "
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h6 class="titulo">Deseja excluir o programa {{ programaEditado.nome }}?</h6>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn button-cancel"
                        @click="fecharModalExcluirPrograma">Cancelar</button>
                    &nbsp;&nbsp;
                    <button type="button" class="btn btn-primary" @click="excluirPrograma"
                        data-bs-dismiss="modal">Confirmar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL EXCLUIR PROGRAMAS -->


    <!-- MODAL EDITAR PROGRAMAS -->

    <div style="overflow: auto" class="modal-mask" v-if="modalEditarPrograma" @click="fecharModalFora">
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; "
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Editar: {{ programaEditado.nome }} </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.getProgramas, this.modalEditarPrograma = false"></button>
                </div>
                <hr>
                <br>
                <div style="display: flex; width: 100%;">
                    <div style="display: flex; flex-flow: column; width: 50%">
                        <div class="form-group">
                            <label for="nome">Nome do Projeto</label>
                            <input id="nome" type="text" v-model="programaEditado.nome" class="form-control"
                                @focusout="editarPrograma('nome', programaEditado.nome)">
                        </div>

                        <div class="form-group">
                            <label for="gerente">Gerente Responsável</label>
                            <select id="gerente" v-model="programaEditado.gerente_nome" class="form-select">
                                <option v-for="item in gerente" :key="item.id" :value="item.nomeCompleto">
                                    {{ item.nomeCompleto }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; flex-flow: column; width: 50%;">

                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                            <label for="data">Data de Início</label>
                            <input id="data" type="date" ref="dtInicio" v-model="programaEditado.dtInicio"
                                class="form-control" @change="editarPrograma('dtInicio', $event.target.value)">
                            <label for="data" style="margin-top: 1rem;">Data de Término</label>
                            <input id="data" type="date" ref="dtFim" v-model="programaEditado.dtFim"
                                class="form-control" @change="editarPrograma('dtFim', $event.target.value)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- END EDITAR PROGRAMAS MODAL  -->

    <!-- MODAL ASSOCIAÇÃO -->

    <div class="modal-mask" v-if="modalProjetosAssociados" @click="fecharModalFora">
        <div style="height: fit-content;width: 70rem; padding: 3rem; margin-bottom: 2rem;" class="modal-container">
            <div style="display: flex; justify-content: space-between;">
                <!-- Coluna de Projetos associados -->
                <div style="width: 48%;">
                    <h5>Projetos disponíveis:</h5>
                    <select id="projetos" class="form-select" @change="associarProjeto($event)">
                        <option hidden selected>Selecione um projeto</option>
                        <option v-for="item in projetos" :key="item.id" :value="item.id">{{ item.nome }}</option>
                    </select>
                    <div v-if="programaEditado.projeto.length > 0">
                        <br>
                        <h5>Projetos associados:</h5>
                        <ul style="height: 5rem; list-style: none;">
                            <!-- <li    style="display: flex; border: 1px solid black; align-items: center; justify-content: space-between; padding: 5px; border-radius: 10px; width: 90%;"  -->
                            <li v-for="(projeto, index) in programaEditado.projeto" :key="index"> {{
                                projeto.projeto_nome }}
                                <span @click="desassociarPlano('projeto', projeto.associacao_id)"
                                    style="cursor: pointer; color: red; text-align: right;"
                                    class="bi bi-dash-circle"></span>
                            </li>
                        </ul>
                        <br><br>
                    </div>
                    <div v-else>
                        <p>Nenhum projeto associado.</p>
                    </div>

                </div>

                <!-- Coluna de Planos de Ação associados -->

                <div style="width: 48%;">
                    <h5>Planos de ação disponíveis:</h5>
                    <select id="planosAcao" class="form-select" @change="associarPlanoAcao($event)">
                        <option hidden selected>Selecione um plano de ação</option>
                        <option v-for="item in planosAcao" :key="item.id" :value="item.id">{{ item.nome }}</option>
                    </select>


                    <div v-if="programaEditado.planoAcao.length > 0">

                        <br>
                        <h5>Planos de Ação associados:</h5>
                        <ul style="height: 5rem; list-style: none;">
                            <li v-for="(plano, index) in programaEditado.planoAcao" :key="index"> {{
                                plano.planoAcao_nome
                            }} <span @click="desassociarPlano('plano', plano.associacao_id)"
                                    class="bi bi-dash-circle"
                                    style="cursor: pointer; color: red; text-align: right;"></span>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>Nenhum plano de ação associado.</p>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- END MODAL ASSOCIAÇÃO -->



    <!-- MODAL NOVO PROGRAMA -->

    <div style="overflow: auto" class="modal-mask" v-if="modalNovoPrograma" @click="fecharModalFora">
        <div style="max-height: 80%; width: 70%; padding: 3rem; " class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Cadastrar Programa </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.modalNovoPrograma = false"></button>
                </div>
                <hr>
                <br>
                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="nome">Nome do Programa</label>
                        <input id="nome" v-model="novoPrograma.nome" type="text" class="form-control">
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="data">Data de Início</label>
                        <input id="data" v-model="novoPrograma.dtInicio" type="date" ref="dtInicio"
                            class="form-control">
                    </div>
                </div>
                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="gerente">Gerente Responsável</label>
                        <select id="gerente" v-model="novoPrograma.gerente_id" class="form-select">
                            <option v-for="item in gerente" :key="item.id" :value="item.id">
                                {{ item.nomeCompleto }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="data">Data de Término</label>
                        <input id="data" v-model="novoPrograma.dtFim" type="date" ref="dtFim" class="form-control">
                    </div>
                </div>
                <div style="display: flex; justify-content: right;">
                    <button @click="adicionarPrograma" style="height: 2.5rem;"
                        class="btn btn-primary float-right mr-2">Salvar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- END MODAL NOVO PROGRAMA -->

</template>


<script>
import { devURL } from '../../services/api'
import { prodURL } from '../../services/api'
import axios from 'axios'

export default {
    name: "ControleProgramas",

    data() {
        return {
            programaSelecionado: null,
            listaProgramasFiltrada: null,

            modalProjetosAssociados: false,
            modalNovoPrograma: false,
            modalExcluirPrograma: false,
            programas: [],
            novoPrograma: {
                "nome": '',
                "status": '',
                "dtInicio": new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                "gerente_nome": '',
                "dtFim": ''
            },
            devURL: devURL,
            prodURL: prodURL,
            gerente: [],
            modalEditarPrograma: false,
            programaEditado: null,
            projetos: [],
            planosAcao: [],
            dataTerminoPrograma: null,
            modalFinalizarPrograma: false

        }
    },

    mounted() {
        this.getProgramas()
        this.getGerente()
        this.getProjetosPlanoAcao()
    },

    methods: {

        finalizarPrograma() {
            if (this.dataTerminoPrograma == null) {
                document.getElementById('dataTermino').style.border = '1px solid red';
                this.disabled = true
                setTimeout(() => {
                    this.disabled = false
                }, 1500)
                return
            }
            axios.put(`${this.prodURL}/programa/atualizar/${this.programaEditado.id}`, {
                dtFim: this.dataTerminoPrograma,
                status: "Concluído"
            })
            this.modalFinalizarPrograma = false;
            setTimeout(() => {
                this.getProgramas();
            }, 500)

        },

        filtrarProgramas() {
            if (!this.programaSelecionado) {
                this.listaProgramasFiltrada = this.programas;
            } else {
                const textoLowerCase = this.programaSelecionado.toLowerCase();
                this.listaProgramasFiltrada = this.programas.filter(programa => {
                    return programa.nome.toLowerCase().includes(textoLowerCase);
                });
            }
        },

        formatarDataHora(valor) {
            if (valor) {
                return valor.slice(0, 10)
            } else {
                return ''
            }
        },

        fecharModalExcluirPrograma() {
            this.modalExcluirPrograma = false;
        },

        excluirPrograma() {
            const userId = localStorage.getItem('id')

            axios.put(`${this.prodURL}/programa/excluir/${this.programaEditado.id}`, {
                usuario_id: userId
            })
                .then(() => {
                    this.getProgramas();
                    this.modalExcluirPrograma = false;
                })
                .catch((error) => {
                    console.error('Erro ao excluir programa:', error);
                });
        },


        associarProjeto(event) {
            const projetoId = event.target.value;
            axios.post(`${this.prodURL}/programa/associar/${this.programaEditado.id}`, {
                id: projetoId,
                projeto: 1
            })
                .then((response) => {
                    this.programaEditado.projeto.push({
                        associacao_id: response.data.associacao_id,
                        projeto_nome: event.target.options[event.target.selectedIndex].text

                    }

                    ); this.getProjetosPlanoAcao()

                })
                .catch((error) => {
                    console.error('Erro ao associar projeto:', error);
                });
        },


        associarPlanoAcao(event) {
            const planoAcaoId = event.target.value;
            axios.post(`${this.prodURL}/programa/associar/${this.programaEditado.id}`, {
                id: planoAcaoId,
                projeto: 0
            })
                .then((response) => {
                    this.programaEditado.planoAcao.push({
                        associacao_id: response.data.associacao_id,
                        planoAcao_nome: event.target.options[event.target.selectedIndex].text
                    });
                    this.getProjetosPlanoAcao()



                })
                .catch((error) => {
                    console.error('Erro ao associar plano de ação:', error);
                });
        },

        desassociarPlano(tipo, id) {
            axios.post(`${this.prodURL}/programa/associar/excluir/${this.programaEditado.id}`, {
                id: id,
                projeto: tipo === 'projeto' ? 1 : 0
            })
                .then(() => {
                    if (tipo === 'projeto') {
                        this.programaEditado.projeto = this.programaEditado.projeto.filter(plano => plano.associacao_id !== id);
                        this.getProjetosPlanoAcao()

                    } else {
                        this.programaEditado.planoAcao = this.programaEditado.planoAcao.filter(plano => plano.associacao_id !== id);
                        this.getProjetosPlanoAcao()

                    }
                })
                .catch((error) => {
                    console.error(`Erro ao desassociar ${tipo === 'projeto' ? 'projeto' : 'plano de ação'}:`, error);
                });

            this.getProjetosPlanoAcao()
        },


        getProjetosPlanoAcao() {
            axios.get(`${this.prodURL}/planoacao-projeto/listar/sem-programa`)
                .then((response) => {
                    const data = response.data;
                    this.projetos = data.projeto;
                    this.planosAcao = data.planoAcao;
                })
                .catch((error) => {
                    console.error('Erro', error);
                });
        },

        programasAssociados(id) {
            axios.get(`${this.prodURL}/programa/buscar/${id}`)
                .then(response => {
                    this.programaEditado = response.data;
                    this.modalProjetosAssociados = true;

                })
                .catch(error => {
                    console.error('Erro ao obter detalhes do programa:', error);
                });
        },

        mostrarBotao(id, mostrar) {
            if (mostrar == true) {
                document.getElementById('botaoEdicao' + id).style.visibility = ''
            }
            if (mostrar == false) {
                document.getElementById('botaoEdicao' + id).style.visibility = 'hidden'
            }
        },

        editarPrograma(itemAlterado, novoValor) {
            axios.put(`${this.prodURL}/programa/atualizar/${this.programaEditado.id}`, {
                [itemAlterado]: novoValor,
            })
        },


        editarProgramaInline(idProjeto, itemAlterado, novoValor) {

            if (novoValor !== "Concluído") {
                axios.put(`${this.prodURL}/programa/atualizar/${idProjeto}`, {
                    [itemAlterado]: novoValor,
                    dtTermino: null
                })
                    .then(() => {
                        this.getProgramas()
                    })
            }
            if (novoValor == "Concluído") {
                var dataAtual = new Date().toISOString().split('T')[0];
                axios.put(`${this.prodURL}/programa/atualizar/${idProjeto}`, {

                    [itemAlterado]: novoValor,
                    dtFim: dataAtual
                })
                    .then(() => {
                        this.getProgramas()
                    })
            }
        },

        adicionarPrograma() {
            axios.post(`${this.prodURL}/programa/cadastrar`, {
                nome: this.novoPrograma.nome,
                dtInicio: this.novoPrograma.dtInicio,
                dtFim: this.novoPrograma.dtFim,
                gerente_id: this.novoPrograma.gerente_id,
                setor_id: this.novoPrograma.setor_id,
                status: "Proposto"
            })

                .then((response) => {
                    this.getProgramas();
                    this.modalNovoPrograma = false;
                    this.novoPrograma = {
                        "nome": "",
                        "dtInicio": new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                        "gerente_id": "",
                        "setor_id": "",
                        "dtFim": ""
                    };
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });

        },

        getProgramas() {
            axios.get(`${this.prodURL}/programa/listar`, {})
                .then((response) => {
                    this.programas = response.data;
                    this.filtrarProgramas()
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getGerente() {
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
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalProjetosAssociados = false;
                this.modalNovoPrograma = false
                this.modalEditarPrograma = false
                this.modalExcluirPrograma = false
                this.modalFinalizarPrograma = false
            }
        },

        verPCM() {
            this.$router.push({ name: "PCM" })
        },
        verPCMvazio() {
            this.$router.push({ name: "PCMv" })
        },
    }

}
</script>

<style scoped>
input:disabled{
    color:black
}
select:disabled{
    color:black
}
.fa-solid {
    margin-left: 0rem !important;
}

@media (max-width: 1800px) {
    .container {
        margin-left: 12rem !important;
        max-width: 1100px !important;
    }

    .botaoHome {
        font-size: 30px;
        margin-left: 6rem !important;
        cursor: pointer;
        position: absolute;
    }
}

.modal-container {
    max-height: 80%;
    width: 70%;
    padding: 3rem;
    overflow-y: auto;
    background-color: white;
    border-radius: 20px;
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