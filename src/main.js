import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store';
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.use(ElementUI)
// 过滤器
import * as custom from './utils/util'
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})

import  VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

// 图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 路由拦截器
router.beforeEach((to, from, next) => {
    if (to.matched.length != 0) {
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if (Boolean(localStorage.getItem("userInfo"))) { // 通过vuex state获取当前的user是否存在
                next();
            } else {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else {
            if (Boolean(localStorage.getItem("userInfo"))) { // 判断是否登录
                if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
                    next();
                } else {
                    /**
                     * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页
                     */
                    next({
                        path: '/home/Chart'
                    })
                }
            } else {
                next();
            }
        }
    } else {
        next({
            path: '/login',
            query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //使用store vuex状态管理
    // components: { App },
    // template: '<App/>',
	render: h=>h(App),
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }

})
