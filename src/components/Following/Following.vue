<template>
  <div v-if="displayList" id="loadmore-btn">
    <h2>{{ displayList.length }} of {{ this.user.following }} Following</h2>
    <div class="list-container">
      <div class="displayList-container">
        <div
          v-bind:key="following.id"
          v-for="following in displayList"
          class="md-list-item-container"
        >
          <md-card class="md-primary" md-theme="green-card">
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">{{ following.login }}</div>
                <div class="md-subhead">Type:{{ following.type }}</div>
              </md-card-header-text>

              <md-card-media>
                <img :src="following.avatar_url" alt="Avatar" />
              </md-card-media>
            </md-card-header>
          </md-card>
        </div>
      </div>
      <md-button :disabled="disabled" @click="loadMore" class="md-raised" 
        >Load More
      </md-button>
    </div>
  </div>
  <div v-else>
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
import { getFollowingFromGithub } from "../../API/gitHubApi.js";

export default {
  name: "Following",
  props: ["user"],
  data() {
    return {
      displayList: [],
      page: 1,
      per_page: 10,
      disabled: false,
    };
  },
  methods: {
    async getUserFollowing() {
      this.loading = true;
      try {
        const res = await getFollowingFromGithub(
          this.user.login,
          this.page,
          this.per_page
        );
        this.displayList = res.data;
        if (res.data.length < 10) {
          this.disabled = true;
        }
      } catch (err) {
        console.log(err);
      }

      this.loading = false;
    },
    async loadMore() {
      document.getElementById("loadmore-btn").focus({preventScroll:true})
      this.page += 1;
      try {
        const res = await getFollowingFromGithub(
          this.user.login,
          this.page,
          this.per_page
        );
        if (res.data.length) {
          this.displayList = [...this.displayList, ...res.data];

          
        }
        if (res.data.length < 10) {
          this.disabled = true;
        }
        
      } catch (err) {
        console.log(err);
      }
      
    },
  },
  created() {
    if (this.user) {
      this.getUserFollowing();
    }
    
  },
  beforeMount() {
    this.page = 1;
    this.displayList = [];
    this.disabled = false;

    this.getUserFollowing();
  },
  updated(){
    window.scrollTo(0, document.body.scrollHeight);
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
.displayList-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.md-list-item-container {
  width: 300px;
  margin: 20px;
}
</style>