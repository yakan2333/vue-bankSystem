<template>
  <div>
    <div class="title">
      <h1>个人信息</h1>
    </div>
    <el-divider content-position="left"> 个人信息 </el-divider>

    <div class="Info" />
    <el-form
      label-position="right"
      label-width="80px"
      :model="userForm"
      ref="userForm"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item>
            <el-avatar shape="square" :size="100" :src="url" />
            <el-link type="primary" :underline="false"> 修改头像 </el-link>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="账号">
            <el-input v-model="userForm.userName" readonly />
            <el-link
              type="primary"
              :underline="false"
              @click="changePassword()"
            >
              修改密码
            </el-link>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="userForm.name" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio v-model="userForm.sex" :label="male"> 男 </el-radio>
            <el-radio v-model="userForm.sex" :label="female"> 女 </el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="联系方式">
            <el-input v-model="userForm.phone" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="登录时间">
            <el-input v-model="nowTime" readonly style="border-width: 0px" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: [],
      query: {
        id: "1001",
      },
      nowTime: "",
      male: "男",
      female: "女",
      userForm: {
        id: "",
        userName: "",
        name: "",
        phone: "",
        account: "",
        password: "",
        sex: "男",
        account: "",
      },
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      imageUrl: "",
    };
  },
  mounted() {
    this.getAdmin();
    this.getNowDate();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .put("/admin/update", this.$qs.stringify(this.userForm))
            .then((resp) => {
              if (resp.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                sessionStorage.setItem("user", JSON.stringify(this.userForm));
                this.getAdmin();
                //this.$router.push('');
              }
            });
        }
      });
    },
    changePassword() {
      this.$prompt("请输入新密码", {
        confirmButtonText: "确定",
        center: true,
      }).then((resp) => {
        this.userForm.password = resp.value;
        this.submitForm("userForm");
      });
    },
    getAdmin() {
      this.userForm = JSON.parse(sessionStorage.getItem("user"));
    },
    getNowDate() {
      var date = new Date();
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.nowTime = Y + M + D + h + m + s;
    },
    //提交

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style>
.title,
.info {
  margin: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
