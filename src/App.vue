<template>
  <nav>
    <router-link to="/projetos">Projetos</router-link> 
  </nav>
  <router-view/>
</template>

<style>
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
  color: #42b983;
}
</style>
