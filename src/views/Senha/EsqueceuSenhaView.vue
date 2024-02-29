<template>
    <div class="container">
    
        <div class="box-login">
            <div style="text-align: center;">
    
                <h4 class="titulo"> Esqueceu sua Senha ? </h4>
            </div>
            <hr><br>
            <label style="text-align: center;">Informe o e-mail para o qual deseja redefinir sua senha</label>
            <br><br>
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <i class="fa-solid fa-envelope"></i>
                </b-input-group-prepend>
                <b-form-input @keyup.enter="resetarSenha()" type="text" placeholder="Digite seu e-mail" v-model="email"></b-form-input>
                <b-input-group-append>
                </b-input-group-append>
            </b-input-group>
    
            <button class="button-default"  @click="resetarSenha" type="button">
                                    <i v-if="!loading" class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                                    <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                                    <span v-if="!loading">Enviar código de recuperação</span>
                                    <span v-if="loading">Enviando...</span>
                                </button>
            <div v-if="loading" style="text-align: center;">
                <br>
            </div>
            <br><br>
            <label style="text-align: center; color: rgb(116, 112, 112);">Você receberá um código token por e-mail para cadastrar uma nova senha</label>
        </div>
    </div>
</template>

<script>
//import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";
import api from '../../services/api';

const toaster = createToaster({
    position: "top-right",
    duration: "4000",
});


export default {
    name: "EsqueceuSenhaComponent",

    components: {

    },

    data() {
        return {
            email: '',
            loading: false

        }
    },

    methods: {
        resetarSenha() {
            this.loading = true;

            if (!this.email) {

                toaster.show(`Por favor, preencha o e-mail`, { type: "error" });
            }

            //axios.post('http://192.168.0.6:8000/api/enviar-codigo', {
            api.post('/enviar-codigo', {
                email: this.email,

            }).then(
                res => {
                    toaster.show(`E-mail enviado com sucesso!`, { type: "success" });

                    this.$router.push({ name: "ValidarSenha" })
                    this.loading = false;
                    this.email = ''
                    console.log(res)
                },


            ).catch(
                err => {

                    this.loading = false;
                    this.email = ''
                    console.log(err)
                    toaster.show(`E-mail não cadastrado ou incorreto`, { type: "error" });

                }
            )
        },

    }
}
</script>

<style scoped>
.btn {
    width: 100%;
    background-color: var(--second-color) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
}

.box-login {
    width: 350px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 30px;
    padding: 30px;
    border-radius: 20px;
}

.container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
}
</style>