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
                                <div >

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
            sprints: [{
                id: 0,
                nome: "Plano de ação",
                backlogs: [{
                    id: 1,
                    codigo: "Tarefa - 1",
                    descricao: "Usuário necessita de opções para personalização do sistema.",
                    HP: 8,
                    responsavel: "Darley Dias",
                    status: "Pendente",
                    dtInicio: "2023-12-01",
                    dtFim: "2023-12-05",
                    dtInicioReal: "0000-00-00",
                    dtFimReal: "0000-00-00",
                }, {
                    id: 2,
                    codigo: "Tarefa - 2",
                    descricao: "Criar tela de personalização que permita alterar tema e tamanho da fonte.",
                    HP: 5,
                    responsavel: "Lucas Lima",
                    status: "Pendente",
                    dtInicio: "2024-02-01",
                    dtFim: "2024-02-29",
                    dtInicioReal: "0000-00-00",
                    dtFimReal: "0000-00-00",
                },
                {
                    id: 3,
                    codigo: "Tarefa - 3",
                    descricao: "Realizar testes de funcionalidade do novo painel.",
                    HP: 5,
                    responsavel: "Mariana Mozzer",
                    status: "Em andamento",
                    dtInicio: "2024-02-01",
                    dtFim: "2024-02-29",
                    dtInicioReal: "0000-00-00",
                    dtFimReal: "0000-00-00",
                }, {
                    id: 4,
                    codigo: "Tarefa - 4",
                    descricao: "Validar ajustes e proporção dos cards",
                    HP: 5,
                    responsavel: "Natalie ",
                    status: "Concluído",
                    dtInicio: "2024-02-01",
                    dtFim: "2024-02-29",
                    dtInicioReal: "0000-00-00",
                    dtFimReal: "0000-00-00",
                }],
                dtTermino: null
            }],

            backlogsPendentes: [],
            backlogsEmAndamento: [],
            backlogsConcluidos: [],
        };
    },
    mounted() {
        this.getBacklogs()
    },
    methods: {
        getBacklogs() {

            this.sprints.forEach((item) => {
                item.backlogs.forEach((backlog) => {
                    backlog.nomeSprint = item.nome;
                });
            });
            this.backlogs = this.sprints.map((item) => item.backlogs);
            this.backlogs = this.backlogs[0];

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
  