<template>
    <br><br><br>

    <div
        style="width: 100%;margin-top: 1rem; justify-content: space-between; display: flex; margin-bottom: none; border-bottom: 2px solid rgb(0, 0, 0); align-items: center; position: fixed; background-color: #FAF9F6; z-index: 1;">
        <i @click="verProjetos" style="font-size: 30px; margin-left: 3rem; cursor: pointer;"
            class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela inicial'"></i>

        <i @click="verProjetos" class="fa-solid fa-house-chimney botaoAdicionarSprint botaoHome"
            :title="'Ir para tela inicial'"></i>

        <h2>{{ nomeDoProjeto }}</h2>
        <i style="font-size: 30px; margin-right: 3rem; cursor: pointer;visibility: hidden;"
            class="bi bi-kanban botaoAdicionarSprint" :title="'Ir para painel KanBan'"></i>
    </div>

    <br><br><br>
    <div style="width: 100%; padding: 1rem;" class="container">
        <div v-for="(item, index) in  sprints " :key="item" class="divPaiTabela">
            <div class="divFundoTabela" v-if="Array.isArray(sprints)">
                <div class="row">
                    <div style="width: 20%;">
                        <div style="width: 10rem;">
                            <h5>
                                <span style="display: flex;">
                                    <div style="background-color: rgba(255, 145, 0, 0.600)" class="hPoints">{{
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
                    </div>

                    <div style="width: 20%; display: flex; text-align: right; justify-content: right;"
                        v-if="index !== 0">
                        <div style="text-align: center;">
                            <div v-if="item.dtInicio == null && item.dtTermino == null"
                                style="width: 13rem; border: 1px rgba(255, 145, 0, 0.8) solid; margin-right: 0.5rem; border-radius: 10px;">
                                <i style=" color: rgba(255, 145, 0, 0.700); font-size: 22px; margin-left: 1rem;"
                                    class="bi bi-stop-circle-fill"></i>
                            </div>
                            <div v-if="item.dtInicio !== null && item.dtTermino !== null"
                                style="width: 13rem; border: 1px rgba(0, 47, 255, 0.8) solid; margin-right: 0.5rem; border-radius: 10px;">
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

                                </v-list-item>
                                <v-list-item>
                                    <button style="margin: 0.2rem; color: black;"
                                        @click="abrirModaeEditarSprint(item.id, false)"
                                        :disabled="item.dtInicio == null && item.dtTermino !== null"
                                        :style="{ 'cursor': (item.dtInicio == null && item.dtTermino !== null || item.dtInicio == null && item.dtTermino == null) ? 'not-allowed' : 'pointer', 'color': (item.dtInicio == null && item.dtTermino !== null || item.dtInicio == null && item.dtTermino == null) ? 'grey' : 'black', }">Editar
                                        Sprint
                                    </button><br />
                                </v-list-item>
                                <v-list-item>
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
                                <input type="text" style="width:100%; outline: none; text-align: center;"
                                    value="Descrição">
                            </strong>
                        </div>

                        <div style="width: 3rem; text-align: center;">
                            <strong>
                                <select style=" text-align: center; padding-left: 0.2rem; padding-right: 0.2rem;"
                                    disabled>
                                    <option selected>H.P.</option>
                                </select>
                            </strong>
                        </div>

                        <div style="width: 15%; margin-inline: ">
                            <strong>
                                <select style="width: 100%; outline: none; text-align: left; margin-left: 1rem;"
                                    disabled>
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
                    <div v-for="element in item.tarefas" :key="element.id">
                        <div @mouseover="mostrarBotao(element.id, true)" @mouseleave="mostrarBotao(element.id, false)"
                            style="width: 100%;display: flex ;border-bottom: 1px solid black; margin-bottom: 0.5rem; padding-bottom: 0.5rem ;align-items: center;">

                            <div style="width:10%; text-align: center;">
                                <label style="width: 100%;">{{ element.codigo }}</label>
                            </div>

                            <div style="width: 30%; padding-left: 0.5rem; padding-right: 1rem">
                                <input :title="element.descricao" readonly type="text" v-model="element.descricao"
                                    style="width:100%; outline: none; cursor: help;">
                            </div>

                            <div style="width: 3rem; text-align: center;">
                                <select v-model="element.HP" @change="editarBacklog('HP', element.id, element.HP)"
                                    style="text-align: center; border: 1px solid black; border-radius: 50px; padding-left: 0.2rem; padding-right: 0.2rem;">
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

                            <div style="width: 15%;">
                                <select v-model="element.responsavel_id" class="form-select"
                                    @change="editarBacklog('responsavel_id', element.id, element.responsavel_id)"
                                    style="width: 100%; outline: none; text-align: left; padding: 0.5rem; border: none; background-color: transparent;">
                                    <option v-for=" item  in  gerente " :key="item.id" :value="item.id">
                                        {{ nomeEsobrenome(item.nomeCompleto) }}
                                        <!-- {{ item.nomeCompleto }} -->
                                    </option>
                                </select>
                            </div>

                            <div style="width:10%; margin-inline: 0.5rem;">
                                <input style="width: 7rem; outline: none; text-align: center; cursor: pointer;"
                                    type="date" @change="editarBacklog('dtInicio', element.id, element.dtInicio)"
                                    v-model="element.dtInicio">
                            </div>

                            <div style="width: 10%; margin-inline: 0.5rem;">
                                <input style="width: 7rem; outline: none; text-align: center; cursor: pointer;"
                                    type="date" :min="element.dtInicio"
                                    @change="editarBacklog('dtFim', element.id, element.dtFim)" v-model="element.dtFim">
                            </div>

                            <div style="width: 15%; margin-right: 0.3rem; margin-left: 0.3rem;">
                                <select
                                    :style="{ 'color': (element.status == 'Pendente') ? 'rgb(255, 145, 0)' : (element.status == 'Em andamento') ? 'rgb(0, 47, 255)' : 'rgb(0, 192, 0)', }"
                                    style="width: 100%; outline: none; text-align: center; border: none; background-color: transparent;"
                                    class="form-select" @change="editarBacklog('status', element.id, element.status)"
                                    v-model="element.status">
                                    <option style="color: rgb(255, 145, 0);">Pendente</option>
                                    <option style="color: rgb(0, 47, 255);">Em andamento</option>
                                    <option style="color: rgb(0, 192, 0);">Concluído</option>
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
                    </div>
                    <div style="display: flex; padding-left: 0.2rem; border-radius: 5px; width: 100%;" :id="item.id">
                        <div style="border: 1px solid black; border-radius: 5px; padding: 0.3rem;">
                            <input style="width: 5rem;" type="text" disabled
                                :placeholder="this.somenteBacklogs().length !== 0 ? 'Tarefa - ' + (parseInt((this.somenteBacklogs()[0].codigo).match(/\d+$/)[0]) + 1) : 'Tarefa - 1'">
                        </div>
                        <div
                            style="border: 1px solid black; border-radius: 5px; width: 100%; margin-left: 0.3rem; padding: 0.3rem;">
                            <input type="text" placeholder="O que será feito?"
                                @keyup.enter="criarBacklog(item.id, $event.target.value), $event.target.value = ''"
                                style="width: 100%; padding: 0.1rem; padding-left: 0.5rem; outline: none;"
                                :id="'inputNovaTarefa' + item.id">
                        </div>
                    </div>
                </div>
                <div style="text-align: center; display: none;" :id="'pontos' + item.nome"
                    @click="ocultarPlano(item.nome)" class="ocultar">
                    <i class="bi bi-grip-horizontal"></i>
                </div>
            </div>
            <div v-else>{{ sprints }}</div>
        </div>
    </div>

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

            <div style="display: flex;">
                <div>
                    <div style="display: flex; margin-top: 1rem; width: min-content;">
                        <div>
                            <label>Inicio Previsto:</label>
                            <input v-model="backlogeditado.dtInicio" class="form-control" type="date"
                                style="width: min-content;"
                                @change="editarBacklog('dtInicio', backlogeditado.id, backlogeditado.dtInicio)">
                        </div>
                        <div style="margin-left: 1rem;">
                            <label>Fim Previsto:</label>
                            <input v-model="backlogeditado.dtFim" class="form-control" type="date"
                                style="width: min-content;"
                                @change="editarBacklog('dtFim', backlogeditado.id, backlogeditado.dtFim)">
                        </div>
                    </div>

                    <div style="display: flex; margin-top: 1rem; width: min-content;">
                        <div>
                            <label>Inicio Real:</label>
                            <input v-model="backlogeditado.dtInicioReal" class="form-control" type="date"
                                @change="editarBacklog('dtInicioReal', backlogeditado.id, backlogeditado.dtInicioReal)"
                                style="width: min-content;">
                        </div>
                        <div style="margin-left: 1rem;">
                            <label>Fim Real:</label>
                            <input v-model="backlogeditado.dtFimReal" class="form-control" type="date"
                                style="width: min-content;"
                                @change="editarBacklog('dtFimReal', backlogeditado.id, backlogeditado.dtFimReal)">
                        </div>
                    </div>
                </div>

                <div style="margin-top: 1rem;margin-left: 1rem ;width: 100%; display: none;">
                    <div style="width: 100%; justify-content: space-between; display: flex;">
                        <label>
                            Anexos:
                        </label>
                        <i title="Adicionar anexo"
                            style="font-size: 20px; cursor: pointer; justify-self: right; margin-right: 1rem;"
                            class="bi bi-plus-circle" @click="openFileInput"></i>
                    </div>

                    <input style="display: none;" ref="fileInput" class="form-control form-control-sm" type="file"
                        @change="handleFileUpload">

                    <ul style="list-style: none; padding-left: 0rem; overflow: auto; max-height: 10rem;">
                        <li v-for="item in backlogeditado.anexos" :key="item"
                            @mouseover="mostrarBotaoExcluirAnexo(item.id, true)"
                            @mouseleave="mostrarBotaoExcluirAnexo(item.id, false)">
                            <div
                                style="margin-left: 1rem; padding-left: 0rem; border: 1px solid black; border-radius: 10px; padding: 5px; display: flex; width: 20rem; justify-content: space-between;">
                                <a :href="'http://192.168.0.5:8000/storage/' + item.path" target="_blank" class="link">
                                    <i style="font-size: 25px;"
                                        :class="'bi bi-filetype-' + item.nome.split('.')[1].toLowerCase()"></i>
                                    {{ item.nome }}
                                </a>

                                <button class="botaoAdicionarSprint" style="color: red; visibility: hidden;"
                                    :id="'botaoExcluir' + item.id" @click="excluirAnexo(item.id)">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    <!--END MODAL -->
</template>

<script>
import { ref } from 'vue';
import axios from "axios";

export default {
    components: {
    },

    name: "VisualizaçãoPlanodeAção",

    setup() {
        const fileInput = ref(null);

        const openFileInput = () => {
            fileInput.value.click();
        };

        return { fileInput, openFileInput, };
    },

    data() {
        return {
            idUsuario: localStorage.getItem('id'),
            backlogs: [],
            novoElemento: '',
            disabled: false,
            showEditarSprint: false,
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
            backlogeditado: null,
            idSprintBacklogEditado: null,
            idProjeto: sessionStorage.getItem('idProjeto'),
            nomeDoProjeto: sessionStorage.getItem('nomeDoProjeto'),
            gerente: [],
            sprintEditada: null
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

        handleFileUpload() {
            // Acesse o elemento de input de arquivo usando refs
            const fileInput = this.$refs.fileInput;

            // Verifique se o elemento de input de arquivo existe e tem arquivos
            if (fileInput && fileInput.files.length > 0) {
                const formData = new FormData();
                formData.append('sprintTarefa_id', this.backlogeditado.id);

                // Adicione todos os arquivos presentes no input
                for (let i = 0; i < fileInput.files.length; i++) {
                    formData.append('anexos[]', fileInput.files[i]);
                }

                // Envie a requisição usando Axios
                axios.post('http://192.168.0.5:8000/api/sprintTarefa/anexo/adicionar', formData)
                    .then(response => {
                        this.backlogeditado.anexos.push({
                            path: response.data.anexos_salvos[0].path,
                            nome: response.data.anexos_salvos[0].nome,
                            id: response.data.anexos_salvos[0].id
                        });
                    })
                    .catch(error => {
                        // Trata erros
                        console.error(error);
                    });
            }
        },

        excluirAnexo(id) {
            axios.delete(`http://192.168.0.5:8000/api/sprintTarefa/anexo/remover/${id}`);
            this.backlogeditado.anexos = this.backlogeditado.anexos.filter(anexo => anexo.id !== id)
        },

        mostrarBotaoExcluirAnexo(id, mostrar) {
            if (mostrar == true) {
                document.getElementById('botaoExcluir' + id).style.visibility = ''
            }
            if (mostrar == false) {
                document.getElementById('botaoExcluir' + id).style.visibility = 'hidden'
            }
        },

        somenteBacklogs() {
            if (this.sprints !== null) {
                var teste = this.sprints.map((item) => item.tarefas).flat()
                teste.sort((a, b) => b.id - a.id);
                return teste
            }
            return 'nada'
        },

        verBacklogs() {
            this.$router.push({ name: "sprints" })
        },

        verPainel() {
            this.$router.push({ name: "painel" })
        },

        verProjetos() {
            this.$router.push({ name: "ControlePA" })
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
                return `${dia}/${mesAbreviado}./${ano}`;
            } else {
                return `${dia}/${mesAbreviado}.`;
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
            // axios.get('http://192.168.0.5:8000/api/pessoa/', {
            // })
            //     .then((response) => {
            //         this.gerente = response.data
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });

            axios.get('http://192.168.0.5:8000/api/usuario/', {
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

        mostrarBotao(id, mostrar) {
            if (mostrar == true) {
                document.getElementById('botaoEdicao' + id).style.visibility = ''
            }
            if (mostrar == false) {
                document.getElementById('botaoEdicao' + id).style.visibility = 'hidden'
            }
        },

        getBacklogs() {
            axios.get(`http://192.168.0.5:8000/api/planoAcao/buscar/${this.idProjeto}`)
                .then((response) => {
                    this.sprints = response.data;

                    // var id = localStorage.getItem('ultimaSprintEditada')
                    // if (id) {
                    //     setTimeout(() => {
                    //         document.getElementById('inputNovaTarefa' + id).focus();
                    //         localStorage.removeItem('ultimaSprintEditada')
                    //     }, 250)
                    // }

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

                axios.put(`http://192.168.0.5:8000/api/planoAcaoTarefa/atualizar/${idBacklog}`, {
                    usuario_id: this.idUsuario,
                    dtInicioReal: data
                })
                    .then(() => {

                        return this.getBacklogs()
                    })

            } if (status == 'Concluído') {

                axios.put(`http://192.168.0.5:8000/api/planoAcaoTarefa/atualizar/${idBacklog}`, {
                    usuario_id: this.idUsuario,
                    dtFimReal: data

                })
                    .then(() => {
                        return this.getBacklogs()
                    })

            } if (status == 'Pendente') {

                axios.put(`http://192.168.0.5:8000/api/planoAcaoTarefa/atualizar/${idBacklog}`, {
                    usuario_id: this.idUsuario,
                    dtInicioReal: null,
                    dtFimReal: null
                })
                    .then(() => {
                        return this.getBacklogs()
                    })

            }


        },

        abrirModalEditarBacklog(idBacklog, idSprint) {
            this.showEditarBacklog = true;

            let sprint = this.sprints[0]
            idSprint

            this.backlogeditado = sprint.tarefas.find(tarefa => tarefa.id === idBacklog);
        },

        editarBacklog(itemAlterado, idBacklog, novoValor) {

            axios.put(`http://192.168.0.5:8000/api/planoAcaoTarefa/atualizar/${idBacklog}`, {
                usuario_id: this.idUsuario,
                [itemAlterado]: novoValor
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

        somarHP(dados) {
            let somaPendentes = 0;
            let somaEmAndamento = 0;
            let somaConcluidos = 0;

            if (dados.tarefas) {
                dados.tarefas.forEach(backlog => {
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
                this.showEditarSprint = false
            }

        },

        fecharModal() {
            this.showIniciarSprint = false;
        },

        criarBacklog(id, descricao) {

            if (this.somenteBacklogs().length !== 0) {

                axios.post(`http://192.168.0.5:8000/api/planoAcaoTarefa/cadastrar`, {

                    planoAcao_id: id,
                    codigo: 'Tarefa - ' + (parseInt((this.somenteBacklogs()[0].codigo).match(/\d+$/)[0]) + 1),
                    descricao: descricao
                })
                    .then((response) => {
                        localStorage.setItem('ultimaSprintEditada', id)
                        var novoItem = {
                            "id": response.data.id,
                            "sprint_id": id,
                            "codigo": 'Tarefa - ' + (parseInt((this.somenteBacklogs()[0].codigo).match(/\d+$/)[0]) + 1),
                            "descricao": descricao,
                            "HP": 0,
                            "responsavel_id": 0,
                            "status": "Pendente",
                            "dtInicio": null,
                            "dtFim": null,
                            "dtInicioReal": null,
                            "dtFimReal": null,
                            "responsavel": null,
                            "anexos": []
                        };

                        const sprint = this.sprints.find(item => item.id === id)
                        sprint.tarefas.push(novoItem)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                axios.post(`http://192.168.0.5:8000/api/planoAcaoTarefa/cadastrar`, {

                    planoAcao_id: id,
                    codigo: 'Tarefa - 1',
                    descricao: descricao
                })
                    .then(() => {
                        sessionStorage.setItem('ultimaSprintEditada', id)
                        this.getBacklogs();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

        },

        apagarBacklog(idBacklog) {

            axios.put(`http://192.168.0.5:8000/api/planoAcaoTarefa/excluir/${idBacklog}`, {
                usuario_id: this.idUsuario
            })
                .then(() => {
                    this.getBacklogs()
                })
                .catch((error) => {
                    console.error(error);
                });
        },

    }
}
</script>

<style scoped>
@media (max-width: 1800px) {
    .container {
        margin-left: 13rem ;
        max-width: 1100px ;
    }

    .botaoHome {
    margin-left: 200px !important;
}

}

.botaoHome {
    font-size: 30px ;
    margin-left: 250px;
    cursor: pointer ;
    position: absolute ;
}

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
    border: 1px solid black;
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
}
</style>