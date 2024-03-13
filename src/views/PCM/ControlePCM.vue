<template>
    <br><br><br><br>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 2px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Propostas de Criação ou Mudança</h3>
                    </div>
                    <button :title="'Adicionar Projeto'" style="width: max-content; font-size: 30px;"
                        @click="verPCMvazio" class="botaoAdicionarSprint">
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
                                <th scope="col">Código </th>
                                <th scope="col">Nome </th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de abertura</th>
                                <th scope="col">Responsável</th>
                                <th scope="col" style="width: 15rem;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="verPCM" style="vertical-align: middle;">
                                <td style="text-align: center; vertical-align: middle;">
                                    PCM240181
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    THALAMUS
                                </td>

                                <td style="text-align: center; color: green; vertical-align: middle;">
                                    Aprovado
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    14/11/2023
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    Darley Dias
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    <div style="display: flex;" @click.stop>
                                        <div style="margin-left: 1rem;">
                                            <button class="button-aprovar" disabled>
                                                Aprovar
                                                <i class="fa-solid fa-thumbs-up"></i>
                                            </button>
                                        </div>
                                        <div style="margin-left: 1rem;">
                                            <button type="button" class="button-reprovar" disabled>
                                                Reprovar
                                                <i class="fa-solid fa-thumbs-down"></i> 
                                            </button>
                                        </div>

                                    </div>
                                </td>
                            </tr>

                            <tr @click="verPCMvazio" style="vertical-align: middle;">
                                <td style="text-align: center; vertical-align: middle;">
                                    PCM240999
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    Nova sede no Nepal
                                </td>

                                <td style="text-align: center; color: red; vertical-align: middle;">
                                    Reprovado
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    30/02/2023
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    Fulano da Silva
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    <div style="display: flex;" @click.stop>
                                        <div style="margin-left: 1rem;">
                                            <button class="button-aprovar" disabled>
                                                Aprovar
                                                <i class="fa-solid fa-thumbs-up"></i>
                                            </button>
                                        </div>
                                        <div style="margin-left: 1rem;">
                                            <button type="button" class="button-reprovar" disabled>
                                                Reprovar
                                                <i class="fa-solid fa-thumbs-down"></i> 
                                            </button>
                                        </div>

                                    </div>
                                </td>
                            </tr>

                            <tr @click="verPCMvazio" style="vertical-align: middle;">
                                <td style="text-align: center; vertical-align: middle;">
                                    PCM999999
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    Nova maquina de CNC
                                </td>

                                <td style="text-align: center; color: orange; vertical-align: middle;">
                                    Proposto
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    01/03/2024
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    Tunico (irmão do Tinoco)
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    <div style="display: flex;" @click.stop>
                                        <div style="margin-left: 1rem;">
                                            <button class="button-aprovar">
                                                Aprovar
                                                <i class="fa-solid fa-thumbs-up"></i>
                                            </button>
                                        </div>
                                        <div style="margin-left: 1rem;">
                                            <button type="button" class="button-reprovar">
                                                Reprovar
                                                <i class="fa-solid fa-thumbs-down"></i> 
                                            </button>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>

</template>


<script>


export default {
    name: "ControlePCM",

    data() {
        return {

        }
    },

    mounted() {
    },

    methods: {
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
</style>