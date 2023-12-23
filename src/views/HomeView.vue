<script setup>
import NewsCard from '../components/NewsCard.vue'
import Cta from '../components/Cta.vue'
import CategoryList from '../components/CategoryList.vue'
import TitleSection from '../components/TitleSection.vue'
import config from '../../config'
import { ref, computed, watchEffect} from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useToken } from '../stores/counter'
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
  // console.log(val.value)
  resData.value = val.value
  len.value = resData.value.length
  console.log(token);
  // console.log(resData.value.length)
});

// const props = defineProps(['resData']); 

</script>

<template>
  <main v-if="len > 0">
    <NewsCard  :resData="resData"/>
    <Cta />
    <CategoryList />
    <TitleSection :categoryId=config.categoryId1 />
    <TitleSection :categoryId=config.categoryId2 />
    <Cta />
    <div class="line_div">
      <img src="@/assets/Line.svg" class="line" />
    </div>
    <TitleSection :categoryId=config.categoryId3 />
    <TitleSection :categoryId=config.categoryId4 />
    <Cta />
    <div class="buttomTitle_section">
      <TitleSection :categoryId=config.categoryId1 />
    </div>
    <Cta class="lastCta" />
  </main>
  <div v-else-if="loading" class="loadingAnimation">
    <video autoPlay muted loop width="50" height="50">
        <source src="@/assets/loadingAnimation.mp4" type='video/mp4'/>
    </video>
  </div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>No data available</div>
</template>


