<script setup>
import { defineProps } from "vue";
const { data, imgUrl, id } = defineProps(["data", "imgUrl", "id"]);
import { useRouter } from "vue-router";
import { useToken } from "../stores/counter";

const tokenstore = useToken();
const token = tokenstore.token;
const router = useRouter();

const redirectToSinglePage = () => {
  if (token) {
    router.push({
      name: "about",
      params: { id },
    });
  } else {
    router.push({
      name: "login",
    });
  }
};
</script>
<template>
  <div class="newscard_container">
    <div class="top_part" @click="redirectToSinglePage()">
      <img :src="imgUrl" alt="img.." />
    </div>
    <div class="bottom_part">
      <h2 @click="redirectToSinglePage()">
        {{ data?.title }}
      </h2>
      <div v-html="data?.excerpt"></div>
    </div>
  </div>
</template>
<style scoped>
.newscard_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.top_part {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.top_part > img {
  width: 90%;
  margin-inline: auto;
}
.bottom_part {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  margin-inline: auto;
  gap: 0.5rem;
}
.bottom_part > h2 {
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  /* line-height: 27px; */
}

.bottom_part > h2 > a {
  text-align: center;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 10px;
  color: black;
}
.bottom_part > p {
  text-align: center;
}
</style>
