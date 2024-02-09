<template>
    <!-- {{ backlogsPendentes.map((item) => item.codigo) }} /
    {{ backlogsEmAndamento.map((item) => item.codigo) }} /
    {{ backlogsConcluidos.map((item) => item.codigo) }} -->

    <div>

        <div style="display: flex; flex-flow: row; justify-content: center;">
            <div class="colunas">
                <h3 style="text-align: center;">Pendente</h3>
                <draggableVue class="list-group bloco" :list="backlogsPendentes" group="backlogs" itemKey="codigo">
                    <template #item="{ element }">
                        <div class="list-group-item card">

                            <label class="subcard">
                                <div>

                                    <b>{{ element.nomeSprint }}: {{ element.codigo }}</b>

                                    <i style="color: rgb(255, 0, 0); font-size: 20px; position: absolute; top: 0; right: 0; margin-right: 0.5rem;"
                                        class="bi bi-stop-circle-fill"></i><br>

                                </div>

                                <b> Fim previsto: <input style="outline: none;" type="date" v-model="element.dtFim"
                                        disabled></b><br><b>Responsável:</b>
                                {{ element.responsavel }}
                            </label>
                            <br>
                            {{ element.descricao }}
                        </div>
                    </template>
                </draggableVue>
            </div>

            <div class="colunas">
                <h3 style="text-align: center;">Em andamento</h3>
                <draggableVue class="list-group bloco" :list="backlogsEmAndamento" group="backlogs" itemKey="codigo">
                    <template #item="{ element }">
                        <div class="list-group-item card">

                            <label class="subcard">
                                <div>

                                    <b>{{ element.nomeSprint }}: {{ element.codigo }}</b>

                                    <i style="color: rgb(0, 47, 255); font-size: 20px; position: absolute; top: 0; right: 0; margin-right: 0.5rem;"
                                        class="bi bi-fast-forward-circle-fill"></i><br>

                                </div>

                                <b>Fim previsto: <input style="outline: none;" type="date" v-model="element.dtFim"
                                        disabled></b><br><b>Responsável:</b>
                                {{ element.responsavel }}
                            </label>
                            <br>
                            {{ element.descricao }}
                        </div>
                    </template>
                </draggableVue>
            </div>

            <div class="colunas">
                <h3 style="text-align: center;">Concluído</h3>
                <draggableVue class="list-group bloco" :list="backlogsConcluidos" group="backlogs" itemKey="codigo">
                    <template #item="{ element }">
                        <div class="list-group-item card">

                            <label class="subcard">
                                <div>

                                    <b>{{ element.nomeSprint }}: {{ element.codigo }}</b>

                                    <i style="color: rgb(0, 255, 0); font-size: 20px; position: absolute; top: 0; right: 0; margin-right: 0.5rem;"
                                        class="bi bi-check-circle-fill"></i><br>

                                </div>

                                <b>Fim previsto: <input style="outline: none;" type="date" v-model="element.dtFim"
                                        disabled></b><br><b>Responsável:</b>
                                {{ element.responsavel }}
                            </label>
                            <br>
                            {{ element.descricao }}
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
            this.backlogsConcluidos = concluidos;
            this.backlogsEmAndamento = emAndamento
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
  