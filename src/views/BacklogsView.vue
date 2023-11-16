<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo">Backlogs</h3>
    
            </div>
            <button><i class="fa-solid fa-circle-plus"></i>&nbsp; Criar Item</button>
            <br><br>
            <!-- Tabela 1 -->
    
            <table id="tabela1" style="width: 100%;" class="table table-hover" @drop="dropHandler" @dragover.prevent>
                <thead>
                    <tr>
                        <th>Sprint </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
    
                    </tr>
                    
                        <tr draggable="true" @dragstart="dragStartHandler">
                            <th scope="col"><input type="text"> </th>
                            <th scope="col">
                                <select class="form-control">
                                                            <option disabled value="">Selecione</option>
                                                            <option>Tarefa</option>
                                                             <option>História</option>
                                                            </select>
                            </th>
                            <th scope="col">
                                <input type="text" class="form-control" placeholder="O que precisa ser feito?">
                            </th>
                            <th scope="col">
                                <input type="number" class="form-control" placeholder="Peso">
                            </th>
                            <th scope="col">
                                <select class="form-control">
                                                    <option disabled>Responsável</option>
                                                    <option>Mariana</option>
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
                  
                    <tr>
    
                    </tr>
                    <tr>
    
                        <th scope="col">TA-1</th>
                        <th scope="col">Tarefa</th>
                        <th scope="col">Criar tela de CRUD</th>
                        <th scope="col">Em andamento</th>
    
                        <th scope="col">5</th>
                        <th scope="col">Mariana</th>
    
                    </tr>
    
    
    
    
                </thead>
            </table>
    
            <br>
          <!-- Tabela 2 -->

          <table id="tabela2" style="width: 100%;" class="table table-hover" @drop="dropHandler" @dragover.prevent>                <thead>
                    <tr>
                        <th>Sprint </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
    
                    </tr>
                    <tbody> 


                    </tbody>
                    <tr>
                        <th scope="col"><input type="text"> </th>
                        <th scope="col">
                            <select class="form-control">
                                                            <option disabled value="">Selecione</option>
                                                            <option>Tarefa</option>
                                                             <option>História</option>
                                                            </select>
                        </th>
                        <th scope="col">
                            <input type="text" class="form-control" placeholder="O que precisa ser feito?">
                        </th>
                        <th scope="col">
                            <input type="number" class="form-control" placeholder="Peso">
                        </th>
    
                        <th scope="col">
                            <select class="form-control">
                                                    <option disabled>Responsável</option>
                                                    <option>Mariana</option>
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
                    <tr>
    
                        <th scope="col">TA-2</th>
                        <th scope="col">História</th>
                        <th scope="col">Criar tela de CRUD</th>
                        <th scope="col">Em andamento</th>
    
                        <th scope="col">21</th>
                        <th scope="col">Lucas</th>
    
                    </tr>
    
                </thead>
            </table>
        </div>
    
    </div>
</template>

<script>
export default {
    name: "BacklogsView",

    data() {
        return {}
    },


    methods: {
        dragStartHandler(event) {
      // Define os dados que serão transferidos durante o arrastar
      event.dataTransfer.setData("text/plain", event.target.outerHTML);
    },
    dropHandler(event) {
      event.preventDefault();

      // Obtém os dados do item arrastado
      const draggedItemHTML = event.dataTransfer.getData("text/plain");

      // Cria um novo elemento a partir do HTML do item arrastado
      const newElement = document.createElement("div");
      newElement.innerHTML = draggedItemHTML;

      // Adiciona o novo elemento à tabela de destino
      const targetTable = event.currentTarget;
      targetTable.querySelector("tbody").appendChild(newElement.firstChild);
    },
  },
    
}
</script>

<style scoped>

</style>
