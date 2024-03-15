<template>
    <br><br><br><br>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Plano de Ação</h3>
                    </div>
                    <button :title="'Adicionar Plano de Ação'" style="width: max-content; font-size: 30px;"
                        @click="this.modalNovoPCM = true" class="botaoAdicionarSprint">
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>
            <br>
            <div>
                <div class="table responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome do Projeto </th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de Início</th>
                                <th scope="col">Data de Termino</th>
                                <th scope="col">Gerente Responsável</th>
                                <th scope="col">Setor Envolvido</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="verBacklogs('25', 'Plano de Ação 01')" style="vertical-align: middle;">
                                <td style="text-align: center; vertical-align: middle;">
                                    Tratativa de não conformidade
                                </td>

                                <td style="text-align: center; color: green; vertical-align: middle;">
                                    Concluído
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    05/02/2024
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    14/11/2023
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    Darley Dias
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    P&D
                                </td>

                                <td>


                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- modal novo Plano de Ação -->
    <div style="overflow: auto" class="modal-mask" v-if="modalNovoPCM" @click="fecharModalFora">
        <div style="max-height: 80%; width: 70%; padding: 3rem; " class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Cadastrar Plano de Ação </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.modalNovoPrograma = false"></button>
                </div>
                <hr>
                <br>
                <div style="display: flex;">

                    <div class="form-group" style="width: 30rem;">
                        <label for="nome">Nome</label>
                        <input id="nome" type="text" class="form-control">
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="data">Data de Início</label>
                        <input id="data" type="date" ref="dtInicio" class="form-control">

                    </div>
                </div>

                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="gerente">Gerente Responsável</label>
                        <select id="gerente" class="form-select">
                            <option>
                                Teste
                            </option>
                        </select>
                    </div>
                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="setor">Setor Responsável</label>
                        <select id="setor" class="form-select">
                            <option>
                                Teste
                            </option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: right;">
                    <button style="height: 2.5rem;" class="btn btn-primary float-right mr-2">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- fim modal novo Programa -->
</template>


<script>


export default {
    name: "ControlePCM",

    data() {
        return {
            modalNovoPCM: false,

        }
    },

    mounted() {
    },

    methods: {
        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalNovoPCM = false;
            }
        },

        verBacklogs(id, nomeProjeto) {
                    this.$router.push({ name: "PA" })
                    sessionStorage.setItem('idProjeto', id)
                    sessionStorage.setItem('nomeDoProjeto', nomeProjeto)
        },

        verPCM() {
            this.$router.push({ name: "PCM" })
        },

        verPCMvazio() {
            this.$router.push({ name: "PCMv" })
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

</style>