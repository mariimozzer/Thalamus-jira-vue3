<template>
    <div style="width: 100%; padding: 1rem; height: 100%;" class="container">
        <!-- TABELA 1 -->
        <div v-for="item in sprints" :key="item" class="divPaiTabela">
            <div class="divFundoTabela">
                <div class="row">
                    <div style="width: 20%;">
                        <button @click="ocultarPlano" v-if="item.id == 0 && sprints.length > 1">
                            <i style="font-size: 20px;" class="bi bi-eye-slash ocultar" id="botaoOcultar"></i>
                        </button>
                        <h5>
                            Pontos de história: {{ somarHP(item) }}
                        </h5>
                    </div>
                    <div style="width: 60%; text-align: center;">
                        <h2><input type="text" v-model="item.nome"
                                style="width: max-content; margin-left: 0.5rem; text-align: center;">
                        </h2>
                    </div>
                    <div style="width: 20%; text-align: right; justify-items: right;">
                        <span style="margin-right: 1rem;">{{ item.dtTermino }}</span>
                        <v-menu v-if="item.id != 0">
                            <template v-slot:activator="{ props }">
                                <v-btn style="width: 1.5rem; height: 1.5rem;" icon="mdi-dots-horizontal"
                                    v-bind="props"></v-btn>
                            </template>

                            <v-list>
                                <v-list-item>
                                    <button style="margin: 0.2rem;" @click="abrirModalIniciarSprint(item.id)">{{
                                        item.dtTermino == null ? 'Iniciar Sprint' : 'Finalizar Sprint' }}
                                    </button><br />
                                    <v-menu>
                                        <template v-slot:activator="{ props }">
                                            <button style="color: red;margin: 0.2rem;" v-bind="props">Excluir
                                                Sprint</button>
                                        </template>

                                        <v-list>
                                            <v-list-item>
                                                <div>
                                                    <h4>Tem certeza? Esta ação é Irreversível!</h4>
                                                    <p>Ao excluir esta sprint, todos os backlogs contidos nela também
                                                        serão excluídos.</p>
                                                    <div style="display: flex; width: 100%;">
                                                        <Button @click="apagarSprint(item.id)"
                                                            style="border: 1px solid black; width: 50%; background-color: red; color: white;">Excluir</Button>
                                                        <button
                                                            style="border: 1px solid black; width: 50%; margin-left: 0.5rem; background-color: green; color: white;">Cancelar</button>
                                                    </div>
                                                </div>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <div :id="item.id" style="width: 100%; display: flex; flex-flow: column; padding-right: 0.5rem;">
                    <div
                        style="width: 100%;display: flex ;border-bottom: 1px solid black; margin-bottom: 0.5rem; padding-bottom: 0.5rem ;align-items: center;">

                        <div style="width:10%; text-align: center;">
                            <strong>
                                <label style="width: 100%">Item</label>
                            </strong>
                        </div>

                        <div style="width: 45%; padding-left: 0.5rem; padding-right: 1rem">
                            <strong>
                                <input type="text" style="width:100%; outline: none; text-align: center;" value="Descrição">
                            </strong>
                        </div>

                        <div style="width: 3rem; text-align: center;">
                            <strong>
                                <select
                                    style="width: 5rem%; text-align: center; padding-left: 0.2rem; padding-right: 0.2rem;">
                                    <option selected>H.P.</option>
                                </select>
                            </strong>
                        </div>

                        <div style="width: 10%;">
                            <strong>
                                <select style="width: 100%; outline: none; text-align: center;">
                                    <option selected>Responsável</option>
                                </select>
                            </strong>
                        </div>

                        <div style="width:10%;">
                            <strong>
                                <input style="width: 100%; outline: none; text-align: center;" type="text" class="data"
                                    value="Inicio Previsto">
                            </strong>
                        </div>

                        <div style="width: 10%;">
                            <strong>
                                <input style="width: 100%; outline: none; text-align: center;" type="text" class="data"
                                    value="Fim Previsto">
                            </strong>
                        </div>

                        <div style="width: 10%; margin-right: 0.3rem; margin-left: 0.3rem;">
                            <strong>
                                <select style="width:100%; outline: none; text-align: center;">
                                    <option selected>Status</option>
                                </select>
                            </strong>
                        </div>

                        <div style="width: 1.5rem; height: 1.5rem;">

                        </div>

                    </div>
                    <draggable :list=item.backlogs group="backlogs" itemKey="id">
                        <template #item="{ element }">
                            <div @mouseover="mostrarBotao(element.id, true)" @mouseleave="mostrarBotao(element.id, false)"
                                style="width: 100%;display: flex ;border-bottom: 1px solid black; margin-bottom: 0.5rem; padding-bottom: 0.5rem ;align-items: center;">

                                <div style="width:10%; text-align: center;">
                                    <label style="width: 100%">{{ element.codigo }}</label>
                                </div>

                                <div style="width: 45%; padding-left: 0.5rem; padding-right: 1rem">
                                    <input :disabled="desativarEdicao" type="text" v-model="element.descricao"
                                        style="width:100%; outline: none;">
                                </div>

                                <div style="width: 3rem; text-align: center;">
                                    <select v-model="element.HP"
                                        style="width: 5rem%; text-align: center; border: 1px solid black; border-radius: 50px; padding-left: 0.2rem; padding-right: 0.2rem;">
                                        <option hidden>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>5</option>
                                        <option>8</option>
                                        <option>13</option>
                                        <option>21</option>
                                        <option>34</option>
                                        <option>55</option>
                                        <option>89</option>
                                        <option>144</option>
                                        <option>233</option>
                                    </select>
                                </div>

                                <div style="width: 10%;">
                                    <select v-model="element.responsavel"
                                        style="width: 100%; outline: none; text-align: center;">
                                        <option hidden>--</option>
                                        <option>Darley Dias</option>
                                        <option>Mariana Mozzer</option>
                                        <option>Lucas Lima</option>
                                        <option>Natalie Costa</option>
                                        <option>Artur Wilson</option>
                                        <option>Raul Wilson</option>
                                    </select>
                                </div>

                                <div style="width:10%;">
                                    <input style="width: 100%; outline: none; text-align: center;" type="date"
                                        v-model="element.dtInicio">
                                </div>

                                <div style="width: 10%;">
                                    <input style="width: 100%; outline: none; text-align: center;" type="date"
                                        v-model="element.dtFim">
                                </div>

                                <div style="width: 10%; margin-right: 0.3rem; margin-left: 0.3rem;">
                                    <select style="width: 100%; outline: none; text-align: center;"
                                        @change="definirInicioFimReal(element.id, item.id, $event.target.value)"
                                        v-model="element.status">
                                        <option>Pendente</option>
                                        <option>Em andamento</option>
                                        <option>Concluído</option>
                                    </select>
                                </div>

                                <div style="width: max-content; visibility: hidden;" :id="'botaoEdicao' + element.id">
                                    <v-menu>
                                        <template v-slot:activator="{ props }">
                                            <v-btn style="width: 1.5rem; height: 1.5rem;" icon="mdi-dots-horizontal"
                                                v-bind="props"></v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item>
                                                <button style="margin: 0.2rem;"
                                                    @click="editarBacklog(element.id, item.id, false)">Editar
                                                    Tarefa</button><br />
                                                <v-menu>
                                                    <template v-slot:activator="{ props }">
                                                        <button style="color: red;margin: 0.2rem;" v-bind="props">Excluir
                                                            Tarefa</button>
                                                    </template>

                                                    <v-list>
                                                        <v-list-item>
                                                            <div>
                                                                <h4>Tem certeza? Esta ação é Irreversível!</h4>
                                                                <div style="display: flex; width: 100%;">
                                                                    <Button @click="apagarBacklog(element.id, item.id)"
                                                                        style="border: 1px solid black; width: 50%; background-color: red; color: white;">Excluir</Button>
                                                                    <button
                                                                        style="border: 1px solid black; width: 50%; margin-left: 0.5rem; background-color: green; color: white;">Cancelar</button>
                                                                </div>
                                                            </div>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </div>

                            </div>
                        </template>
                    </draggable>

                    <div style="display: flex; padding-left: 0.2rem; border-radius: 5px; width: 100%;" :id="item.id">
                        <div style="border: 1px solid black; border-radius: 5px; padding: 0.3rem;">
                            <input style="width: 5rem;" type="text" disabled
                                :placeholder="'Tarefa - ' + (this.sprints[0].ultimoBacklog + 1)">
                        </div>
                        <div
                            style="border: 1px solid black; border-radius: 5px; width: 100%; margin-left: 0.3rem; padding: 0.3rem;">
                            <input type="text" placeholder="O que será feito?"
                                @keyup.enter="criarBacklog(item.id, $event.target.value), $event.target.value = ''"
                                style="width: 100%; padding: 0.1rem; padding-left: 0.5rem; outline: none;">
                        </div>
                    </div>
                </div>
                <div style="text-align: center; display: none;" id="pontos" @click="ocultarPlano" class="ocultar">
                    <i class="bi bi-grip-horizontal"></i>
                </div>
            </div>

            <div v-if="item.nome == 'Plano de ação'" class="row"
                style="border-bottom: 2px rgb(56, 56, 56) solid; margin-bottom: 1rem; border-radius: 1px; width: 100%;display: flex;flex-flow: row; align-items: center;">
                <button style="width: max-content; font-size: 25px; position: absolute;" @click="criarNovaSprint">
                    <i class="bi bi-plus-square"></i></button>

                <h1 style="text-align: center; margin-bottom: 1rem;">Sprints</h1>
            </div>
        </div>


    </div>


    <!-- MODAL INICIAR SPRINT-->
    <div class="modal-mask" v-if="showIniciarSprint" @click="fecharModalFora">
        <div class="modal-container" style="height: min-content; width: 50rem;">
            <div style="display: flex; justify-content: right;">
                <button type="button" class="btn-close" aria-label="Close" @click="fecharModal"></button>
            </div>

            <div style="width: 100%;">
                <div>
                    <label>Data de Entrega</label>
                    <input :class="{ shake: disabled }" v-model="dataTermino" id="dataTermino" class="form-control"
                        type="date">
                </div>

                <!-- <div style="margin-top: 1rem;">
                    <label>Objetivo</label>
                    <textarea class="form-control"></textarea>
                </div> -->

                <div style="margin-top: 1rem;">
                    <button class="button-default" @click="iniciarSprint()"><i class="fa-solid fa-circle-plus"></i>&nbsp;
                        Iniciar Sprint</button>
                </div>
            </div>

        </div>
    </div>
    <!--END MODAL SPRINT-->

    <!-- MODAL EDITAR BACKLOG-->
    <div class="modal-mask" v-if="showEditarBacklog" @click="fecharModalFora">
        <div style="height: max-content; width: 50rem; background-color: white; padding: 2rem; border-radius: 5px;">

            <div style="display: flex; justify-content: space-between;">
                <div>
                    <h2>
                        {{ backlogeditado.codigo }}
                    </h2>
                    <textarea class="form-control" v-model="backlogeditado.descricao" style="width: 30rem;"></textarea>
                </div>
                <div style="width: min-content;margin-top: 1rem;">
                    <h4>
                        Responsável:
                    </h4>
                    <select v-model="backlogeditado.responsavel"
                        style="width: max-content; text-align: center; border: 1px solid; border-radius: 5px; font-size: larger;">
                        <option hidden>--</option>
                        <option>Darley Dias</option>
                        <option>Mariana Mozzer</option>
                        <option>Lucas Lima</option>
                        <option>Natalie Costa</option>
                        <option>Artur Wilson</option>
                        <option>Raul Wilson</option>
                    </select>
                </div>
            </div>

            <div style="display: flex; margin-top: 1rem;">
                <div>
                    <label>Inicio Previsto:</label>
                    <input v-model="backlogeditado.dtInicio" class="form-control" type="date" style="width: min-content;">
                </div>
                <div style="margin-left: 1rem;">
                    <label>Fim Previsto:</label>
                    <input v-model="backlogeditado.dtFim" class="form-control" type="date" style="width: min-content;">
                </div>
            </div>

            <div style="display: flex; margin-top: 1rem;">
                <div>
                    <label>Inicio Real:</label>
                    <input v-model="backlogeditado.dtInicioReal" class="form-control" type="date"
                        style="width: min-content;">
                </div>
                <div style="margin-left: 1rem;">
                    <label>Fim Real:</label>
                    <input v-model="backlogeditado.dtFimReal" class="form-control" type="date" style="width: min-content;">
                </div>
            </div>

            <div style="margin-top: 1rem;">
                <button class="button-default" @click="salvarBacklogEditado(backlogeditado.id)">Salvar</button>
            </div>

        </div>
    </div>
    <!--END MODAL EDTIRAR-->

    <br><br><br><br>
</template>

<script>
import draggable from "@/vuedraggableVue";

export default {
    components: {
        draggable
    },

    name: "SprintsView",

    data() {
        return {
            disabled: false,
            showEditarBacklog: false,
            showIniciarSprint: false,
            showConfirmação: false,
            teste: ".",
            desativarEdicao: true,
            sprints: [{
                id: 0,
                nome: "Plano de ação",
                backlogs: [],
                ultimoBacklog: 0,
                dtTermino: null
            }
            ],
            novaSprint: {
                id: null,
                nome: "",
                backlogs: [],
                dtTermino: null
            },
            idSprint: null,
            dataTermino: null,
            mostrarPlano: true,
            backlogeditado: null,
            idSprintBacklogEditado: null,
        }
    },
    mounted() {
        this.getBacklogs()
    },
    watch: {
        sprints: {
            handler: 'atualizarLocalStore',  // Chama a função atualizarLocalStore quando sprints é alterado
            deep: true,  // Observa mudanças profundas no array (necessário se houver alterações nos elementos do array)
        },
    },
    methods: {
        mostrarBotao(id, mostrar) {
            if (mostrar == true) {
                document.getElementById('botaoEdicao' + id).style.visibility = ''
            }
            if (mostrar == false) {
                document.getElementById('botaoEdicao' + id).style.visibility = 'hidden'
            }
        },

        getBacklogs() {
            if (localStorage.getItem('sprints') == null) {
                var localData = JSON.stringify(this.sprints);
                localStorage.setItem('sprints', localData)
            } else {
                this.sprints = JSON.parse(localStorage.getItem('sprints'))
            }

        },

        atualizarLocalStore() {
            localStorage.clear()
            var localData = JSON.stringify(this.sprints)
            localStorage.setItem('sprints', localData)
        },

        definirInicioFimReal(idBacklog, idSprint, status) {
            let sprint = this.sprints.find(sprint => sprint.id === idSprint);
            let backlog = sprint.backlogs.find(backlog => backlog.id === idBacklog);
            let data = new Date()
            let ano = data.getFullYear();
            let mes = (data.getMonth() + 1);
            if (mes < 10) {
                mes = "0" + mes
            }
            let dia = data.getDate();
            if (dia < 10) {
                dia = "0" + dia
            }
            data = ano + '-' + mes + '-' + dia

            if (status == "Em andamento") {
                backlog.dtInicioReal = data
            } else {
                if (status == "Concluído") {
                    backlog.dtFimReal = data
                } else {
                    if (status == "Pendente") {
                        backlog.dtInicioReal = '0000-00-00'
                    }
                }
            }

            this.atualizarLocalStore()
        },

        salvarBacklogEditado(idBacklogEditado) {
            let sprint = this.sprints.find(sprint => sprint.id === this.idSprintBacklogEditado);

            sprint.backlogs = sprint.backlogs.filter(item => item.id !== idBacklogEditado);
            sprint.backlogs.push(this.backlogeditado);
            sprint.backlogs.sort((a, b) => a.id - b.id);
            this.showEditarBacklog = false

            this.atualizarLocalStore()
        },

        editarBacklog(idBacklog, idSprint) {
            this.showEditarBacklog = true;

            let sprint = this.sprints.find(sprint => sprint.id === idSprint);

            this.backlogeditado = sprint.backlogs.find(backlog => backlog.id === idBacklog);
            this.idSprintBacklogEditado = sprint.id

            this.atualizarLocalStore()
        },

        ocultarPlano() {
            if (this.mostrarPlano == true) {
                document.getElementById("botaoOcultar").className = "bi bi-eye";
                document.getElementById(0).style.display = "none";
                document.getElementById('pontos').style.display = "";
                this.mostrarPlano = false
            } else {
                document.getElementById("botaoOcultar").className = "bi bi-eye-slash";
                document.getElementById(0).style.display = "";
                document.getElementById('pontos').style.display = "none";
                this.mostrarPlano = true
            }
        },

        moverBacklog(idBacklog) {
            if (this.sprints.length > 1) {
                let backlog = this.sprints[0].backlogs.find(backlog => backlog.id === idBacklog);
                this.sprints[1].backlogs.push(backlog);
                this.sprints[0].backlogs = this.sprints[0].backlogs.filter(item => item.id !== idBacklog);
                this.sprints[1].backlogs.sort((a, b) => a.id - b.id);
            } else {
                this.criarNovaSprint();
                let backlog = this.sprints[0].backlogs.find(backlog => backlog.id === idBacklog);
                this.sprints[1].backlogs.push(backlog);
                this.sprints[0].backlogs = this.sprints[0].backlogs.filter(item => item.id !== idBacklog);
                this.sprints[1].backlogs.sort((a, b) => a.id - b.id);

                this.disabled = true
                setTimeout(() => {
                    this.disabled = false
                }, 1500)
            }
            this.atualizarLocalStore()
        },

        somarHP(dados) {
            let soma = 0;

            if (dados.backlogs) {
                dados.backlogs.forEach(backlog => {
                    if (backlog.HP) {
                        soma += parseInt(backlog.HP);
                    }
                });
            }

            return soma;
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.showEditarBacklog = false;
                this.showIniciarSprint = false;
                this.showConfirmação = false;

            }

        },

        abrirModalSprint() {
            this.showCriarSprint = true
        },

        fecharModal() {
            this.showIniciarSprint = false;
        },

        abrirModalIniciarSprint(id) {
            this.idSprint = id
            this.showIniciarSprint = true;
        },

        iniciarSprint() {
            if (this.dataTermino == null) {
                document.getElementById('dataTermino').style.border = '1px solid red';
                this.disabled = true
                setTimeout(() => {
                    this.disabled = false
                }, 1500)
                return
            }
            const sprint = this.sprints.find(item => item.id == this.idSprint);
            const dia = this.dataTermino.slice(8);
            const mes = this.dataTermino.slice(5).slice(0, 2);
            const ano = this.dataTermino.slice(0, 4);

            sprint.dtTermino = `Fim previsto: ${dia}/${mes}/${ano}`
            this.dataTermino = null;
            this.idSprint = null;
            this.fecharModal()

        },

        criarNovaSprint() {
            if (this.sprints[this.sprints.length - 1].nome != "Plano de ação") {
                this.novaSprint.nome = 'Sprint - ' + (parseInt((this.sprints[1].nome.slice(8))) + 1);
                this.novaSprint.id = (this.sprints[1].id) + 1;
            } else {
                this.novaSprint.nome = 'Sprint - 1';
                this.novaSprint.id = 1
            }
            this.sprints.push(this.novaSprint);
            this.novaSprint = {
                id: 0,
                nome: "",
                backlogs: [],
                dtTermino: null
            },
                this.sprints.sort((a, b) => {
                    if (a.nome === "Plano de ação") {
                        return -1; // Move "Plano de ação" para o início
                    } else if (b.nome === "Plano de ação") {
                        return 1; // Move "Plano de ação" para o início
                    } else {
                        return b.id - a.id; // Ordena os demais elementos pelo id de forma descendente
                    }
                });

            this.atualizarLocalStore()
        },

        criarBacklog(id, descricao) {
            let sprint = this.sprints.find(sprint => sprint.id === id);
            let novoBacklog = {
                id: "",
                codigo: "",
                descricao: "",
                HP: 0,
                responsavel: "--",
                status: "Pendente",
                dtInicio: "",
                dtFim: "",
                dtInicioReal: "0000-00-00",
                dtFimReal: "0000-00-00",
            };

            novoBacklog.codigo = 'Tarefa - ' + (this.sprints[0].ultimoBacklog + 1);
            novoBacklog.id = this.sprints[0].ultimoBacklog + 1
            novoBacklog.descricao = descricao;
            sprint.backlogs.push(novoBacklog);

            this.sprints[0].ultimoBacklog = this.sprints[0].ultimoBacklog + 1

            this.atualizarLocalStore()
        },

        apagarBacklog(idBacklog, idSprint) {
            let sprint = this.sprints.find(sprint => sprint.id === idSprint);

            sprint.backlogs = sprint.backlogs.filter(item => item.id !== idBacklog);

            this.atualizarLocalStore()
        },

        apagarSprint(id) {
            this.sprints = this.sprints.filter(item => item.id !== id);
            this.atualizarLocalStore()
        }

    }
}
</script>

<style>
.divFundoTabela {
    border: 1px solid black;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%;
}

.divPaiTabela {
    display: flex;
    flex-flow: column;
    align-items: center;
}

.ocultar:hover {
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

.data:hover {
    cursor: default;
}

.data {
    text-align: right;
}

.data:disabled {
    color: black;
}

.custom-select-disabled {
    color: rgb(0, 255, 0);
}

select:disabled {
    color: black;
}

select {
    color: black;
    cursor: pointer;
}

input:disabled {
    color: black;
}

.apagar:hover {
    transform: scale(1.1);

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

.modal-container {
    background-color: #fff;
    border-radius: 8px;
    padding: 100px;
    width: 90%;
    max-width: 1500px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
}
</style>