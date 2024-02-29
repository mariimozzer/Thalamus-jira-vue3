<template>
    <div id="app">
        <h1>Controle de Despesas</h1>
    
        <div class="buttons">
            <button @click="toggleExpenses('current')">Despesa Corrente</button>
            <button @click="toggleExpenses('projects')">Despesa de Projetos</button>
        </div>
    
        <div v-if="showCurrentExpenses" class="sub-buttons">
            <button @click="openAction('add', 'current')">Adicionar</button>
            <button @click="openAction('list', 'current')">Listar</button>
        </div>
    
        <div v-if="showProjectExpenses" class="sub-buttons">
            <button @click="openAction('add', 'projects')">Adicionar</button>
            <button @click="openAction('list', 'projects')">Listar</button>
        </div>
    </div>
</template>
  
<script>
export default {
name: "FinanceiroView",
 
    data() {
        return {
            showCurrentExpenses: false,
            showProjectExpenses: false
        };
    },
    methods: { 
        toggleExpenses(type) {
            if (type === 'current') {
                this.showCurrentExpenses = !this.showCurrentExpenses;
                this.showProjectExpenses = false;
            } else if (type === 'projects') {
                this.showProjectExpenses = !this.showProjectExpenses;
                this.showCurrentExpenses = false;
            }
        },
        openAction(action, type) {
            alert(`Executar ação ${action} para despesa de ${type}`);
        }
    }
};
</script>
  
<style>
#app {
    text-align: center;
    margin-top: 60px;
}

.buttons {
    margin-top: 20px;
}

.sub-buttons {
    margin-top: 10px;
}
</style>
  