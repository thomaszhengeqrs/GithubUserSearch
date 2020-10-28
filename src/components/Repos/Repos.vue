<template>
  <div class="repos-container">
    <h1>
      User The 
      <span class="user_data" v-if="this.user.name">{{ this.user.name }}</span> 
      <span class="user_data" v-else>{{ this.user.login }}</span>
      with
      <span class="user_data">{{ this.user.followers }}</span> followers is
      following <span class="user_data">{{ this.user.following }}</span>
    </h1>
    <div v-if="userRepo.private" class="repo-container">
        <md-toolbar md-elevation="1">
            <h3 class="md-title">
                One repofor this user is
                <span class="user_data">{{ userRepo.name }}</span> and it is private
            </h3>
        </md-toolbar>
    </div>
    <div v-else class="repo-container">
        <md-toolbar md-elevation="1">
            <h3 class="md-title">
                One repo for this user is
                <span class="user_data">{{ userRepo.name }} </span> it is not private
            </h3>   
        </md-toolbar>
    </div>
  </div>
</template>

<script>
import { getRepoFromGithub } from "../../API/gitHubApi.js";

export default {
  name: "Repos",
  props: ["user"],
  data() {
    return {
      userReposList: [],
      userRepo: "",
    };
  },
  methods: {
    async getUserRepos() {
      try {
        const res = await getRepoFromGithub(this.user.login);
        this.userReposList = res.data;
        this.userRepo = this.userReposList[0];
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    if (this.user) {
      this.getUserRepos();
    } 
  },
  beforeMount() {
    this.getUserRepos();
  }
};
</script>

<style  scoped>
.repos-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.repo-container{
    margin: 0 auto;
}
.user_data {
  color: #0070c9;
}
.md-title{
    text-align: center;
}
</style>

