<template>
  <el-container class="index-con">
    <el-aside :class="showclass">
      <LeftNav></LeftNav>
    </el-aside>
    <el-container>
      <el-header class="index-header">
        <HeaderNav></HeaderNav>
      </el-header>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderNav from '../components/HeaderNav'
import LeftNav from '../components/LeftNav'
export default {
  name: 'index',
  data(){
    return{
      showclass: 'asideshow',
      showtype: false
    }
  },
  components:{
    HeaderNav,
    LeftNav
  },
  methods:{

  },
  created() {
    // 监听
    this.$root.Bus.$on('toggle', value => {
      if (value) {
        this.showclass = 'asideshow'
      } else {
        setTimeout(() => {
          this.showclass = 'aside'
        }, 300)
      }
    })
  },
  beforeUpdate() {},
  // 挂载前状态(里面是操作)
  beforeMount() {
    // 弹出登录成功
    this.$message({
      message: '登录成功',
      type: 'success'
    })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.index-con
  height 100%
  width 100%;
  box-sizing border-box
  .aside
    width 64px !important
    height 100%
    background-color deepskyblue
    margin 0px
  .asideshow
    width 240px !important
    height 100%
    background-color deepskyblue
    margin 0px
  .index-header,
  .index-main
    padding 0px
    border-left 2px solid #FFFFFF
</style>
