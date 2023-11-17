<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo">Backlogs</h3>
                <hr>
    
            </div>
            <br>
    
    
            <div class="row sub-container">
                <div class="col-sm-12">
    
                    <button @click="abrirModal()"> <i class="fa-solid fa-list"></i>&nbsp; Criar Backlog</button>
    
                </div>
                <div class="col-sm-12">
                    <button @click="abrirModal()"><i class="fa-regular fa-calendar-plus"></i>&nbsp; Criar Sprint</button>
                </div>
                <br><br><br><br><br><br>
    
    
    
                <!--MODAL -->
                <div class="modal-mask" v-if="showModal" @click="fecharModalFora">
                    <div class="modal-container">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5>Novo Backlog</h5>
                            <v-btn class="mx-2" @click="fecharModal" fab dark x-small color="primary">
                                <i class="fa-solid fa-xmark"></i>
                            </v-btn>
                        </div>
    
                        <div class="col-sm-12">
                            <br>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <!-- <th>Sprint </th> -->
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
    
                                    </tr>
    
                                    <tr>
                                        <div class="d-flex flex-column mb-1">
    
                                            <th scope="col"><input type="text" placeholder="TM-1"> </th>
                                        </div>
                                        <div class="mb-1 col-6">
    
                                            <th scope="col">
                                                <select class="form-control">
                                                                                                        <option disabled value="">Selecione</option>
                                                                                                        <option>Tarefa</option>
                                                                                                         <option>História</option>
                                                                                                        </select>
                                            </th>
                                        </div>
                                        <th scope="col-sm-6">
                                            <input type="text" class="form-control" placeholder="O que precisa ser feito?">
                                        </th>
                                        <th scope="col">
                                            <input type="number" class="form-control" placeholder="Peso">
                                        </th>
                                        <th scope="col">
                                            <select class="form-control">
                                                                                                <option disabled>Responsável</option>
                                                                                                <option>Mariana</option>
                                                                                                <option>Lucas</option>
                                                                                                <option>Natalie</option>
                                                                                                <option>Artur</option>
                                                                                                <option>Raul</option>
            
            
                                                                                            </select>
                                        </th>
                                        <th scope="col">
                                            <select class="form-control">
                                                                                    <option>Tarefas Pendentes</option>
                                                                                    <option>Em Andamento</option>
                                                                                    <option>Concluido</option>
                                                                                </select>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
    
                        <div class="col-sm-12" style="text-align: center;">
    
                            <button><i class="fa-solid fa-circle-plus"></i>&nbsp; Criar Backlog</button>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
        <!--END MODAL -->
    
    
        <!-- MODAL SPRINT-->
        <div class="modal-mask" v-if="showModalSprint" @click="fecharModalFora">
            <div class="modal-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5>Iniciar Sprint</h5>
                    <v-btn class="mx-2" @click="fecharModal" fab dark x-small color="primary">
                        <i class="fa-solid fa-xmark"></i>
                    </v-btn>
                </div>
    
                <div class="col-sm-12">
                    <br>
                    <table>
                       
                            <label for="nome">Nome do Sprint </label>
                            <input id="nome" type="text" class="form-control">
    
                        <br>
                        <div class="col-sm-6">
                            <label>Duração</label>
                            <select class="form-control">
                                <option>1 Semana</option>
                                <option>2 Semanas</option>
                                <option>3 Semanas</option>
                                <option>Personalizado</option>
                                </select>
                        </div>
                        <br>
                        <div class="col-sm-6">
    
                            <label id="dataInicio">Data de Início</label>
                            <br>
                            <input id="dataInicio" class="form-control" type="date">
                        </div>
                        <br>
                        <div class="col-sm-6">
    
                            <label id="dataTermino">Data de Término</label>
                            <br>
                            <input id="dataTermino" class="form-control" type="date">
                        </div>
                        <br>
                        <div class="col-sm-6">
    
                            <label>Objetivo</label>
                            <br>
                            <textarea class="form-control"></textarea>
                        </div>
    
                    </table>
                </div>
                <br>
                <div class="col-sm-12" style="text-align: center;">
    
                    <button><i class="fa-solid fa-circle-plus"></i>&nbsp; Iniciar Sprint</button>
                </div>
            </div>
    
        </div>
    
    
        <!--END MODAL SPRINT-->
    
    
        <!-- TABELA 1 -->
        <div class="row">
    
            <table class="table table-hover">
    
                <tr style="background-color: rgb(247, 247, 247);">
    
                    <th>
                        <br>
                        <button @click="iniciarSprint()" class="btnSprint">Iniciar &nbsp;<i class="fa-solid fa-clock"></i></button>
                        <br><br> SPRINT #1
                    </th>
    
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
    
                </tr>
                <tbody>
                    <tr>
    
                        <td scope="col">TA-1</td>
                        <td scope="col">Tarefa</td>
                        <td scope="col">Criar tela de CRUD</td>
                        <td scope="col">Em andamento</td>
                        <td scope="col">5</td>
                        <td scope="col">Mariana</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
    
            </table>
            <br>
    
            <!-- TABELA 2 -->
    
            <table class="table table-hover">
    
                <br>
                <tr style="background-color: rgb(247, 247, 247);">
    
                    <th>
                        <br>
                        <button @click="iniciarSprint()" class="btnSprint">Iniciar &nbsp;<i class="fa-solid fa-clock"></i></button>
                        <br><br> SPRINT #2
                    </th>
    
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    <tr>
                        <td scope="col">TA-2</td>
                        <td scope="col">História</td>
                        <td scope="col">Criar tela de CRUD</td>
                        <td scope="col">Em andamento</td>
                        <td scope="col">21</td>
                        <td scope="col">Lucas</td>
                        <td></td>
                    </tr>
                </tbody>
    
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "BacklogsView",

    data() {
        return {
            showModal: false,
            showModalSprint: false

        }
    },


    methods: {

        adicionarBacklog() {

        },
        // Fecha o modal se clicar fora dele
        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.showModal = false;
                this.showModalSprint = false;
            }
        },

        abrirModal() {
            this.showModal = true;

        },

        fecharModal() {
            this.showModal = false;
            this.showModalSprint = false;

        },
        iniciarSprint() {
            this.showModalSprint = true;
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
    max-width: 1500px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
}
</style>
