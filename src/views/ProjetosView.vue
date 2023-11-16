<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo"> Gerenciamento de Projetos </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-12">
    
                <button  @click="adicionarProjeto()">
                    <i class="fa-solid fa-circle-plus"></i>&nbsp; Adicionar projeto
                </button>
    
    
            </div>
    
        </div>
        <br>
        <div>
            <div>
                <table id="tabela" style="width: 100%;" class="table table-hover ">
    
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome do Projeto </th>
                            <th scope="col">Data Início</th>
                            <th scope="col">Gerente Responsável</th>
                            <th scope="col">Setor Beneficiário</th>
    
                            <th scope="col">
                              
                            </th>
    
    
                        </tr>
    
    
                    </thead>
    
    
                    <tbody>
    
                        <!-- <tr v-for="item in projetos" :key="item.id">
        
                                <td>{{ item.id }}</td>
                                <td>{{ item.nome }}</td>
                                <td>{{ item.dataInicio }}</td>
    
                                <td></td>
        
                                <td class="icon-tabela" style="text-align: center;">
                                    <i @click="editarSetor(item)" class="fa fa-edit icones-tabela"></i> |
                                    <i @click="excluirSetor(item)" class="fa fa-trash icones-tabela"></i>
                                </td>
                            </tr> -->
    
                        <tr>
                            <td>1</td>
                            <td>Thalamus</td>
                            <td>14/11/2023</td>
                            <td>Darley</td>
                            <td>Desenvolvimento</td>
                            <td>
                                <button @click="verBacklogs()">
                                    <i class="fa-solid fa-list"></i>&nbsp; Backlogs
                                </button>
                            </td>
    
                        </tr>
                    </tbody>
    
                </table>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "ProjetosView",

    data() {
        return {
            projetos: []
        }
    },

    methods: {


        adicionarProjeto() {
            this.$router.push({ name: "AdicionarProjeto" })
        },

        verBacklogs()
        {
            this.$router.push({name: "backlogs" })
        }

    }

}
</script>

<style scoped>

</style>