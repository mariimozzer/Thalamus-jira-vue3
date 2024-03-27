<template>
    <br><br><br><br>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">
                    <div class="input-group mb-3" style="width: 20rem; position: absolute;">
                        <span class="input-group-text" id="basic-addon1"><i
                                class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" placeholder="Pesquisar Projeto" aria-label="Username"
                            aria-describedby="basic-addon1" v-model="projetoSelecionado" @input="filtrarProjetos()">
                    </div>

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Projetos</h3>
                    </div>
                    <button :title="'Adicionar Projeto'" style="width: max-content; font-size: 30px;"
                        @click="this.modalNovoProjeto = true" class="botaoAdicionarSprint">
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
                                <th scope="col">Nome do Projeto </th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de Início</th>
                                <th scope="col">Data de Termino</th>
                                <th scope="col">Gerente Responsável</th>
                                <th scope="col">Setor Beneficiado</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in listaProjetosFiltrada" :key="item.id"
                                @mouseover="mostrarBotao(item.id, true)" @click="verBacklogs(item.id, item.nome)"
                                @mouseleave="mostrarBotao(item.id, false)">
                                <td style="vertical-align: middle;">{{ item.nome }}</td>
                                <td style="vertical-align: middle;"><select v-model="item.status" class="form-select"
                                        :style="{ 'color': (item.status == 'Pendente') ? 'rgb(255, 145, 0)' : (item.status == 'Em andamento') ? 'rgb(0, 47, 255)' : (item.status == 'Concluído') ? 'rgb(0, 192, 0)' : 'red', }"
                                        style="width: 10rem; outline: none; text-align: center; border: none; background-color: transparent; "
                                        @click.stop @change="editarProjetoInLine(item.id, 'status', item.status)">
                                        <option style="color: red;">Proposto</option>
                                        <option style="color: rgb(255, 145, 0);">Pendente</option>
                                        <option style="color: rgb(0, 47, 255);">Em andamento</option>
                                        <option style="color: rgb(0, 192, 0);">Concluído</option>
                                    </select></td>
                                <td style="text-align: center; vertical-align: middle;">
                                    <input v-if="Array.isArray(projetos) && projetos.length > 0" type="date"
                                        v-model="item.dtInicio" disabled style="text-align: center; width: 8rem;">
                                </td>
                                <td style="text-align: center; vertical-align: middle;">
                                    <input v-if="item.dtTermino" type="date" v-model="item.dtTermino" disabled
                                        style="text-align: center; width: 8rem;">
                                    <label v-if="!item.dtTermino" style="width: 8rem;">-</label>
                                </td>
                                <td style="text-align: center; vertical-align: middle;">
                                    <select id="gerente" v-model="item.gerente_id" disabled
                                        style="text-align: center; padding: none; width: 13rem;">
                                        <option v-for="pessoa in gerente" :key="pessoa.nomeCompleto" :value="pessoa.id">
                                            {{ nomeEsobrenome(pessoa.nomeCompleto) }}
                                        </option>
                                    </select>
                                </td>
                                <td style="text-align: center; vertical-align: middle;">{{ item.setor }}</td>
                                <td style="vertical-align: middle;">
                                    <div style="width: max-content; visibility: hidden;" :id="'botaoEdicao' + item.id">
                                        <v-menu v-if="Array.isArray(projetos) && projetos.length > 0">
                                            <template v-slot:activator="{ props }">
                                                <v-btn style="width: 1.6rem; height: 1.6rem; border: 1px solid black;"
                                                    class="botaoAdicionarSprint" icon="mdi-dots-horizontal"
                                                    v-bind="props"></v-btn>
                                            </template>

                                            <v-list>
                                                <v-list-item
                                                    @click="modalCompartilharProjeto = true, this.projetoEditado = item"
                                                    :disabled="(this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1"
                                                    :style="{ 'cursor': (this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'not-allowed' : 'pointer', 'color': (this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'grey' : 'black' }">
                                                    Compartilhar
                                                    <br />
                                                </v-list-item>
                                                <v-list-item
                                                    :disabled="(this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1"
                                                    :style="{ 'cursor': (this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'not-allowed' : 'pointer', 'color': (this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'grey' : 'black' }"
                                                    @click="modalEditarProjeto = true, this.projetoEditado = item">
                                                    Editar
                                                    <br />
                                                </v-list-item>
                                                <v-list-item
                                                    :disabled="item.dtTermino || (this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1"
                                                    :style="{ 'cursor': (item.dtTermino) || (this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'not-allowed' : 'pointer', 'color': (item.dtTermino) || (this.projetos.find(projeto => projeto.id == item.id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'grey' : 'black', }"
                                                    @click="modalFinalizarProjeto = true, this.projetoEditado = item">
                                                    Finalizar
                                                    <br />
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
    <!-- modal novo projeto -->
    <div style="overflow: auto" class="modal-mask" v-if="modalNovoProjeto" @click="fecharModalFora">
        <div style="max-height: 80%; max-width: 900px ;width: 70%; padding: 3rem; " class="modal-container">
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
                            <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                                {{ setor.nome }}
                            </option>
                        </select>
                    </div>
                </div>

                <div style="display: flex;">
                    <div class="form-group" style="width: 20rem;">
                        <label for="gerente">Programa</label>
                        <select id="gerente" class="form-select">
                            <option>
                                nenhum
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
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; "
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Editar: {{ projetoEditado.nome }} </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.getProjetos, this.modalEditarProjeto = false"></button>
                </div>
                <hr>
                <br>

                <div style="display: flex; width: 100%;">
                    <div style="display: flex; flex-flow: column; width: 50%">
                        <div class="form-group">
                            <label for="nome">Nome do Projeto</label>
                            <input id="nome" type="text" v-model="projetoEditado.nome" class="form-control"
                                @focusout="editarProjeto('nome', projetoEditado.nome)">
                        </div>

                        <div class="form-group">
                            <label for="gerente">Gerente Responsável</label>
                            <select id="gerente" @change="editarProjeto('gerente_id', $event.target.value)"
                                v-model="projetoEditado.gerente_id" class="form-select">
                                <option v-for="pessoa in gerente" :key="pessoa.nome" :value="pessoa.id">
                                    {{ pessoa.nomeCompleto }}
                                </option>
                            </select>
                        </div>

                        <div style="display: flex; flex-flow: column;">
                            <div style="width: 100%; justify-content: space-between; display: flex;">
                                <span>
                                    Anexos:
                                </span>
                                <i title="Adicionar anexo"
                                    style="font-size: 20px; cursor: pointer; justify-self: right;"
                                    class="bi bi-plus-circle" @click="openFileInput"></i>
                            </div>

                            <input style="display: none;" ref="fileInput" class="form-control form-control-sm"
                                type="file" @change="handleFileUpload">

                            <ul style="list-style: none; padding-left: 0rem; overflow: auto; max-height: 8.5rem;">
                                <li v-for="item in projetoEditado.anexos" :key="item"
                                    @mouseover="mostrarBotaoExcluirAnexo(item.id, true)"
                                    @mouseleave="mostrarBotaoExcluirAnexo(item.id, false)">
                                    <div
                                        style="margin-left: 0rem; padding-left: 0rem; border: 1px solid black; border-radius: 10px; padding: 5px; display: flex; width: 20rem; justify-content: space-between;">
                                        <a :href="'http://192.168.0.5:8000/storage/' + item.path" target="_blank"
                                            class="link">
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

                    <div style="display: flex; flex-flow: column; width: 50%;">

                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                            <label for="data">Data de Início</label>
                            <input id="data" type="date" ref="dtInicio" v-model="projetoEditado.dtInicio"
                                class="form-control" @change="editarProjeto('dtInicio', $event.target.value)">
                            <label for="data" style="margin-top: 1rem;">Data de Termino</label>
                            <input id="data" type="date" ref="dtTermino" v-model="projetoEditado.dtTermino"
                                class="form-control" @change="editarProjeto('dtTermino', $event.target.value)">
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
                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
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
                </div>
            </div>
        </div>
    </div>
    <!-- fim modal -->

    <!-- MODAL Finalizar Projeto-->
    <div class="modal-mask" v-if="modalFinalizarProjeto" @click="fecharModalFora">
        <div class="modal-container" style="height: min-content; width: 50rem;">
            <div style="display: flex; justify-content: center">
                <h5>{{ projetoEditado.nome }}</h5>
            </div>
            <br>

            <div style="width: 100%;">
                <div>
                    <label>Data de termino do projeto:</label>
                    <input :class="{ shake: disabled }" v-model="dataTerminoProjeto" id="dataTermino"
                        class="form-control" type="date">
                </div>
                <div style="margin-top: 1rem;">
                    <button class="button-default" @click="finalizarProjeto()">
                        Finalizar Projeto</button>
                </div>
            </div>

        </div>
    </div>
    <!--END MODAL-->

    <!-- MODAL compartilhar Projeto-->

    <div style="overflow: auto" class="modal-mask" v-if="modalCompartilharProjeto" @click="fecharModalFora">
        <div style="height: 100rem ;width: 50rem; padding: 3rem; margin-bottom: 2rem; " class="modal-container">

            <div>

                <h3 class="titulo">Compartilhar: {{ projetoEditado.nome }} </h3>
                <hr>
                <br>
            </div>
            <div style="width: 100%; display: flex; justify-content: center;">
                <div style="display: flex; flex-flow: column; width: 100%; height: 10rem;">
                    <input type="text" v-model="pessoaSelecionada" class="form-control"
                        @focusin="this.procurar($event.target.value)"
                        style="background-color: #f1f1f1; color: black; padding-top : 1.5rem; padding-bottom: 1.5rem;"
                        @input="this.procurar($event.target.value)" @focusout="fecharLista()"
                        placeholder="Adicionar Participante">

                    <div style="height: fit-content; max-height: 15rem ; overflow: auto; background-color: #f1f1f1; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; position: absolute; margin-top: 3.5rem; width: 30rem;"
                        v-if="listaPessoasFiltrada">
                        <ul style="list-style: none;">
                            <li @click="atualizarPermissão(item, 'adicionar')" v-for="item in listaPessoasFiltrada"
                                :key="item.id">
                                <div style="display: flex; ; align-items: center; padding: 5px; border-radius: 10px; margin-right: 3rem;"
                                    :style="{ 'color': (this.projetoEditado.permissao.map((item) => item.usuario_id)).includes(item.id) ? 'grey' : 'black', 'cursor': (this.projetoEditado.permissao.map((item) => item.usuario_id)).includes(item.id) ? 'not-allowed' : '' }">
                                    {{ item.nomeCompleto }} {{ (this.projetoEditado.permissao.map((item) =>
                                item.usuario_id)).includes(item.id) ? '(Já adicionado)' : '' }}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <br>
                    <h5>Pessoas com acesso:</h5>
                    <ul style="list-style: none; padding-left: 0rem !important;">
                        <li v-for="item in reordenarArray(projetoEditado.permissao) " :key="item.usuario_id"
                            style="display: flex; align-items: center;">
                            <div
                                style="display: flex; border: 1px solid black; align-items: center; justify-content: space-between; padding: 5px; border-radius: 10px; width: 90%;">
                                {{ item.nome }} {{ item.usuario_id == projetoEditado.gerente_id ? '(Gerente)' :
                                item.usuario_id == this.idUsuario ? '(Você)' : '' }}
                                <select style="width: 7rem; text-align: center;" class="form-select"
                                    v-model="item.nivel" @change="atualizarPermissão(item, 'atualizar')"
                                    :disabled="item.usuario_id == projetoEditado.gerente_id || item.usuario_id == this.idUsuario">
                                    <option value="1">Leitor</option>
                                    <option value="2">Editor</option>
                                </select>
                            </div>
                            <i v-if="parseInt(item.usuario_id) !== parseInt(this.idUsuario) && parseInt(item.usuario_id) !== parseInt(this.projetoEditado.gerente_id)"
                                @click=" atualizarPermissão(item, 'remover')"
                                style="margin-left: 1rem; font-size: 20px; color: red;" :id="'botaoEdicao' + item.id"
                                class="bi bi-dash-circle botaoAdicionarSprint"></i>
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
import { ref } from 'vue';
import axios from 'axios'
import { devURL } from '../../services/api'
import { prodURL } from '../../services/api'

export default {
    name: "ControleDeProjetos",

    setup() {
        const fileInput = ref(null);

        const openFileInput = () => {
            fileInput.value.click();
        };

        return { fileInput, openFileInput, };
    },

    data() {
        return {
            inputArquivo: false,
            idUsuario: null,
            pessoaSelecionada: null,
            projetoSelecionado: null,
            listaProjetosFiltrada: null,
            listaPessoasFiltrada: null,
            pessoasComAcessoPorProjeto: [],
            dataTerminoProjeto: null,
            teste: 'teste',
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
            userName: '',
            devURL: devURL,
            prodURL: prodURL
        }
    },

    mounted() {
        this.getProjetos(),
            this.getGerenteseSetor()
        localStorage.removeItem('ultimaSprintEditada'),
            sessionStorage.removeItem('ultimaSprintEditada')

    },

    created() {
        this.userName = localStorage.getItem('userName'),
            this.idUsuario = localStorage.getItem('id')
    },

    methods: {

        filtrarProjetos() {
            if (!this.projetoSelecionado) {
                this.listaProjetosFiltrada = this.projetos;
            } else {
                const textoLowerCase = this.projetoSelecionado.toLowerCase();
                this.listaProjetosFiltrada = this.projetos.filter(projeto => {
                    return projeto.nome.toLowerCase().includes(textoLowerCase);
                });
            }
        },

        handleFileUpload() {
            const fileInput = this.$refs.fileInput;

            // Verifique se o elemento de input de arquivo existe e tem arquivos
            if (fileInput && fileInput.files.length > 0) {
                const formData = new FormData();
                formData.append('projeto_id', this.projetoEditado.id);

                // Adicione todos os arquivos presentes no input
                for (let i = 0; i < fileInput.files.length; i++) {
                    formData.append('anexos[]', fileInput.files[i]);
                }

                // Envie a requisição usando Axios
                // axios.post('http://192.168.0.5:8000/api/projeto/anexo/adicionar', formData)
                axios.post(`${this.prodURL}/projeto/anexo/adicionar`, formData)
                    .then(response => {
                        this.projetoEditado.anexos.push({
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
            axios.delete(`http://192.168.0.5:8000/api/projeto/anexo/remover/${id}`);
            this.projetoEditado.anexos = this.projetoEditado.anexos.filter(anexo => anexo.id !== id)
        },

        reordenarArray(array) {
            var id = this.projetoEditado.gerente_id
            // var idUserLogado = parseInt(localStorage.getItem('id'))

            const primeiroElemento = array.find(item => parseInt(item.usuario_id) === id);
            const arraySemPrimeiroElemento = [array.filter(item => item.usuario_id !== parseInt(id))];
            return [].concat(primeiroElemento, ...arraySemPrimeiroElemento)


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

        atualizarPermissão(item, ação) {
            if ((this.projetoEditado.permissao.map((item) => item.usuario_id)).includes(item.id)) {
                return
            } else {

                if (ação == 'adicionar') {

                    var novaPermissão = {
                        usuario_id: item.id,
                        nivel: 1,
                        nome: item.nomeCompleto
                    }
                    this.projetoEditado.permissao.push(novaPermissão);

                    axios.post(`http://192.168.0.5:8000/api/permissao/projeto/${this.projetoEditado.id}`, {
                        usuarios: this.projetoEditado.permissao
                    })
                        .then(() => {
                            this.listaPessoasFiltrada = null;
                            this.pessoaSelecionada = null
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                if (ação == 'remover') {
                    this.projetoEditado.permissao = this.projetoEditado.permissao.filter(pessoa => pessoa.usuario_id !== parseInt(item.usuario_id));
                    axios.post(`http://192.168.0.5:8000/api/permissao/projeto/${this.projetoEditado.id}`, {
                        usuarios: this.projetoEditado.permissao
                    })
                        .then(() => {
                            this.listaPessoasFiltrada = null;
                            this.pessoaSelecionada = null
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                if (ação == 'atualizar') {

                    axios.post(`http://192.168.0.5:8000/api/permissao/projeto/${this.projetoEditado.id}`, {
                        usuarios: this.projetoEditado.permissao
                        // .filter(item => item.usuario_id !== parseInt(this.idUsuario))
                    })
                        .then(() => {
                            this.listaPessoasFiltrada = null;
                            this.pessoaSelecionada = null
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }

        },

        fecharLista() {
            setTimeout(() => {
                this.listaPessoasFiltrada = null;
                this.pessoaSelecionada = null;
            }, 200);
        },

        procurar(texto) {
            if (!texto) {
                this.listaPessoasFiltrada = this.gerente
                // .filter(item => !(this.projetoEditado.permissao.map((item) => item.usuario_id)).includes(item.id));
            } else {
                if (this.listaPessoasFiltrada !== null) {
                    // this.listaPessoasFiltrada = this.gerente.filter(item => !(this.projetoEditado.permissao.map((item) => item.usuario_id)).includes(item.id));
                    this.listaPessoasFiltrada = this.gerente
                    this.listaPessoasFiltrada = this.listaPessoasFiltrada.filter(nome => nome.nomeCompleto.toLowerCase().includes(texto.toLowerCase()));
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
            axios.put(`http://192.168.0.5:8000/api/projeto/atualizar/${this.projetoEditado.id}`, {
                dtTermino: this.dataTerminoProjeto,
                status: "Concluído"
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

        mostrarBotaoExcluirAnexo(id, mostrar) {
            if (mostrar == true) {
                document.getElementById('botaoExcluir' + id).style.visibility = ''
            }
            if (mostrar == false) {
                document.getElementById('botaoExcluir' + id).style.visibility = 'hidden'
            }
        },

        editarProjeto(itemAlterado, novoValor) {

            axios.put(`http://192.168.0.5:8000/api/projeto/atualizar/${this.projetoEditado.id}`, {
                [itemAlterado]: novoValor,
            })
        },

        editarProjetoInLine(idProjeto, itemAlterado, novoValor) {

            if (novoValor !== "Concluído") {

                axios.put(`http://192.168.0.5:8000/api/projeto/atualizar/${idProjeto}`, {
                    [itemAlterado]: novoValor,
                    dtTermino: null
                })
                    .then(() => {
                        this.getProjetos()
                    })
            }
            if (novoValor == "Concluído") {
                var dataAtual = new Date().toISOString().split('T')[0];
                // axios.put(`http://192.168.0.5:8000/api/projeto/atualizar/${idProjeto}`, {
                axios.put(`${this.prodURL}/projeto/atualizar/${idProjeto}`, {

                    [itemAlterado]: novoValor,
                    dtTermino: dataAtual
                })
                    .then(() => {
                        this.getProjetos()
                    })
            }
        },

        adicionarProjeto() {
            // axios.post('http://192.168.0.5:8000/api/projeto/cadastrar', {
            axios.post(`${this.prodURL}/projeto/cadastrar`, {

                nome: this.novoProjeto.nome,
                dtInicio: this.novoProjeto.dtInicio,
                gerente_id: this.novoProjeto.gerente_id,
                setor_id: this.novoProjeto.setor_id,
                usuario_id: this.idUsuario,
                status: "Proposto"
            })
                .then((response) => {
                    this.getProjetos();
                    this.modalNovoProjeto = false;
                    this.novoProjeto = {
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

        verBacklogs(id, nomeProjeto) {
            if (this.projetos.length > 0) {
                if ((this.projetos.find(projeto => projeto.id == id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 2) {
                    this.$router.push({ name: "sprints" })
                    sessionStorage.setItem('idProjeto', id)
                    sessionStorage.setItem('nomeDoProjeto', nomeProjeto)
                }
                if ((this.projetos.find(projeto => projeto.id == id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1) {
                    this.$router.push({ name: "sprintsVo" })
                    sessionStorage.setItem('idProjeto', id)
                    sessionStorage.setItem('nomeDoProjeto', nomeProjeto)
                }
            }

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
            // axios.get('http://192.168.0.5:8000/api/usuario/', {
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

            // axios.get('http://192.168.0.5:8000/api/setor', {
            axios.get(`${this.prodURL}/setor`, {

            })
                .then((response) => {
                    this.setores = response.data
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getProjetos() {
            var id = parseFloat(localStorage.getItem('id'))
            // axios.get(`http://192.168.0.5:8000/api/projeto/usuario/${id}`, {
            axios.get(`${this.prodURL}/projeto/usuario/${id}`, {

            })
                .then((response) => {
                    this.projetos = response.data;
                    this.filtrarProjetos()
                })
                .catch((error) => {
                    console.error(error);
                });

            // axios.get(`http://192.168.0.5:8000/api/projeto/listar`, {
            // })
            //     .then((response) => {
            //         this.projetos = response.data;
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });
        }
    }

}
</script>

<style scoped>
.fa-solid {
    margin-left: 0rem !important;
}

.link {
    color: black;
    text-decoration: none;
}

.link:hover {
    color: rgb(0, 102, 255);

}

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