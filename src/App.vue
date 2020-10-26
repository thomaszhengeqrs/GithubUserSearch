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
      <md-content class="md-accent">
        <h2 class="error-msg"> {{ error}}</h2>
      </md-content>
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
      error: "",
    };
  },
  methods: {
    async getUser(username) {
      this.isLoading = true;
      this.user = '';
      if(username == ''){
        this.error = 'The Search Bar cannot be empty';
        this.isLoading = false;
      }else{
        try {
        const res = await getUserFromGithub(username);
        this.user = res.data;
      } catch (err) {
        if( err.response.status == 404){
          this.error = `We couldn’t find any repositories matching user: ${username}`
        }else{
          this.error = err.message
        }
      }
      console.log("get User:", this.user);
      }
      
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

.error-msg{
  text-align: center;
}
</style>
