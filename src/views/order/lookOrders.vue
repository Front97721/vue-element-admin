<template>
	<el-row >
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>订单</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: './Category'}">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-width="80px" style="margin-top: 25px;">
			<el-form-item label="订单号">
				<el-col>
					<div>{{ddh}}</div>
				</el-col>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-col>
					<div>{{createTime}}</div>
				</el-col>
			</el-form-item>
			<el-form-item label="收件人">
				<el-col>
					<div>
					{{shippingVo.receiverName}},{{shippingVo.receiverProvince}}
					{{shippingVo.receiverCity}},{{shippingVo.receiverAddress}},
					{{shippingVo.receiverMobile}}
					</div>
				</el-col>
			</el-form-item>
			<el-form-item label="订单状态">
				<el-col>
					<div>{{statusDesc}}</div>
				</el-col>
			</el-form-item>
			<el-form-item label="支付方式">
				<el-col>
					<div>{{paymentTypeDesc}}</div>
				</el-col>
			</el-form-item>
			<el-form-item label="订单金额">
				<el-col>
					<div>{{payment}}</div>
				</el-col>
			</el-form-item>
		</el-form>
		<el-table border stripe style="width: 100%" fixed max-height="150" :data="this.orderDetails">
			<el-table-column label="商品图片">
				<!-- <img :src="this.imageHost+this.image" alt=""> -->
			</el-table-column>
			<el-table-column label="商品信息" prop="productName"></el-table-column>
			<el-table-column label="单价" prop="currentUnitPrice"></el-table-column>
			<el-table-column label="数量" prop="quantity"></el-table-column>
			<el-table-column label="合计" prop="totalPrice"></el-table-column>
		</el-table>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				id:'',				
				orderDetails:[],	  //订单详情
				ddh:'',					    //订单号
				createTime:'',			//创建时间
				shippingVo:[],			//收件人信息
				statusDesc:'',			//订单状态
				paymentTypeDesc:'',		//支付方式
				payment:'',				//订单金额
// 				imageHost:"http://img.happymmall.com/",	
// 				image:''
			};
		},
		mounted(){
			this.getOdersDetails()
		},
		methods:{
      //获取订单详情页
			getOdersDetails(){
				this.id=this.$route.params.id
				// console.log(this.$route.params.id)
				if(this.id!=""){
					this.$axios.get("api/manage/order/detail.do?orderNo="+this.id+"")
						.then(res => {
							// console.log(res.data.data.orderItemVoList[0].productImage)
							this.orderDetails = res.data.data.orderItemVoList
							this.ddh = res.data.data.orderNo
							this.createTime = res.data.data.createTime
							this.shippingVo = res.data.data.shippingVo
							this.statusDesc = res.data.data.statusDesc
							this.paymentTypeDesc = res.data.data.paymentTypeDesc
							this.payment = res.data.data.payment
							// this.image = res.data.data.orderItemVoList[0].productImage
					})
				}
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  
</style>	
