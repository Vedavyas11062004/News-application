<script setup>
import { useRouter } from 'vue-router'
import { useToken } from "../stores/counter";

const tokenstore = useToken();
const token = tokenstore.token;
const router = useRouter();

const {data,isVisible} = defineProps(['data','isVisible']);
console.log(data);
const getImageUrl = (featuredImage) => {
  return featuredImage?.node?.mediaItemUrl || ''
};
const emits = defineEmits();
const getCategoryLink = (id) => {
  if (token) {
    router.push({
      name: 'category',
      params: { id }
    })
  }else {
    localStorage.setItem('previousRoute',router.currentRoute.value.path);
    router.push({
      name: "login",
    });
  }
  emits('close')
};

const goToAuthorsPage = (id) => {
  if (token) {
    router.push({
      name: 'author',
      params: { id }
    })
  }else {
    localStorage.setItem('previousRoute',router.currentRoute.value.path);
    router.push({
      name: "login",
    });
  }
  emits('close')
}

const redirectToSinglePage = (id) => {
  if (token) {
    router.push({
      name: 'about',
      params: { id }
    })
  }else {
    localStorage.setItem('previousRoute',router.currentRoute.value.path);
    router.push({
      name: "login",
    });
  }
  emits('close')
};

</script>
<template>
  <div class="newsContainer_div">
    <div class="news_preveiw">
      <img :src="getImageUrl(data?.featuredImage)" alt="img.." class="cardImg" />
      <div class="rightPart">
        <div class="category">
          <span @click='getCategoryLink(data.categories.nodes[0]?.databaseId)'>{{ data?.categories.nodes[0].name }}</span> par
          <span @click="goToAuthorsPage(data?.author.node.databaseId)">{{ data?.author.node.firstName }} {{ data?.author.node.lastName }}</span>
        </div>
        <h2 @click="redirectToSinglePage(data?.databaseId)">{{ data.title}}</h2>
      </div>
    </div>
  </div>
</template>
<style scoped>

.cardImg{
  width: 125px;
  height: 102px;
}
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
  line-height: 27px;
}

.bottom_part > h2 > a {
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 27px;
  color: black;
  text-decoration: none;
}

.bottom_part > h2 > a:hover {
  color: rgb(3, 3, 173);
  text-decoration: underline;
}
.bottom_part > p {
  text-align: center;
}
.category span a {
  font-weight: 700;
  color: black;
  text-decoration: none;
}
.category span a:hover {
  color: rgb(3, 3, 173);
  text-decoration: underline;
}

.category span {
  font-weight: 700;
}

.news_preveiw {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 90%;
  margin-inline: auto;
  gap: 1rem;
}
.rightPart {
  margin-block: 1rem;
}
.rightPart h2 {
  font-size: 1.1rem;
  font-weight: 600;
}

.Btn {
  background: #003c57;
  color: white;
  border: none;
  padding-block: 0.75rem;
  padding-inline: 1.5rem;
  margin-block: 1rem;
  font-weight: 600;
  font-size: 1rem;
}

.line_div {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-block: 1rem;
}

.btn_container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-block: 1rem;
}
.title {
  display: block;
  width: 90%;
  margin-inline: auto;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.newsContainer_div {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 650px) {
  .tittleSection_container {
    width: 95%;
    margin-inline: auto;
    display: flex;
    align-items: flex-start;
  }
  .news_preveiw {
    align-items: flex-start;
  }

  .rightPart {
    margin-block: 0px;
    width: 200px;
  }

  .news_preveiw {
    height: 103px;
    overflow: hidden;
  }
}
</style>
