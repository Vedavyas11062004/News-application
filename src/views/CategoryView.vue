<script setup>
import Cards from '../components/Cards.vue';
import Cta from '../components/Cta.vue';
import {ref, computed, watchEffect} from 'vue';
import {useQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import {useRoute} from 'vue-router'


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

const {result} = useQuery(POST_QUERY, {cid: router.params.id}); // Passing variables directly

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
</template>
<style scoped>

.category_cards {
  margin-top: 1rem;
}

.category_page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-block: 1rem;
  margin-bottom: 5rem;
}

.category_page > p {
  width: 95%;
  font-family: 'Libre Baskerville';
}

.category_page > h1 {
  width: 95%;
  margin-inline: auto;
  align-self: flex-start;
  padding-bottom: 1rem;
  text-align: center;
}

.line {
  margin-block: 2.5rem;
}

.line_div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.category_cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  width: 98%;
  margin-inline: auto;
}

.category_card {
  flex: 1;
}

.category_pagination {
  list-style: none;
  display: flex;
  gap: 0.5rem;
  padding-left: 0%;
}

.paginaton_nav {
  margin-top: 3rem;
}

.category_page-item {
  width: 2rem;
  height: 2rem;
  border: 1px solid #003c57;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.page-link {
  text-decoration: none;
  color: #212B36;;
}

.category_page-link {
  text-decoration: none;
  color: #212B36;
}

.category_page-item:first-child {
  background: #919EAB;
  border: none;
}

.category_page-item:last-child {
  background: #919EAB;
  border: none;
}

.cta {
  width: 100%;
}

@media (max-width: 650px) {
  .category_cards {
    grid-template-columns: 1fr;
  }
}
</style>
