<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">后台管理系统</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 密码-->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="c4" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.captcha"
          placeholder="请输入验证码"
          name="captcha"
          type="text"
          tabindex="3"
          auto-complete="on"
        />
        <img :src="imgUrl" @click="captchaData" class="verification" alt="看不清楚？点击图片刷新!">
        <span class="refresh" @click="captchaData" ><i class="el-icon-refresh"></i></span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">{{ loginText }}</el-button>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { getCaptcha } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      loading: false, // 加载中
      loginText: '登录',
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        //captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      imgUrl: "", //验证码URL
      randomStr:'',
      loginForm: {
        username: '',
        password: '',
        captcha:''
      },
      passwordType: 'password',
      redirect: undefined
    }
  },
  created() {
    this.captchaData();
  },
  methods: {
    /* 获取验证码接口*/
    captchaData(){
      axios.get(process.env.VUE_APP_BASE_API + '/art-gallery-admin/captcha.jpg',{
        responseType: 'arraybuffer'
      }).then(response => {
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }).then( data => {
        this.imgUrl = data
      })
    },
    /**
     * @description 密码切换明文||密文
     */
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    /**
     * @description 点击登录
     */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.loginText = '登录中';
          this.$store.dispatch('user/login', this.loginForm).then((response) => {
            this.loading = false;
            if (response.code === 0) {
              this.loginText = '登录';
              this.$router.push({ path: '/' });
            }
          }).catch(() => {
            this.loading = false;
            this.loginText = '登录';
          });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bg:#283443;
$light_gray:#fff;
$cursor: #333;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 87%;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: 100%;
  overflow: hidden;

  .login-form {
    padding: 20px;
    position: absolute;
    left:50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    width: 360px;
    max-width: 100%;
    overflow: hidden;
    background: rgba(0,0,0, 0.2);
    border-radius: 10px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 20px 6px 15px;
    color: $light_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 20px;
      color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
    }
  }
  .show-pwd,.refresh {
    position: absolute;
    right: 20px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  /*.refresh {
    position: absolute;
    right: 10px;
    top: 9px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }*/
  .verification {
    position: absolute;
    top: 50%;
    right: 30px;
    width: 100px;
    height: 30px;
    transform: translateY(-50%);
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
