<template>
    <div class="container">
    
        <div class="box-login">
            <div style="text-align: right;">
                <div v-if="codigoValido">
                    <b-button variant="outline-secondary" @click="toggleShowPassword ">
                        <!-- <b-icon :icon="showNewPasswordConf ? 'eye-fill' : 'eye-slash-fill'"></b-icon> -->
                        <i class="fa-solid fa-eye" :icon="showNewPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                    </b-button>
                </div>
            </div>
            <br>
            <div style="text-align: center;">

            <h4 class="titulo"> Validação de Token
            </h4>
            </div>
            <hr>
            <label style="text-align: center;">Insira o código token que você recebeu por E-mail </label>
            <br><br>
    
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user-lock"></i></span>
                </div>
                <input type="number" class="form-control" :disabled="codigoValido" placeholder="Digite o código do e-mail" v-model="codigo">
            </div>
    
            <button class="button-default" v-if="!codigoValido" @click="validarCodigo" >
                                            <i v-if="!loading" class="fa-solid fa-key" aria-hidden="true"></i> &nbsp;
                                            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                                            <span v-if="!loading">Verificar </span>
                                            <span v-if="loading"> &nbsp; Verificando...</span>
                                        </button>
    
            <div v-if="codigoValido">
    
                <br>
                <br>
    
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-lock"></i></span>
                    </div>
                    <input class="form-control" :type="showNewPassword ? 'text' : 'password'" ref="newPasswordInput" placeholder="Nova Senha" v-model="new_password">
                </div>
    
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-lock"></i></span>
                    </div>
                    <input class="form-control" :type="showPasswordConf ? 'text' : 'password'" ref="newPasswordConfInput" placeholder="Repita a Nova Senha" v-model="new_password_confirmation">
                </div>
    
                <div class="matches" v-if='notSamePasswords' style="color: red; text-align: center;">
                    <p>A senhas não conferem!</p>
                </div>
    
                <button class="button-default" @click="resetarSenha" v-if='passwordsFilled && !notSamePasswords && passwordValidation.valid'>
                                    <i v-if="!loading" class="fa-solid fa-circle-check" aria-hidden="true"></i>
                                    <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                                    <span v-if="!loading">Resetar Senha</span>
                                    <span v-if="loading">Resetando...</span>
                                </button>
    
                <transition name="hint" appear>
                    <div v-if='passwordValidation.errors.length > 0 && !submitted' class='hints'>
                        <hr>
                        <p style="color: red;" v-for='error in passwordValidation.errors' :key="error.id">{{error}} </p>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import api from '../../services/api';

const toaster = createToaster({
    position: "top-right",
    duration: "4000",
});

export default {
    name: "ValidarSenhaComponent",

    components: {

    },
    data() {
        return {
            codigo: '',
            new_password: '',
            new_password_confirmation: '',
            erroCodigo: false,
            codigoValido: false,
            loading: false,
            submitted: false,
            showNewPassword: false,
            showPasswordConf: false,
            rules: [
                { message: '- Minimo de 1 Letra Maiúscula', regex: /[A-Z]+/ },
                { message: '- Mínimo de 6 caracteres', regex: /.{6,}/ },
                { message: '- Minímo de 1 número', regex: /[0-9]+/ },
                { message: '- Mínimo de 1 caracter especial (ex: @ ! , . * -)', regex: /[^a-zA-Z 0-9]+/g },
            ]
        }
    },

    watch: {

    },

    methods: {
        toggleShowPassword(field) {

            if (field === 'new') {
                this.showNewPassword = !this.showNewPassword;

            } else if (field === 'confirmation') {
                this.showPasswordConf = !this.showPasswordConf;
            }
            this.showNewPassword = !this.showNewPassword;
            this.showPasswordConf = !this.showPasswordConf;
        },

        validarCodigo() {
            this.loading = true


            if (!this.codigo) {
                this.loading = false;
                toaster.show(`Por favor, preencha o código do e-mail`, { type: "error" });

            }

            //axios.post('http://192.168.0.6:8000/api/validar-codigo', { codigo: this.codigo })
            api.post('/validar-codigo', { codigo: this.codigo })
                .then(
                    response => {
                        if (response.data === 0) {
                            this.erroCodigo = true;
                            this.codigo = ''
                            this.loading = false
                            toaster.show(`Código incorreto ou inválido!`, { type: "error" });



                        } else if (response.data === 1) {

                            this.erroCodigo = false;
                            this.codigoValido = true;
                            this.loading = false
                            toaster.show(`Código validado com sucesso!`, { type: "success" });


                        }
                    })
                .catch(error => {
                    console.error(error);               

                });
        },

        resetarSenha() {

            this.loading = true

            if (!this.new_password) {
                this.loading = false
                toaster.show(`Por favor, preencha a senha`, { type: "error" });
                return;

            }

            if (!this.new_password_confirmation) {
                this.loading = false
                toaster.show(`Por favor, preencha a senha`, { type: "error" });
                return;
            }

            if (this.new_password === this.new_password_confirmation) {
                this.validationState = true

                //axios.post('http://192.168.0.6:8000/api/redefinir-senha', {
                api.post('/redefinir-senha', {
                        codigo: this.codigo,
                        new_password: this.new_password,
                        new_password_confirmation: this.new_password_confirmation

                    })
                    .then(response => {
                        this.codigo = ''
                        this.new_password = ''
                        this.new_password_confirmation = ''
                        this.loading = false
                        toaster.show(`Senha resetada com sucesso!`, { type: "success" });
                        this.$router.push({ name: "home"})

                        console.log(response)
                    })
                    .catch(error => {
                        this.loading = false
                        this.validationState = false
                        toaster.show(`Erro ao refenir senha!`, { type: "error" });
                        console.error('Erro ao redefinir a senha:', error);
                    });
            } else {
                this.loading = false
                this.new_password = ''
                this.new_password_confirmation = ''
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
.botaoShow {
    background-color: var(--second-color) !important;
    color: rgb(255, 255, 255) !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
}

.container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
}

.box-login {
    width: 350px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 30px;
    padding: 30px;
    border-radius: 20px;
}
</style>