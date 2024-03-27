<template>
    <br><br><br><br>
    <div style="padding: 1rem;">
        <div class="container"
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div class="input-group mb-3" style="width: 16rem; position: absolute;">
                        <span class="input-group-text" id="basic-addon1"><i
                                class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" placeholder="Pesquisar PCM" aria-label="Username"
                            aria-describedby="basic-addon1" v-model="projetoSelecionado" @input="filtrarPCMs()">
                    </div>

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
                            <tr @click="verPCM(item.id)" style="vertical-align: middle;"
                                v-for="item in listaPCMsFiltrada" :key="item.id">
                                <td style="text-align: center; vertical-align: middle;">
                                    {{ item.codigo }}
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    {{ item.nome }}
                                </td>

                                <td style="text-align: center; color: green; vertical-align: middle;">
                                    {{ item.status }}
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    <input type="date" disabled style="text-align: center"
                                        :value="formatarDataHora(item.dtInicio)">
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    {{ nomeEsobrenome(item.responsavel_nome) }}
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    <div style="display: flex;" @click.stop>
                                        <div style="margin-left: 1rem;">
                                            <button class="button-aprovar" >
                                                Aprovar
                                                <i class="fa-solid fa-thumbs-up"></i>
                                            </button>
                                        </div>
                                        <div style="margin-left: 1rem;">
                                            <button type="button" class="button-reprovar" >
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

import axios from 'axios';
import { devURL } from '../../services/api'
import { prodURL } from '../../services/api'

export default {
    name: "ControlePCM",

    data() {
        return {
            PCMSelecionado: null,
            listaPCMsFiltrada: null,

            PCMs: null,
            devURL: devURL,
            prodURL: prodURL,
        }
    },

    mounted() {
        this.getPCMs()
    },

    methods: {
        formatarDataHora(valor) {
            if (valor) {
                if (valor) {
                    return valor.slice(0, 10)
                } else {
                    return ''
                }
            }
        },

        salvarPCM() {
            const novaArray = this.itensDaAnalise.map(item => ({
                impactoViabilidade_id: item.id,
                concordo: item.concordo,
                justificativa: item.justificativa
            }));

            axios.post(`${this.prodURL}/pcm/cadastrar`, {

                codigo: this.codigo,
                finalidade: this.finalidade,
                area: this.area,
                setor_id: this.setor_id,
                nome: this.nome,
                dtInicio: this.dtInicio,
                descricao_problema: this.descricao_problema,
                possivel_solucao: this.possivel_solucao,
                proposito_mudanca: this.proposito_mudanca,
                dtLimiteImplementacao: this.dtLimiteImplementacao,
                solicitante_id: this.solicitante_id,
                estimativa_custo: this.estimativa_custo,
                custo_justificativa: this.custo_justificativa,
                parecer_responsavel: this.parecer_responsavel,
                responsavel_id: this.responsavel_id,
                responsavel_justificativa: this.responsavel_justificativa,
                meio_mudanca: this.meio_mudanca,
                cadastro_omie: this.cadastro_omie,
                impacto_viabilidade: novaArray,
                status: 'Aguardando Aprovação'

            })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        nomeEsobrenome(nome) {
            if (nome) {
                const nomeESobrenome = nome.split(" ");


                if (nomeESobrenome.length >= 2) {
                    const primeiroNome = nomeESobrenome[0];
                    const segundoNome = nomeESobrenome[1];

                    if (segundoNome.length <= 3 || segundoNome == 'Paula') {
                        return `${primeiroNome} ${segundoNome} ${nomeESobrenome[2] || ''}`;
                    } else {
                        return `${primeiroNome} ${segundoNome}`;
                    }
                } else {
                    return nome;
                }
            }
        },

        filtrarPCMs() {
            if (!this.PCMSelecionado) {
                this.listaPCMsFiltrada = this.PCMs;
            } else {
                const textoLowerCase = this.PCMSelecionado.toLowerCase();
                this.listaPCMsFiltrada = this.PCMS.filter(PCM => {
                    return PCM.nome.toLowerCase().includes(textoLowerCase);
                });
            }
        },

        getPCMs() {
            axios.get(`${this.prodURL}/pcm/listar`, {})
                .then((response) => {
                    this.PCMs = response.data;
                    this.filtrarPCMs()
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        verPCM(id) {
            localStorage.setItem('idPCM', id);
            this.$router.push({ name: "PCM" })
        },

        verPCMvazio() {
            this.$router.push({ name: "PCMv" })
        }
    }

}
</script>

<style scoped>
.fa-solid {
    margin-left: 0rem !important;
}

.button-reprovar:disabled {
    width: 10rem;
    background-color: #e02131a9 !important;
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
    background-color: #429867c2 !important;
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