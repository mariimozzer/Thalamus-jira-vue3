<template>
    <br><br><br><br>
    <!-- <div
        style="width: 100%; margin-top: 1rem; margin-bottom: none; border-bottom: 2px solid rgb(0, 0, 0); align-items: center; text-align: center;">
        <h1>PCM - Nº 240181</h1>
        Data de abertura: 14/11/2023
    </div> -->
    <div
        style="width: 100%; margin-top: 1rem; justify-content: space-between; display: flex; margin-bottom: none; border-bottom: 2px solid rgb(0, 0, 0); align-items: center; ">
        <i @click="verPCMs" style="font-size: 30px; margin-left: 2rem; cursor: pointer;"
            class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela inicial'"></i>
            <h2>PCM - Nº 240182</h2>
        <i style="font-size: 30px; margin-right: 2rem; visibility: hidden;"
            class="bi bi-kanban botaoAdicionarSprint"></i>
    </div>
    <div style="text-align: center;">
        Data de abertura: <input type="date" disabled :value="new Date().toISOString().split('T')[0]">
    </div>
    <div class="container" style="padding: 2rem 0rem 0rem 0rem;">
        <div style="text-align: center;">
            <h5><b>Área do Solicitante</b></h5>
        </div>
        <div style="border: 1px black solid; padding: 20px; border-radius: 20px;">
            <div style="display: flex; align-content: center; justify-content: center;">
                <div style="display: flex; align-items: center; width: fit-content;">
                    <strong>
                        Finalidade:
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem;">
                        <option value="" hidden></option>
                        <option>Criação</option>
                        <option>Mudança</option>
                    </select>
                </div>
                <div style="display: flex; align-items: center; width: fit-content; margin-left: 1rem;">
                    <strong>
                        Área:
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem;">
                        <option value="" hidden></option>
                        <option>Processo</option>
                        <option>Produto</option>
                    </select>
                </div>
                <div style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem;">
                    <strong style="width: 21rem;">
                        Setor para encaminhamento da demanda :
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem; width: 9rem;">
                        <option value="" hidden></option>
                        <option>P&D</option>
                        <option>Comercial</option>
                    </select>
                </div>
            </div>

            <div class="input-group" style="margin-top: 1rem;">
                <span class="input-group-text"><b>Descrição do Problema:</b> </span>
                <textarea class="form-control" style="height: 8rem;"></textarea>
            </div>
            <div class="input-group" style="margin-top: 1rem;">
                <span class="input-group-text" style="width: 13rem;"><b>Possível solução: </b> </span>
                <textarea class="form-control"
                    style="height: 6rem;"></textarea>
            </div>
            <div class="input-group" style="margin-top: 1rem;">
                <span class="input-group-text" style="width: 13rem;"><b>Propósito da mudança:</b> </span>
                <textarea
                    class="form-control">
                </textarea>
            </div>

            <div style="display: flex ;align-content: center; justify-content: center;; margin-top: 1rem;">
                <div style="display: flex; align-items: center;">
                    <strong>Data limite de implementação:</strong> <input type="date" value=""
                        class="form-control" style="width: 9rem; margin-left: 0.5rem;">
                </div>
                <div style="display: flex; align-items: center; margin-left: 1rem;">
                    <strong>Responsável pela solicitação:</strong> <input type="text" placeholder=""
                        class="form-control" style="width: 10rem; margin-left: 0.5rem;">
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
                                        {{ item }}
                                    </div>
                                </td>

                                <td style="border: 1px solid black;vertical-align: middle;">
                                    <div style="display: flex;" v-if="item !== 'Estimativa de Custo da Mudança'">
                                        <input type="radio" class="btn-check" :name="'options' + index"
                                            :id="'optionSim' + index" autocomplete="off" checked>
                                        <label class="btn" :for="'optionSim' + index">Sim</label>

                                        <input type="radio" class="btn-check" :name="'options' + index"
                                            :id="'optionNão' + index" autocomplete="off">
                                        <label class="btn" :for="'optionNão' + index">Não</label>
                                    </div>
                                    <div v-if="item == 'Estimativa de Custo da Mudança'">
                                        <strong>
                                            R$ 
                                        </strong>
                                    </div>
                                </td>

                                <td style="border: 1px solid black; border-right: none;">
                                    <textarea class="form-control"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="display: flex; align-content: center; justify-content: center;">
                        <div style="display: flex; align-items: center; width: fit-content;">
                            <strong>
                                Parecer do Responsável:
                            </strong>
                            <div style="display: flex; margin-left: 0.5rem;">
                                <select class="form-select" style="margin-left: 0.5rem; color: green;">
                                    <option value="" hidden></option>
                                    <option style="color: green;">Proposta viável</option>
                                    <option style="color: red;">Proposta inviável</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; width: fit-content; margin-left: 1rem;">
                            <strong>
                                Nome:
                            </strong>
                            <input type="text" placeholder="" class="form-control"
                                style="width: 10rem; margin-left: 0.5rem;">
                        </div>
                    </div>

                    <div class="input-group" style="margin-top: 1rem; padding-inline: 10px;">
                        <span class="input-group-text" style="width: 13rem;"><b>Justificativa:</b> </span>
                        <textarea class="form-control"></textarea>
                    </div>

                </div>

                <div style="border: 1px solid black; padding: 5px; border-radius: 10px; margin-top: 1rem;">

                    <div style="display: flex; align-content: center; justify-content: center;">
                        <div style="display: flex; align-items: center; width: fit-content;">
                            <strong style="width: 15rem;">
                                Meio da mudança:
                            </strong>
                            <select class="form-select" style="margin-left: 0.5rem;">
                                <option value="" hidden></option>
                                <option>Plano de Ação</option>
                                <option>Projeto</option>
                            </select>
                        </div>
                        <div style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem;">
                            <strong style="width: 10rem;">
                                Necessidade de Cadastro no Omie?
                            </strong>
                            <select v-model="cadastroNoSistema" class="form-select"
                                style="margin-left: 0.5rem; width: 5rem;">
                                <option value="" hidden></option>
                                <option>Sim</option>
                                <option>Não</option>
                            </select>
                        </div>
                    </div>

                    <div v-if="cadastroNoSistema == 'Sim'"
                        style="display: flex; align-content: center; justify-content: center; margin-top: 1rem;">
                        <div style="display: flex; align-items: center; margin-left: 1rem;">
                            <strong>Responsável pelo cadastro no sistema:</strong> <input type="text"
                                placeholder="Raiane Baldez" class="form-control"
                                style="width: 10rem; margin-left: 0.5rem;">
                        </div>
                        <div style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem;">
                            <strong>
                                Data:
                            </strong>
                            <input type="date" value="2024-11-14" class="form-control"
                                style="width: 9rem; margin-left: 0.5rem;">
                        </div>
                        <div style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem;">
                            <strong>Código:</strong>
                            <input type="text" placeholder="PCM240181" class="form-control"
                                style="width: 10rem; margin-left: 0.5rem;">
                        </div>

                        <div style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem;">
                            <strong>Nome:</strong>
                            <input type="text" placeholder="THALAMUS" class="form-control"
                                style="width: 10rem; margin-left: 0.5rem;">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <br><br><br>
</template>
<script>
export default {
    name: "VisualizaçãoCriaçãoPCM",

    data() {
        return {
            cadastroNoSistema: '',
            itensDaAnalise: [
                'Afetará a documentação de produtos já existentes? (B.O.M, Roteiro de Produção, Esquema elétrico, Estrutura, etc.)',
                'Irá impactar o estoque? (inativação de um item ou chegada de algum código novo)',
                'Afeta a infraestrutura do local? (remanejamento de móveis, inclusão de maquinário, etc)',
                'Demanda treinamento operacional ou nova contratação?',
                'A mudança pode afetar o impacto ambiental? (emissão de gases, geração de resíduos, geração de afluentes)',
                'O produto a ser alterado/criado possui ou deve possuir certificação? Se positivo, comunicar mudança à certificadora e aguardar a autorização da mesma.',
                'O cenário geral do mercado é viável à proposta?',
                'A empresa possui capacidade interna para implementação da proposta?',
                'A implementação da proposta será rentável à empresa?',
                'Estimativa de Custo da Mudança'
            ]
        }
    },

    methods: {
        verPCMs(){
            this.$router.push({ name: "ControlePCM" })
        }
    }
}
</script>