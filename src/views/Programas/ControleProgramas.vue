<template>
    <br><br><br><br>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 2px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Programas</h3>
                    </div>
                    <button :title="'Adicionar Programa'" style="width: max-content; font-size: 30px;"
                        @click="this.modalNovoPrograma = true" class="botaoAdicionarSprint">
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
                                <th scope="col">Nome</th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de Inicio</th>
                                <th scope="col">Responsável</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="vertical-align: middle;" @click="this.modalProjetosAssociados = true">
                                <td style="text-align: center; vertical-align: middle;">
                                    Ciclo
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    Em andamento
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    01/01/2024
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    Helena Resende
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL-->
    <div class="modal-mask" v-if="modalProjetosAssociados" @click="fecharModalFora">
        <div style="height: fit-content;width: 45rem; padding: 3rem; margin-bottom: 2rem;" class="modal-container">

            <div style="display: flex; width: 100%; justify-content: center; justify-content: space-between">

                <div>
                    <div style="display: flex; justify-content: center">
                        <h5>Projetos associados:</h5>
                    </div>
                    <div>
                        <ul style="height: 5rem;">
                            <li>Thalamus</li>
                            <li>Thalamus - ERP - Orçamento</li>
                            <li>Thalamus - ERP - Projetos</li>
                        </ul>
                        <input type="text" placeholder="Incluir projeto" class="form-control">
                    </div>
                </div>

                <div>
                    <div style="display: flex; justify-content: center">
                        <h5>Plano de Ação associados:</h5>
                    </div>
                    <div>
                        <ul style="height: 5rem;">
                            <li>Plano de Ação 01</li>
                        </ul>
                        <input type="text" placeholder="Incluir plano de ação" class="form-control">
                    </div>
                </div>

            </div>



        </div>
    </div>
    <!--END MODAL-->

    <!-- modal novo Programa -->
    <div style="overflow: auto" class="modal-mask" v-if="modalNovoPrograma" @click="fecharModalFora">
        <div style="max-height: 80%; width: 70%; padding: 3rem; " class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Cadastrar Programa </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.modalNovoPrograma = false"></button>
                </div>
                <hr>
                <br>
                <div style="display: flex;">

                    <div class="form-group" style="width: 30rem;">
                        <label for="nome">Nome do Programa</label>
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
                    <!-- <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="setor">Setor Beneficiado</label>
                        <select id="setor" class="form-select">
                            <option>
                                Teste
                            </option>
                        </select>
                    </div> -->
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
    name: "ControleProgramas",

    data() {
        return {
            modalProjetosAssociados: false,
            modalNovoPrograma: false,
        }
    },

    methods: {
        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalProjetosAssociados = false;
                this.modalNovoPrograma = false
            }
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
.button-reprovar:disabled {
    width: 10rem;
    background-color: #e0213194 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: not-allowed;
}

.button-reprovar {
    width: 10rem;
    background-color: #e02130 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: pointer;
}

.button-aprovar:disabled {
    width: 10rem;
    background-color: #429867a8 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: not-allowed;
}

.button-aprovar {
    width: 10rem;
    background-color: #429867 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: pointer;
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
</style>