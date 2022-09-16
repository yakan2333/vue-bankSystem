<template>
  <div class="container">
    <el-container>
      <el-aside width="50%">
        <div class="card">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
            style="text-align: left"
          >
            <el-row type="flex">
              <el-form-item label="客户编号" prop="id">
                <el-input v-model="ruleForm.id" readonly />
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="客户名称" prop="name">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="民族" prop="phone">
                <el-input v-model="ruleForm.phone" />
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="身份证号" prop="phone">
                <el-input v-model="ruleForm.phone" />
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="ruleForm.phone" />
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="地址" prop="location">
                <el-input v-model="ruleForm.location" />
              </el-form-item>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">
                确定
              </el-button>
              <el-button @click="resetForm('ruleForm')"> 重置 </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
      <el-main>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>银行卡1</span>
            <span class="card-id">8888 8888 8888 8888</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click.native="handleDetail"
              >查看明细</el-button
            >
          </div>
          <img src="./images/card_part.png" alt="" class="card-img" />
          <div class="text item">余额总计:6666.66元</div>
        </el-card>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>银行卡1</span>
            <span class="card-id">8888 8888 8888 8888</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click.native="handleDetail"
              >查看明细</el-button
            >
          </div>
          <img src="./images/card_part.png" alt="" class="card-img" />
          <div class="text item">余额总计:6666.66元</div>
        </el-card>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>银行卡1</span>
            <span class="card-id">8888 8888 8888 8888</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click.native="handleDetail"
              >查看明细</el-button
            >
          </div>
          <img src="./images/card_part.png" alt="" class="card-img" />
          <div class="text item">余额总计:6666.66元</div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单数据
      ruleForm: {
        id: "",
        name: "",
        sex: "",
        age: "",
        phone: "",
        location: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          {
            min: 2,
            message: "姓名长度不能少于2",
            trigger: "blur",
          },
          {
            max: 8,
            message: "姓名长度不能大于8",
            trigger: "blur",
          },
          {
            pattern: "^[\u4e00-\u9fa5]+$",
            message: "姓名必须是汉字",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: false,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .put("/customer/update", this.$qs.stringify(this.ruleForm))
            .then((resp) => {
              if (resp.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                this.$router.go(-1);
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //查看明细
    handleDetail() {
      this.$router.push({ name: "cardDetail" });
    },
  },

  mounted() {
    // var postData = sessionStorage.getItem("postData");
    // this.ruleForm = this.$store.state.business.staff;
    // console.log(this.$store.state);
  },
};
</script>
<style>
.container {
  padding: 40px;
}
.text {
  font-size: 18px;
  text-align: center;
}
.card-id {
  margin-left: 2em;
  font-size: 18px;
}
.item {
  margin-top: 10px;
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 400px;
  margin-bottom: 10px;
}
.card-img {
  width: 100%;
}
</style>
