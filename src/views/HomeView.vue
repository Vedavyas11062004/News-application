<script setup>
import NewsCard from "../components/NewsCard.vue";
import Cta from "../components/Cta.vue";
import CategoryList from "../components/CategoryList.vue";
import TitleSection from "../components/TitleSection.vue";
import config from "../../config";
import { ref, computed, watchEffect } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useToken } from "../stores/counter";
import "../styles/viewStyles/homeStyles.css";
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
`;
const { result, loading, error,refetch } = useQuery(CHARACTERS_QUERY);
const val = computed(() => {
  return result.value?.posts?.nodes || [];
});
const resData = ref("");
const len = ref(0);
const componentKey = ref(0);
watchEffect(() => {
  if (val.value) {
    resData.value = val.value;
    len.value = resData.value.length;
    console.log(token);
  }
});
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
  <main
    v-if="len > 0"
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
    <KeepAlive>
      <NewsCard :key="componentKey" :resData="resData" />
    </KeepAlive>
    <Cta />
    <KeepAlive>
      <CategoryList />
    </KeepAlive>
    <KeepAlive>
      <TitleSection :categoryId="config.categoryId1" />
    </KeepAlive>
    <KeepAlive>
      <TitleSection :categoryId="config.categoryId2" />
    </KeepAlive>
    <Cta />
    <div class="line_div">
      <img src="@/assets/Line.svg" class="line" />
    </div>
    <KeepAlive>
      <TitleSection :categoryId="config.categoryId3" />
    </KeepAlive>
    <KeepAlive>
      <TitleSection :categoryId="config.categoryId4" />
    </KeepAlive>
    <Cta />
    <div class="buttomTitle_section">
      <KeepAlive>
        <TitleSection :categoryId="config.categoryId1" />
      </KeepAlive>
    </div>
    <Cta class="lastCta" />
  </main>
  <div v-else-if="loading" class="loadingAnimation">
    <video autoPlay muted loop width="50" height="50">
      <source src="@/assets/loadingAnimation.mp4" type="video/mp4" />
    </video>
  </div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>No data available</div>
</template>
