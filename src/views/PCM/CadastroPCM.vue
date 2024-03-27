<template>
    <br><br><br>
    <div
        style="width: 100%;margin-top: 1rem; justify-content: space-between; display: flex; margin-bottom: none; border-bottom: 2px solid rgb(0, 0, 0); align-items: center; position: fixed; background-color: #FAF9F6; z-index: 1;">
        <i @click="verPCMs" style="font-size: 30px; margin-left: 3rem; cursor: pointer;"
            class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela inicial'"></i>

        <i @click="verPCMs" class="fa-solid fa-house-chimney botaoAdicionarSprint botaoHome"
            :title="'Ir para tela de projetos'"></i>
        <h2>{{ codigo }}</h2>
        <i style="font-size: 30px; margin-right: 3rem; cursor: pointer; visibility: hidden;"
            class="bi bi-kanban botaoAdicionarSprint" :title="'Ir para painel KanBan'"></i>
    </div>
    <br><br><br>
    <div class="container" style="padding: 2rem 0rem 0rem 0rem;">
        <div style="text-align: center;">
            <h5><b>Área do Solicitante</b></h5>
        </div>
        <div style="border: 1px black solid; padding: 20px; border-radius: 20px;">
            <div style="display: flex; align-content: center; justify-content: center; margin-left: 5rem">
                <div style="display: flex; align-items: center; width: fit-content; flex-flow: column">
                    <strong>
                        <br>
                        Finalidade
                        <br>
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem; margin-top: 0.5rem" v-model="finalidade">
                        <option>Criação</option>
                        <option>Mudança</option>
                    </select>
                </div>
                <div
                    style="display: flex; align-items: center; width: fit-content; margin-left: 1rem; flex-flow: column;">
                    <strong>
                        <br>
                        Área
                        <br>
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem; margin-top: 0.5rem" v-model="area">
                        <option>Processo</option>
                        <option>Produto</option>
                    </select>
                </div>
                <div
                    style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem; flex-flow: column;">
                    <strong style="width: 15rem; text-align: center">
                        Setor para encaminhamento da demanda
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem; width: 15rem;  margin-top: 0.5rem"
                        v-model="setor_id">
                        <option v-for="setor in setores" :key="setor.id" :value="setor.id">{{ setor.nome }}</option>
                    </select>
                </div>
                <div
                    style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem; flex-flow: column;">
                    <strong>
                        <br>
                        Data de abertura
                        <br>
                    </strong>
                    <input v-model="dtInicio" type="date" class="form-control" style=" margin-top: 0.5rem">
                </div>
            </div>

            <div class="input-group" style="margin-top: 1rem;">
                <span class="input-group-text"><b>Descrição do Problema:</b> </span>
                <textarea class="form-control" v-model="descricao_problema" style="height: 8rem;"></textarea>
            </div>
            <div class="input-group" style="margin-top: 1rem;">
                <span class="input-group-text" style="width: 13rem;"><b>Possível solução: </b> </span>
                <textarea class="form-control" v-model="possivel_solucao" style="height: 6rem;"></textarea>
            </div>
            <div class="input-group" style="margin-top: 1rem;">
                <span class="input-group-text" style="width: 13rem;"><b>Propósito da mudança:</b> </span>
                <textarea class="form-control" v-model="proposito_mudanca">
                </textarea>
            </div>

            <div style="display: flex ;align-content: center; justify-content: center; margin-top: 1rem;">
                <div style="display: flex; align-items: center; flex-flow: column">
                    <strong>Data limite de implementação</strong>
                    <input v-model="dtLimiteImplementacao" type="date" class="form-control"
                        style="width: 9rem; margin-left: 0.5rem; margin-top: 0.5rem">
                </div>
                <div style="display: flex; align-items: center; margin-left: 1rem; flex-flow: column;">
                    <strong>Responsável pela solicitação</strong>
                    <select class="form-select" style="margin-left: 0.5rem; width: 15rem; margin-top: 0.5rem"
                        v-model="solicitante_id">
                        <option v-for="item in usuarios" :key="item.id" :value="item.id">{{ nomeEsobrenome(item.nomeCompleto) }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>



    <div class="container" style="padding: 2rem 0rem 0rem 0rem;">
        <div style="text-align: center;">
            <h5><b>Área do Responsável</b></h5>
        </div>
        <div style="border: 1px black solid; padding: 20px; border-radius: 20px;">
            <div>
                <div
                    style="border: 1px solid black;padding-bottom: 10px;border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Análise de impactos e viabilidade da proposta</th>
                                <th scope="col"></th>
                                <th scope="col">Justificativa</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="item, index in itensDaAnalise" :key="index">
                                <th style="border: 1px solid black; border-left: none ;vertical-align: middle;">{{ index
                + 1 }}.</th>
                                <td style="border: 1px solid black; vertical-align: middle;">
                                    <div>
                                        {{ item.descricao }}
                                    </div>
                                </td>

                                <td style="border: 1px solid black;vertical-align: middle;">
                                    <div style="display: flex;" v-if="item !== 'Estimativa de Custo da Mudança'">
                                        <input type="radio" class="btn-check" :name="'options' + index"
                                            :id="'optionSim' + index" autocomplete="off" v-model="item.concordo"
                                            value="1">
                                        <label class="btn" :for="'optionSim' + index">Sim</label>

                                        <input type="radio" class="btn-check" :name="'options' + index"
                                            :id="'optionNão' + index" autocomplete="off" v-model="item.concordo"
                                            value="0">
                                        <label class="btn" :for="'optionNão' + index">Não</label>
                                    </div>
                                </td>

                                <td style="border: 1px solid black; border-right: none;">
                                    <textarea class="form-control" v-model="item.justificativa"></textarea>
                                </td>
                            </tr>

                            <tr>
                                <th style="border: 1px solid black; border-left: none ;vertical-align: middle;">10.</th>
                                <td style="border: 1px solid black; vertical-align: middle;">
                                    <div>
                                        Estimativa de Custo da Mudança
                                    </div>
                                </td>

                                <td style="border: 1px solid black;vertical-align: middle;">
                                    <strong>
                                        <money3 v-bind="config" v-model="estimativa_custo"
                                            style="width: 8rem;border: none; outline: none;">
                                        </money3>
                                    </strong>
                                </td>

                                <td style="border: 1px solid black; border-right: none;">
                                    <textarea v-model="custo_justificativa" class="form-control"></textarea>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <div style="display: flex; align-content: center; justify-content: center;">
                        <div style="display: flex; align-items: center; width: fit-content; flex-flow: column">
                            <strong>
                                Parecer do Responsável
                            </strong>
                            <select v-model="parecer_responsavel" class="form-select"
                                style="margin-left: 0.5rem;  margin-top: 0.5rem"
                                :style="{ 'color': (parecer_responsavel == 'Proposta viável') ? 'green' : 'red' }">
                                <option style="color: green;">Proposta viável</option>
                                <option style="color: red;">Proposta inviável</option>
                            </select>
                        </div>
                        <div
                            style="display: flex; align-items: center; width: fit-content; margin-left: 1rem; flex-flow: column">
                            <strong>
                                Nome
                            </strong>
                            <select class="form-select" style="margin-left: 0.5rem; width: 13rem;  margin-top: 0.5rem"
                                v-model="responsavel_id">
                                <option v-for="item in usuarios" :key="item.id" :value="item.id">{{ nomeEsobrenome(item.nomeCompleto) }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="input-group" style="margin-top: 1rem; padding-inline: 10px;">
                        <span class="input-group-text" style="width: 13rem;"><b>Justificativa:</b> </span>
                        <textarea v-model="responsavel_justificativa" class="form-control"></textarea>
                    </div>

                </div>

                <div style="border: 1px solid black; padding: 5px; border-radius: 10px; margin-top: 1rem;">

                    <div style="display: flex; align-content: center; justify-content: center;">
                        <div style="display: flex; align-items: center; width: 10rem; flex-flow: column;">
                            <strong>
                                Meio da mudança
                            </strong>
                            <select v-model="meio_mudanca" class="form-select" style="margin-top: 0.5rem">
                                <option>Plano de Ação</option>
                                <option>Projeto</option>
                            </select>
                        </div>
                        <div
                            style="display: flex; align-items: center; width: fit-content ;  margin-left: 2rem; flex-flow: column">
                            <strong>
                                Necessidade de Cadastro no Omie?
                            </strong>
                            <div style="display: flex; margin-top: 0.5rem">
                                <input type="radio" class="btn-check" name="cadastroOmie" id="omieSim"
                                    autocomplete="off" v-model="cadastro_omie" value="1">
                                <label class="btn" for="omieSim">Sim</label>

                                <input type="radio" class="btn-check" name="cadastroOmie" id="omieNão"
                                    autocomplete="off" v-model="cadastro_omie" value="0">
                                <label class="btn" for="omieNão">Não</label>
                            </div>
                            <!-- <select v-model="cadastro_omie" class="form-select" style="width: 5rem;">
                                <option value="1">Sim</option>
                                <option value="0">Não</option>
                            </select> -->
                        </div>
                    </div>

                    <div v-if="cadastro_omie == '1'"
                        style="display: flex; align-content: center; justify-content: center; margin-top: 1rem;">
                        <div style="display: flex; align-items: center; margin-left: 1rem; flex-flow: column">
                            <strong>Responsável pelo cadastro no sistema</strong>
                            <select class="form-select" style="margin-left: 0.5rem; width: 15rem;  margin-top: 0.5rem">
                                <option v-for="item in usuarios" :key="item.id" :value="item.id">{{ nomeEsobrenome(item.nomeCompleto) }}
                                </option>
                                <option value="" selected></option>
                            </select>
                        </div>
                        <div
                            style="display: flex; align-items: center; width: fit-content;  margin-left: 1rem; flex-flow: column">
                            <strong>
                                Data
                            </strong>
                            <input type="date" value="2024-11-14" class="form-control"
                                style="width: 9rem; margin-left: 0.5rem;">
                        </div>
                        <div
                            style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem;flex-flow: column;">
                            <strong>Código</strong>
                            <input type="text" :placeholder="codigo" class="form-control"
                                style="width: 10rem; margin-left: 0.5rem;">
                        </div>

                        <div
                            style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem; flex-flow: column">
                            <strong>Nome</strong>
                            <input v-model="nome" type="text" class="form-control"
                                style="width: 10rem; margin-left: 0.5rem;">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: center; margin-top: 1rem;">
            <button @click="salvarPCM" style="height: 2.5rem; width: 7rem;"
                class="btn btn-primary float-right mr-2">Salvar</button>
        </div>
    </div>
    <br><br><br>
</template>
<script>
import { devURL } from '../../services/api'
import { prodURL } from '../../services/api'
import axios from 'axios';
import { Money3Component } from 'v-money3'

export default {
    name: "VisualizaçãoCriaçãoPCM",
    components: { money3: Money3Component },


    data() {
        return {
            codigo: "PCM - Nº 99999",
            finalidade: "",
            area: "",
            setor_id: 0,
            nome: "",
            dtInicio: null,
            descricao_problema: null,
            possivel_solucao: null,
            proposito_mudanca: null,
            dtLimiteImplementacao: null,
            solicitante_id: 0,
            solicitante_nome: "",
            estimativa_custo: 0,
            custo_justificativa: "",
            parecer_responsavel: "",
            responsavel_id: 0,
            responsavel_nome: "",
            responsavel_justificativa: null,
            meio_mudanca: null,
            cadastro_omie: null,
            impacto_viabilidade: [],

            itensDaAnalise: [],

            setores: null,
            usuarios: null,

            devURL: devURL,
            prodURL: prodURL,

            teste: 'nada',

            config: {
                masked: false,
                prefix: 'R$ ',
                thousands: '.',
                decimal: ',',
                precision: 2,
            }
        }
    },

    mounted() {
        this.getTabelaAnaliseImpacto(),
            this.getSetores()
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

        nomeEsobrenome(nome) {
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

        getSetores() {
            axios.get(`${this.prodURL}/usuario`, {

            })
                .then((response) => {
                    this.usuarios = response.data
                    this.usuarios = this.usuarios.map(item => ({
                        id: item.id,
                        nomeCompleto: item.name
                    }))
                })
                .catch((error) => {
                    console.error(error);
                });

            axios.get(`${this.prodURL}/setor`, {
            })
                .then((response) => {
                    this.setores = response.data
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getTabelaAnaliseImpacto() {
            axios.get(`${this.prodURL}/pcm/impacto-viabilidade`, {})
                .then((response) => {
                    this.itensDaAnalise = response.data.map(item => ({
                        ...item,
                        concordo: '', // Valor inicial de "concordo"
                        justificativa: '' // Valor inicial de "justificativa"
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        verPCMs() {
            this.$router.push({ name: "ControlePCM" })
        }
    }
}
</script>
<style scoped>
.fa-solid {
    margin-left: 3rem;
}

@media (max-width: 1800px) {
    .botaoHome {
        font-size: 30px;
        margin-left: 13rem !important;
        cursor: pointer;
        position: absolute;
    }

    .container {
        margin-left: 13.5rem !important;
    }

    .fa-solid {
        margin-left: 13.5rem !important;
    }

}

.botaoHome {
    font-size: 30px;
    margin-left: 260px;
    cursor: pointer;
    position: absolute;
}
</style>