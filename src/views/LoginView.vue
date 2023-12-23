<script setup>
import { ref, watchEffect } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter } from "vue-router";
import {useToken } from "../stores/counter"

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

<style scoped>
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  justify-content: center;
  gap: 1.25rem;
}
form > label{
  height: 50px;
  width: 150px;
  font-size: 1.25rem;
}
form>label>input{
  border: .75px solid black;
  border-radius: 5px;
  margin-top: .25rem;
  height: 25px;
}
form > button{
  font-size: 1rem;
  padding-inline: 2rem;
  padding-block: .35rem;
}
</style>
