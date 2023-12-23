<script setup>
import Cards from '../components/Cards.vue';
import Cta from '../components/Cta.vue';
import {ref, computed, watchEffect,defineProps} from 'vue';
import {useQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import '../styles/viewStyles/categoryStyles.css';

const props = defineProps({
  categoryId: Number
})

const POST_QUERY = gql`
  query Category($cid: ID!) {
    category(id: $cid, idType: DATABASE_ID) {
      name
      description
      posts(first: 5) {
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

const {result} = useQuery(POST_QUERY, {cid: props.categoryId}); // Passing variables directly

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
  <div class="category_page">
    <h1>Related posts</h1>
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
</template>

