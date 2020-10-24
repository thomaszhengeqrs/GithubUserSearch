<template>
  <div id="app">
    <Header v-on:get-user="getUser" />
    <div v-if="isLoading">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-else-if="user">
      <router-view v-bind:user="user" />
    </div>
    <div v-else-if="error">
      <h1>User Not Found: {{ error.message }}</h1>
    </div>
    <div v-else>
      <h3>Welcome to Github User Search</h3>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header/Header";
import { getUserFromGithub } from "./API/gitHubApi.js";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      user: "",
      isLoading: false,
      error: false,
    };
  },
  methods: {
    async getUser(username) {
      this.isLoading = true;
      try {
        const res = await getUserFromGithub(username);
        this.user = res.data;
      } catch (err) {
        this.error = err;
      }

      console.log("get User:", this.user);
      this.isLoading = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
  scroll-behavior: smooth;
}
</style>
