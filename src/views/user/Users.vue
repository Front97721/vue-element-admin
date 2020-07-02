<template>
	<el-row>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户</el-breadcrumb-item>
		  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
    <el-form :inline="true" class="form-inline">
    	<el-form-item>
    		<el-select v-model="value">
    			<el-option value="按用户ID查询" ></el-option>
    		</el-select>
    	</el-form-item>
    	<el-form-item>
    		<el-input placeholder="用户ID" v-model="userID"></el-input>
    	</el-form-item>
    	<el-form-item>
    		<el-button type="primary" @click="search">查询</el-button>
    	</el-form-item>
    </el-form>
		<el-table border stripe style="width: 100%" fixed max-height="400" :data="this.userListData">
			<el-table-column label="用户ID" prop="userID"></el-table-column>
			<el-table-column label="用户名" prop="userName"></el-table-column>
			<el-table-column label="用户邮箱" prop="userEmail"></el-table-column>
			<el-table-column label="用户电话" prop="userPhone"></el-table-column>
			<el-table-column label="注册时间" prop="updateTime"></el-table-column>
		</el-table>
		<el-pagination
			class="fyq"
			@current-change="pageNumber"
			background
			layout="prev, pager, next,jumper"
			:total="this.total">
		</el-pagination>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
        value:'',
				userListData:[
          {
            userID:"12563489",
            userName:"小猴子",
            userEmail:"206598635@qq.com",
            userPhone:"13652659856",
            updateTime:"2020-03-20"
          },
          {
            userID:"12563489",
            userName:"小猴子",
            userEmail:"206598635@qq.com",
            userPhone:"13652659856",
            updateTime:"2020-03-20"
          }          
        ],
				total:1
			};
		},
		created() {
			this.$axios.get("api/manage/user/list.do")
			.then(res=>{
				this.userListData=res.data.data.list
				this.total=res.data.data.pages*10
			})
		},
		methods:{
      //搜索
      search(){
      	if(this.value=="按订用户名"){
      		this.$axios.post("api/manage/order/search.do?userName="+this.userID+"")
      			.then(res => {
      			this.userListData=res.data.data.list
      			this.total=res.data.data.pages*10
      		})
      	}
      	else{
      		alert("请选择搜索方式")
      	}
      },
      //获取对应的页码数
			pageNumber(e) {
				this.$axios.post("api/manage/user/list.do?pageNum="+e+"")
					.then(res => {
					this.userListData = res.data.data.list
				})
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .form-inline
    padding 20px 0 10px
	.fyq
    margin-top: 15px
</style>
