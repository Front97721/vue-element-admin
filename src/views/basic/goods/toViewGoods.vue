<template>
	<el-row>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: './Goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看商品详情</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-width="80px" style="margin-top: 25px;">
			<el-form-item label="商品名称:">
				<el-col>
					<div>{{goodsDetails.name}}</div>
				</el-col>
			</el-form-item>
			<el-form-item label="商品描述:">
				<el-col>
					<div>{{goodsDetails.subtitle}}</div>
				</el-col>
			</el-form-item>
			<el-form-item label="所属分类:">
				<el-select  v-model="value" placeholder="请选择一级品类" >
					<el-option v-for="item in primaryMenu " :key="item.id" :label="item.name" :value="item.id" >
					</el-option>
				</el-select>
				<el-select  v-model="val" placeholder="请选择二级品类">
					<el-option v-for="item in towMenu" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品价格:" >
				<el-col :span="7">
					<el-input  :disabled="true" v-model="goodsDetails.price" placeholder="请输入内容">
						<template slot="append">元</template>
					</el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="商品库存:">
				<el-col :span="7">
					<el-input  :disabled="true" v-model="goodsDetails.stock" placeholder="请输入内容">
						<template slot="append">件</template>
					</el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="商品图片:">
				<el-col>
					<img :src="this.lujing+this.img" alt="">
				</el-col>
			</el-form-item>
			<el-form-item label="商品详情:">
				<template>
					<quill-editor v-model="goodsDetails.detail" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
					@change="onEditorChange($event)">
					</quill-editor>
				</template>
			</el-form-item>
		</el-form>
	</el-row>
</template>

<script>
	import { quillEditor } from 'vue-quill-editor'
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	export default {
		data() {
			return {
				editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike',], // toggled buttons
							['blockquote', 'code-block','image','list','indent','link',]
						]
					}
				},
				goodsDetails:[],     //商品详情
				primaryMenu :[],	//一级品类数据
				towMenu:[],
				value:'',
				val:'',
				id:'',
				lujing:"http://xx.xxx.xxx.xx:xxx/",
				img:''
			}
		},
		mounted() {
			this.getPrimaryMenu()
			this.getGoodsDetails()
		},
		methods:{
			onEditorBlur() { //失去焦点事件
			},
			onEditorFocus() { //获得焦点事件
			},
			onEditorChange() { //内容改变事件
			},
      //获取一级品类
			getPrimaryMenu(){
				this.$axios.get("api/manage/category/get_category.do")
				.then(res=>{
					// console.log(this.$store.state.nowtowMenu)
					this.primaryMenu=res.data.data		//一级品类
					this.towMenu=this.$store.state.towMenu	//二级品类
					if(this.$store.state.nowPrimaryMenu !=0){
						this.value=this.$store.state.nowPrimaryMenu 	//获取当前商品的一级品类ID
					}
					if(this.$store.state.nowTowMenu!=0){
						this.val=this.$store.state.nowTowMenu	//获取当前商品的二级品类ID
					}
				})
      },
      //获取商品详情
			getGoodsDetails(){
				this.id=this.$route.params.id
				if(this.id!=""){
					this.$axios.get("api/manage/product/detail.do?productId=" + this.id + "")
						.then(res => {
							console.log(res.data.data)
							this.goodsDetails=res.data.data			//传递当前商品的商品详情
							this.img=res.data.data.subImages
							this.$store.commit("primaryMenu",res.data.data.parentCategoryId)	//	传递当前商品所在的一级品类
							this.$store.commit("towClass",res.data.data.categoryId)			//传递当前商品所在的二级品类
							this.$axios.get("api/manage/category/get_category.do?categoryId="+res.data.data.parentCategoryId+"")
							.then(res=>{
								// console.log(res)
								this.$store.commit('getCategoryData',res.data.data)		//当前商品所处一级品类下的二级品类
							})
					})
				}
			}
		}
 }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
