<template >
    <body style="background-color: #F8F8F8; min-height: 4000px;">

        <nav>
            <router-link to="/projetos">Projetos</router-link> |
            <router-link to="/sprints">Plano de ação</router-link> |
            <router-link to="/painel">Painel Kanban</router-link> |
        </nav>
        <div class="estilos">
            <router-view />

            <FooterComponent></FooterComponent>
        </div>
    </body>
</template>

<script>
import FooterComponent from "@/components/footer/FooterComponent"

export default {
    data() {
        return {

        }

    },

    components: {
        FooterComponent: FooterComponent,
    }
}
</script>


<style>
:root {
    --cor-primaria: #343537;
    --cor-secundaria: #F89E31;
    --dark-color: #292A2A;
    --botao: #F89E31;
    --botao-hover: #FBBF77;
    --botao-secondary: #AAAAAA;
    --botao-secondary-hover: #C2BFBF;
    --menu-lateral-background: #333;
    --menu-lateral-botao: #444;
    --menu-lateral-borda: #555;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: var(--cor-secundaria);
}

/* button {
    width: 100%;
    background-color: var(--cor-primaria) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
} */

/* button:hover {
    background-color: #FBBF77 !important;
} */

.estilos {
    font-family: 'montserrat', sans-serif;
}

/* .titulo {
    font-size: 15px;
    font-weight: 100;
    margin-top: 10px
} */



/* .router {
    margin-left: 300px;
    margin-bottom: 100px;
    margin-top: 0px;
} */

.footer {
    position: absolute;
}

.button-default {
    width: 100%;
    background-color: var(--dark-color) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 6px !important;
    cursor: pointer;
}

.button-default:hover {
    background-color: var(--botao-hover) !important;
}

.btn-primary {
    background-color: var(--botao) !important;
    margin: 6px 0 !important;
    border: none !important;
}

.btn-primary:hover {
    background-color: var(--botao-hover) !important;
}

.button-cadastrar {
    background-color: var(--botao) !important;
    margin: 6px 0 !important;
    border: none !important;
    width: 150px;
    height: 40px;
    border: none !important;
    border-radius: 6px !important;
    color: white;
}

.button-cadastrar:hover {
    background-color: var(--botao-hover) !important;
}

.button-cancelar {
    color: white !important;
    background-color: var(--botao-secondary) !important;
}

.button-cancelar:hover {
    background-color: var(--botao-secondary-hover) !important;
}

.button-visita {
    background-color: var(--botao);
    color: white;
    border: none;
    border-radius: 2px !important;
}

.button-visita:hover {
    background-color: var(--botao-hover) !important;
}

header {
    width: 100vw;
    margin-top: 0;
    background-color: var(--dark-color);
    padding: 0px;
}

thead {
    text-align: center;
}

::-webkit-scrollbar {
    width: 0px;
}

/* .menu {
    z-index: 1;
    position: absolute;
    width: 100%;
    margin-top: 0;
} */
</style>
