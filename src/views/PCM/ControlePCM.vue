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
                    <button :title="'Adicionar PCM'" style="width: max-content; font-size: 30px;" @click="novoPCM"
                        class="botaoAdicionarSprint">
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

                                <td style="text-align: center; vertical-align: middle;"
                                    :style="{ 'color': (item.status == 'Aguardando Aprovação') ? 'rgb(255, 145, 0)' : (item.status == 'Reprovado') ? '#e02130' : (item.status == 'Aprovado') ? 'rgb(0, 192, 0)' : 'red', }">
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
                                            <button class="button-aprovar" :disabled="item.aprovada !== null"
                                                @click="atualizarPCM('status', 'Aprovado', item.id)">
                                                Aprovar
                                                <i class="fa-solid fa-thumbs-up"></i>
                                            </button>
                                        </div>
                                        <div style="margin-left: 1rem;">
                                            <button type="button" class="button-reprovar"
                                                @click="atualizarPCM('status', 'Reprovado', item.id)"
                                                :disabled="item.aprovada !== null">
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

            teste: null
        }
    },

    mounted() {
        this.getPCMs()
    },

    methods: {

        atualizarPCM(itemEditado, valor, id) {
            if (valor == 'Aprovado') {
                axios.put(`${this.prodURL}/pcm/atualizar/${id}`, {
                    [itemEditado]: valor,
                    aprovada: 1
                })
                    .then(() => {
                        this.getPCMs()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            if (valor == 'Reprovado') {
                axios.put(`${this.prodURL}/pcm/atualizar/${id}`, {
                    [itemEditado]: valor,
                    aprovada: 0
                })
                    .then(() => {
                        this.getPCMs()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },

        formatarDataHora(valor) {
            if (valor) {
                if (valor) {
                    return valor.slice(0, 10)
                } else {
                    return ''
                }
            }
        },

        novoPCM() {
            var PCMsOrdenados = this.PCMs.sort((a, b) => {
                if (a.codigo < b.codigo) {
                    return 1; // retorna 1 para indicar que a deve vir depois de b
                } else if (a.codigo > b.codigo) {
                    return -1; // retorna -1 para indicar que a deve vir antes de b
                } else {
                    return 0; // retorna 0 se os valores são iguais
                }
            });
            var novoCodigo = parseInt(PCMsOrdenados[0].codigo.substring(3));

            axios.post(`${this.prodURL}/pcm/cadastrar`, {

                codigo: `PCM${novoCodigo + 1}`,
                dtInicio: new Date().toISOString().split('T')[0],
                impacto_viabilidade: [],
                status: 'Aguardando Aprovação'
            })
                .then((response) => {
                    this.verPCM(response.data.id)
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

input:disabled{
    color:black
}
select:disabled{
    color:black
}

@media (max-width: 1800px) {
    .container {
        margin-left: 12rem !important;
        max-width: 1100px !important;
    }

    .botaoHome {
        font-size: 30px;
        margin-left: 6rem !important;
        cursor: pointer;
        position: absolute;
    }
}

.button-reprovar:disabled {
    width: 10rem;
    background-color: #e0213171 !important;
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
    background-color: #4298677e !important;
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