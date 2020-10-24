<template>
    <div> 
        <h3>User The {{this.user.data.name}} with {{this.user.data.followers}} followers is following {{this.user.data.following}}</h3>
            <div v-if="userRepo.private">
                <h3 >One repofor this user is {{userRepo.name}} and it is private</h3>
            </div>
            <div v-else>
                <h3>One repo for this user is {{userRepo.name}} and it is not private</h3>
            </div>           
    </div>
</template>

<script>
import { getRepoFromGithub } from "../../API/gitHubApi.js";

export default {
    name:"Repos",
    props:[
        "user",
    ],
    data(){
        return{
            userReposList:[],
            timestamp:'',
            userRepo:''
        }
    },
    methods:{
        async getUserRepos(){
            await getRepoFromGithub(this.user.data.login).then( res =>{
                this.userReposList = res.data,
                this.userRepo = this.userReposList[0];
                console.log("userRepo,",this.userRepo)
            }).catch(err =>{
                console.log(err)
            })
            console.log("get repos",this.userReposList)
        }
    },
    created(){
        if(this.user.data){
            this.timestampe = this.user.timestamp;
            this.getUserRepos()
        }
    },
    updated(){
        if(this.timestamp !== this.user.timestamp){
            this.timestamp = this.user.timestamp;
            this.getUserRepos();
        }
    }

}
</script>

<style lang="scss" scoped>
</style>

