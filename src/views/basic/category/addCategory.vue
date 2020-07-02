<template>
	<el-row>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: './Category' }">品类管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加品类</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-width="80px" style="margin-top: 25px;">
			<el-form-item label="所属品类:">
				<el-select v-model="value" placeholder="所有" @change="selectClass">
					<el-option v-for="item in primaryMenu" :key="item.id" :label="item.name" :value="item.name" v-model="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="品类名称:">
				<el-input v-model="name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitFrom">提交</el-button>
			</el-form-item>
		</el-form>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				value:'',		      //当前选择的一级品类
				primaryMenu:[],		//所有一级品类数据
				name:"",		      //品类名称
				id:''			        //一级品类id
			};
		},
		mounted(){
			this.getCategoryData()
		},
		methods:{
			//获取品类
			getCategoryData(){
				this.$axios.get("api/manage/category/get_category.do")
				.then(res=>{
					this.primaryMenu=res.data.data
          // this.towMenu = res.data.data
				})
			},
			selectClass(e){
				this.id=e
			},
			//添加品类
			submitFrom(){
				this.$axios.get("api/manage/category/add_category.do?parentId="+this.id+"&categoryName="+this.name+"")
				.then(res=>{
					alert(res.data.data)
				})
			}
		}
	}
</script>

<style scoped="">
	.dbt {
		min-height: 1px;
		padding-right: 15px;
		padding-left: 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 5px;
		margin: 10px 0 20px;
		border-bottom: 1px solid transparent;
		font-size: 34px;
		font-weight: 500;
	}
</style>
