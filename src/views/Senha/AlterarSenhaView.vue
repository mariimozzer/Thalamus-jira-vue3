<template>
    <div class="container">
        <br>
        <div class="box-login">

            <div style="text-align: right;">
                <b-button variant="outline-secondary" @click="toggleShowPassword">
                    <!-- <b-icon :icon="showNewPasswordConf ? 'eye-fill' : 'eye-slash-fill'"></b-icon> -->
                    <!-- <i class="fa-solid fa-eye" :icon="showNewPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i> -->
                    <i class="fas" :class="{ 'fa-eye-slash': showNewPassword, 'fa-eye': !showNewPassword }"></i>

                </b-button>
            </div>
            <br>
            <div style="text-align: center;">

                <h4 class="titulo"> Alterar Senha </h4>
            </div>
            <hr>

            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <i class="fa-solid fa-lock"></i>
                </b-input-group-prepend>
                <b-form-input :type="showCurrentPassword ? 'text' : 'password'" ref="currentInput" placeholder="Senha Atual"
                    v-model="current_password"></b-form-input>
                <b-input-group-append>

                </b-input-group-append>
            </b-input-group>

            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <i class="fa-solid fa-lock"></i>
                </b-input-group-prepend>
                <b-form-input :type="showNewPassword ? 'text' : 'password'" placeholder="Nova Senha"
                    v-model="new_password"></b-form-input>
                <b-input-group-append>

                </b-input-group-append>
            </b-input-group>

            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <i class="fa-solid fa-lock"></i>
                </b-input-group-prepend>
                <b-form-input :type="showNewPasswordConf ? 'text' : 'password'" :state="validationState"
                    placeholder="Repita a Nova Senha" v-model="new_password_confirmation"></b-form-input>

            </b-input-group>

            <div class="matches" v-if='notSamePasswords' style="color: red; text-align: center;">
                <p>A senhas não conferem!</p>
            </div>

            <br>

            <br>
            <transition name="hint" appear>
                <div v-if='passwordValidation.errors.length > 0 && !submitted' class='hints'>

                    <hr>
                    <p style="color: green;" v-for='error in passwordValidation.errors' :key="error.id">{{ error }} </p>
                </div>
            </transition>



            <b-button @click="resetPassword" class="button-default"
                v-if='passwordsFilled && !notSamePasswords && passwordValidation.valid'>
                <b-icon v-if="!loading" icon="check-circle-fill" aria-hidden="true"></b-icon>
                <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                <span v-if="!loading">Salvar </span>
                <span v-if="loading">Salvando...</span>
            </b-button>

        </div>
        <br><br><br><br><br>
    </div>
</template>
  
<script>
import AlterarSenha from '@/models/AlterarSenha'
//import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import api from '../../services/api';

const toaster = createToaster({
    position: "top-right",
    duration: "4000",
});

export default {

    name: 'AlterarSenhaComponent',
    components: {

    },
    data() {
        return {
            senha: new AlterarSenha(),
            loading: false,
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
            reset_token: '',
            submitted: false,
            showCurrentPassword: false,
            showNewPassword: false,
            showNewPasswordConf: false,
            rules: [
                { message: '- Minimo de 1 Letra Maiúscula', regex: /[A-Z]+/ },
                { message: '- Mínimo de 6 caracteres', regex: /.{6,}/ },
                { message: '- Minímo de 1 número', regex: /[0-9]+/ },
                { message: '- Mínimo de 1 caracter especial (ex: @ ! , . * -)', regex: /[^a-zA-Z 0-9]+/g },

            ]
        }
    },

    methods: {

        toggleShowPassword(field) {

            if (field === 'current') {
                this.showCurrentPassword = !this.showCurrentPassword;
            } else if (field === 'new') {
                this.showNewPassword = !this.showNewPassword;
            } else if (field === 'confirmation') {
                this.showNewPasswordConf = !this.showNewPasswordConf;
            }
            this.showCurrentPassword = !this.showCurrentPassword;
            this.showNewPassword = !this.showNewPassword;
            this.showNewPasswordConf = !this.showNewPasswordConf;
        },

        resetPassword() {
            this.loading = true;
            this.validationState = true;

            if (!this.current_password) {

                this.loading = false;
                toaster.show(`Por favor, preencha a senha atual`, { type: "error" });
                return;
            }

            if (this.new_password === this.new_password_confirmation) {
                this.reset_token = localStorage.getItem('token')
                console.log(this.reset_token)

                //axios.post('http://192.168.0.6:8000/api/usuario/senha/alterar', {
                api.post('/usuario/senha/alterar', {
                    current_password: this.current_password,
                    new_password: this.new_password,
                    new_password_confirmation: this.new_password_confirmation
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.reset_token}`
                    }
                })
                    .then(
                        response => {
                            this.current_password = ''
                            this.new_password = ''
                            this.new_password_confirmation = ''
                            this.loading = false
                            toaster.show(`Senha alterada com sucesso!`, { type: "success" });
                            this.$router.push({ name: "HomeView" })

                            console.log(response)
                        }
                    )
                    .catch(error => {
                        this.loading = false
                        toaster.show(`Erro ao alterar senha`, { type: "error" });

                        console.error(error)
                    })
            } else {
                this.loading = false
                this.new_password = ''
                this.new_password_confirmation = ''
                this.current_password = ''
            }

        },

    },

    computed: {
        notSamePasswords() {
            if (this.passwordsFilled) {
                return (this.new_password !== this.new_password_confirmation)
            } else {
                return false
            }
        },
        passwordsFilled() {
            return (this.new_password !== '' && this.new_password_confirmation !== '')
        },
        passwordValidation() {
            let errors = []
            for (let condition of this.rules) {
                if (!condition.regex.test(this.new_password)) {
                    errors.push(condition.message)
                }
            }
            if (errors.length === 0) {
                return { valid: true, errors }
            } else {
                return { valid: false, errors }
            }
        },


    }
}
</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
}

.box-login {
    max-width: 400px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 50px;
    padding: 30px;
    border-radius: 20px;
    background-color: #ffffff;
}

.b-button {
    width: 100%;
    background-color: var(--second-color) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
}

/* @media (max-width: 576px) {
    .box-login {
        margin-top: 20px;
    }
} */</style>
  