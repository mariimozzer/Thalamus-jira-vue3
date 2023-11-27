<template>
  <nav>
    <router-link to="/">Home</router-link> |

    <router-link to="/projetos">Projetos</router-link> |
    <router-link to="/backlogs">Backlogs</router-link> |
    <router-link to="/sprints">Sprints</router-link> |
    <router-link to="/painel">Painel Kanban</router-link>
  </nav>
  <div id="app">
    <router-view/>
  </div>

</template>

<style>
:root {
  --cor-primaria: #343537;
  --cor-secundaria: #F89E31;
}


#app {
  font-family: 'montserrat', sans-serif;
  text-align: center;
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

button{
  width: 100%;
    background-color: var(--cor-primaria) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
}

button:hover{
  background-color: #FBBF77 !important;

} 
</style>
