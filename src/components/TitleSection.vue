<script setup>
import {ref, computed, watchEffect, defineProps} from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useRouter } from 'vue-router'
import { useToken } from "../stores/counter";

const tokenstore = useToken();
const token = tokenstore.token;
const router = useRouter();


const totalcards = ref(4)
const props = defineProps({
  categoryId: String
})
const getVariables = () => ({ search: totalcards.value, categoryId: props.categoryId })


const { result } = useQuery(
  gql`
    query Category($search: Int!, $categoryId: [ID]!) {
      posts(first: $search, where: { categoryIn: $categoryId }) {
        nodes {
          databaseId
          title
          excerpt
          categories {
            nodes {
              name
              slug
              databaseId
            }
          }
          tags {
            nodes {
              name
              databaseId
              slug
            }
          }
          author {
            node {
              avatar {
                default
                url
              }
              firstName
              databaseId
              nickname
              lastName
              nicename
            }
          }
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
        }
      }
    }
  `,
  getVariables
)
const data = ref([])
const val = computed(() => {
  const data = result.value
  return data?.posts?.nodes || []
})

const getImageUrl = (featuredImage) => {
  return featuredImage?.node?.sourceUrl || ''
}

const logCard = (card) => {
  console.log(card)
}

const handleReadMore = () => {
  totalcards.value = totalcards.value + 2
}

const redirectToSinglePage = (id) => {

  if (token) {
    router.push({
      name: 'about',
      params: { id }
    })
  }
  else
  {
    router.push({
      name: "login",
    });
  }
}

const getCategoryLink = (id) => {
  if (token) {
    router.push({
      name: 'category',
      params: { id }
    })
  }
  else
  {
    router.push({
      name: "login",
    });
  }
}

const goToAuthorsPage = (id) => {
  if (token) {
    router.push({
      name: 'author',
      params: { id }
    })
  }
  else
  {
    router.push({
      name: "login",
    });
  }
}

watchEffect(() => {
  data.value = val
  // console.log(data.value)
});
</script>
<template>
  <span class="title">{{ data.value[0]?.categories?.nodes[0]?.name }}</span>
  <div class="tittleSection_container">
    <div class="newscard_container">
      <div class="top_part" @click="redirectToSinglePage(data.value[0]?.databaseId)">
        <img :src="getImageUrl(data.value[0]?.featuredImage)" alt="img.." />
      </div>
      <div class="bottom_part">
        <div class="category">
          <span @click="getCategoryLink(data.value[0]?.categories?.nodes[0]?.databaseId)">{{
            data.value[0]?.categories?.nodes[0]?.name
          }}</span>
          par
          <span
          @click="goToAuthorsPage(data.value[0]?.author.node.databaseId)"
            >{{ data.value[0]?.author.node.firstName }}
            {{ data.value[0]?.author.node.lastName }}
          </span>
        </div>
        <h2 @click="redirectToSinglePage(data.value[0]?.databaseId)">
          {{ data.value[0]?.title }}
        </h2>
      </div>
    </div>
    <div class="newsContainer_div">
      <div
        class="news_preveiw"
        v-for="(card, index) in data.value"
        :key="card.databaseId"
        @click="logCard(card)"
      >
        <img v-if="index > 0" :src="getImageUrl(card.featuredImage)" alt="img.." 
        @click="redirectToSinglePage(card?.databaseId)" />
        <div v-if="index > 0" class="rightPart">
          <div class="category">
            <span @click="getCategoryLink(card?.categories?.nodes[0]?.databaseId)">{{
              card?.categories?.nodes[0]?.name
            }}</span> par
            <span
            @click="goToAuthorsPage(card?.author.node.databaseId)"
>{{ card?.author.node.firstName }} {{ card?.author.node.lastName }}</span> 
          </div>
          <h2 @click="redirectToSinglePage(card?.databaseId)">{{ card?.title }}</h2>
        </div>
      </div>
    </div>

    <!-- btn -->
  </div>
  <div class="btn_container">
    <button class="Btn" @click="getCategoryLink(data.value[0]?.categories?.nodes[0]?.databaseId)">EN LIRE PLUS</button>
  </div>
  <div class="line_div">
    <img src="@/assets/Line.svg" class="line" />
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
.news_preveiw > img {
  width: 125px;
  height: 102px;
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
  text-transform: uppercase;
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
