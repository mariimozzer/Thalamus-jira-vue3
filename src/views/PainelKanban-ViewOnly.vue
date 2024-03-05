<template>
        <br><br><br><br>

    <div>
        <div style="width: 100%; justify-content: space-between; display: flex; margin-bottom: none; border-bottom: 2px solid rgb(0, 0, 0); align-items: center;">
            <i @click="verBacklogs" style="font-size: 30px; margin-left: 2rem; cursor: pointer;"
                class="bi bi-list-task botaoAdicionarSprint"></i>
            <h2>{{ nomeDoProjeto }}</h2>
            <i @click="verPainel" style="font-size: 30px; margin-right: 2rem; cursor: pointer; visibility: hidden;"
                class="bi bi-kanban botaoAdicionarSprint"></i>
        </div>
        <br>
        <div style="width: 100%; text-align: center; color: red;">
            <h6 style="margin-left: 1rem;">Acesso de leitor ! <br> Serão exibidas apenas as tarefas atribuídas a você.</h6>
        </div>
        <div>
            <div style="display: flex; flex-flow: row; justify-content: center;">
                <div class="colunas">
                    <h3 style="text-align: center;">Pendente</h3>
                    <draggableVue class="list-group bloco" :list="backlogsPendentes" group="backlogs" itemKey="codigo">
                        <template #item="{ element }">
                            <div class="list-group-item card">
                                <label>
                                    <div style="margin-bottom: 1rem;">
                                        <b style="font-size: 22px;">
                                            {{ element.codigo }} <br>
                                        </b>
                                        <b>
                                            {{ element.nomeSprint }}
                                        </b>

                                        <i style="color: rgb(255, 145, 0); font-size: 20px; position: absolute; top: 0; right: 0; margin-right: 0.5rem;"
                                            class="bi bi-stop-circle-fill"></i><br>

                                    </div>

                                    <b> Fim previsto: </b> <input style="outline: none;" type="date" v-model="element.dtFim"
                                        disabled><br><b>Responsável:</b>
                                    {{ element.responsavel }}
                                    <br>
                                    <b>Descrição: </b>
                                    <input type="text" :title="element.descricao" readonly v-model="element.descricao">
                                </label>
                                <br>
                            </div>
                        </template>
                    </draggableVue>
                </div>
                <div class="colunas">
                    <h3 style="text-align: center;">Em andamento</h3>
                    <draggableVue class="list-group bloco" :list="backlogsEmAndamento" group="backlogs" itemKey="codigo">
                        <template #item="{ element }">
                            <div class="list-group-item card">

                                <label>
                                    <div style="margin-bottom: 1rem;">
                                        <b style="font-size: 22px;">
                                            {{ element.codigo }} <br>
                                        </b>
                                        <b>
                                            {{ element.nomeSprint }}
                                        </b>


                                        <i style="color: rgb(0, 47, 255); font-size: 20px; position: absolute; top: 0; right: 0; margin-right: 0.5rem;"
                                            class="bi bi-fast-forward-circle-fill"></i><br>

                                    </div>

                                    <b>Fim previsto: </b><input style="outline: none;" type="date" v-model="element.dtFim"
                                        disabled><br><b>Responsável:</b>
                                    {{ element.responsavel }}
                                    <br>
                                    <b>Descrição: </b>
                                    <input type="text" :title="element.descricao" readonly v-model="element.descricao">
                                </label>
                                <br>
                            </div>
                        </template>
                    </draggableVue>
                </div>

                <div class="colunas">
                    <h3 style="text-align: center;">Concluído</h3>
                    <draggableVue class="list-group bloco" :list="backlogsConcluidos" group="backlogs" itemKey="codigo">
                        <template #item="{ element }">
                            <div class="list-group-item card">

                                <label>
                                    <div style="margin-bottom: 1rem;">
                                        <b style="font-size: 22px;">
                                            {{ element.codigo }} <br>
                                        </b>
                                        <b>
                                            {{ element.nomeSprint }}
                                        </b>
                                        <i style="color: rgb(0, 255, 0); font-size: 20px; position: absolute; top: 0; right: 0; margin-right: 0.5rem;"
                                            class="bi bi-check-circle-fill"></i><br>

                                    </div>

                                    <b>Fim previsto:</b> <input style="outline: none;" type="date" v-model="element.dtFim"
                                        disabled><br><b>Responsável:</b>
                                    {{ element.responsavel }}
                                    <br>
                                    <b>Descrição: </b>
                                    <input type="text" :title="element.descricao" readonly v-model="element.descricao">
                                </label>
                                <br>
                            </div>
                        </template>
                    </draggableVue>
                </div>
            </div>
        </div>
        <br><br>

        <br><br><br><br><br>
    </div>
</template>
<script>
import draggableVue from "@/vuedraggableVue";
import axios from "axios";


export default {
    components: {
        draggableVue,

    },
    data() {
        return {
            idUsuario: localStorage.getItem('id'),
            menu: false,
            filtro: 'Responsável',
            valorFiltro: '',
            teste: null,
            sprints: null,
            idProjeto: sessionStorage.getItem('idProjeto'),

            backlogsPendentes: [],
            backlogsEmAndamento: [],
            backlogsConcluidos: [],

            nomeDoProjeto: sessionStorage.getItem('nomeDoProjeto'),
        };
    },

    mounted() {
        this.getSprints()
    },

    watch: {
        // sprints: {
        //     handler: 'atualizarStatus',  // Chama a função atualizarLocalStore quando sprints é alterado
        //     deep: true,  // Observa mudanças profundas no array (necessário se houver alterações nos elementos do array)
        // },

        backlogsPendentes: {
            handler: 'atualizarStatus',
            deep: true
        },
        backlogsEmAndamento: {
            handler: 'atualizarStatus',
            deep: true
        },

        backlogsConcluidos: {
            handler: 'atualizarStatus',
            deep: true
        },
    },

    methods: {
        verBacklogs() {
            this.$router.push({ name: "sprintsVo" })
        },

        // verPainel() {
        //     this.$router.push({ name: "painel" })
        // },

        verProjetos() {
            this.$router.push({ name: "ControleDeProjetos" })
        },

        filtrarBacklogs() {

            this.backlogsPendentes = this.backlogsPendentes.filter(item => parseInt(item.responsavel_id) == parseInt(this.idUsuario));
            this.backlogsEmAndamento = this.backlogsEmAndamento.filter(item => parseInt(item.responsavel_id) == parseInt(this.idUsuario));
            this.backlogsConcluidos = this.backlogsConcluidos.filter(item => parseInt(item.responsavel_id) == parseInt(this.idUsuario));

        },

        filtrarRepetidos(array, chave) {

            const uniqueResponsaveis = [];
            if (chave == 'responsavel') {
                return array.filter(item => {
                    if (!uniqueResponsaveis.includes(item.responsavel)) {
                        uniqueResponsaveis.push(item.responsavel);
                        return true;
                    }
                    return false;
                });
            }
            if (chave == 'sprint') {
                return array.filter(item => {
                    if (!uniqueResponsaveis.includes(item.nomeSprint)) {
                        uniqueResponsaveis.push(item.nomeSprint);
                        return true;
                    }
                    return false;
                });
            }

        },

        getSprints() {
            axios.get(`http://192.168.0.5:8000/api/sprint/buscar/${this.idProjeto}`, {
            })
                .then((response) => {
                    this.sprints = response.data
                    this.getBacklogs()
                })
                .catch((error) => {
                    console.error(error);
                });

        },

        getBacklogs() {

            this.backlogs = this.sprints.map((item) => item.backlogs).flat();

            this.backlogs.forEach((item) => {
                switch (item.status) {
                    case 'Pendente':
                        this.backlogsPendentes.push(item);
                        break;
                    case 'Em andamento':
                        this.backlogsEmAndamento.push(item);
                        break;
                    case 'Concluído':
                        this.backlogsConcluidos.push(item);
                        break;
                    default:
                        console.error(`Status desconhecido: ${item.status}`);
                }
            });

            this.filtrarBacklogs()

        },

        atualizarStatus() {

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

            var backlog = JSON.parse(sessionStorage.getItem('tarefaMovida'));

            if (backlog !== null) {
                var idBacklog = backlog.id

                if (JSON.stringify(this.backlogsPendentes).includes(JSON.stringify(backlog))) {

                    axios.put(`http://192.168.0.5:8000/api/sprintTarefa/atualizar/${idBacklog}`, {
                        usuario_id: 1,
                        status: 'Pendente',
                        dtInicioReal: null,
                        dtFimReal: null
                    })
                } else {
                    if (JSON.stringify(this.backlogsEmAndamento).includes(JSON.stringify(backlog))) {

                        axios.put(`http://192.168.0.5:8000/api/sprintTarefa/atualizar/${idBacklog}`, {
                            usuario_id: 1,
                            status: 'Em andamento',
                            dtInicioReal: data
                        })
                    } else {
                        if (JSON.stringify(this.backlogsConcluidos).includes(JSON.stringify(backlog))) {

                            axios.put(`http://192.168.0.5:8000/api/sprintTarefa/atualizar/${idBacklog}`, {
                                usuario_id: 1,
                                status: 'Concluído',
                                dtFimReal: data
                            })
                        }
                    }
                }

                sessionStorage.removeItem('tarefaMovida')

            }
        },

    }
};
</script>

<style>
.divFiltro {
    width: fit-content;
    margin-left: 2rem;
}

.card {
    background-color: white;
    border: 1px solid black;
    margin: 0.3rem;
    border-radius: 20px;
}


.bloco {
    background-color: rgb(247, 247, 247);
    border: 2px solid black;
    height: 100%;
    border-radius: 20px;
}

.colunas {
    width: 30%;
    margin-left: 1rem;
    border-radius: 20px;
}
</style>
  