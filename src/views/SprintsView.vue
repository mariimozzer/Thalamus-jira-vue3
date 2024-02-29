<template>
    <div style="width: 100%; padding: 1rem;" class="container">
        <!-- TABELA 1 -->
        <h3
            style="text-align: center; margin-bottom: 1rem; border-bottom: 2px rgb(56, 56, 56) solid; padding-bottom: 1rem;">
            Plano de Ação</h3>
        <div v-for="(item, index) in  sprints " :key="item" class="divPaiTabela">
            <div class="divFundoTabela">
                <div class="row">
                    <div style="width: 20%;">
                        <div style="width: 10rem;">
                            <h5>
                                <span style="display: flex;">
                                    <div style="background-color: rgba(175, 175, 175, 0.6)" class="hPoints">{{
                                        somarHP(item)[0] }}
                                    </div>
                                    <div style="background-color: rgba(0, 47, 255, 0.600)" class="hPoints">{{
                                        somarHP(item)[1] }}
                                    </div>
                                    <div style="background-color: rgba(0, 255, 0, 0.600)" class="hPoints">{{
                                        somarHP(item)[2] }}
                                    </div>
                                </span>
                            </h5>
                        </div>
                        <button @click="ocultarPlano" v-if="item.nome == 'Plano de ação'" class="botaoAdicionarSprint"
                            style=" width: 2rem; position: absolute; margin-left: ">
                            <i style="font-size: 20px;" class="bi bi-eye-slash ocultar" id="botaoOcultar"></i>
                        </button>
                    </div>
                    <div style="width: 60%; text-align: center;">
                        <h2><input v-if="item.nome != 'Plano de ação'" type="text" v-model="item.nome"
                                style="width: max-content; margin-left: 0.5rem; text-align: center;" disabled>
                        </h2>
                        <!-- @change="editarSprint('nome', item.id, item.nome)" 
                        :disabled="item.nome == 'Plano de ação'" -->
                    </div>

                    <div style="width: 20%; display: flex; text-align: right; justify-content: right;" v-if="index !== 0">
                        <div style="text-align: center;">
                            <div v-if="item.dtInicio == null && item.dtTermino == null"
                                style="width: 13rem; border: 1px rgb(175, 175, 175) solid; margin-right: 0.5rem; border-radius: 10px;">
                                <i style=" color: rgb(175, 175, 175); font-size: 22px; margin-left: 1rem;"
                                    class="bi bi-stop-circle-fill"></i>
                            </div>
                            <div v-if="item.dtInicio !== null && item.dtTermino !== null"
                                style="width: 13rem; border: 1px rgba(0, 47, 255, 0.700) solid; margin-right: 0.5rem; border-radius: 10px;">
                                <strong>
                                    {{ abreviarMes(item.dtInicio) }} <i :id="item.id" style="font-size: 20px;"
                                        class="bi bi-arrow-right"></i>
                                    {{ abreviarMes(item.dtTermino) }}
                                </strong>
                                <i style=" color: rgba(0, 47, 255, 0.700); font-size: 22px; margin-left: 1rem;"
                                    class="bi bi-fast-forward-circle-fill"></i>
                            </div>
                            <div v-if="item.dtInicio == null && item.dtTermino !== null"
                                style="width: 13rem; border: 1px rgba(0, 255, 0, 0.700) solid; margin-right: 0.5rem; border-radius: 10px;">
                                <strong>
                                    {{ abreviarMes(item.dtTermino, true) }}
                                </strong>
                                <i style=" color: rgba(0, 255, 0, 0.700); font-size: 22px; margin-left: 1rem;"
                                    class="bi bi-check-circle-fill"></i>
                            </div>
                        </div>

                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn style="width: 2rem; height: 2rem; background-color: transparent; border: none;"
                                    icon="mdi-dots-horizontal" class="botaoAdicionarSprint" v-bind="props"></v-btn>
                            </template>

                            <v-list>
                                <v-list-item>
                                    <button style="margin: 0.2rem;" @click="abrirModalIniciarSprint(item.id)"
                                        :disabled="item.dtInicio == null && item.dtTermino !== null"
                                        :style="{ 'cursor': (item.dtInicio == null && item.dtTermino !== null) ? 'not-allowed' : 'pointer', 'color': (item.dtInicio == null && item.dtTermino !== null) ? 'grey' : 'black' }">{{
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
                <div :id="item.nome" style="width: 100%; display: flex; flex-flow: column; padding-right: 0.5rem;">
                    <div
                        style="width: 100%;display: flex ;border-bottom: 1px solid black; margin-bottom: 0.5rem; padding-bottom: 0.5rem ;align-items: center;">

                        <div style="width:10%; text-align: center;">
                            <strong>
                                <label style="width: 100%">Item</label>
                            </strong>
                        </div>

                        <div style="width: 30%; padding-left: 0.5rem; padding-right: 1rem">
                            <strong>
                                <input type="text" style="width:100%; outline: none; text-align: center;" value="Descrição">
                            </strong>
                        </div>

                        <div style="width: 3rem; text-align: center;">
                            <strong>
                                <select
                                    style="width: 5rem%; text-align: center; padding-left: 0.2rem; padding-right: 0.2rem;"
                                    disabled>
                                    <option selected>H.P.</option>
                                </select>
                            </strong>
                        </div>

                        <div style="width: 15%; margin-inline: ">
                            <strong>
                                <select style="width: 100%; outline: none; text-align: left; margin-left: 1rem;" disabled>
                                    <option selected>Responsável</option>
                                </select>
                            </strong>
                        </div>

                        <div style="width:10%;margin-inline: 0.5rem;">
                            <strong>
                                <input style="width: 100%; outline: none; text-align: center; width: 7rem;" type="text"
                                    class="data" value="Inicio Previsto">
                            </strong>
                        </div>

                        <div style="width: 10%; margin-inline: 0.5rem;">
                            <strong>
                                <input style="width: 100%; outline: none; text-align: center;width: 7rem;" type="text"
                                    class="data" value="Fim Previsto">
                            </strong>
                        </div>

                        <div style="width: 15%; margin-right: 0.3rem; margin-left: 0.3rem;">
                            <strong>
                                <select style="width:100%; outline: none; text-align: center;" disabled>
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

                                <div style="width: 30%; padding-left: 0.5rem; padding-right: 1rem">
                                    <input :disabled="desativarEdicao" type="text" v-model="element.descricao"
                                        style="width:100%; outline: none;">
                                </div>

                                <div style="width: 3rem; text-align: center;">
                                    <select v-model="element.HP" @change="editarBacklog('HP', element.id, element.HP)"
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

                                <div style="width: 15%; margin-inline;">
                                    <select v-model="element.responsavel_id" class="form-select"
                                        @change="editarBacklog('responsavel_id', element.id, element.responsavel_id)"
                                        style="width: 100%; outline: none; text-align: left; padding: 0.5rem; border: none; background-color: transparent;">
                                        <option v-for=" item  in  gerente " :key="item.id" :value="item.id">
                                            {{ nomeEsobrenome(item.nomeCompleto) }}
                                        </option>
                                    </select>
                                </div>

                                <div style="width:10%; margin-inline: 0.5rem;">
                                    <input style="width: 7rem; outline: none; text-align: center;" type="date"
                                        @change="editarBacklog('dtInicio', element.id, element.dtInicio)"
                                        v-model="element.dtInicio">
                                </div>

                                <div style="width: 10%; margin-inline: 0.5rem;">
                                    <input style="width: 7rem; outline: none; text-align: center;" type="date"
                                        :min="element.dtInicio" @change="editarBacklog('dtFim', element.id, element.dtFim)"
                                        v-model="element.dtFim">
                                </div>

                                <div style="width: 15%; margin-right: 0.3rem; margin-left: 0.3rem;">
                                    <select
                                        style="width: 100%; outline: none; text-align: center; border: none; background-color: transparent;"
                                        class="form-select" @change="editarBacklog('status', element.id, element.status)"
                                        v-model="element.status">
                                        <option>Pendente</option>
                                        <option>Em andamento</option>
                                        <option>Concluído</option>
                                    </select>
                                </div>

                                <div style="width: max-content; visibility: hidden;" :id="'botaoEdicao' + element.id">
                                    <v-menu>
                                        <template v-slot:activator="{ props }">
                                            <v-btn style="width: 1.6rem; height: 1.6rem; border: 1px solid black;"
                                                class="botaoAdicionarSprint" icon="mdi-dots-horizontal"
                                                v-bind="props"></v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item>
                                                <button style="margin: 0.2rem;"
                                                    @click="abrirModalEditarBacklog(element.id, item.id, false)">Editar
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
                                                                    <Button @click="apagarBacklog(element.id)"
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
                            <!-- <input style="width: 5rem;" type="text" disabled
                                :placeholder="'Tarefa - ' + (parseInt((this.somenteBacklogs()[0].codigo).match(/\d+$/)[0]) + 1)"> -->
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
                <h1 style="text-align: center; margin-bottom: 1rem;">Sprints</h1>
                <button style="width: max-content; font-size: 30px; position: absolute; margin-left: 65rem;"
                    @click="criarNovaSprint" class="botaoAdicionarSprint">
                    <i class="bi bi-plus-circle"></i></button>
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
                    <label>Data prevista de termino:</label>
                    <input :class="{ shake: disabled }" v-model="dataTerminoSprint" id="dataTermino"
                        :min="new Date().toISOString().split('T')[0]" class="form-control" type="date">
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
                    <textarea class="form-control" v-model="backlogeditado.descricao" style="width: 25rem;"
                        @focusout="editarBacklog('descricao', backlogeditado.id, backlogeditado.descricao)"></textarea>
                </div>
                <div style="width: min-content;margin-top: 1rem;">
                    <h4>
                        Responsável:
                    </h4>

                    <select v-model="backlogeditado.responsavel_id" class="form-select"
                        @change="editarBacklog('responsavel_id', backlogeditado.id, backlogeditado.responsavel_id)"
                        style="width: 20rem; text-align: left; border: 1px solid; border-radius: 5px; font-size: larger; ">
                        <option v-for=" item  in  gerente " :key="item.id" :value="item.id">
                            {{ item.nomeCompleto }}
                        </option>
                    </select>
                </div>
            </div>

            <div style="display: flex; margin-top: 1rem;">
                <div>
                    <label>Inicio Previsto:</label>
                    <input v-model="backlogeditado.dtInicio" class="form-control" type="date" style="width: min-content;"
                        @change="editarBacklog('dtInicio', backlogeditado.id, backlogeditado.dtInicio)">
                </div>
                <div style="margin-left: 1rem;">
                    <label>Fim Previsto:</label>
                    <input v-model="backlogeditado.dtFim" class="form-control" type="date" style="width: min-content;"
                        @change="editarBacklog('dtFim', backlogeditado.id, backlogeditado.dtFim)">
                </div>
            </div>

            <div style="display: flex; margin-top: 1rem;">
                <div>
                    <label>Inicio Real:</label>
                    <input v-model="backlogeditado.dtInicioReal" class="form-control" type="date"
                        @change="editarBacklog('dtInicioReal', backlogeditado.id, backlogeditado.dtInicioReal)"
                        style="width: min-content;">
                </div>
                <div style="margin-left: 1rem;">
                    <label>Fim Real:</label>
                    <input v-model="backlogeditado.dtFimReal" class="form-control" type="date" style="width: min-content;"
                        @change="editarBacklog('dtFimReal', backlogeditado.id, backlogeditado.dtFimReal)">
                </div>
            </div>

        </div>
    </div>
    <!--END MODAL EDTIRAR-->
</template>

<script>
import draggable from "@/vuedraggableVue";
import axios from "axios";

export default {
    components: {
        draggable
    },

    name: "SprintsView",

    data() {
        return {
            backlogs: [],
            novoElemento: '',
            disabled: false,
            showEditarBacklog: false,
            showIniciarSprint: false,
            showConfirmação: false,
            teste: "nada",
            desativarEdicao: true,
            sprints: null,
            novaSprint: {
                id: null,
                nome: "",
                backlogs: [],
                dtTermino: null
            },
            idSprint: null,
            dataTerminoSprint: null,
            mostrarPlano: true,
            backlogeditado: null,
            idSprintBacklogEditado: null,
            idProjeto: sessionStorage.getItem('idProjeto'),
            gerente: [],
        }
    },

    watch: {
        sprints: {
            handler: 'moverBacklog',
            deep: true,  // Observa mudanças profundas no array (necessário se houver alterações nos elementos do array)
        },
    },

    mounted() {
        this.getBacklogs(),
            this.getGerenteseSetor()
    },

    methods: {
        somenteBacklogs() {
            if (this.sprints !== null) {
                var teste = this.sprints.map((item) => item.backlogs).flat()
                teste.sort((a, b) => b.id - a.id);
                return teste
            }
        },
        abreviarMes(dataString, mandarAno) {
            if (dataString == null) {
                return null
            }
            const partes = dataString.split('-');

            if (partes.length !== 3) {
                console.error('Formato de data inválido. Use o formato AAAA-MM-DD');
                return null;
            }

            const ano = partes[0].slice(2);
            const mesNumero = parseInt(partes[1], 10);
            const dia = partes[2];

            const mesesAbreviados = [
                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
            ];

            if (mesNumero < 1 || mesNumero > 12) {
                return 'Número do mês inválido.'
            }

            const mesAbreviado = mesesAbreviados[mesNumero - 1];

            if (mandarAno) {
                return `${dia}/${mesAbreviado}/${ano}`;
            } else {
                return `${dia}/${mesAbreviado}`;
            }

        },

        moverBacklog() {
            if (this.sprints !== null) {
                var data = this.sprints;
                var itemProcurado = JSON.parse(sessionStorage.getItem('tarefaMovida'));
                if (itemProcurado != null) {
                    var idBacklog = itemProcurado.id;
                }

                for (let i = 0; i < data.length; i++) {
                    const projeto = data[i];
                    const backlogs = projeto.backlogs;

                    for (let j = 0; j < backlogs.length; j++) {
                        const backlog = backlogs[j];
                        if (JSON.stringify(backlog) === JSON.stringify(itemProcurado)) {
                            var idSprint = this.sprints[i].id
                        }
                    }
                }

                axios.put(`http://192.168.0.6:8000/api/sprintTarefa/atualizar/${idBacklog}`, {
                    sprint_id: idSprint,
                })
                    .then(() => {
                        this.getBacklogs
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

        },

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

        getGerenteseSetor() {
            axios.get('http://192.168.0.5:8000/api/pessoa/', {
            })
                .then((response) => {
                    this.gerente = response.data
                })
                .catch((error) => {
                    console.error(error);
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

        getBacklogs() {
            axios.get(`http://192.168.0.6:8000/api/sprint/buscar/${this.idProjeto}`, {})
                .then((response) => {
                    function compararSprints(a, b) {
                        if (a.nome === "Plano de ação") {
                            return -1;
                        } else if (b.nome === "Plano de ação") {
                            return 1;
                        }
                        return b.id - a.id;
                    }

                    this.sprints = response.data.sort(compararSprints);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        definirInicioFimReal(idBacklog, status) {

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

            if (status == 'Em andamento') {

                axios.put(`http://192.168.0.6:8000/api/sprintTarefa/atualizar/${idBacklog}`, {
                    dtInicioReal: data,
                })
                    .then(() => {
                        return this.getBacklogs()
                    })

            } if (status == 'Concluído') {

                axios.put(`http://192.168.0.6:8000/api/sprintTarefa/atualizar/${idBacklog}`, {
                    dtFimReal: data,
                })
                    .then(() => {
                        return this.getBacklogs()
                    })

            } if (status == 'Pendente') {

                axios.put(`http://192.168.0.6:8000/api/sprintTarefa/atualizar/${idBacklog}`, {
                    dtInicioReal: null,
                    dtFimReal: null,
                })
                    .then(() => {
                        return this.getBacklogs()
                    })

            }


        },

        abrirModalEditarBacklog(idBacklog, idSprint) {
            this.showEditarBacklog = true;

            let sprint = this.sprints.find(sprint => sprint.id === idSprint);

            this.backlogeditado = sprint.backlogs.find(backlog => backlog.id === idBacklog);
        },

        editarBacklog(itemAlterado, idBacklog, novoValor) {

            axios.put(`http://192.168.0.6:8000/api/sprintTarefa/atualizar/${idBacklog}`, {
                [itemAlterado]: novoValor,
            })
                .then(() => {
                    if (itemAlterado == 'status') {
                        return this.definirInicioFimReal(idBacklog, novoValor)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        editarSprint(itemAlterado, idSprint, novoValor) {

            axios.put(`http://192.168.0.6:8000/api/sprint/atualizar/${idSprint}`, {
                [itemAlterado]: novoValor,
            })
                .then(() => {
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        ocultarPlano() {
            if (this.mostrarPlano == true) {
                document.getElementById("botaoOcultar").className = "bi bi-eye";
                document.getElementById("Plano de ação").style.display = "none";
                document.getElementById('pontos').style.display = "";
                this.mostrarPlano = false
            } else {
                document.getElementById("botaoOcultar").className = "bi bi-eye-slash";
                document.getElementById("Plano de ação").style.display = "";
                document.getElementById('pontos').style.display = "none";
                this.mostrarPlano = true
            }
        },

        somarHP(dados) {
            let somaPendentes = 0;
            let somaEmAndamento = 0;
            let somaConcluidos = 0;

            if (dados.backlogs) {
                dados.backlogs.forEach(backlog => {
                    if (backlog.status == 'Pendente') {
                        if (backlog.HP) {
                            somaPendentes += parseInt(backlog.HP);
                        }
                    }
                    if (backlog.status == 'Em andamento') {
                        if (backlog.HP) {
                            somaEmAndamento += parseInt(backlog.HP);
                        }
                    }
                    if (backlog.status == 'Concluído') {
                        if (backlog.HP) {
                            somaConcluidos += parseInt(backlog.HP);
                        }
                    }
                });
            }
            let lista = [somaPendentes, somaEmAndamento, somaConcluidos]
            return lista;
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
            this.teste = data

            var sprint = this.sprints.find(sprint => sprint.id === this.idSprint)
            if (sprint.dtTermino !== null) {

                axios.put(`http://192.168.0.6:8000/api/sprint/atualizar/${this.idSprint}`, {
                    dtInicio: null,
                    dtTermino: data
                })
                    .then(() => {
                        this.idSprint = null;
                        this.getBacklogs();
                        this.fecharModal()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.showIniciarSprint = true;
            }

        },

        iniciarSprint() {
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
            this.teste = data

            if (this.dataTerminoSprint == null) {
                document.getElementById('dataTermino').style.border = '1px solid red';
                this.disabled = true
                setTimeout(() => {
                    this.disabled = false
                }, 1500)
                return
            }

            axios.put(`http://192.168.0.6:8000/api/sprint/atualizar/${this.idSprint}`, {
                dtInicio: data,
                dtTermino: this.dataTerminoSprint,
            })
                .then(() => {
                    this.idSprint = null;
                    this.getBacklogs();
                    this.fecharModal()
                })
                .catch((error) => {
                    console.error(error);
                });

        },

        criarNovaSprint() {

            var nomeSprint = "Sprint - 1";

            if (this.sprints[this.sprints.length - 1].nome != "Plano de ação") {
                nomeSprint = 'Sprint - ' + (parseInt((this.sprints[1].nome).match(/\d+$/)[0]) + 1);
            } else {
                nomeSprint = 'Sprint - 1';
            }

            axios.post(`http://192.168.0.6:8000/api/sprint/cadastrar`, {
                nome: nomeSprint,
                projeto_id: this.idProjeto
            })
                .then(() => {
                    this.getBacklogs()
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        criarBacklog(id, descricao) {

            axios.post(`http://192.168.0.6:8000/api/sprintTarefa/cadastrar`, {
                sprint_id: id,
                codigo: 'Tarefa - ' + (parseInt((this.somenteBacklogs()[0].codigo).match(/\d+$/)[0]) + 1),
                descricao: descricao
            })
                .then(() => {
                    this.getBacklogs()
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        apagarBacklog(idBacklog) {

            axios.put(`http://192.168.0.6:8000/api/sprintTarefa/excluir/${idBacklog}`, {
                usuario_id: 1
            })
                .then(() => {
                    this.getBacklogs()
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        apagarSprint(id) {
            axios.put(`http://192.168.0.6:8000/api/sprint/excluir/${id}`, {
                usuario_id: 1
            })
                .then(() => {
                    this.getBacklogs()
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }
}
</script>

<style>
.hPoints {
    display: flex;
    border-radius: 50%;
    margin-right: 5px;
    width: 1.3rem;
    height: 1.3rem;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: rgb(78, 78, 78);
}

.botaoAdicionarSprint:hover {
    transition: 50ms linear;
    transform: scale(1.1);
}

.divFundoTabela {
    border: 2px solid black;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    margin-bottom: 2rem;
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
}</style>