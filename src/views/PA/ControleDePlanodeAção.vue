<template>
    <br><br><br><br>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 2px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Plano de Ação</h3>
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
                            <tr @click="verPCM" style="vertical-align: middle;">
                                <td style="text-align: center; vertical-align: middle;">
                                    Correção de não conformidade
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
        verPCM(){
            this.$router.push({ name: "PCM" })
        },
        verPCMvazio(){
            this.$router.push({ name: "PCMv" })
        }
    }

}
</script>

<style>

</style>