<template>
  <div>
    <h3>
      User The <span class="user_data">{{ this.user.name }}</span> with
      <span class="user_data">{{ this.user.followers }}</span> followers is
      following <span class="user_data">{{ this.user.following }}</span>
    </h3>
    <div v-if="userRepo.private">
      <h3>
        One repofor this user is
        <span class="user_data">{{ userRepo.name }}</span> and it is private
      </h3>
    </div>
    <div v-else>
      <h3>
        One repo for this user is
        <span class="user_data">{{ userRepo.name }} </span> it is not private
      </h3>
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
      console.log("getRepos");
      try {
        const res = await getRepoFromGithub(this.user.login);
        this.userReposList = res.data;
        this.userRepo = this.userReposList[0];
        console.log("userRepo:", this.userRepo);
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    if (this.user) {
      this.getUserRepos();
      console.log("getRepos");
    } else {
      console.log("repos");
    }
  },
  beforeMount() {
    this.getUserRepos();
  }
};
</script>

<style lang="scss" scoped>
.user_data {
  color: red;
}
</style>

