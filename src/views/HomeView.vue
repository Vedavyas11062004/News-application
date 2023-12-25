<script setup>
import { ref, computed, watchEffect, defineAsyncComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { useToken } from '../stores/counter'
import config from '../../config'
import gql from 'graphql-tag'
import '../styles/viewStyles/homeStyles.css'


const tokenstore = useToken();
const token = tokenstore.token;

const CHARACTERS_QUERY = gql`
  query GET_POSTS_FOR_DAY {
    posts(last: 10, where: { dateQuery: { day: 29, month: 9, year: 2023 } }) {
      nodes {
        databaseId
        title
        excerpt
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
  }
`
const { result, loading, error } = useQuery(CHARACTERS_QUERY)
const val = computed(() => {
  const data = result.value
  return data?.posts?.nodes || []
})

const resData = ref('')
const len = ref(0)

watchEffect(() => {
  resData.value = val.value
  len.value = resData.value.length
  console.log(token);
});

const LazyNewsCard = defineAsyncComponent(() => import('../components/NewsCard.vue'))
const LazyCta = defineAsyncComponent(() => import('../components/Cta.vue'))
const LazyCategoryList = defineAsyncComponent(() => import('../components/CategoryList.vue'))
const LazyTitleSection = defineAsyncComponent(() => import('../components/TitleSection.vue'));


</script>

<template>
  <main v-if="len > 0">
    <component :is="LazyNewsCard" :resData="resData" />
    <component :is="LazyCta" />
    <component :is="LazyCategoryList" />
    <component :is="LazyTitleSection" :categoryId="config.categoryId1" />
    <component :is="LazyTitleSection" :categoryId="config.categoryId2" />
    <component :is="LazyCta" />
    <div class="line_div">
      <img src="@/assets/Line.svg" class="line" />
    </div>
    <component :is="LazyTitleSection" :categoryId="config.categoryId3" />
    <component :is="LazyTitleSection" :categoryId="config.categoryId4" />
    <component :is="LazyCta" />
    <div class="buttomTitle_section">
      <component :is="LazyTitleSection" :categoryId="config.categoryId1" />
    </div>
    <component :is="LazyCta" class="lastCta" />
  </main>
  <div v-else-if="loading" class="loadingAnimation">
    <video autoPlay muted loop width="50" height="50">
        <source src="@/assets/loadingAnimation.mp4" type='video/mp4'/>
    </video>
  </div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>No data available</div>
</template>
