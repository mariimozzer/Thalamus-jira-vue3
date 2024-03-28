<template>
  <br /><br /><br />
  <div
    style="width: 100%;margin-top: 1rem;justify-content: space-between;display: flex;margin-bottom: none;border-bottom: 2px solid rgb(0, 0, 0);align-items: center;position: fixed;background-color: #faf9f6;z-index: 1;">
    <i @click="verPCMs" style="font-size: 30px; margin-left: 3rem; cursor: pointer"
      class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela inicial'"></i>

    <i @click="verPCMs" class="fa-solid fa-house-chimney botaoAdicionarSprint botaoHome"
      :title="'Ir para tela de inicial'"></i>
    <h2>
      <input type="text" v-model="codigo" @change="atualizarPCM('codigo', codigo)" style="text-align: center" />
    </h2>
    <i style="font-size: 30px; margin-right: 3rem; cursor: pointer; visibility: hidden"
      class="bi bi-kanban botaoAdicionarSprint" :title="'Ir para painel KanBan'"></i>
  </div>
  <br /><br /><br />
  <div class="container" style="padding: 2rem 0rem 0rem 0rem">
    <div style="text-align: center">
      <h5><b>Área do Solicitante</b></h5>
    </div>
    <div style="border: 1px black solid; padding: 20px; border-radius: 20px">
      <div style="
          display: flex;
          align-content: center;
          justify-content: center;
          margin-left: 5rem;
        ">
        <div style="
            display: flex;
            align-items: center;
            width: fit-content;
            flex-flow: column;
          ">
          <strong>
            <br />
            Finalidade
            <br />
          </strong>
          <select class="form-select" style="margin-left: 0.5rem; margin-top: 0.5rem" v-model="finalidade"
            @change="atualizarPCM('finalidade', finalidade)">
            <option>Criação</option>
            <option>Mudança</option>
          </select>
        </div>
        <div style="
            display: flex;
            align-items: center;
            width: fit-content;
            margin-left: 1rem;
            flex-flow: column;
          ">
          <strong>
            <br />
            Área
            <br />
          </strong>
          <select class="form-select" style="margin-left: 0.5rem; margin-top: 0.5rem" v-model="area"
            @change="atualizarPCM('area', area)">
            <option>Processo</option>
            <option>Produto</option>
          </select>
        </div>
        <div style="
            display: flex;
            align-items: center;
            width: fit-content;
            margin-left: 1rem;
            flex-flow: column;
          ">
          <strong style="width: 15rem; text-align: center">
            Setor para encaminhamento da demanda
          </strong>
          <select class="form-select" style="margin-left: 0.5rem; width: 15rem; margin-top: 0.5rem"
            @change="atualizarPCM('setor_id', setor_id)" v-model="setor_id">
            <option v-for="setor in setores" :key="setor.id" :value="setor.id">
              {{ setor.nome }}
            </option>
          </select>
        </div>
        <div style="
            display: flex;
            align-items: center;
            width: fit-content;
            margin-left: 1rem;
            flex-flow: column;
          ">
          <strong>
            <br />
            Data de abertura
            <br />
          </strong>
          <input v-model="dtInicio" type="date" class="form-control" style="margin-top: 0.5rem"
            @focusout="atualizarPCM('dtInicio', dtInicio)" />
        </div>
      </div>

      <div class="input-group" style="margin-top: 1rem">
        <span class="input-group-text"><b>Descrição do Problema:</b> </span>
        <textarea class="form-control" v-model="descricao_problema" style="height: 8rem"
          @focusout="atualizarPCM('descricao_problema', descricao_problema)"></textarea>
      </div>
      <div class="input-group" style="margin-top: 1rem">
        <span class="input-group-text" style="width: 13rem"><b>Possível solução: </b>
        </span>
        <textarea class="form-control" v-model="possivel_solucao" style="height: 6rem"
          @focusout="atualizarPCM('possivel_solucao', possivel_solucao)"></textarea>
      </div>
      <div class="input-group" style="margin-top: 1rem">
        <span class="input-group-text" style="width: 13rem"><b>Propósito da mudança:</b>
        </span>
        <textarea class="form-control" v-model="proposito_mudanca"
          @focusout="atualizarPCM('proposito_mudanca', proposito_mudanca)">
        </textarea>
      </div>

      <div style="
          display: flex;
          align-content: center;
          justify-content: center;
          margin-top: 1rem;
        ">
        <div style="display: flex; align-items: center; flex-flow: column">
          <strong>Data limite de implementação</strong>
          <input v-model="dtLimiteImplementacao" @change="atualizarPCM('dtLimiteImplementacao', dtLimiteImplementacao)"
            type="date" class="form-control" style="width: 9rem; margin-left: 0.5rem; margin-top: 0.5rem" />
        </div>
        <div style="display: flex; align-items: center; margin-left: 1rem; flex-flow: column">
          <strong>Responsável pela solicitação</strong>
          <select class="form-select" style="margin-left: 0.5rem; width: 15rem; margin-top: 0.5rem"
            v-model="solicitante_id" @change="atualizarPCM('solicitante_id', solicitante_id)">
            <option v-for="item in usuarios" :key="item.id" :value="item.id">
              {{ nomeEsobrenome(item.nomeCompleto) }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="container" style="padding: 2rem 0rem 0rem 0rem">
    <div style="text-align: center">
      <h5><b>Área do Responsável</b></h5>
    </div>
    <div style="border: 1px black solid; padding: 20px; border-radius: 20px">
      <div>
        <div style="
            border: 1px solid black;
            padding-bottom: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          ">
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
              <tr v-for="(item, index) in impacto_viabilidade" :key="index">
                <th style="
                    border: 1px solid black;
                    border-left: none;
                    vertical-align: middle;
                  ">
                  {{ index + 1 }}.
                </th>
                <td style="border: 1px solid black; vertical-align: middle">
                  <div>
                    {{ item.descricao }}
                  </div>
                </td>

                <td style="border: 1px solid black; vertical-align: middle">
                  <div style="display: flex" v-if="item !== 'Estimativa de Custo da Mudança'">
                    <input type="radio" class="btn-check" :name="'options' + index" :id="'optionSim' + index"
                      autocomplete="off" v-model="item.concordo"
                      @change="atualizarPCM('impacto_viabilidade', objetoSemIndiceDescricao(item))" value="1" />
                    <label class="btn" :for="'optionSim' + index">Sim</label>
                    <input type="radio" class="btn-check" :name="'options' + index" :id="'optionNão' + index"
                      autocomplete="off" v-model="item.concordo"
                      @change="atualizarPCM('impacto_viabilidade', objetoSemIndiceDescricao(item))" value="0" />
                    <label class="btn" :for="'optionNão' + index">Não</label>
                  </div>
                </td>

                <td style="border: 1px solid black; border-right: none">
                  <textarea class="form-control" v-model="item.justificativa"
                    @change="atualizarPCM('impacto_viabilidade', objetoSemIndiceDescricao(item))"></textarea>
                </td>
              </tr>

              <tr>
                <th style="
                    border: 1px solid black;
                    border-left: none;
                    vertical-align: middle;
                  ">
                  10.
                </th>
                <td style="border: 1px solid black; vertical-align: middle">
                  <div>Estimativa de Custo da Mudança</div>
                </td>

                <td style="border: 1px solid black; vertical-align: middle">
                  <strong>
                    <money3 v-bind="config" v-model="estimativa_custo"
                      @focusout="atualizarPCM('estimativa_custo', estimativa_custo)"
                      style="width: 8rem; border: none; outline: none">
                    </money3>
                  </strong>
                </td>

                <td style="border: 1px solid black; border-right: none">
                  <textarea v-model="custo_justificativa"
                    @change="atualizarPCM('custo_justificativa', custo_justificativa)" class="form-control"></textarea>
                </td>
              </tr>
            </tbody>
          </table>

          <div style="display: flex; align-content: center; justify-content: center">
            <div style="display: flex;align-items: center;width: fit-content;flex-flow: column;">
              <strong> Parecer do Responsável </strong>
              <select v-model="parecer_responsavel" class="form-select"
                @change="atualizarPCM('parecer_responsavel', parecer_responsavel)"
                style="margin-left: 0.5rem; margin-top: 0.5rem" :style="{
        color: parecer_responsavel == 'Proposta viável' ? 'green' : 'red',
      }">
                <option style="color: green">Proposta viável</option>
                <option style="color: red">Proposta inviável</option>
              </select>
            </div>
            <div style="display: flex;align-items: center;width: fit-content;margin-left: 1rem;flex-flow: column;">
              <strong> Nome </strong>
              <select class="form-select" style="margin-left: 0.5rem; width: 13rem; margin-top: 0.5rem"
                v-model="responsavel_id" @change="atualizarPCM('responsavel_id', responsavel_id)">
                <option v-for="item in usuarios" :key="item.id" :value="item.id">
                  {{ nomeEsobrenome(item.nomeCompleto) }}
                </option>
              </select>
            </div>
          </div>

          <div class="input-group" style="margin-top: 1rem; padding-inline: 10px">
            <span class="input-group-text" style="width: 13rem"><b>Justificativa:</b>
            </span>
            <textarea v-model="responsavel_justificativa" @focusout="
        atualizarPCM('responsavel_justificativa', responsavel_justificativa)
        " class="form-control"></textarea>
          </div>
        </div>

        <div style="border: 1px solid black;padding: 5px;border-radius: 10px;margin-top: 1rem;">
          <div style="display: flex; align-content: center; justify-content: center">
            <div style="display: flex; align-items: center; width: 10rem; flex-flow: column">
              <strong> Meio da mudança </strong>
              <select v-model="meio_mudanca" @change="atualizarPCM('meio_mudanca', meio_mudanca)" class="form-select"
                style="margin-top: 0.5rem">
                <option>Plano de Ação</option>
                <option>Projeto</option>
              </select>
            </div>
            <div
              style="  display: flex;  align-items: center;  width: fit-content;  margin-left: 2rem;  flex-flow: column;">
              <strong> Necessidade de Cadastro no Omie? </strong>
              <div style="display: flex; margin-top: 0.5rem">
                <input type="radio" class="btn-check" name="cadastroOmie" id="omieSim" autocomplete="off"
                  v-model="cadastro_omie" @change="atualizarPCM('cadastro_omie', cadastro_omie)" value="1" />
                <label class="btn" for="omieSim">Sim</label>

                <input type="radio" class="btn-check" name="cadastroOmie" id="omieNão" autocomplete="off"
                  v-model="cadastro_omie" @change="atualizarPCM('cadastro_omie', cadastro_omie)" value="0" />
                <label class="btn" for="omieNão">Não</label>
              </div>
            </div>
          </div>

          <div v-if="cadastro_omie == '1'"
            style="display: flex;align-content: center;justify-content: center;margin-top: 1rem;">
            <div style="display: flex;align-items: center;margin-left: 1rem;flex-flow: column;">
              <strong>Responsável pelo cadastro no sistema</strong>
              <select class="form-select" style="margin-left: 0.5rem; width: 15rem; margin-top: 0.5rem"
                v-model="responsavelCadastro_id"
                @change="atualizarPCM('responsavelCadastro_id', responsavelCadastro_id)">
                <option v-for="item in usuarios" :key="item.id" :value="item.id">
                  {{ nomeEsobrenome(item.nomeCompleto) }}
                </option>
              </select>
            </div>
            <div
              style=" display: flex; align-items: center; width: fit-content;  margin-left: 1rem;  flex-flow: column; ">
              <strong> Data </strong>
              <input type="date" class="form-control" style="width: 9rem; margin-left: 0.5rem" v-model="dtCadastro"
                @change="atualizarPCM('dtCadastro', dtCadastro)" />
            </div>
            <div
              style="  display: flex; align-items: center; width: fit-content; margin-left: 1rem; flex-flow: column;">
              <strong>Código</strong>
              <input type="text" v-model="codigo_cadastro" @change="atualizarPCM('codigo_cadastro', codigo_cadastro)"
                class="form-control" style="width: 10rem; margin-left: 0.5rem" />
            </div>

            <div style="display: flex;align-items: center;width: fit-content;margin-left: 1rem;flex-flow: column;">
              <strong>Nome</strong>
              <input v-model="nome" @focusout="atualizarPCM('nome', nome)" type="text" class="form-control"
                style="width: 10rem; margin-left: 0.5rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br /><br /><br />
</template>
<script>
import { devURL } from "../../services/api";
import { prodURL } from "../../services/api";
import axios from "axios";
import { Money3Component } from "v-money3";

export default {
  name: "VisualizaçãoCriaçãoPCM",
  components: { money3: Money3Component },

  data() {
    return {
      idPCM: localStorage.getItem("idPCM"),

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

      responsavelCadastro_id: null,
      responsavelCadastro_nome: null,
      dtCadastro: null,
      codigo_cadastro: null,

      impacto_viabilidade: [],

      setores: null,
      usuarios: null,

      devURL: devURL,
      prodURL: prodURL,

      teste: "teste",

      config: {
        masked: false,
        prefix: "R$ ",
        thousands: ".",
        decimal: ",",
        precision: 2,
      },
    };
  },

  created() {
    this.getSetores(), this.getPCM();
  },

  methods: {
    objetoSemIndiceDescricao(item) {
      if (item) {
        const { indice, descricao, ...resto } = item;
        indice
        descricao
        return [resto];
      }
    },

    nomeEsobrenome(nome) {
      const nomeESobrenome = nome.split(" ");

      if (nomeESobrenome.length >= 2) {
        const primeiroNome = nomeESobrenome[0];
        const segundoNome = nomeESobrenome[1];

        if (segundoNome.length <= 3 || segundoNome == "Paula") {
          return `${primeiroNome} ${segundoNome} ${nomeESobrenome[2] || ""}`;
        } else {
          return `${primeiroNome} ${segundoNome}`;
        }
      } else {
        return nome;
      }
    },

    atualizarPCM(itemEditado, valor) {
      axios
        .put(`${this.prodURL}/pcm/atualizar/${this.idPCM}`, {
          [itemEditado]: valor,
        })
        .then(() => { })
        .catch((error) => {
          console.error(error);
        });
    },

    getSetores() {
      axios
        .get(`${this.prodURL}/usuario`, {})
        .then((response) => {
          this.usuarios = response.data;
          this.usuarios = this.usuarios.map((item) => ({
            id: item.id,
            nomeCompleto: item.name,
          }));
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(`${this.prodURL}/setor`, {})
        .then((response) => {
          this.setores = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getPCM() {
      axios
        .get(`${this.prodURL}/pcm/buscar/${this.idPCM}`, {})
        .then((response) => {
          this.codigo = response.data.codigo;
          this.finalidade = response.data.finalidade;
          this.area = response.data.area;
          this.setor_id = response.data.setor_id;
          this.nome = response.data.nome;
          this.dtInicio = response.data.dtInicio;
          this.descricao_problema = response.data.descricao_problema;
          this.possivel_solucao = response.data.possivel_solucao;
          this.proposito_mudanca = response.data.proposito_mudanca;
          this.dtLimiteImplementacao = response.data.dtLimiteImplementacao;
          this.solicitante_id = response.data.solicitante_id;
          this.solicitante_nome = response.data.solicitante_nome;
          this.estimativa_custo = response.data.estimativa_custo;
          this.custo_justificativa = response.data.custo_justificativa;
          this.parecer_responsavel = response.data.parecer_responsavel;
          this.responsavel_id = response.data.responsavel_id;
          this.responsavel_nome = response.data.responsavel_nome;
          this.responsavel_justificativa = response.data.responsavel_justificativa;
          this.meio_mudanca = response.data.meio_mudanca;
          this.cadastro_omie = response.data.cadastro_omie;
          this.impacto_viabilidade = response.data.impacto_viabilidade
          this.responsavelCadastro_id = response.data.responsavelCadastro_id;
          this.responsavelCadastro_nome = response.data.responsavelCadastro_nome;
          this.dtCadastro = response.data.dtCadastro;
          this.codigo_cadastro = response.data.codigo_cadastro;
        })

        .catch((error) => {
          console.error(error);
        });
    },

    verPCMs() {
      this.$router.push({ name: "ControlePCM" });
    },
  },
};
</script>
<style scoped>
@media (max-width: 1800px) {
  .container {
    margin-left: 13rem;
    max-width: 1100px;
  }

  .botaoHome {
    margin-left: 200px !important;
  }

}

.botaoHome {
  font-size: 30px;
  margin-left: 250px;
  cursor: pointer;
  position: absolute;
}
</style>
