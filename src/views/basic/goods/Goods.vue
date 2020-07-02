<template>
	<el-row>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
		<el-form :inline="true" class="form-inline">
			<el-form-item>
				<el-select v-model="value" placeholder="按商品ID查询">
					<el-option value="按商品ID查询"></el-option>
					<el-option value="按商品名称查询"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="关键词" v-model="search"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="seekQuery">查询</el-button>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="addGoods">添加商品	</el-button>
      </el-form-item>
		</el-form>
    <!-- 列表 -->
		<el-table border stripe style="width: 100%" fixed max-height="350" :data="this.goodsData">
			<el-table-column label="商品ID" prop="id"></el-table-column>
			<el-table-column label="商品信息" prop="name"></el-table-column>
			<el-table-column label="商品价格" prop="price"></el-table-column>
			<el-table-column label="商品状态" prop="status" >
					<template  slot-scope="scope" >
						<el-col  v-if="scope.row.status==1">
							<span>在售</span>
							<el-button @click="xiajia(scope.row)" type="warning" size="small">下架</el-button>
						</el-col>
						<el-col v-else>
							<span>已下架</span>
							<el-button @click="shangjia(scope.row)" type="success" size="small">上架</el-button>
						</el-col>
					</template>
			</el-table-column>
			<el-table-column algin="center" label="操作" width="150">
				<template slot-scope="scope">
					<el-button @click="chakan(scope.row)" type="success"  size="small">查看</el-button>
					<el-button @click="bianji(scope.row)" type="primary"  size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pageNumber" @current-change="pageNumber" background layout="prev, pager, next,jumper" :total="this.total">
		</el-pagination>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				value: "", //选择搜索方式
        //商品数据
				goodsData: [
          {
            id:"256986",
            name:"内蒙古华章大棉袄",
            price:"￥158",
            status:""
          },
          {
            id:"256986",
            name:"内蒙古华章大棉袄",
            price:"￥158",
            status:""
          },
          {
            id:"256986",
            name:"内蒙古华章大棉袄",
            price:"￥158",
            status:""
          },
          {
            id:"256986",
            name:"内蒙古华章大棉袄",
            price:"￥158",
            status:""
          },
          {
            id:"256986",
            name:"内蒙古华章大棉袄",
            price:"￥158",
            status:""
          }
        ],
				total: 1, //分页器的页码
				search: '' //搜索的内容
			};
		},
		created() {
			this.$axios.post("api/manage/product/list.do")
				.then(res => {
					this.goodsData = res.data.data.list
					this.total = res.data.data.pages * 10 //根据请求过来的数据改变页码数
			})
		},
		methods: {
			//获取产品页数
			pageNumber(e) {
				if (this.value == "按商品名称查询") {
					this.$axios.get("api/manage/product/search.do?productName=" + this.search + "&pageNum=" + e + "")
						.then(res => {
							// console.log(res)
							this.goodsData = res.data.data.list
						})
				} else {
					this.$axios.post("api/manage/product/search.do?pageNum=" + e + "")
						.then(res => {
							this.goodsData = res.data.data.list
						})
				}
			},
			//添加商品页跳转
			addGoods() {
				this.$router.push('./addGoods')
			},
			//产品搜索
			seekQuery() {
				// console.log(this.search)
				if (this.value == "按商品id查询") {
					this.$axios.get("api/manage/product/search.do?productId=" + this.search + "")
						.then(res => {
							// console.log(res)
							this.goodsData = res.data.data.list
							this.total = res.data.data.pages * 10
						})
				} else if (this.value == "按商品名称查询") {
					this.$axios.get("api/manage/product/search.do?productName=" + this.search + "")
						.then(res => {
							// console.log(res)
							this.goodsData = res.data.data.list
							this.total = res.data.data.pages * 10
					})
				}
			},
			//查看产品详情页跳转
			chakan(e){
				this.$router.push('./toViewGoods/'+e.id+'')		//根据id跳转对应页面
			},
			//产品编辑页面跳转
			bianji(e){
				this.$router.push('./modifyGoods/'+e.id+'')
			},
			//产品下架
			xiajia(e){
				if(confirm("确认要下架该商品吗？")){
					this.$axios.get("api/manage/product/set_sale_status.do?productId="+e.id+"&status=2")
					.then(res=>{
						alert(res.data.data);
						this.$axios.post("api/manage/product/list.do")
							.then(res => {
								this.goodsData = res.data.data.list
								this.total = res.data.data.pages * 10 //根据请求过来的数据改变页码数
						})
					})
				}
				else{
				 alert("已取消");
				}
			},
			//产品上架
			shangjia(e){
				if(confirm("确认要下架该商品吗？")){
					this.$axios.get("api/manage/product/set_sale_status.do?productId="+e.id+"&status=1")
					.then(res=>{
						alert(res.data.data);
						this.$axios.post("api/manage/product/list.do")
							.then(res => {
								this.goodsData = res.data.data.list
								this.total = res.data.data.pages * 10 //根据请求过来的数据改变页码数
						})
					})
				}
				else{
				alert("已取消");
				}
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
	.form-inline
		padding 25px 0 10px
	.pageNumber
		margin-top 15px
</style>
