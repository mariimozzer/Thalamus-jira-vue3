<template>
    <div>
        <br><br><br>
        <div
            style="width: 100%;margin-top: 1rem; justify-content: space-between; display: flex; margin-bottom: none; border-bottom: 2px solid rgb(0, 0, 0); align-items: center; position: fixed; background-color: #FAF9F6; z-index: 1;">
            <i @click="verPCMs" style="font-size: 30px; margin-left: 3rem; cursor: pointer;"
                class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela inicial'"></i>

            <i @click="verPCMs" class="fa-solid fa-house-chimney botaoAdicionarSprint botaoHome"
                :title="'Ir para tela de projetos'"></i>
            <h2>PCM - Nº 240181</h2>
            <i style="font-size: 30px; margin-right: 3rem; cursor: pointer; visibility: hidden;"
                class="bi bi-kanban botaoAdicionarSprint" :title="'Ir para painel KanBan'"></i>
        </div>
        <br><br>
        <div class="container" style="padding: 2rem 0rem 0rem 0rem;">
            <div style="text-align: center;">
                <h5><b>Área do Solicitante</b></h5>
            </div>
            <div style="border: 1px black solid; padding: 20px; border-radius: 10px;">
                <div style="display: flex; align-content: center; justify-content: center;">
                    <div style="display: flex; align-items: center; width: fit-content;">
                        <strong>
                            Finalidade:
                        </strong>
                        <select class="form-select" style="margin-left: 0.5rem;">
                            <option>Criação</option>
                            <option>Mudança</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: center; width: fit-content; margin-left: 1rem;">
                        <strong>
                            Área:
                        </strong>
                        <select class="form-select" style="margin-left: 0.5rem;">
                            <option>Processo</option>
                            <option>Produto</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem;">
                        <strong style="width: 21rem;">
                            Setor para encaminhamento da demanda :
                        </strong>
                        <select class="form-select" style="margin-left: 0.5rem; width: 9rem;">
                            <option>P&D</option>
                            <option>Comercial</option>
                        </select>
                    </div>
                </div>

                <div class="input-group" style="margin-top: 1rem;">
                    <span class="input-group-text"><b>Descrição do Problema:</b> </span>
                    <textarea class="form-control"
                        style="height: 8rem;">O objetivo principal da Roboflex é soluções em hardware e software, em complemento, seu portfólio é através de produtos manufaturados. Em nossa linha histórica, existem eventualmente atrasos na conclusão e entrega ou problemas como vícios de qualidade e não conformidades, bem como a imprecisão dos dados alimentados através da extensa lista de documentos e arquivos criados para controle, nos quais mitigaram erros maiores, mas ainda sim ressalta-sa erros minuciosos que impactam em um cadeia contínua de produção e fluxo. Problemas de desempenho, qualidade, custos desnecessários também podem decorrer da inexistência de meios computacionais para gestão rápida e automatizada do processo produtivo.  A demanda de mercado, exige cada vez mais a otimização do processo produtivo com flexibilidade para mudanças de processos internos e consequetemente uma sistemática mais enxuta.</textarea>
                </div>
                <div class="input-group" style="margin-top: 1rem;">
                    <span class="input-group-text" style="width: 13rem;"><b>Possível solução: </b> </span>
                    <textarea class="form-control"
                        style="height: 6rem;">Desenvolvimento de um sistema de informações, com enfoque em sistema de controle de execução de manufatura (MES), com funcionalidades necessárias de ERP e gestão de projetos ágeis, de uma concepção modularizada, através de um diagnóstico contínuo de necessidades na indústria alvo.</textarea>
                </div>
                <div class="input-group" style="margin-top: 1rem;">
                    <span class="input-group-text" style="width: 13rem;"><b>Propósito da mudança:</b> </span>
                    <textarea
                        class="form-control">Aumentar o desempenho, promover a redução de custos diretos/indiretos, qualidade e tempo de processos ponta a ponta.</textarea>
                </div>

                <div style="display: flex ;align-content: center; justify-content: center;; margin-top: 1rem;">
                    <div style="display: flex; align-items: center;">
                        <strong>Data limite de implementação:</strong> <input type="date" value="2024-12-31"
                            class="form-control" style="width: 9rem; margin-left: 0.5rem;">
                    </div>
                    <div style="display: flex; align-items: center; margin-left: 1rem;">
                        <strong>Responsável pela solicitação:</strong> <input type="text" placeholder="Fernando Lopes"
                            class="form-control" style="width: 10rem; margin-left: 0.5rem;">
                    </div>
                </div>
            </div>
        </div>



        <div class="container" style="padding: 2rem 0rem 0rem 0rem;">
            <div style="text-align: center;">
                <h5><b>Área do Responsável</b></h5>
            </div>
            <div>
                <div>
                    <div
                        style="border: 1px solid black;padding-bottom: 10px;border-bottom-left-radius: 20px; border-bottom-right-radius: 10px; padding-bottom: 10px">
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
                                    <th
                                        style="border: 1px solid black; border-left: none ;vertical-align: middle; width: 1rem">
                                        {{ index + 1 }}.
                                    </th>
                                    <td style="border: 1px solid black; vertical-align: middle; width: 50%;">
                                        <div>
                                            {{ item }}
                                        </div>
                                    </td>

                                    <td style="border: 1px solid black;vertical-align: middle; width: 10%">
                                        <div style="display: flex;" v-if="item !== 'Estimativa de Custo da Mudança'">
                                            <input type="radio" class="btn-check" :name="'options' + index"
                                                :id="'optionSim' + index" autocomplete="off">
                                            <label class="btn" :for="'optionSim' + index">Sim</label>

                                            <input type="radio" class="btn-check" :name="'options' + index"
                                                :id="'optionNão' + index" autocomplete="off">
                                            <label class="btn" :for="'optionNão' + index">Não</label>
                                        </div>
                                        <div v-if="item == 'Estimativa de Custo da Mudança'">
                                            <strong>
                                                <money3 v-bind="config" :model-value="600000"
                                                style="width: 8rem;border: none; outline: none;"
                                                ></money3>
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
                                        <option style="color: green;">Proposta viável</option>
                                        <option style="color: red;">Proposta inviável</option>
                                    </select>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; width: fit-content; margin-left: 1rem;">
                                <strong>
                                    Nome:
                                </strong>
                                <input type="text" placeholder="Darley Dias" class="form-control"
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
                                    <option>Plano de Ação</option>
                                    <option selected>Projeto</option>
                                </select>
                            </div>
                            <div style="display: flex; align-items: center; width: fit-content ;  margin-left: 1rem;">
                                <strong style="width: 10rem;">
                                    Necessidade de Cadastro no Omie?
                                </strong>
                                <select v-model="cadastroNoSistema" class="form-select"
                                    style="margin-left: 0.5rem; width: 5rem;">
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
    </div>
</template>
<script>
import { Money3Component } from 'v-money3'

export default {

    name: "VisualizaçãoCriaçãoPCM",
    components: { money3: Money3Component },

    data() {
        return {
            cadastroNoSistema: 'Não',
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
            ],
            config: {
                masked: false,
                prefix: 'R$ ',
                thousands: '.',
                decimal: ',',
                precision: 2,
            }
        }
    },

    methods: {
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