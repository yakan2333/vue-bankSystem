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
          placeholder="请输入用户名"
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
          placeholder="请输入密码"
          v-model="loginForm.password"
          show-password
        ></el-input>
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
import { adminRoutes } from "@/router";
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
      if (value.length < 4) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: "",
        rememberMe: true,
      },

      loginRules: {
        account: [{ required: true, trigger: "blur" }],
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
    getLoginData() {
      this.$axios("/login", {
        params: {
          userName: this.loginForm.account,
          password: this.loginForm.password,
        },
      }).then((resp) => {
        this.loading = false;
        if (resp.data.code == 200 && resp.data.data != null) {
          this.$message.success("登录成功");
          let adminInfo = resp.data.data;
          localStorage.setItem("user", JSON.stringify(adminInfo));
          sessionStorage.setItem("user", JSON.stringify(adminInfo));
          if (adminInfo.role == 2) {
            this.$router.push({ path: "/home" });
          } else {
            this.$router.push({ path: "/appointment" });
          }
        } else {
          this.$message.error("账户或密码不正确");
        }
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.getLoginData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // handleLogin() {
    //   this.$router.push({ path: "/home" });
    // },
  },
  mounted() {
    if (localStorage.getItem("user")) {
      let p = JSON.parse(localStorage.getItem("user"));
      console.log(p);
      this.loginForm.account = p.userName;
      // this.loginForm.password = p.password;
    }
  },
};
</script>

<style lang="css">
/* 修复input 背景不协调 和光标变色 */
/* reset element-ui css */
.login-container .el-input {
  display: inline-block;
  height: 47px;
  width: 85%;
}

.login-container .el-input input {
  background: transparent;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 0px 12px 15px;
  color: grey;
  height: 40px;
  caret-color: grey;
}

.login-container .el-input input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #283443 inset !important;
  -webkit-text-fill-color: #fff !important;
}

.login-container .el-form-item {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
</style>

<style lang="css" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url(../../assets/login.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.login-container .login-form {
  position: relative;
  background: #ffffff;
  width: 520px;
  max-width: 100%;
  padding: 30px 35px 0;
  margin: 130px auto 0;
  border-radius: 10px;
  overflow: hidden;
}

.login-container .tips {
  font-size: 14px;
  color: grey;
  margin-bottom: 5px;
}

.login-container .svg-container {
  padding: 6px 0px 6px 15px;
  color: #454545;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.login-container .title-container {
  position: relative;
}

.login-container .title-container .title {
  font-size: 26px;
  color: #454545;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}

.login-container .show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #454545;
  cursor: pointer;
  user-select: none;
}
</style>
