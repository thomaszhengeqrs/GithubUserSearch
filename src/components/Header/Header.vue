<template>
    <div class="header">
        <div class="header-nav">
            <md-tabs md-sync-route>
                <md-tab id="tab-home" md-label="Home" to="/home" exact></md-tab>
                <md-tab id="tab-following" md-label="Following" to="/following"></md-tab>
                <md-tab id="tab-repos" md-label="Repos" to="/repos"></md-tab>
            </md-tabs>
            <input  v-model="searchValue"  placeholder="Press Enter to Search User Here....."
                    v-on:keyup.enter.prevent="getUser"
                    type="text"
                    name="searchUser"
            >          
        </div>  
    </div>
</template>

<script>
export default {
    name:"Header",
    data(){
        return{
            searchValue:'',
        }
    },
    methods:{
        getUser(){
            const username = this.searchValue;
            this.$emit('get-user',username);
            console.log('User:',username);
        }
    }

}
</script>

<style lang="scss" scoped>
    .header{
        display: fixed;
    }
    .header-nav{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding: 10px 0;
        input{
            font-size: 100%;
            line-height: 1.15;
            height: 40px;
            margin-left: 30px;
            width: 30%;
            border-radius: 2%;
            padding:10px;
            box-shadow: none;
        }
    }
</style>

