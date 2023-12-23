<script setup>
import {ref, computed, watchEffect} from 'vue'
import {useRoute} from 'vue-router'
import {useQuery} from '@vue/apollo-composable'
import gql from 'graphql-tag'
import {useRouter} from 'vue-router'
import CategoryCard from '../components/CategoryCard.vue'

const routers = useRouter()
const router = useRoute()

const POST_QUERY = gql`
  query GET_POST($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      content
      title
      categories {
        nodes {
          databaseId
          name
          slug
        }
      }
      tags {
        nodes {
          databaseId
          name
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
          mediaItemUrl
        }
      }
    }
  }
`

const {result, loading, error} = useQuery(POST_QUERY, {id: router.params.id})
const resData = ref('')

const val = computed(() => {
  const data = result.value
  return data?.post || {}
})

watchEffect(() => {
  console.log(val.value)
  resData.value = val.value
})

const getImageUrl = (authorImage) => {
  console.log(authorImage?.author?.node?.avatar?.url)
  return authorImage?.author?.node?.avatar?.url || ''
}
const getFeaturedImage = (resData) => {
  return resData?.featuredImage?.node?.mediaItemUrl || ''
}
const goToAuthorsPage = (id) => {
  routers.push({
    name: 'author',
    params: {id}
  })
}

const goToCategoryPage = (id) => {
  routers.push({
    name: 'category',
    params: {id}
  })
}

const getCategoryName = (resData) => {
  console.log(resData?.categories?.nodes[0]?.name)
  return resData?.categories?.nodes[0]?.name || ''
};
</script>

<template>
  <div class="about" v-if="result">
    <div class="top_part">
      <h1>{{ resData.title }}</h1>
      <div class="category">
        <span @click="goToCategoryPage(resData?.categories?.nodes[0]?.databaseId)">{{ getCategoryName(resData) }}</span> par
        <span @click="goToAuthorsPage(resData?.author.node.databaseId)"
        >{{ resData?.author?.node?.firstName }}{{ ' ' }}
          {{ resData?.author?.node?.lastName }}</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi
      </p>
    </div>
    <div class="image_container">
      <img :src="getFeaturedImage(resData)" alt="img2.."/>
      <p v-html="resData.content" class="contentPara"></p>
      <div class="author">
        <div class="author_img">
          <img :src="getImageUrl(resData)" alt="img.."/>
        </div>
        <div class="author_name">
          <h2>
            {{ resData?.author?.node?.firstName }}{{ ' ' }} {{ resData?.author?.node?.lastName }}
          </h2>
          <p @click="goToAuthorsPage(resData?.author.node.databaseId)">See all posts</p>
        </div>
      </div>
      <div class="line_div">
        <img src="@/assets/Line.svg" class="line"/>
      </div>
    </div>
    <CategoryCard v-if="resData?.categories?.nodes[0]?.databaseId" :categoryId=resData?.categories?.nodes[0]?.databaseId />
  </div>
  
  <div v-else-if="loading" class="loadingAnimation">
    <video autoPlay muted loop width="50" height="50">
        <source src="@/assets/loadingAnimation.mp4" type='video/mp4'/>
    </video>
  </div>  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>No data available</div>
</template>

<style scoped>
.about {
  margin-top: 2rem;
  margin-bottom: 5rem;
}

.top_part {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  margin-inline: auto;
  gap: 0.5rem;
  margin-block: 2rem;
}

.top_part > h1 {
  width: 90%;
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  line-height: 27px;
}

.top_part > p {
  text-align: center;
  width: 90%;
  font-size: 1rem;
  font-family: "Libre Baskerville", serif;
}

.category span {
  font-weight: 700;
}

.image_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.image_container > img {
  width: 90%;
  margin-inline: auto;
}

.image_container > p {
  width: 90%;
  font-size: 1rem;
  font-family: "Libre Baskerville", serif;
  overflow: hidden;
}

.author {
  display: flex;
  gap: 1rem;
  align-self: flex-start;
  width: 90%;
  margin-inline: auto;
}

.author_img {
  width: 60px;
  height: 60px;
  background: #d9d9d9;
}

.author_img > img {
  width: 100%;
  height: 100%;
}

.author_name h2 {
  font-size: 1.25rem;
  font-weight: 700;
}

.title {
  display: block;
  width: 90%;
  margin-inline: auto;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.news_cards {
  margin-block: 1rem;
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
  margin-block: 1rem;
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

.bottom_part > p {
  text-align: center;
  font-family: "Libre Baskerville", serif;
}

.category span {
  font-weight: 700;
}

.line_div {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-block: 2rem;
}


:deep(.contentPara  img) {
  width: 90vw;
  height: 250px;
  margin-inline: auto;
  object-fit: cover;
}

:deep(.contentPara p){
  margin: 1em 0;
  line-height: 1.5;
}
:deep(.contentPara p code){
  background-color: #eee;
  padding: 0.05em 0.2em;
  border: 1px solid #ccc;
}

:deep(.contentPara ol,
ul){
  margin: 1em;
}
:deep(.contentPara ol li ol,
ol li ul,
ul li ol,
ul li ul){
  margin: 0 2em;
}
 :deep(.contentPara ol li p,
 ul li p){
  margin: 0;
}

:deep(.contentPara dl){
  font-family: monospace, monospace;
}
 :deep(.contentPara dl dt){
  font-weight: bold;
}
 :deep(.contentPara dl dd){
  margin: -1em 0 1em 1em;
}

 :deep(.contentPara img){
  max-width: 100%;
  /* display: block; */
  margin: 0 auto;
  padding: 0.5em;
}

 :deep(.contentPara blockquote){
  padding-left: 1em;
  font-style: italic;
  border-left: solid 1px #fa6432;
}

 :deep(.contentPara table){
  font-size: 1rem;
  text-align: left;
  caption-side: bottom;
  margin-bottom: 2em;
}
 :deep(.contentPara table *){
  border: none;
}
 :deep(.contentPara table thead,
 table tr){
  display: table;
  table-layout: fixed;
  width: 100%;
}
:deep(.contentPara table tr:nth-child(even) ){
  background-color: rgba(200, 200, 200, 0.2);
}
:deep(.contentPara table tbody){
  display: block;
  max-height: 70vh;
  overflow-y: auto;
}
:deep(.contentPara table td,
table th){
  padding: 0.25em;
}

:deep(.contentPara table,
.highlight > pre,
pre.example ){
  max-height: 70vh;
  margin: 1em 0;
  padding: 1em;
  overflow: auto;
  font-size: 0.85rem;
  font-family: monospace, monospace;
  border: 1px dashed rgba(250, 100, 50, 0.5);
}

:deep(.contentPara figure){
  margin: 1em 0;
}
:deep(.contentPara figure figcaption){
  font-family: monospace, monospace;
  font-size: 0.75em;
  text-align: center;
  color: grey;
}

:deep(.contentPara .footnote-definition sup){
  margin-left: -1.5em;
  float: left;
}

:deep(.contentPara .footnote-definition .footnote-body){
  margin: 1em 0;
  padding: 0 1em;
  border: 1px dashed rgba(250, 100, 50, 0.3);
  background-color: rgba(200, 200, 200, 0.2);
}
:deep(.contentPara .footnote-definition .footnote-body p:only-child){
  margin: 0.2em 0;
}

.loadingAnimation{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%,-40%);
}

</style>