<template>
  <div class="login-wrap">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-content">
      <span style="font-size: 22px;">用户登录</span>
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" auto-complete='off' type="text"placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" auto-complete="off" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-row>
        <el-col class="captcha-item">
          <el-form-item prop="code">
            <el-input v-model="ruleForm.code" auto-complete="off" type="text" @keyup.enter.native="submitForm('ruleForm')" placeholder="请输入图形验证"></el-input>
          </el-form-item>
          <el-form-item>
            <img @click="getCode()" src="../assets/captcha.png" class="codeimg"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-checkbox v-model="rememberpwd" class="rePassword">记住密码</el-checkbox>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')" :loading="logining" type="primary" style="width: 100%;">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { login } from '../api/axiosFun'
  import { setCookie , getCookie , delCookie } from '../utils/util'
  import md5 from 'js-md5'
export default {
  name: 'login',
  data() {
    return {
      //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
      ruleForm: {
        //username和password默认为空
        username: '',
        password: '',
        code: '',
        randomStr: '',
        codeimg: ''
      },
      //rules前端验证
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.$message({
      message: '账号密码及验证码不为空即可',
      type: 'success'
    })
    // 获取图形验证码
    this.getcode()
    // 获取存在本地的用户名密码
    this.getuserpwd()

  },
  // 里面的函数只有调用才会执行
  methods: {
    // 获取用户名密码
    getuserpwd() {
      if (getCookie('user') != '' && getCookie('pwd') != '') {
        this.ruleForm.username = getCookie('user')
        this.ruleForm.password = getCookie('pwd')
        this.rememberpwd = true
      }
    },
    //获取info列表
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logining = true
          // 测试通道，不为空直接登录
          setTimeout(() => {
            this.logining = false
            this.$store.commit('login', 'true')
            this.$router.push({ path: '/user/Usres' })
          }, 1000)
          // 注释
          // login(this.ruleForm).then(res => {
          //   if (res.success) {
          //     if (this.rememberpwd) {
          //       //保存帐号到cookie，有效期7天
          //       setCookie('user', this.ruleForm.username, 7)
          //       //保存密码到cookie，有效期7天
          //       setCookie('pwd', this.ruleForm.password, 7)
          //     } else {
          //       delCookie('user')
          //       delCookie('pwd')
          //     }
          //     //如果请求成功就让他2秒跳转路由
          //     setTimeout(() => {
          //       this.logining = false
          //       // 缓存token
          //       localStorage.setItem('logintoken', res.data.token)
          //       // 缓存用户个人信息
          //       localStorage.setItem('userdata', JSON.stringify(res.data))
          //       this.$store.commit('login', 'true')
          //       this.$router.push({ path: '/user/Usres' })
          //     }, 1000)
          //   } else {
          //     this.$message.error(res.msg)
          //     this.logining = false
          //     return false
          //   }
          // })
        } else {
          // 获取图形验证码
          this.getcode()
          this.$message.error('请输入用户名密码！')
          this.logining = false
          return false
        }
      })
    },
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
.login-wrap
  width 100%
  height 100%
  background-image url(../assets/background-img.jpg)
  background-size 100%
  background-position center right
  background-repeat no-repeat
  box-sizing border-box
  .login-content
    width 350px
    margin 0 auto
    padding-top 8%
    line-height 60px
    text-align center
    span
      font-weight bold
      // font-size 22px
    .captcha-item
      display flex
      justify-content space-between
      img
        width 120px
        height 40px
        border-radius 5px
    .rePassword
      display flex
      font-size 10px
      margin-bottom 16px
</style>
