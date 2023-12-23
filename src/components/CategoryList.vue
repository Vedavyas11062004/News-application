<script setup>
import { ref, computed, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter } from "vue-router";
import { useToken } from "../stores/counter";

const tokenstore = useToken();
const token = tokenstore.token;
const router = useRouter();

const POST_QUERY = gql`
  query Category {
    posts(first: 4, where: { categoryIn: "89" }) {
      nodes {
        databaseId
        title
        excerpt
        categories {
          nodes {
            name
            slug
            databaseId
            categoryId
          }
        }
        tags {
          nodes {
            name
            databaseId
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
            sourceUrl(size: LARGE)
          }
        }
      }
    }
  }
`;

const { result, loading, error } = useQuery(POST_QUERY);
const resData = ref("");

const val = computed(() => {
  const data = result.value;
  return data?.posts?.nodes || [];
});

watchEffect(() => {
  console.log(val.value);
  resData.value = val.value;
});

const getCategoryLink = (id) => {
  if (token) {
    router.push({
      name: "category",
      params: { id },
    });
  } else {
    router.push({
      name: "login",
    });
  }
};

const goToAuthorsPage = (id) => {
  if (token) {
    router.push({
      name: "author",
      params: { id },
    });
  } else {
    router.push({
      name: "login",
    });
  }
};
</script>
<template>
  <div v-if="result" class="category_container">
    <h2>CATEGORY SHORTS</h2>
    <div v-for="ele in resData">
      <h3>
        <span @click="getCategoryLink(ele?.categories?.nodes[0]?.databaseId)">{{
          ele?.categories?.nodes[0]?.name
        }}</span>
        par
        <span @click="goToAuthorsPage(ele?.author.node.databaseId)"
          >{{ ele?.author.node.firstName }}
          {{ ele?.author.node.lastName }}</span
        >
      </h3>
      <p v-html="ele.excerpt"></p>
    </div>
    <div class="btn_border">
      <button
        class="Btn"
        @click="getCategoryLink(resData[0]?.categories?.nodes[0]?.databaseId)"
      >
        EN LIRE PLUS
      </button>
    </div>
  </div>
  <div v-else-if="loading">loading...</div>
  <div v-else>error</div>
  <div class="line_div">
    <img src="@/assets/Line.svg" class="line" />
  </div>
</template>
<style scoped>
.category_container {
  background: #003c57;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  color: white;
  width: 90%;
  margin-inline: auto;
  padding: 1rem;
  gap: 1rem;
}
.category_container > h2 {
  font-weight: 700;
  font-size: 1.25rem;
}
.category_container > div > h3 > span {
  font-weight: 700;
}

.Btn {
  background: #ffffff;
  border: none;
  padding-block: 0.75rem;
  padding-inline: 1.5rem;
  margin-block: 1rem;
  font-weight: 600;
  font-size: 1rem;
}
.btn_border {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-block: 0.15rem;
  padding-inline: 1rem;
  /* border: 1px dashed #9747ff; */
  border-radius: 0.25rem;
}

.line {
  margin-block: 2rem;
}

.line_div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.category_container > div > p {
  font-family: "Libre Baskerville", serif;
}
</style>
