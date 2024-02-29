<template>
    <div class="home">
    
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="color: white; text-align: center; margin-left: 0px;">
            <a class="navbar-brand" href="#">
                  <img src="https://roboflex.com.br/wp-content/uploads/2023/05/logotipo-roboflex.png" alt="Logo"
                    style="width: 75%;">
                </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
            <div class="navbar-nav ml-auto">
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                      <i style="color: white;" class="fa-solid fa-circle-user"></i>
                      <span class="username" style="color: white;">&nbsp; Olá, {{ userName }}</span>
</template>
            <b-dropdown-item style="color: black" href="/alterarSenha">
              <span style="color: black;"><i class="fa-solid fa-user-gear"></i>&nbsp; Alterar Senha</span>
            </b-dropdown-item>
            <b-dropdown-item style="color: black" @click="logout">
              <span style="color: black;"><i class="fa-solid fa-right-from-bracket"></i>&nbsp; Logout</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </nav>
      <div style="left: 0px;">
        <div class="three-columns" style="justify-content: center; color: white; text-align: center;">
          <div id="column1" style="width: 33%;">
            <!-- <router-link to="acesso/home"> -->
              <div class="image-container">
                <img src="../../../public/img/home4_4.png" style="width: 100%; height: 90vh; object-fit: cover;">
                <div class="image-text">
                  <p>ADMINISTRATIVO</p>
                  <p class="image-text2">ADMINISTRATIVO</p>
                </div>
              </div>
            <!-- </router-link> -->
          </div>
          <div id="column1" style="width: 34%;">
            <!-- <router-link to="/home"> -->
              <div class="image-container">
                <img src="../../../public/img/home4_5.png" style="width: 100%; height: 90vh; object-fit: cover;">
                <div class="image-text">
                  <p>FÁBRICA</p>
                  <p class="image-text2">FÁBRICA</p>
                </div>
              </div>
            <!-- </router-link> -->
          </div>
          <div id="column1" style="width: 33%;">
            <router-link to="/projetos">
              <div class="image-container">
                <img src="../../../public/img/home4_6.png" style="width: 100%; height: 90vh; object-fit: cover;">
                <div class="image-text">
                  <p>GESTÃO</p>
                  <p class="image-text2">GESTÃO</p>
                </div>
              </div>
            </router-link>
          </div>
        
        </div>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
    name: "HomeView",
    components: {

    },
    methods: {


        logout() {
            const token = sessionStorage.getItem('token')
            axios
                .post('http://192.168.0.5:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    this.$router.push('/');
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('userName')
                    sessionStorage.removeItem('LoggedUser')
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        },

        closeContent() {
            this.activeMenu = null;
        },
    },

    created() {
        this.userName = sessionStorage.getItem('userName')

    }
}
</script>
  
    
<style scoped>
.image-container {
    position: relative;
}

.image-text {
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 41px;
    font-weight: 700;
    cursor: pointer;
}

.image-text2 {
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 41px;
    font-weight: 700;
    cursor: pointer;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #fff;
    -webkit-text-fill-color: transparent;
}

.home {
    position: fixed;
    bottom: 0;
    left: 0;
}

nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    left: 0;
}

.three-columns {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: space-between center;
    align-items: center;
    margin-left: 0px;
    z-index: 7;
}

.column:hover {
    background-color: #000000;
    box-shadow: 0 0 1000px rgb(0, 0, 0);
    cursor: pointer;
    opacity: 1;
    filter: grayscale(0%);
}

#column1:hover {
    background-color: #000000;
    box-shadow: 0 0 1000px rgb(255, 255, 255);
    cursor: pointer;
    opacity: 1;
    filter: grayscale(0%);
}

#column2:hover {
    background-color: #000000;
    box-shadow: 0 0 1000px rgb(0, 0, 0);
    cursor: pointer;
    opacity: 1;
    filter: grayscale(0%);
}

#column3:hover {
    background-color: #000000;
    box-shadow: 0 0 1000px rgb(0, 0, 0);
    cursor: pointer;
    opacity: 1;
    filter: grayscale(0%);
}

.column {
    flex: 1;
    height: 100%;
    margin: 0px;
}

#column1 {
    border: 10px solid none;
    background-color: var(--first-color);
    /*  background-image: url(../../public/img/home4_4.png); */
    background-repeat: no-repeat;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
}

#column2 {
    border: 10px solid none;
    background-color: #393D40;
    /* background-image: url(../../public/img/home4_5.png); */
    background-repeat: no-repeat;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
    /* opacity: 0.2; */
}

#column3 {
    border: 10px solid none;
    background-color: #515558;
    /*  background-image: url(../../public/img/home4_6.png); */
    background-repeat: no-repeat;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
    /* opacity: 0.2; */
}
</style>