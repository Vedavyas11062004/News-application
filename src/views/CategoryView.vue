<script setup>
import Cards from '../components/Cards.vue';
import Cta from '../components/Cta.vue';
import {ref, computed, watchEffect} from 'vue';
import {useQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import {useRoute} from 'vue-router'
import '../styles/viewStyles/categoryStyles.css';

const router = useRoute()


const POST_QUERY = gql`
  query Category($cid: ID!) {
    category(id: $cid, idType: DATABASE_ID) {
      name
      description
      posts {
        nodes {
          databaseId
          title
          excerpt
          categories {
            nodes {
              name
              slug
              databaseId
              description
            }
          }
          tags {
            nodes {
              name
              databaseId
              slug
              description
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
  }
`;

const {result,loading, error} = useQuery(POST_QUERY, {cid: router.params.id}); // Passing variables directly

const resData = ref([]);

const val = computed(() => {
  const data = result.value;
  return data?.category?.posts?.nodes || [];
});

watchEffect(() => {
  console.log(val.value);
  resData.value = val.value;
});
</script>

<template>
  <div class="category_page" v-if="result">
    <h1>Catégorie : {{ resData[0]?.categories?.nodes[0]?.name }}</h1>
    <div class="category_cards">
      <Cards v-for="card in resData" :key="card.title" class="category_card" :data="card"
             :imgUrl="card?.featuredImage?.node?.sourceUrl" :id="card.databaseId"/>
    </div>
    <div class="line_div">
      <img src="@/assets/Line.svg" class="line"/>
    </div>
    <div class="cta">
      <Cta/>
    </div>
  </div>
  <div v-else-if="loading" class="loadingAnimation">
    <video autoPlay muted loop width="50" height="50">
        <source src="@/assets/loadingAnimation.mp4" type='video/mp4'/>
    </video>
  </div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>No data available</div>
</template>

