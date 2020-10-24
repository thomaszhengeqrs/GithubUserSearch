<template>
  <div v-if="displayList"> 
    <h2>{{displayList.length}} of {{this.user.data.following}} Following</h2>
    <div class="list-container">   
        <md-button
            :disabled="disabled"
            @click="loadMore"
            class="md-raised"
        >Load More
        </md-button>
        <div class="displayList-container">
            <div v-bind:key="following.id" v-for="following in displayList" class="md-list-item-container">
              <md-card class="md-primary" md-theme="green-card">
                  <md-card-header>
                    <md-card-header-text>
                      <div class="md-title">{{following.login}}</div>
                      <div class="md-subhead">Type:{{following.type}}</div>
                    </md-card-header-text>

                    <md-card-media>
                      <img :src="following.avatar_url" alt="Avatar">
                    </md-card-media>
                  </md-card-header>
              </md-card>
            </div>
        </div> 
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
      timestamp:'',
      page: 1,
      per_page: 10,
      disabled: false,
    };
  },
  methods: {
    async getUserFollowing() {
      this.loading = true;
      await getFollowingFromGithub(this.user.data.login, this.page, this.per_page).then(res =>{
        console.log(res.data)
        this.displayList = res.data;
        if (res.data.length < 10) {
          this.disabled = true;
        }
      }).catch( err =>{
        console.log(err)
      })
      this.loading = false;
    },
    async loadMore() {
      this.page += 1;
      await getFollowingFromGithub(this.user.data.login, this.page, this.per_page).then(res =>{
        if (res.data.length) {
          this.displayList = [...this.displayList, ...res.data];
        }
        if (res.data.length < 10) {
          this.disabled = true;
        }
      }).catch( err =>{
        console.log(err)
      })
    }
  },
  created() {
    if (this.user.data) {
      this.timestamp = this.user.timestamp;
      this.getUserFollowing();
    }
  },
  updated() {
    if(this.user.timestamp !== this.timestamp){
      this.page = 1;
      this.displayList = [];
      this.disabled = false;
      this.timestamp = this.user.timestamp;
      this.getUserFollowing()
    }
    console.log("User Updated")
    
  },
};
</script>

<style lang="scss" scoped>
    .list-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;

    }
    .displayList-container{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    .md-list-item-container{
        width: 300px;
        margin: 20px;
    }
</style>