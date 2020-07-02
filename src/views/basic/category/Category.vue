<template>
	<el-row>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>品类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" style="display: flex;justify-content: space-between;padding: 25px 0 10px;">
      <el-form-item>当前商品分类ID:0</el-form-item>
      <el-form-item><el-button type="primary" icon="el-icon-plus" @click="addCategory">添加品类</el-button></el-form-item>
    </el-form>
    <!-- 列表 -->
		<el-table border stripe style="width: 100%" fixed max-height="430" :data="this.categoryData">
			<el-table-column label="品类ID" prop="id"></el-table-column>
			<el-table-column label="品类名称" prop="name"></el-table-column>
			<el-table-column label="操作" algin="center" width="220">
				<template slot-scope="scope">
					<el-button @click="toEditor(scope.row)" type="success" size="small">修改名称</el-button>
					<el-button @click="toView(scope.row)" type="primary" size="small">查看其子品类</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				categoryData:[
          {
            id:"36598236",
            name:"毛衣冬需"
          },
          {
            id:"36598236",
            name:"毛衣冬需"
          }
        ]
			};
		},
		created() {
			//获取品类
			this.$axios.get("api/manage/category/get_category.do")
			.then(res=>{
				this.categoryData=res.data.data
			})
		},
		methods:{
			//修改品类
			toEditor(e){
				let name=window.prompt("请输入新的品类名称",e.name)
				if(name){
					this.$axios.get("api/manage/category/set_category_name.do?categoryId="+e.id+"&categoryName="+name+"")
					.then(res=>{
						alert(res.data.data)
						this.$axios.get("api/manage/category/get_category.do")
						.then(res=>{
							this.categoryData=res.data.data
						})
					})
				}
				else{
					alert("已取消")
				}
			},
			toView(e){
				this.$router.push(""+e.id+"")
			},
      //添加品类
			addCategory(){
				this.$router.push('./addCategory')
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
	.el-col
		padding: 0 15px;
</style>
