<script setup>
import Cards from "../components/Cards.vue";
import Cta from "../components/Cta.vue";
import { ref, computed, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";
import "../styles/viewStyles/categoryStyles.css";

const router = useRoute();

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

const { result, loading, error, refetch } = useQuery(POST_QUERY, {
  cid: router.params.id,
}); // Passing variables directly

const resData = ref([]);

const val = computed(() => {
  const data = result.value;
  return data?.category?.posts?.nodes || [];
});

watchEffect(() => {
  console.log(val.value);
  resData.value = val.value;
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
    resData.value = shuffleArray(resData.value);
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
      <h1>Catégorie : {{ resData[0]?.categories?.nodes[0]?.name }}</h1>
      <div class="category_cards">
        <Cards
          v-for="card in resData"
          :key="card.title"
          class="category_card"
          :data="card"
          :imgUrl="card?.featuredImage?.node?.sourceUrl"
          :id="card.databaseId"
        />
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
