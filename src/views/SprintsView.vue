<template>
    <div class="container">
        <div class="row">

            <div style="display: flex;">
                <div style="width: 100%;">
                    <h3 style="text-align: center; margin: 0;">Ciclos</h3>
                </div>
                <button style="width: max-content; font-size: 25px;" @click="criarNovaSprint"> <i
                        class="bi bi-plus-square"></i></button>
            </div>
            <br><br>
            <hr>

        </div>

        <div class="row sub-container">

            <!-- TABELA 1 -->
            <div style="border: 1px solid black; border-radius: 5px; background-color: rgb(247, 247, 247); margin-bottom: 1rem;"
                v-for="item in sprints" :key="item">

                <div style="display: flex; justify-content: space-between;">
                    <h3>{{ item.nome }}</h3> <span>{{ item.dtTermino }}</span>
                    <button style="width: max-content;" @click="abrirModalIniciarSprint(item.id)" class="button-default"><i
                            class="fa-solid fa-clock"></i>&nbsp;{{item.dtTermino == null ? 'Iniciar' : 'Finalizar'}}</button>
                </div>
                <hr>
                <div>
                    <table class="table table-hover">

                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL INICIAR SPRINT-->
    <div class="modal-mask" v-if="showIniciarSprint" @click="fecharModalFora">
        <div class="modal-container" style="height: min-content; width: 50rem;">
            <div style="display: flex; justify-content: right;">
                <button type="button" class="btn-close" aria-label="Close" @click="fecharModal"></button>
            </div>

            <div style="width: 100%;">
                <div>
                    <label>Data de Término</label><label style="margin-left: 1rem; font-size: large; color: red; display: none;" id="aviso"><b>Preencha o campo abaixo:</b></label>
                    <input v-model="dataTermino" id="dataTermino" class="form-control" type="date">
                </div>

                <div style="margin-top: 1rem;">
                    <label>Objetivo</label>
                    <textarea class="form-control"></textarea>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="button-default" @click="iniciarSprint()"><i
                            class="fa-solid fa-circle-plus"></i>&nbsp; Iniciar Sprint</button>
                </div>
            </div>

        </div>
    </div>
    <!--END MODAL SPRINT-->
</template>

<script>

export default {
    name: "SprintsView",

    data() {
        return {
            showCriarSprint: false,
            showIniciarSprint: false,
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
            sprints: [{
                "id": 1,
                "nome": "Ciclo - 1",
                "backlogs": [1, 2],
                "dtTermino": null
            },
            {
                "id": 2,
                "nome": "Ciclo - 2",
                "backlogs": [],
                "dtTermino": null
            }],
            novaSprint: {
                "id": null,
                "nome": "",
                "backlogs": [],
                "dtTermino": null
            },
            idSprint: null,
            dataTermino: null,
        }
    },

    methods: {

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.showCriarSprint = false;
                this.showIniciarSprint = false;

            }

        },

        abrirModalSprint() {
            this.showCriarSprint = true
        },

        fecharModal() {
            this.showIniciarSprint = false;
        },

        abrirModalIniciarSprint(id) {
            this.idSprint = id
            this.showIniciarSprint = true;
        },

        iniciarSprint() {
            if(this.dataTermino == null){
                document.getElementById('dataTermino').style.border = '1px solid red';
                document.getElementById('aviso').style.display = ''
                return
            }
            const sprint = this.sprints.find(item => item.id === this.idSprint);
            const dia = this.dataTermino.slice(8);
            const mes = this.dataTermino.slice(5).slice(0, 2);
            const ano = this.dataTermino.slice(0, 4);
            if (sprint) {
                sprint.dtTermino = `Data de entrega: ${dia}/${mes}/${ano}`
                this.dataTermino = null;
                this.idSprint = null;
                document.getElementById('aviso').style.display = 'none'
                this.fecharModal()
            } else {
                console.error('Sprint não encontrada com o ID:', this.idSprint);
            }
        },

        criarNovaSprint() {
            this.novaSprint.id = (this.sprints[this.sprints.length - 1].id) + 1;
            this.novaSprint.nome = 'Ciclo - ' + (parseInt((this.sprints[this.sprints.length - 1].nome.slice(8))) + 1);
            this.sprints.push(this.novaSprint);
            this.novaSprint = {
                "id": null,
                "nome": "",
                "backlogs": []
            }
        }

    }
}
</script>

<style>
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