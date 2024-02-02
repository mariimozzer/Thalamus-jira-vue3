<template>
    <div class="container">

        <div class="col-sm-12" style="text-align: center;">

            <div style="display: flex;">
                <div style="width: 100%;">
                    <h3 style="text-align: center; margin: 0;">Plano de Ação</h3>
                </div>
                <button style="width: max-content; font-size: 25px;" @click="abrirModal()"> <i
                        class="bi bi-plus-square"></i></button>
            </div>
        </div>
        <br>
dsadasd
        <div class="row sub-container">

            <div class="row">
                <div class="col-sm-16">
                    <table class="table table-hover">
                        <thead>

                            <tr>
                                <th></th>
                                <th scope="col">Item</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Responsável</th>
                                <th scope="col">Data do inicio</th>
                                <th scope="col">Data do fim</th>

                            </tr>
                        </thead>
                        <thead>
                            <tr v-for=" item in backlogs" :key="item">  
                                <td><button @click="apagarBacklog(item.id)">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                                <td>{{ item.codigo }}</td>
                                <td style="text-align: justify; text-justify: center;">{{ item.descricao }}</td>
                                <td>{{ item.responsavel }}</td>
                                <td><input type="date"></td>
                                <td><input type="date"></td>
                            </tr>
                        </thead>

                    </table>
                </div>
            </div>


            <!--MODAL BACKLOG -->
            <div class="modal-mask" v-if="showModal" @click="fecharModalFora">
                <div class="modal-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>
                            {{ 'Tarefa - ' + (parseInt((backlogs[backlogs.length - 1].codigo.slice(9))) + 1) }}
                        </h2>
                        <button type="button" class="btn-close" aria-label="Close" @click="fecharModal"></button>
                    </div>

                    <div style="display: flex;">
                        <input type="text" class="form-control" placeholder="O que será feito?" style="margin-right: 1rem;"
                            v-model="novoBacklog.descricao">
                        <select class="form-control" style="width: 10rem;" v-model="novoBacklog.responsavel">
                            <option hidden>Responsável</option>
                            <option>Mariana Mozzer</option>
                            <option>Lucas Lima</option>
                            <option>Natalie Costa</option>
                            <option>Artur Wilson</option>
                            <option>Raul Wilson</option>
                        </select>
                    </div>


                    <div class="col-sm-12" style="text-align: center;">
                        <button class="button-default" @click="criarBacklog(), fecharModal()"><i
                                class=" fa-solid fa-circle-plus"></i>&nbsp; Criar Tarefa</button>
                    </div>
                </div>

            </div>
            <!--END MODAL -->

        </div>
    </div>
</template>

<script>
export default {
    name: "BacklogsView",

    data() {
        return {
            showModal: false,
            backlogs: [{
                "id": "1",
                "codigo": "Tarefa - 1",
                "descricao": "Usuário necessita de opções para personalização de sistema.",
                "responsavel": "Darley Dias",
                "dtInicio": "01/12/2023",
                "dtFim": ""
            }, {
                "id": "2",
                "codigo": "Tarefa - 2",
                "descricao": "Criar tela de personalização que permita alterar tema e tamanho da fonte.",
                "responsavel": "Lucas Lima",
                "dtInicio": "01/02/2024",
                "dtFim": ""
            }],
            novoBacklog: {
                "id": "",
                "codigo": "",
                "descricao": "",
                "responsavel": "Responsável",
                "dtInicio": "",
                "dtFim": ""
            }

        }
    },


    methods: {

        adicionarBacklog() {

        },
        // Fecha o modal se clicar fora dele
        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.showModal = false;

            }
        },

        abrirModal() {
            this.showModal = true;

        },



        fecharModal() {
            this.showModal = false;

        },

        criarBacklog() {
            this.novoBacklog.codigo = 'Tarefa - ' + (parseInt((this.backlogs[this.backlogs.length - 1].codigo.slice(9))) + 1);
            this.novoBacklog.id = parseInt(this.backlogs[this.backlogs.length - 1].id) + 1
            this.backlogs.push(this.novoBacklog);
            this.novoBacklog = {
                "id": "",
                "codigo": "",
                "descricao": "",
                "responsavel": "Responsável",
                "dtInicio": "",
                "dtFim": ""
            }
        },

        apagarBacklog(id){
            this.backlogs = this.backlogs.filter(item => item.id !== id);
        }


    },

}
</script>

<style scoped>
.btnSprint {
    width: 100px;
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
    max-width: 1100px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
}
</style>
