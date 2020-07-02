<template>
  <el-pagination
    class="page-box"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    background
    :current-page="childMsg.currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="childMsg.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="childMsg.total">
  </el-pagination>
      <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination> -->
</template>
<script>
export default {
  name: 'PageNumber',
  props: ['childMsg'],
  data() {
    return {
      pageparm: {
        currentPage: this.childMsg.currentPage,
        pageSize: this.childMsg.pageSize
      }
      // currentPage1: 5,
      // currentPage2: 5,
      // currentPage3: 5,
      // currentPage4: 4
    }
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      console.log(`每页 ${val} 条`);
      this.pageparm.pageSize = val
      this.$emit('callFather', this.pageparm)
    },
    handleCurrentChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      console.log(`当前页: ${val}`);
      this.pageparm.currentPage = val
      this.$emit('callFather', this.pageparm)
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.page-box
  margin: 25px auto;
</style>
