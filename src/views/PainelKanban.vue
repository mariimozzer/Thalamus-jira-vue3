<template>
    <div>
        <div class="col-sm-12 "  style="width: 300px; " >
            <button>Concluir Sprint&nbsp;&nbsp;<i class="fa-solid fa-calendar-check"></i></button>
        </div>
        <br>
        <div class="three-columns" style="justify-content: center; color: white; text-align: center;">
            <div class="column" id="column1">
    
                <br><br>
                <h4>Não Iniciado</h4>
                <hr>
                <div class="bloco">
                    <td scope="col">TA-3</td><br>
                    <td scope="col">Tarefa</td><br>
                    <td scope="col">Criar tela de CRUD</td><br>
                    <td scope="col">Lucas</td><br>
                    <td></td>
    
                </div>
                <div class="bloco">
                    <td scope="col">TA-2</td><br>
                    <td scope="col">História</td><br>
                    <td scope="col">Criação de backlog</td><br>
                    <td scope="col">Natalie</td><br>
                    <td></td>
    
                </div>
    
            </div>
            <div class="column" id="column2">
                <br><br>
                <h4>Em Progresso</h4>
                <hr>
    
    
            </div>
            <div class="column" id="column3">
                <br><br>
                <h4>Concluido</h4>
    
                <hr>
                <div class="bloco">
                    <td scope="col">TA-1</td><br>
                    <td scope="col">Tarefa</td><br>
                    <td scope="col">Criar Projeto Vue</td><br>
                    <td scope="col">Mariana</td><br>
                    <td></td>
    
                </div>
    
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
/* .column:hover {
    background-color: #000000;
    box-shadow: 0 0 100px rgb(0, 0, 0);
    cursor: pointer;
    opacity: 0.20;
} */

.bloco {}

.bloco:hover {
    /* background-color: #ffffff; */
    box-shadow: 0 0 5px rgb(160, 160, 160);
    cursor: pointer;
    color: rgb(59, 59, 59);
    border: 0.5px solid;
}

.three-columns {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: space-between center;
    align-items: center;
}

#column1 {
    border: 10px solid none;
    background-color: rgb(243, 243, 243);
    background-repeat: no-repeat;
    margin: 20px;
    color: rgb(100, 100, 100);
    /* opacity: 0.2; */
}

.column {
    flex: 1;
    height: 100%;
    margin: 0px;
}

#column2 {
    border: 10px solid none;
    background-color: rgb(243, 243, 243);
    background-repeat: no-repeat;
    margin: 20px;
    color: rgb(100, 100, 100);
    /* opacity: 0.2; */
}

#column3 {
    border: 10px solid none;
    background-color: rgb(243, 243, 243);
    background-repeat: no-repeat;
    margin: 20px;
    color: rgb(100, 100, 100);
    /* opacity: 0.2; */
}
</style>