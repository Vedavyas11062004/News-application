<script setup>
import { ref } from 'vue'
import SearchComponent from './SearchComponent.vue'
const isVisible = ref(false)
const handleOpen = () => {
  isVisible.value = true
}
const handleChangeProp = (val) =>{
  isVisible.value = val
};
</script>
<template>
  <div class="footer">
    <div class="img_container" v-if="!isVisible">
      <RouterLink to="/">
        <img src="@/assets/home.svg" alt="img_home" />
      </RouterLink>
      <RouterLink to="/login">
        <img src="@/assets/Account.svg" alt="img_account" />
      </RouterLink>
      <RouterLink to="/allposts">
        <img src="@/assets/Allposts.svg" alt="img_allposts" />
      </RouterLink>
      <div @click="handleOpen()">
        <img src="@/assets/search.svg" alt="img_search" />
      </div>
    </div>
    <SearchComponent v-if="isVisible" :isVisible="isVisible" @changeProp="handleChangeProp()" />
  </div>
</template>
<style scoped>
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-block: 0.5rem;
  border-top: 1px solid #003c57;
  position: fixed;
  bottom: 0;
  z-index: 200;
  background-color: white;
}
.img_container {
  display: flex;
}
</style>
