import Vue from 'vue';
import Router from 'vue-router';
import login from '../views/login';
import index from '../views/index';

/*
商品
*/
//商品管理
import Goods from'../views/basic/goods/Goods'
//添加商品
import addGoods from '../views/basic/goods/addGoods'
//查看商品详情
import toViewGoods from'../views/basic/goods/toViewGoods'
//编辑商品
import modifyGoods  from'../views/basic/goods/modifyGoods '
//品类管理
import Category from'../views/basic/category/Category'
//添加品类
import addCategory from'../views/basic/category/addCategory'

/*
订单
*/
//订单管理
import Orders from '../views/order/Orders'
//查看订单
import lookOrders from '../views/order/lookOrders'

/*
用户
*/
//用户管理
import Users from '../views/user/Users'

/*
图表管理
*/
import Chart from'../views/home/Chart'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    },
    {
      path: '/index',
      name: '首页',
      component: index,
      children: [
        {
            path: '/basic/goods/Goods',
            name: '商品管理',
            component: Goods,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/basic/goods/addGoods',
            name: '添加商品',
            component: addGoods,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/basic/goods/toViewGoods',
            name: '查看商品详情',
            component: toViewGoods,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/basic/goods/modifyGoods ',
            name: '编辑商品',
            component: modifyGoods ,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/basic/category/Category',
            name: '品类管理',
            component: Category,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/basic/category/addCategory',
            name: '添加品类',
            component: addCategory,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/order/Orders',
            name: '订单管理',
            component: Orders,
            meta: {
                  requireAuth: true
            }
        },
        {
            path: '/order/lookOrders',
            name: '查看订单',
            component: lookOrders,
            meta: {
                  requireAuth: true
            }
        },
        {
           path: '/user/Users',
           name: '用户管理',
           component: Users,
            meta: {
               requireAuth: true
            }
        },
        {
            path: '/home/Chart',
            name: '图表管理',
            component: Chart,
            meta: {
                requireAuth: true
            }
        }
        ]
    }
  ]
})
