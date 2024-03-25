<template>
    <br><br><br>
    <div
        style="width: 100%; margin-top: 1rem; justify-content: space-between; display: flex; margin-bottom: none; border-bottom: 2px solid rgb(0, 0, 0); align-items: center;">
        
        <i @click="verBacklogs" style="font-size: 30px; margin-left: 260px; cursor: pointer;"
            class="bi bi-list-task botaoAdicionarSprint" :title="'Ir para tela de sprints'"></i>

        <!-- <i @click="verBacklogs" class="bi bi-list-task botaoAdicionarSprint botaoHome"
            :title="'Ir para tela de sprints'"></i> -->

        <h2>{{ nomeDoProjeto }}</h2>
        <i @click="verPainel" style="font-size: 30px; margin-right: 2rem; cursor: pointer; visibility: hidden;"
            class="bi bi-kanban botaoAdicionarSprint"></i>
    </div>
    <br>
    <div style="width: 100%; justify-content: center; align-content: center; display: flex;">
        <div class="container" style="margin-top: 0px !important; padding-top: 0px !important;">

            <div class="divFiltro">
                <v-menu v-model="menu" :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn style="width: 2.5rem; height: 2.5rem;" icon="mdi-filter-menu" v-bind="props"></v-btn>
                    </template>

                    <v-card>
                        <v-list>
                            <!-- <v-list-item>
                                <label> Filtrar: </label>
                                <select v-model="filtro" class="form-select" style="
                width: fit-content;
                margin-inline: 0.5rem;
                background-color: transparent;
                border: 1px solid black;
              ">
                                    <option>Responsável</option>
                                    <option>Sprint</option>
                                </select>
                            </v-list-item> -->

                            <v-list-item>
                                <label>
                                    Filtrar responsável:
                                </label>
                                <select v-if="this.filtro == 'Responsável'" v-model="valorFiltro"
                                    style=" width: fit-content; margin-inline: 0.5rem; background-color: transparent; border: 1px solid black;"
                                    class="form-select" @change="filtrarBacklogs(this.valorFiltro, this.filtro)">
                                    <option value="">Todos</option>
                                    <option
                                        v-for="backlog in filtrarRepetidos(sprints.map((item) => item.backlogs).flat(), 'responsavel')"
                                        :key="backlog">{{ backlog.responsavel
                                        }}</option>
                                </select>

                                <select v-if="this.filtro == 'Sprint'" v-model="valorFiltro"
                                    style=" width: fit-content; margin-inline: 0.5rem; background-color: transparent; border: 1px solid black;"
                                    class="form-select" @change="filtrarBacklogs(this.valorFiltro, this.filtro)">
                                    <option value="">Todos</option>
                                    <option
                                        v-for="backlog in filtrarRepetidos(sprints.map((item) => item.backlogs).flat(), 'sprint')"
                                        :key="backlog">{{ backlog.nomeSprint
                                        }}</option>
                                </select>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </div>
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

                                    <b> Fim previsto: </b> <input style="outline: none;" type="date"
                                        v-model="element.dtFim" disabled><br><b>Responsável:</b>
                                    {{ element.responsavel }}
                                    <br>
                                    <b>Descrição: </b>
                                    <textarea cols="40" v-model="element.descricao" readonly
                                        style="cursor: auto; width: 100%; height: fit-content;"></textarea>
                                </label>
                                <br>
                            </div>
                        </template>
                    </draggableVue>
                </div>
                <div class="colunas">
                    <h3 style="text-align: center;">Em andamento</h3>
                    <draggableVue class="list-group bloco" :list="backlogsEmAndamento" group="backlogs"
                        itemKey="codigo">

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

                                    <b>Fim previsto: </b><input style="outline: none;" type="date"
                                        v-model="element.dtFim" disabled><br><b>Responsável:</b>
                                    {{ element.responsavel }}
                                    <br>
                                    <b>Descrição: </b>
                                    <textarea cols="40" v-model="element.descricao" readonly
                                        style="cursor: auto; width: 100%; height: fit-content;"></textarea>
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

                                    <b>Fim previsto:</b> <input style="outline: none;" type="date"
                                        v-model="element.dtFim" disabled><br><b>Responsável:</b>
                                    {{ element.responsavel }}
                                    <br>
                                    <b>Descrição: </b>
                                    <textarea cols="40" v-model="element.descricao" readonly
                                        style="cursor: auto; width: 100%; height: fit-content;"></textarea>
                                </label>
                                <br>
                            </div>
                        </template>
                    </draggableVue>
                </div>
            </div>
        </div>
        <br><br>
    </div>
    <br><br><br><br><br>
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
            this.$router.push({ name: "sprints" })
        },

        verPainel() {
            this.$router.push({ name: "painel" })
        },

        verProjetos() {
            this.$router.push({ name: "ControleDeProjetos" })
        },

        filtrarBacklogs(valor, item) {
            this.backlogsPendentes = [];
            this.backlogsEmAndamento = [];
            this.backlogsPendentes = []
            this.getBacklogs()
            if (valor != "") {
                if (item == 'Responsável') {
                    this.backlogsPendentes = this.backlogsPendentes.filter(item => item.responsavel == valor);
                    this.backlogsEmAndamento = this.backlogsEmAndamento.filter(item => item.responsavel == valor);
                    this.backlogsConcluidos = this.backlogsConcluidos.filter(item => item.responsavel == valor);
                }
                if (item == 'Sprint') {
                    this.backlogsPendentes = this.backlogsPendentes.filter(item => item.nomeSprint == valor);
                    this.backlogsEmAndamento = this.backlogsEmAndamento.filter(item => item.nomeSprint == valor);
                    this.backlogsConcluidos = this.backlogsConcluidos.filter(item => item.nomeSprint == valor);
                }
            }
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
.conteudoKanban {
    max-width: 1500px;
}

@media (max-width: 1800px) {

    .conteudoKanban {
        max-width: 1250px;
        margin-left: 6rem;
    }

}

/* .fa-solid {
    margin-left: 3rem;
}

@media (max-width: 1800px) {
    .botaoHome {
    font-size: 30px;
    margin-left: 2rem !important;
    cursor: pointer;
    position: absolute;
}

.container {
    margin-left: 13.5rem !important;
}

.fa-solid {
    margin-left: 13.5rem !important;
}

} */

/* .botaoHome {
    font-size: 30px;
    margin-left: 260px !important;
    cursor: pointer;
    position: absolute;
} */


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