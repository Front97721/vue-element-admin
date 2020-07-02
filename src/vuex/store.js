import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 登录验证
export default new Vuex.Store({
    state: {
        user: false,
        goodsDetails:[],	//商品详情
        categoryData :[],	//品类数据
        nowPrimaryMenu :"",	//当前产品的一级品类		
        nowtowMenu :'',		//当前产品的二级品类
    },
    mutations: {
        // 登录
        login(state, user) {
            state.user = user;
            localStorage.setItem("userInfo", user);
        },
        // 退出
        logout(state, user) {
            state.user = "";
            localStorage.setItem("userInfo", "");
        },
        //获取详情
        getGoodsDetails(state,goodsDetails) {
        	state.goodsDetails = goodsDetails
        },
        //获取品类
        getCategoryData(state,categoryData ) {
        	state.categoryData = categoryData 
        },
        //一级品类
        primaryMenu(state,nowPrimaryMenu ) {
        	state.nowPrimaryMenu = nowPrimaryMenu 
        },
        //二级品类
        towMenu(state,nowtowMenu ) {
        	state.nowtowMenu  = nowtowMenu 
        }
    }
})
