<template>
    <div>
        <h1>
            Home
        </h1>
        <div class="card-expansion">
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">{{user.data.name}}</div>
                        <div class="md-subhead">Github User</div>
                    </md-card-header-text>

                    <md-card-media md-medium>
                        <img :src="user.data.avatar_url" alt="user_avatar">
                    </md-card-media>
                </md-card-header>

                <md-card-actions>
                    <md-button>  
                        Followers:{{user.data.followers}}  
                    </md-button>
                </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>


export default {
    name:"Home",
    props:[
        "user"
    ]
}
</script>

<style lang="scss" scoped>

.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
</style>

