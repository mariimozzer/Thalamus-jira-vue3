<template>
    <div class="container">

        <div class="col-sm-12" style="text-align: center;">

            <div style="display: flex;">
                <div style="width: 100%;">
                    <h3 style="text-align: center; margin: 0;">Plano de Ação</h3>
                </div>

            </div>
        </div>
        <br>

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
                                <td> 
                                    <button @click="apagarBacklog(item.id)">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                                <td>{{ item.codigo }}</td>
                                <td><input type="text" v-model="item.descricao" style="width:35rem; outline: none;"></td>
                                <!-- <td>{{ item.responsavel }}</td> -->
                                <td><select v-model="item.responsavel"
                                        style="width: min-content; outline: none; text-align: center;">
                                        <option hidden>--</option>
                                        <option>Darley Dias</option>
                                        <option>Mariana Mozzer</option>
                                        <option>Lucas Lima</option>
                                        <option>Natalie Costa</option>
                                        <option>Artur Wilson</option>
                                        <option>Raul Wilson</option>
                                    </select></td>
                                <td><input style="width: 6.9rem; outline: none;" type="date" v-model="item.dtInicio"></td>
                                <td><input style="width: 6.9rem; outline: none;" type="date" v-model="item.dtFim"></td>
                            </tr>
                            <!-- <tr style="border-top: 1px solid black;" @keyup.enter="criarBacklog(), fecharModal()">
                                <td></td>
                                <td><input style="width: 4.5rem;" type="text" disabled
                                        :placeholder="'Tarefa - ' + (parseInt((backlogs[backlogs.length - 1].codigo.slice(9))) + 1)">
                                </td>
                                <td><input v-model="novoBacklog.descricao" type="text" placeholder="O que será feito?"
                                        style="width: 100%; border: 1px solid black; border-radius: 5px; padding: 0.1rem; padding-left: 0.5rem;">
                                </td>
                                <td> <select v-model="novoBacklog.responsavel"
                                        style="width: min-content; border: 1px solid black; border-radius: 5px; padding: 0.1rem; padding-left: 0.5rem; ">
                                        <option hidden>Responsável</option>
                                        <option>Mariana Mozzer</option>
                                        <option>Lucas Lima</option>
                                        <option>Natalie Costa</option>
                                        <option>Artur Wilson</option>
                                        <option>Raul Wilson</option>
                                    </select></td>
                                <td><input v-model="novoBacklog.dtInicio"
                                        style="width: 7.5rem; border: 1px solid black; border-radius: 5px; padding: 0.1rem; padding-left: 0.5rem; "
                                        type="date"></td>
                                <td><input v-model="novoBacklog.dtFim"
                                        style="width: 7.5rem; border: 1px solid black; border-radius: 5px; padding: 0.1rem; padding-left: 0.5rem; "
                                        type="date"></td>
                            </tr> -->

                        </thead>
                    </table>
                    <div style="display: flex; padding-left: 0.2rem; border-radius: 5px;">
                        <div style="border: 1px solid black; border-radius: 5px; padding: 0.3rem;">
                            <input style="width: 4.5rem;" type="text" disabled
                                :placeholder="'Tarefa - ' + (parseInt((backlogs[backlogs.length - 1].codigo.slice(9))) + 1)">
                        </div>
                        <div
                            style="border: 1px solid black; border-radius: 5px; width: 100%; margin-left: 0.3rem; padding: 0.3rem;">
                            <input v-model="novoBacklog.descricao" type="text" placeholder="O que será feito?"
                                @keyup.enter="criarBacklog()"
                                style="width: 100%; padding: 0.1rem; padding-left: 0.5rem; outline: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br><br><br>
</template>

<script>
export default {
    name: "BacklogsView",

    data() {
        return {
            backlogs: [{
                "id": "1",
                "codigo": "Tarefa - 1",
                "descricao": "Usuário necessita de opções para personalização de sistema.",
                "responsavel": "Darley Dias",
                "dtInicio": "2023-12-01",
                "dtFim": "2023-12-05"
            }, {
                "id": "2",
                "codigo": "Tarefa - 2",
                "descricao": "Criar tela de personalização que permita alterar tema e tamanho da fonte.",
                "responsavel": "Lucas Lima",
                "dtInicio": "2024-02-01",
                "dtFim": "2024-02-29"
            }],
            novoBacklog: {
                "id": "",
                "codigo": "",
                "descricao": "",
                "responsavel": "--",
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

        criarBacklog() {
            this.novoBacklog.codigo = 'Tarefa - ' + (parseInt((this.backlogs[this.backlogs.length - 1].codigo.slice(9))) + 1);
            this.novoBacklog.id = parseInt(this.backlogs[this.backlogs.length - 1].id) + 1
            this.backlogs.push(this.novoBacklog);
            this.novoBacklog = {
                "id": "",
                "codigo": "",
                "descricao": "",
                "responsavel": "--",
                "dtInicio": "",
                "dtFim": ""
            }
        },

        apagarBacklog(id) {
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
