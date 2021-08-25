<template>
  <div id="app">
    <h1>Pagamento Online</h1>
    <Card msg="Teste" />
  </div>
</template>

<script>
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  }
}
</script>

<style lang="css">
  @import './styles/home.css';
</style>
