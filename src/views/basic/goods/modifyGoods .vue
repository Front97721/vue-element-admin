<template>
	<el-row>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>商品</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: './Goods' }">商品管理</el-breadcrumb-item>
		    <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-width="80px" style="margin-top: 25px;">
			<el-form-item label="商品名称:">
				<el-input v-model="goodsData.name"></el-input>
			</el-form-item>
			<el-form-item label="商品描述:">
				<el-input type="textarea" v-model="goodsData.subtitle"></el-input>
			</el-form-item>
			<el-form-item label="所属分类:">
				<el-select  v-model="value" placeholder="请选择一级品类" >
					<el-option v-for="item in primaryMenu" :key="item.id" :label="item.name" :value="item.id" >
					</el-option>
				</el-select>
				<el-select  v-model="val" placeholder="请选择二级品类">
					<el-option v-for="item in towMenu" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品价格:">
				<el-input-number v-model="jg" placeholder="价格" controls-position="right"  :min="0" :max="999999"></el-input-number>
			</el-form-item>
			<el-form-item label="商品库存:">
				<el-input-number v-model="kc" placeholder="库存" controls-position="right"  :min="0"
				:max="999999"></el-input-number>
			</el-form-item>
			<el-form-item label="商品图片:">
				<form name="form2" action="http://xxx.xxx.xxx.xxx:xxx//manage/product/upload.do" method="post"  enctype="multipart/form-data">
					<input type="file" name="upload_file">
					<input type="submit" value="上传"/>
				</form>
			</el-form-item>
			<el-form-item label="商品详情:">
				<template>
					<quill-editor v-model="goodsData.detail" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
					@change="onEditorChange($event)">
					</quill-editor>
				</template>
<!-- 				<el-input type="textarea" v-model="goodsData.detail"></el-input> -->
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit">提交</el-button>
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
				goodsData:'',	//商品数据
				jg:0,
				kc:0,
				primaryMenu:[],	//一级品类数据
				towMenu:[],	    //当前商品一级品类下的二级品类数据
				value:'',	      //当前商品一级品类ID
				val:'',		      //当前商品二级品类ID
				id:''
			};
		},
		methods:{
			onEditorBlur() { //失去焦点事件
			},
			onEditorFocus() { //获得焦点事件
			},
			onEditorChange() { //内容改变事件
			},
			chakan(){

			},
			submit(){
				this.$axios.get("api/manage/product/save.do?categoryId=" + this.id + "&name=" + this.goodsData.name + "&subtitle=" + this.goodsData.subtitle + "&subImages=" + this.goodsData.subImages + "&detail=" + this.goodsData.detail + "&price=" + this.jg + "&stock=" + this.kc + "&id=" + this.id + "")
					.then(res => {
						alert(res.data.data)
						// console.log(res)
				})
			},
			goodsDetails (){
				this.id=this.$route.params.id
				if(this.id!=""){
					this.$axios.get("api/manage/product/detail.do?productId=" + this.id + "")
						.then(res => {
							this.goodsData=res.data.data		  //当前商品的数据
							this.sl=res.data.data.price				//当前商品的数量
							this.kc=res.data.data.stock				//当前商品的库存
							this.value=res.data.data.parentCategoryId	//	当前商品所在的一级品类
							this.val=res.data.data.categoryId		//当前商品所在的二级品类
							this.$axios.get("api/manage/category/get_category.do")
							.then(res=>{
								this.primaryMenu=res.data.data		//当前商品所处一级品类
							})
							this.$axios.get("api/manage/category/get_category.do?categoryId="+res.data.data.categoryId+"")
							.then(res=>{
								this.towMenu=res.data.data		//当前商品所处一级品类下的二级品类
							})
					})
				}
			}
		},
		mounted() {
			this.goodsDetails ()
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
