import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('../view/index')
const submitEnd = () => import('../view/submitEnd')
const wtDetail = () => import('../view/wtDetail')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/submitEnd',
            name: 'submitEnd',
            component: submitEnd
        },
        {
            path: '/wtDetail',
            name: 'wtDetail',
            component: wtDetail
        }
    ]
})
