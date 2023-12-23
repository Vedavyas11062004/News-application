import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useToken = defineStore('token', () => {
  const token = ref(null);

  function changeToken(value) {
    token.value = value;
    console.log(token.value);
  }

  return { token, changeToken }; 
});
