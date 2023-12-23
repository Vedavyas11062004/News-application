<script setup>
import Cards from '../components/Cards.vue'
import Cta from '../components/Cta.vue'
import { ref, computed, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const posts = ref([]);
const store = ref([]);
const first = ref(10);
const after = ref(null);
const before = ref(null);
const last = ref(null);
const page = ref(1);

const getVariables = () => ({ first: first.value, last: last.value, after: after.value, before: before.value });

const { result, loading, error } = useQuery(gql`
  query GET_PAGINATED_POSTS($first: Int, $last: Int, $after: String, $before: String) {
    posts(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          postId
          title
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
        }
      }
    }
  }
`, getVariables)

const val = computed(() => {
  const data = result.value;
  store.value = data?.posts?.edges;
  return data?.posts?.edges.map((edge) => edge.node) || [];
})

const loadNextPage = () => {
  if (result.value?.posts?.pageInfo.hasNextPage) {
    after.value = result.value.posts.pageInfo.endCursor;
    first.value = 10;
    last.value = null;
    before.value = null;
    page.value = page.value+1;
  }
}

// Define a function to load the previous page
const loadPreviousPage = () => {
  if (result.value?.posts?.pageInfo.hasPreviousPage && store.value) {
    console.log(result.value.posts.pageInfo.startCursor);
    before.value = result.value.posts.pageInfo.startCursor;
    last.value = 10;
    first.value = null;
    after.value = null;
    page.value = page.value -1;
  }
}


watchEffect(() => {
  posts.value = [...posts.value,...val.value];
});
</script>


<template>
  <div class="category_page" v-if="result">
    <h1>{{ posts[0]?.cursor }}</h1>
    <div class="category_cards">
      <Cards
        v-for="card in posts"
        :key="card.id"
        class="category_card"
        :data="card"
        :imgUrl="card.featuredImage?.node?.sourceUrl"
        :id="card.postId"
      />
    </div>
    <div class="btn_border">
      <button class="Btn" @click="loadNextPage()">EN LIRE PLUS</button>
    </div>
    <div class="line_div">
      <img src="@/assets/Line.svg" class="line" />
    </div>
    <div class="cta">
      <Cta />
    </div>
  </div>
  <div v-else-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>No data available</div>
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
  color: #212b36;
}

.category_page-link {
  text-decoration: none;
  color: #212b36;
}

.category_page-item:first-child {
  background: #919eab;
  border: none;
}
.category_page-item:last-child {
  background: #919eab;
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

.btn_border {
  padding-block: 0.15rem;
  padding-inline: 1rem;
  /* border: 1px dashed #9747ff; */
  border-radius: 0.25rem;
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
</style>
