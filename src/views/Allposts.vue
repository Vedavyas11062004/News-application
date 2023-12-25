<script setup>
import Cards from "../components/Cards.vue";
import Cta from "../components/Cta.vue";
import { ref, computed, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import "../styles/viewStyles/allpostsStyles.css";

const posts = ref([]);
const store = ref([]);
const first = ref(10);
const after = ref(null);
const before = ref(null);
const last = ref(null);
const page = ref(1);

const getVariables = () => ({
  first: first.value,
  last: last.value,
  after: after.value,
  before: before.value,
});

const { result, loading, error,refetch } = useQuery(
  gql`
    query GET_PAGINATED_POSTS(
      $first: Int
      $last: Int
      $after: String
      $before: String
    ) {
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
  `,
  getVariables
);

const val = computed(() => {
  const data = result.value;
  store.value = data?.posts?.edges;
  return data?.posts?.edges.map((edge) => edge.node) || [];
});

const loadNextPage = () => {
  if (result.value?.posts?.pageInfo.hasNextPage) {
    after.value = result.value.posts.pageInfo.endCursor;
    first.value = 10;
    last.value = null;
    before.value = null;
    page.value = page.value + 1;
  }
};

// Define a function to load the previous page
const loadPreviousPage = () => {
  if (result.value?.posts?.pageInfo.hasPreviousPage && store.value) {
    console.log(result.value.posts.pageInfo.startCursor);
    before.value = result.value.posts.pageInfo.startCursor;
    last.value = 10;
    first.value = null;
    after.value = null;
    page.value = page.value - 1;
  }
};

watchEffect(() => {
  posts.value = [...posts.value, ...val.value];
});

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const refreshThreshold = 10; // Adjust this value to set the refresh threshold
const showRefreshText = ref(false);
const startY = ref(0);
const refreshOffset = ref(0);
const isRefreshing = ref(false);

const onTouchStart = (event) => {
  startY.value = event.touches[0].clientY;
  showRefreshText.value = false;
  isRefreshing.value = false;
};

const onTouchMove = (event) => {
  const currentY = event.touches[0].clientY;
  const distance = currentY - startY.value;

  if (distance > refreshThreshold) {
    refreshOffset.value = distance;
    showRefreshText.value = true;
  } else {
    refreshOffset.value = 0;
    showRefreshText.value = false;
  }
};

const onTouchEnd = () => {
  if (showRefreshText.value) {
    isRefreshing.value = true;
    posts.value = shuffleArray([...posts.value]);
    refetch();
    setTimeout(() => {
      refreshOffset.value = 0;
      showRefreshText.value = false;
      isRefreshing.value = false;
    }, 1500);
  }
};
</script>

<template>
  <div
    ref="refresh"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    class="reloadDiv"
  >
    <div v-if="showRefreshText" class="refreshLoad">
      <video autoPlay muted loop width="50" height="50">
        <source src="@/assets/loadingAnimation.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="category_page" v-if="result">
      <h1>{{ posts[0]?.cursor }}</h1>
      <div class="category_cards">
        <Cards
          v-for="(card,index) in posts"
          :key="index"
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
    <div v-else-if="loading" class="loadingAnimation">
      <video autoPlay muted loop width="50" height="50">
        <source src="@/assets/loadingAnimation.mp4" type="video/mp4" />
      </video>
    </div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>No data available</div>
  </div>
</template>
