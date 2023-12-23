<script setup>
import { ref, watchEffect } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter } from "vue-router";
import {useToken } from "../stores/counter"
import '../styles/viewStyles/loginStyles.css';

const tokenstore = useToken();
const token = tokenstore.token;
console.log(token);

const name = ref("");
const password = ref("");
const authToken = ref("");
const router = useRouter();

const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(
      input: {
        clientMutationId: "uniqueId"
        username: $username
        password: $password
      }
    ) {
      authToken
      user {
        id
        name
      }
    }
  }
`;
const { mutate: loginUser } = useMutation(LOGIN_MUTATION);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        username: name.value,
        password: password.value,
      });
      console.log("User data:", data);
      authToken.value = data.login.authToken
      tokenstore.changeToken(data.login.authToken);
      console.log(token);
      router.push({
        name: 'home'
      })
    } catch (error) {
      console.error("Mutation error:", error);
      alert("wrong userName or password");
    }
};

watchEffect(()=>{
    console.log(authToken.value);
    console.log(token);
});

</script>

<template>
  <form @submit="handleSubmit">
    <label for="name">User Name:
      <input type="text" v-model="name" />
    </label>
    <label for="password">Password:
      <input type="password" v-model="password" autocomplete="on"/>
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

