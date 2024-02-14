<template>
    <div>

        <div class="divFiltro">
            <v-menu v-model="menu" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn style="width: 2rem; height: 2rem;" icon="mdi-filter-menu" v-bind="props"></v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
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
                        </v-list-item>

                        <v-list-item>
                            <label>
                                Igual a:
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

                                    <i style="color: rgb(255, 0, 0); font-size: 20px; position: absolute; top: 0; right: 0; margin-right: 0.5rem;"
                                        class="bi bi-stop-circle-fill"></i><br>

                                </div>

                                <b> Fim previsto: </b> <input style="outline: none;" type="date" v-model="element.dtFim"
                                    disabled><br><b>Responsável:</b>
                                {{ element.responsavel }}
                                <br>
                                <b>Descrição:</b>
                                {{ element.descricao }}
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
                                <b>Descrição:</b>
                                {{ element.descricao }}
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
                                <b>Descrição:</b>
                                {{ element.descricao }}
                            </label>
                            <br>
                        </div>
                    </template>
                </draggableVue>
            </div>
        </div>
    </div>
    <br><br><br><br><br>
</template>
<script>
import draggableVue from "@/vuedraggableVue";

export default {
    components: {
        draggableVue
    },
    data() {
        return {
            menu: false,
            filtro: 'Responsável',
            valorFiltro: '',
            teste: null,
            sprints: [{
                id: 0,
                nome: "Plano de ação",
                backlogs: [],
                ultimoBacklog: 0,
                dtTermino: null
            }
            ],

            backlogsPendentes: [],
            backlogsEmAndamento: [],
            backlogsConcluidos: [],
        };
    },

    mounted() {
        this.getSprints()
    },

    watch: {
        sprints: {
            handler: 'atualizarStatus',  // Chama a função atualizarLocalStore quando sprints é alterado
            deep: true,  // Observa mudanças profundas no array (necessário se houver alterações nos elementos do array)
        },

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
        filtrarBacklogs(valor, item) {
            this.getBacklogs();
            if (valor != "" && item == 'Responsável') {
                this.backlogsPendentes = this.backlogsPendentes.filter(item => item.responsavel == valor);
                this.backlogsEmAndamento = this.backlogsEmAndamento.filter(item => item.responsavel == valor);
                this.backlogsConcluidos = this.backlogsConcluidos.filter(item => item.responsavel == valor);
            }
            if (valor != "" && item == 'Sprint') {
                this.backlogsPendentes = this.backlogsPendentes.filter(item => item.nomeSprint == valor);
                this.backlogsEmAndamento = this.backlogsEmAndamento.filter(item => item.nomeSprint == valor);
                this.backlogsConcluidos = this.backlogsConcluidos.filter(item => item.nomeSprint == valor);
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
            if (localStorage.getItem('sprints') == null) {
                var localData = JSON.stringify(this.sprints);
                localStorage.setItem('sprints', localData)
            } else {
                this.sprints = JSON.parse(localStorage.getItem('sprints'))
            }

            this.getBacklogs()
        },

        getBacklogs() {

            this.sprints.forEach((item) => {
                item.backlogs.forEach((backlog) => {
                    backlog.nomeSprint = item.nome;
                });
            });
            this.backlogs = this.sprints.map((item) => item.backlogs);
            this.backlogs = this.backlogs.flat();

            const pendentes = [];
            const emAndamento = [];
            const concluidos = [];

            this.backlogs.forEach((item) => {
                switch (item.status) {
                    case 'Pendente':
                        pendentes.push(item);
                        break;
                    case 'Em andamento':
                        emAndamento.push(item);
                        break;
                    case 'Concluído':
                        concluidos.push(item);
                        break;
                    default:
                        console.error(`Status desconhecido: ${item.status}`);
                }
            });

            this.backlogsPendentes = pendentes;
            this.backlogsEmAndamento = emAndamento
            this.backlogsConcluidos = concluidos;
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

            this.backlogsPendentes.forEach((item) => item.status = "Pendente");
            this.backlogsPendentes.forEach((item) => {
                this.sprints.find(sprint => sprint.nome === item.nomeSprint).backlogs.find(backlog => backlog.id == item.id).status = "Pendente";
            });

            this.backlogsEmAndamento.forEach((item) => item.status = "Em andamento");
            this.backlogsEmAndamento.forEach((item) => {
                this.sprints.find(sprint => sprint.nome === item.nomeSprint).backlogs.find(backlog => backlog.id == item.id).status = "Em andamento";
                this.definirInicioFimReal(item.id, item.nomeSprint, "Em andamento")
            });

            this.backlogsConcluidos.forEach((item) => item.status = "Concluído");
            this.backlogsConcluidos.forEach((item) => {
                this.sprints.find(sprint => sprint.nome === item.nomeSprint).backlogs.find(backlog => backlog.id == item.id).status = "Concluído";
                this.definirInicioFimReal(item.id, item.nomeSprint, "Concluído")
            });

            this.atualizarLocalStore()
        },

        definirInicioFimReal(idBacklog, nomeSprint, status) {
            let sprint = this.sprints.find(sprint => sprint.nome === nomeSprint);
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

        atualizarLocalStore() {
            localStorage.clear()
            var localData = JSON.stringify(this.sprints)
            localStorage.setItem('sprints', localData)
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
    border-radius: 10px;
}


.bloco {
    background-color: rgb(247, 247, 247);
    border: 1px solid black;
    height: 100%;
}

.colunas {
    width: 30%;
    margin-left: 1rem;
}
</style>
  