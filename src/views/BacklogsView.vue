<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo">Backlogs</h3>
                <hr>
    
            </div>
        </div>
    
        <div class="row sub-container">
            <div class="col-sm-3">
                <button @click="abrirModal()"> <i class="fa-solid fa-list"></i>&nbsp; Criar Backlog</button>
            </div>
    
            <br><br><br><br><br><br>
            <table class="table table-hover">
                <tr style="background-color: rgb(247, 247, 247);">
                    <th scope="col">Tipo</th>
                    <th scope="col">Código</th>
                    <th scope="col">Descrição</th>
                </tr>
                <tbody>
                    <tr>
                        <th>História</th>
                        <th>TP-12</th>
                        <td scope="col">Usuário necessita de opções para personalização de sistema</td>
                    </tr>
                </tbody>
    
            </table>
    
    
            <!--MODAL BACKLOG -->
            <div class="modal-mask" v-if="showModal" @click="fecharModalFora">
                <div class="modal-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5>Novo Backlog</h5>
                        <b-button class="mx-2" @click="fecharModal" fab dark x-small color="primary">
                                <i class="fa-solid fa-xmark"></i>
                            </b-button>
                    </div>
    
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
    
                    <div class="col-sm-12" style="text-align: center;">
    
                        <button><i class="fa-solid fa-circle-plus"></i>&nbsp; Criar Backlog</button>
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
