<script setup>
import {ref, computed, watchEffect} from 'vue'
import {useRoute} from 'vue-router'
import {useQuery} from '@vue/apollo-composable'
import gql from 'graphql-tag'
import {useRouter} from 'vue-router'

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
    <div class="news_cards">
      <span class="title">TITLE SECTION LIGHT</span>
      <div class="newscard_container">
        <div class="top_part">
          <img src="@/assets/Picture.svg" alt="img.."/>
        </div>
        <div class="bottom_part">
          <div class="category">
            <span>{{ getCategoryName(resData) }}</span> par
            <span
            >{{ resData?.author?.node?.firstName }}{{ ' ' }}
              {{ resData?.author?.node?.lastName }}</span>
          </div>
          <h2 @click="goToSinglePage()">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
        </div>
      </div>
      <div class="newscard_container">
        <div class="top_part">
          <img src="@/assets/Picture.svg" alt="img.."/>
        </div>
        <div class="bottom_part">
          <div class="category">
            <span>{{ getCategoryName(resData) }}</span> par
            <span
            >{{ resData?.author?.node?.firstName }}{{ ' ' }}
              {{ resData?.author?.node?.lastName }}</span>
          </div>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
        </div>
      </div>
      <div class="newscard_container">
        <div class="top_part">
          <img src="@/assets/Picture.svg" alt="img.."/>
        </div>
        <div class="bottom_part">
          <div class="category">
            <span>{{ getCategoryName(resData) }}</span> par
            <span
            >{{ resData?.author?.node?.firstName }}{{ ' ' }}
              {{ resData?.author?.node?.lastName }}</span>
          </div>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
        </div>
      </div>
      <div class="newscard_container">
        <div class="top_part">
          <img src="@/assets/Picture.svg" alt="img.."/>
        </div>
        <div class="bottom_part">
          <div class="category">
            <span>{{ getCategoryName(resData) }}</span> par
            <span
            >{{ resData?.author?.node?.firstName }}{{ ' ' }}
              {{ resData?.author?.node?.lastName }}</span>
          </div>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
        </div>
      </div>
      <div class="newscard_container">
        <div class="top_part">
          <img src="@/assets/Picture.svg" alt="img.."/>
        </div>
        <div class="bottom_part">
          <div class="category">
            <span>{{ getCategoryName(resData) }}</span> par
            <span
            >{{ resData?.author?.node?.firstName }}{{ ' ' }}
              {{ resData?.author?.node?.lastName }}</span>
          </div>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
        </div>
      </div>
      <div class="line_div">
        <img src="@/assets/Line.svg" class="line"/>
      </div>
    </div>
  </div>
  <div v-else-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
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
  font-family: 'Libre Baskerville', serif;
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
  font-family: 'Libre Baskerville', serif;
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
  font-family: 'Libre Baskerville', serif;
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

:deep(.contentPara > p) {
  font-size: 16px;
  font-family: 'Libre Baskerville', serif;
}

:deep(.contentPara > p > em) {
  font-size: 16px;
  font-family: 'Libre Baskerville', serif;
}

:deep(.contentPara > p > img) {
  width: 90vw;
  height: 250px;
  margin-inline: auto;
  object-fit: cover;
  /* border: 5px solid black; */
}

:deep(.contentPara > figure > img) {
  width: 90vw;
  height: 250px;
  margin-inline: auto;
  object-fit: cover;
}

:deep(.contentPara > ul) {
  padding-left: 0%;
  margin-block: 1rem;
  list-style: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>');
  list-style-position: outside;
}
</style>
