<template>
    <div class="container">
        <div class="row">

            <div class="col-sm-12">
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Projeto </h3>
                <hr/>
                <br>
            </div>
        </div> 
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome do Projeto</label>
                    <input id="nome" type="text" v-model="projeto" class="form-control">
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="data">Data de Início</label>
                    <input id="data" type="date" v-model="projeto" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="gerente">Gerente Responsável</label>
                    <input id="gerente" type="text" v-model="projeto" class="form-control">
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="setor">Setor Beneficiado</label>
                    <select id="setor" type="combo" v-model="projeto" class="form-control"></select>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="tempo">Tempo da Sprint</label>
                    <input id="tempo" type="number" v-model="projeto" class="form-control">
                    <select type="combo" class="form-control" for="tempo">
                            <option>Selecione uma opção</option>
                            <option value="dias">Dia(s)</option>
                            <option value="semanas">Semana(s)</option>
                            <option value="meses">Mes(es)</option>
                        </select>
                </div>
    
            </div>
    
        </div>
        <br><br>
        <div class="row">
            <div class="col-sm-3">
    
                <button @click="cancelar" class="float-right">Cancelar</button>
                <button @click="adicionarProjeto">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ControleDeProjetos",

    data() {
        return {





        }
    },

    methods: {
        cancelar() {
            this.$router.push({ name: 'ControleDeProjetos' })
        }
    }


}
</script>

<style scoped>

</style>
