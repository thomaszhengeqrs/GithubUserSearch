import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/Home.vue';
import Following from '../components/Following/Following.vue';
import Repos from '../components/Repos/Repos.vue';

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            name:"Home",
            component:Home,
        },
        {
            path:'/following',
            name:"Following",
            component:Following
        },
        {
            path:'/repos',
            name:"Repos",
            component:Repos
        }
    ]
})