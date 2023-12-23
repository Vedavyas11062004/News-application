<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import TheWelcome from './components/TheWelcome.vue'

</script>

<template>
  <header>
    <Navbar/>
    <TheWelcome/>
  </header>
  <RouterView />
  <footer>
    <Footer/>
  </footer>
</template>

<style scoped>

</style>
