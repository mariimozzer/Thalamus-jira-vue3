<template>
    <div style="width: 100%; padding: 2rem;">
        <div class="row" style="border-bottom: 2px rgb(56, 56, 56) solid; margin-bottom: 1rem; border-radius: 1px;">

            <div style="display: flex;">
                <div style="width: 100%;">
                    <h3 style="text-align: center; margin: 0;">Sprints</h3>
                </div>
                <button style="width: max-content; font-size: 25px; display: flex;" @click="criarNovaSprint">
                    <i class="bi bi-plus-square" :class="{ shake: disabled }"></i></button>
            </div>
            <br><br>
        </div>


        <!-- TABELA 1 -->
        {{ teste }}
        <div style="border: 1px solid black; border-radius: 5px; background-color: rgb(247, 247, 247); margin-bottom: 1rem; padding: 0.5rem; border-radius: 5px; width: 100%; "
            v-for="item in sprints" :key="item">

            <div>

                <div style="display: flex; justify-content: space-between;">
                    <h3>
                        <button @click="ocultarPlano" v-if="item.id == 0 && sprints.length > 1">
                            <i style="font-size: 20px;" class="bi bi-eye-slash ocultar" id="botaoOcultar"></i>
                        </button>
                        <input type="text" v-model="item.nome" style="width: min-content; margin-left: 0.5rem;">
                    </h3>

                    <span>{{ item.dtTermino }}</span>

                    <!-- <button v-if="item.id == 0" @click="desativarEdicao = !desativarEdicao" style="width: 2rem;"
                        :class="{ 'custom-select-disabled': desativarEdicao == false }">
                        <i class="bi bi-pencil-fill"></i>
                    </button>  -->

                    <button v-if="item.id != 0" style="width: max-content;" @click="abrirModalIniciarSprint(item.id)"
                        class="button-default"><i class="fa-solid fa-clock"></i>&nbsp;{{ item.dtTermino == null ? 'Iniciar'
                            :
                            'Finalizar' }}
                    </button>

                </div>
                <h5>
                    Pontos de história: {{ somarHP(item) }}
                </h5>
            </div>

            <div :id="item.id">
                <table class="table table-hover" style="border-radius: 5px;">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Item</th>
                            <th style="width:35rem" scope="col">Descrição</th>
                            <th scope="col">H.P.</th>
                            <th scope="col">Responsável</th>
                            <th scope="col">Inicio Previsto</th>
                            <th scope="col">Final Previsto</th>
                            <th>Status<i class="bi bi-caret-down"></i></th>
                            <th></th>
                        </tr>
                    </thead>
                    <thead>
                        <tr v-for=" backlog in item.backlogs" :key="backlog">
                            <td>
                                <button @click="moverBacklog(backlog.id)" v-if="item.id == 0" class="apagar">
                                    <i class="bi bi-arrow-down-square-fill"></i>
                                </button>
                            </td>

                            <td>
                                <label style="width: max-content; max-width: 100px;">{{ backlog.codigo }}</label>
                            </td>

                            <td><input :disabled="desativarEdicao" type="text" v-model="backlog.descricao"
                                    style="width:35rem; outline: none;"></td>

                            <td><select v-model="backlog.HP"
                                    style="width: min-content; text-align: center; border: 1px solid black; border-radius: 50px; padding-left: 0.2rem; padding-right: 0.2rem;">
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
                                </select></td>

                            <td><select v-model="backlog.responsavel"
                                    style="width: min-content; outline: none; text-align: center;">
                                    <option hidden>--</option>
                                    <option>Darley Dias</option>
                                    <option>Mariana Mozzer</option>
                                    <option>Lucas Lima</option>
                                    <option>Natalie Costa</option>
                                    <option>Artur Wilson</option>
                                    <option>Raul Wilson</option>
                                </select></td>

                            <td><input style="width: 6.9rem; outline: none;" type="date" v-model="backlog.dtInicio"
                                    class="data">
                            </td>

                            <td><input style="width: 6.9rem; outline: none;" type="date" class="data"
                                    v-model="backlog.dtFim"></td>

                            <td><select style="width: min-content; outline: none; text-align: center;"
                                    @change="definirInicioFimReal(backlog.id, item.id, $event.target.value)"
                                    v-model="backlog.status">
                                    <option>Pendente</option>
                                    <option>Em andamento</option>
                                    <option>Concluído</option>
                                </select></td>

                            <td>
                                <v-menu>
                                    <template v-slot:activator="{ props }">
                                        <v-btn style="width: 1.5rem; height: 1.5rem;" icon="mdi-dots-horizontal"
                                            v-bind="props"></v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item>
                                            <button style="margin: 0.2rem;"
                                                @click="editarBacklog(backlog.id, item.id, false)">Editar
                                                Tarefa</button><br />
                                            <v-menu>
                                                <template v-slot:activator="{ props }">
                                                    <button style="color: red;margin: 0.2rem;" v-bind="props">Excluir
                                                        Tarefa</button>
                                                </template>

                                                <v-list>
                                                    <v-list-item>
                                                        <div>
                                                            <h4>Tem certeza?</h4>
                                                            <div style="display: flex; width: 100%;">
                                                                <Button @click="apagarBacklog(backlog.id, item.id)"
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
                            </td>
                        </tr>

                    </thead>
                </table>
                <div style="display: flex; padding-left: 0.2rem; border-radius: 5px;" :id="item.id">
                    <div style="border: 1px solid black; border-radius: 5px; padding: 0.3rem;">
                        <input style="width: 5rem;" type="text" disabled
                            :placeholder="item.backlogs.length != 0 ? 'Tarefa - ' + (parseInt((item.backlogs[item.backlogs.length - 1].codigo.slice(9))) + 1) : 'Tarefa - 1'">
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
    </div>


    <!-- MODAL INICIAR SPRINT-->
    <div class="modal-mask" v-if="showIniciarSprint" @click="fecharModalFora">
        <div class="modal-container" style="height: min-content; width: 50rem;">
            <div style="display: flex; justify-content: right;">
                <button type="button" class="btn-close" aria-label="Close" @click="fecharModal"></button>
            </div>

            <div style="width: 100%;">
                <div>
                    <label>Data de Entrega</label><label
                        style="margin-left: 1rem; font-size: large; color: red; display: none;" id="aviso"><b>Preencha o
                            campo abaixo:</b></label>
                    <input v-model="dataTermino" id="dataTermino" class="form-control" type="date">
                </div>

                <div style="margin-top: 1rem;">
                    <label>Objetivo</label>
                    <textarea class="form-control"></textarea>
                </div>
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

export default {
    name: "SprintsView",

    data() {
        return {
            disabled: false,
            showEditarBacklog: false,
            showIniciarSprint: false,
            showConfirmação: false,
            teste: null,
            desativarEdicao: true,
            sprints: [{
                "id": 0,
                "nome": "Plano de ação",
                "backlogs": [{
                    "id": "1",
                    "codigo": "Tarefa - 1",
                    "descricao": "Usuário necessita de opções para personalização de sistema.",
                    "HP": 8,
                    "responsavel": "Darley Dias",
                    "status": "Pendente",
                    "dtInicio": "2023-12-01",
                    "dtFim": "2023-12-05",
                    "dtInicioReal": "0000-00-00",
                    "dtFimReal": "0000-00-00",
                }, {
                    "id": "2",
                    "codigo": "Tarefa - 2",
                    "descricao": "Criar tela de personalização que permita alterar tema e tamanho da fonte.",
                    "HP": 5,
                    "responsavel": "Lucas Lima",
                    "status": "Em andamento",
                    "dtInicio": "2024-02-01",
                    "dtFim": "2024-02-29",
                    "dtInicioReal": "0000-00-00",
                    "dtFimReal": "0000-00-00",
                }],
                "dtTermino": null
            }],
            novaSprint: {
                "id": null,
                "nome": "",
                "backlogs": [],
                "dtTermino": null
            },
            idSprint: null,
            dataTermino: null,
            mostrarPlano: true,
            backlogeditado: null,
            idSprintBacklogEditado: null,
        }
    },

    methods: {
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
        },

        salvarBacklogEditado(idBacklogEditado) {
            let sprint = this.sprints.find(sprint => sprint.id === this.idSprintBacklogEditado);

            sprint.backlogs = sprint.backlogs.filter(item => item.id !== idBacklogEditado);
            sprint.backlogs.push(this.backlogeditado);
            sprint.backlogs.sort((a, b) => a.id - b.id);
            this.showEditarBacklog = false
        },

        editarBacklog(idBacklog, idSprint) {
            this.showEditarBacklog = true;

            let sprint = this.sprints.find(sprint => sprint.id === idSprint);

            this.backlogeditado = sprint.backlogs.find(backlog => backlog.id === idBacklog);
            this.idSprintBacklogEditado = sprint.id
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
                this.disabled = true
                setTimeout(() => {
                    this.disabled = false
                }, 1500)
            }
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
                document.getElementById('aviso').style.display = ''
                return
            }
            const sprint = this.sprints.find(item => item.id == this.idSprint);
            const dia = this.dataTermino.slice(8);
            const mes = this.dataTermino.slice(5).slice(0, 2);
            const ano = this.dataTermino.slice(0, 4);
            if (sprint) {
                sprint.dtTermino = `Data de entrega: ${dia}/${mes}/${ano}`
                this.dataTermino = null;
                this.idSprint = null;
                document.getElementById('aviso').style.display = 'none'
                this.fecharModal()
            } else {
                console.error('Sprint não encontrada com o ID:', this.idSprint);
            }
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
                "id": null,
                "nome": "",
                "backlogs": []
            }
            this.sprints.sort((a, b) => {
                if (a.nome === "Plano de ação") {
                    return -1; // Move "Plano de ação" para o início
                } else if (b.nome === "Plano de ação") {
                    return 1; // Move "Plano de ação" para o início
                } else {
                    return b.id - a.id; // Ordena os demais elementos pelo id de forma descendente
                }
            });
        },

        criarBacklog(id, descricao) {
            let sprint = this.sprints.find(sprint => sprint.id === id);
            let novoBacklog = {
                "id": "",
                "codigo": "",
                "descricao": "",
                "HP": 0,
                "responsavel": "--",
                "status": "Pendente",
                "dtInicio": "",
                "dtFim": "",
                "dtInicioReal": "0000-00-00",
                "dtFimReal": "0000-00-00",
            };
            if (sprint.backlogs.length != 0) {
                novoBacklog.codigo = 'Tarefa - ' + (parseInt((sprint.backlogs[sprint.backlogs.length - 1].codigo.slice(9))) + 1);
                novoBacklog.id = parseInt(sprint.backlogs[sprint.backlogs.length - 1].id) + 1
            } else {
                novoBacklog.codigo = "Tarefa - 1";
                novoBacklog.id = 1;
            }
            novoBacklog.descricao = descricao;
            sprint.backlogs.push(novoBacklog);

        },

        apagarBacklog(idBacklog, idSprint) {
            let sprint = this.sprints.find(sprint => sprint.id === idSprint);

            sprint.backlogs = sprint.backlogs.filter(item => item.id !== idBacklog);

        }

    }
}
</script>

<style>
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