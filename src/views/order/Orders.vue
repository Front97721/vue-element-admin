<template>
	<el-row>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>订单</el-breadcrumb-item>
		  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" class="form-inline">
			<el-form-item>
				<el-select v-model="value">
					<el-option value="按订单号查询" ></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="订单号" v-model="val"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table border stripe style="width: 100%" fixed max-height="350" :data="this.odersData">
			<el-table-column label="订单号" prop="orderNo"></el-table-column>

			<el-table-column label="收件人" prop="receiverName"></el-table-column>

			<el-table-column label="订单状态" prop="statusDesc"></el-table-column>

			<el-table-column label="订单总价" prop="payment"></el-table-column>

			<el-table-column label="创建时间" prop="createTime"  width="200"></el-table-column>

			<el-table-column  label="操作" width="80">
				<template slot-scope="scope">
					<el-button @click="toView(scope.row)" type="success" size="small">查看</el-button>
				</template>
			</el-table-column>
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
				val:"",		//搜索的订单号
        //订单数据
				odersData:[
          {
            orderNo:236598653245,
            receiverName:"小李子",
            statusDesc:"运输中",
            payment:"￥20.33",
            createTime:"2020-07-13"
          },
          {
            orderNo:236598653245,
            receiverName:"小李子",
            statusDesc:"运输中",
            payment:"￥20.33",
            createTime:"2020-07-13"
          }
        ],
				total:1		//页数
			};
		},
		created() {
			//获取订单list
			this.$axios.get("api/manage/order/list.do")
			.then(res=>{
				this.odersData=res.data.data.list
				this.total=res.data.data.pages*10
			})
		},
		methods:{
			//点击页数获取相对应的订单list
			pageNumber(e) {
				this.$axios.post("api/manage/order/list.do?pageNum="+e+"")
					.then(res => {
					this.odersData = res.data.data.list
				})
			},
			//搜索
			search(){
				if(this.value=="按订单号查询"){
					this.$axios.post("api/manage/order/search.do?orderNo="+this.val+"")
						.then(res => {
						this.odersData=res.data.data.list
						this.total=res.data.data.pages*10
					})
				}
				else{
					alert("请选择搜索方式")
				}
			},
			toView(e){
				console.log(e)
				this.$router.push("./lookOrders"+e.orderNo+"")
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .form-inline
    padding 25px 0 10px
	.fyq
    margin-top 15px
</style>
