<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">网上银行厅堂管理系统</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="Username"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">
        Remember me
      </el-checkbox>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 15px"
        @click.native.prevent="handleLogin"
      >
        Login
      </el-button>
      <div class="tips">
        <span>Copyright @2021-2022 版权所有 | by 192015 , 南昌航空大学</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: "",
      },

      loginRules: {
        account: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    getLoginData() {
      this.$axios("/admin/login", {
        params: this.loginForm,
      }).then((resp) => {
        if (resp.data.code == 0 && resp.data.data != null) {
          this.$message.success("登录成功");
          let adminInfo = resp.data.data;
          localStorage.setItem("user", JSON.stringify(adminInfo));
          sessionStorage.setItem("user", JSON.stringify(adminInfo));
          this.$router.push({ path: "/home" });
        } else {
          this.$message.error("账户或密码不正确");
        }
      });
    },
    // handleLogin() {
    //   this.$refs.loginForm.validate((valid) => {
    //     if (valid) {
    //       this.loading = true;
    //       this.getLoginData();
    //       this.loading = false;
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    handleLogin() {
      this.$router.push({ path: "/home" });
    },
  },
  mounted() {
    if (localStorage.getItem("user") != null) {
      let p = JSON.parse(localStorage.getItem("user"));
      console.log(p);
      this.loginForm.account = p.account;
      this.loginForm.password = p.password;
    }
    console.log(this);
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bg: #283443;
$light_gray: grey;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$black_4: #454545;
.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url(../../assets/login.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: relative;
    background: #ffffff;
    width: 520px;
    max-width: 100%;
    padding: 30px 35px 0;
    margin: 130px auto 0;
    border-radius: 10px;
    overflow: hidden;
  }
  // 底下小字
  .tips {
    font-size: 14px;
    color: grey;
    margin-bottom: 5px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $black_4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  // 标题
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $black_4;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $black_4;
    cursor: pointer;
    user-select: none;
  }
}
</style>
