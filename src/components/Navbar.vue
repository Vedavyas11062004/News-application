<template>
  <div class="header__container">
    <div :data-expanded="expanded" class="toggle-button" @click="toggleAction">
      <img v-if="!expanded" src="@/assets/menu.svg" alt="toggle_button" />
      <img v-else src="@/assets/cross.svg" alt="toggle_button" />
    </div>
    <div class="header__left">
      <img src="@/assets/logonew.svg" />
    </div>
    <div class="header__right">
      <button @click="handleClick()">Link 1</button>
    </div>
    <div :data-expanded="expanded" class="list_div">
      <div>
        <h2 for="list" class="labelList">Title menu 1</h2>
        <ul class="list" name="list">
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 1</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 2</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 3</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 4</router-link>
          </li>
        </ul>
      </div>
      <div>
        <h2 for="list" class="labelList">Title menu 1</h2>
        <ul class="list" name="list">
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 1</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 2</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 3</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 4</router-link>
          </li>
        </ul>
      </div>
      <div>
        <h2 for="list" class="labelList">Title menu 1</h2>
        <ul class="list" name="list">
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 1</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 2</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 3</router-link>
          </li>
          <li>
            <router-link to="/category/89" style="text-decoration: none">Link 4</router-link>
          </li>
        </ul>
      </div>
      <div class="cta_menu_div">
        <div class="cta_menu">CTA MENU</div>
      </div>
      <div>
        <div class="social_icons">
          <img src="@/assets/facebook.svg" alt="facbookimg.." />
          <img src="@/assets/instagram.svg" alt="instagramimg.." />
          <img src="@/assets/social-x.svg" alt="ximg.." />
          <img src="@/assets/linkedin.svg" alt="linkedinimg.." />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import config from '../../config'
const expanded = ref(false)
const toggleAction = () => {
  expanded.value = !expanded.value
};
const handleClick = () => {
  console.log(config);
  window.location.href = config.link1.valueConnected
}
</script>

<style scoped>
:root {
  --clr-background: #111111;
  --clr-text: #ffffff;
  --clr-header-text: #818487;
  --clr-button-primary: #279de0;
}

.header__container {
  display: flex;
  align-items: flex-start;
  width: 95%;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  padding-block: 1.5rem;
}
.header__left {
  font-size: 1.2rem;
  font-weight: 800;
}
.header__right button {
  width: 85.86px;
  height: 27.59px;
  border-radius: 2rem;
  border: none;
  background: #ff5703;
  color: white;
}
.header__right > ul {
  list-style: none;
  display: flex;
  gap: 1.25rem;
  font-weight: 550;
  align-items: center;
  color: var(--clr-header-text);
}
.header__right > ul > li > a {
  color: var(--clr-header-text);
}
.header__right > ul > li > a:hover {
  cursor: pointer;
  color: var(--clr-text);
}

.toggle-button {
  display: none;
}
.toggle-button:hover {
  cursor: pointer;
}

.list_div[data-expanded='false'] {
  display: none;
}
.labelList {
  background-color: inherit;
  padding-bottom: 1rem;
}
.list {
  list-style: none;
  padding: 0%;
}
.list_div > h2 {
  font-weight: 500;
}
.list > li {
  font-size: 19px;
  padding-block: 0.5rem;
}

.list_div > div {
  margin-block: 0.75rem;
}

.cta_menu {
  padding: 0%;
  width: 100%;
  height: 203px;
  background: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  /* margin-inline: auto; */
}
.cta_menu_div {
  width: 90%;
  display: flex;
  justify-content: center;
}
.social_icons {
  display: flex;
  gap: 1rem;
  width: 90%;
  justify-content: center;
  padding-block: 1rem;
}
@media (max-width: 1440px) {
  .header__right > ul {
    display: none;
  }
  .toggle-button {
    display: block;
  }
  .toggle-button[data-expanded='true'] {
    position: fixed;
    right: 20px;
    z-index: 9999;
    background-color: white;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .toggle-button[data-expanded='true'] > img {
    width: 10px;
    height: 12px;
  }
  .list_div {
    display: flex;
    width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-1.5rem);
    position: fixed;
    flex-direction: column;
    z-index: 9998;
    background: #003c57;
    color: white;
    padding-block: 4rem;
    padding-left: 2rem;
    overflow-y: scroll;
  }
  .list > li > a {
    color: white;
  }
}
</style>
