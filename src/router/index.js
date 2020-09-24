import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/postList'
import article from '@/components/article'
import SideBar from '@/components/SideBar'
import UserInfo from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'root',
            components: {
                main: PostList
            }
        },
        {
            path: '/topic/:id&auther=:name',
            name: 'post_content',
            components: {
                main: article,
                sideBar: SideBar

            }
        },
        {
            path: '/user/:name',
            name: 'user_info',
            components: {
                main: UserInfo,
            }
        }

    ]
})