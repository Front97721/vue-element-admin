<template>
	<el-row>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: './Goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
		</el-breadcrumb>
    <!-- 表单 -->
		<el-form label-width="80px" style="margin-top: 25px;">
			<el-form-item label="商品名称:">
				<el-input v-model="goodsName"></el-input>
			</el-form-item>
			<el-form-item label="商品描述:">
				<el-input type="textarea" v-model="goodsDes"></el-input>
			</el-form-item>
			<el-form-item label="所属分类:">
				<el-select v-model="value" placeholder="请选择一级品类" @change="primaryClass ">
					<el-option v-for="item in primaryMenu" :key="item.id" :label="item.name" :value="item.name" v-model="item.id">
					</el-option>
				</el-select>
				<el-select v-if="xs" v-model="val" placeholder="请选择二级品类">
					<el-option v-for="item in towClass" :key="item.id" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品价格:">
				<el-input-number v-model="price" placeholder="价格" controls-position="right" :min="0" :max="999999"></el-input-number>
			</el-form-item>
			<el-form-item label="商品库存:">
				<el-input-number v-model="repertory" placeholder="库存" controls-position="right" :min="0" :max="999999"></el-input-number>
			</el-form-item>
			<el-form-item label="商品图片:">
				<form @submit.prevent="showData"  name="form2" action="http://xxx.xxx.xxx.xxx:xxx/manage/product/upload.do" method="post" enctype="multipart/form-data">
					<input type="file" name="upload_file" >
					<input type="submit" value="上传"/>
				</form>
			</el-form-item>
			<el-form-item label="商品详情:">
				<template>
					<quill-editor 
             v-model="goodsDetails" 
             ref="myQuillEditor" 
             :options="editorOption" 
             @blur="onEditorBlur($event)" 
             @focus="onEditorFocus($event)"
					   @change="onEditorChange($event)">
					</quill-editor>
				</template>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitFrom">提交</el-button>
			</el-form-item>
		</el-form>
	</el-row>
</template>

<script>
	import {quillEditor} from 'vue-quill-editor'
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	export default {
		data() {
			return {
				editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike', ], // toggled buttons
							['blockquote', 'code-block', 'image', 'list', 'indent', 'link', ]
						]
					}
				},
				primaryMenu: [], //一级下拉品类数据
				towClass: [],     //二级下拉品类数据
				value: '',       //一级下拉品类的value
				val: '',         //二级下拉品类的value
				price: 0,        //商品价格
				repertory: 0,   //商品库存
				xs: false,     //二级品类下拉菜单的状态值
				fileList: [], //上传图片列表
				goodsName: '', //商品名称
				goodsDes: "", //商品描述
				plid: '',     //品类id
				goodsDetails: "", //商品详情
				tpmc: [] //图片名称
			}
		},
		methods: {
			showData(e){
				console.log()
			},
			onEditorBlur() { //失去焦点事件
			},
			onEditorFocus() { //获得焦点事件
			},
			onEditorChange() { //内容改变事件
			},
			primaryClass(e) {
				console.log(e)
				this.$axios.get("api/manage/category/get_category.do?categoryId=" + e + "")
					.then(res => {
						this.plid = e //保存一级品类ID
						this.towClass = res.data.data //将二级品类数据赋值给towClass
						this.xs = true //更改二级品类下拉菜单的状态值
						this.val = "" //将二级品类下拉菜单的value值清空
					})
			},
			submitFrom() {
				this.$axios.get("api/manage/product/save.do?categoryId=" + this.plid + "&name=" + this.goodsName + "&subtitle=" + this.goodsDes +
						"&subImages=" + this.tpmc + "&detail=" + this.goodsDetails + "&price=" + this.price + "&stock=" + this.repertory +
						"&status=1")
					.then(res => {
						alert(res.data.data)
					})
			},
			tijiao() {
				this.$router.push('./Goods')
				console.log("a")
			}
		},
		mounted() {
			this.$axios.get("api/manage/category/get_category.do")
				.then(res => {
					// console.log(res)
					this.primaryMenu = res.data.data
				})
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
