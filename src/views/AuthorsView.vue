<script setup>
import Cards from '../components/Cards.vue';
import Cta from '../components/Cta.vue';
import { ref, computed, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router'
import '../styles/viewStyles/authorsStyles.css';


const router = useRoute()


const POST_QUERY = gql`
query Author($cid: ID!) {
  user(id: $cid, idType: DATABASE_ID) {
    name
    description
    posts {
      nodes {
        title
        databaseId
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

const { result } = useQuery(POST_QUERY, { cid: router.params.id }); 

const resData = ref([]);
const authorName = ref('');
const authorDisc = ref('');

const val = computed(() => {
  const data = result.value;
  console.log(data?.user);
  authorName.value = data?.user?.name;
  authorDisc.value = data?.user?.description
  return data?.user?.posts?.nodes || [];
});

watchEffect(() => {
  console.log(val.value);
  resData.value = val.value;
});
</script>

<template>
  <div class="category_page">
      <h1>Author : {{ authorName }}</h1>
      <p>{{ authorDisc }}</p>
      <h2>Related posts </h2>
      <div class="category_cards">
      <Cards v-for="card in resData" :key="card.title" class="category_card" :data = "card" :imgUrl="card?.featuredImage?.node?.sourceUrl" :id="card.databaseId"/>
    </div>
    <div class="line_div">
      <img src="@/assets/Line.svg" class="line" />
    </div>
    <div class="cta">
        <Cta/>
    </div>
  </div>
</template>
