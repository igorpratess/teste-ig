<template>
  <div id="app">
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
