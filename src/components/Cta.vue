<script setup>
import { ref, computed, watchEffect } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const CHARACTERS_QUERY = gql`
  query GET_CTA {
    ctas(where: { id: 42910 }) {
      nodes {
        content
        title
      }
    }
  }
`

const { result } = useQuery(CHARACTERS_QUERY)
const resData = ref('')

const val = computed(() => {
  const data = result.value
  return data?.ctas?.nodes[0] || ''
})

watchEffect(() => {
  // console.log(val.value)
  resData.value = val.value
});

</script>
<template>
  <div>
    <div class="cta">{{ resData.title }}</div>
  </div>
</template>
<style scoped>
.cta {
  width: 90%;
  background: #d9d9d9;
  height: 276px;
  margin-inline: auto;
  margin-block: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
}
</style>
