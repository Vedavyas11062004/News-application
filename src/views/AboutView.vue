<script setup>
import {ref, computed, watchEffect} from 'vue'
import {useRoute} from 'vue-router'
import {useQuery} from '@vue/apollo-composable'
import gql from 'graphql-tag'
import {useRouter} from 'vue-router'
import '../styles/viewStyles/aboutStyles.css'

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

