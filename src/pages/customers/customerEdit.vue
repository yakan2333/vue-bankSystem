<template>
  <div class="container">
    <el-container>
      <el-aside width="40%">
        <div class="card">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
            style="text-align: left"
          >
            <el-row>
              <el-form-item label="客户编号" prop="id">
                <el-input v-model="ruleForm.id" readonly />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="客户名称" prop="name">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="ruleForm.idCard" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="ruleForm.phone" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="邮件" prop="email">
                <el-input v-model="ruleForm.email" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address" />
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
        <div class="cardList">
          <el-card
            v-for="(card, index) in bankCards"
            :key="card.id"
            class="box-card"
            :body-style="{ padding: '0px' }"
          >
            <div slot="header" class="clearfix">
              <span>银行卡{{ index + 1 }}</span>
              <span class="card-id">{{ card.cardNo }}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click.native="handleDetail(card)"
                >查看明细</el-button
              >
            </div>
            <img src="./images/card_part.png" alt="" class="card-img" />
            <div class="text item">余额总计:{{ card.money }}元</div>
          </el-card>
        </div>
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
        id: "1",
        idCard: "1",
        name: "1",
        sex: "1",
        phone: "1",
        address: "1",
        email: "1",
      },
      query: {
        userId: 1,
      },
      bankCards: [],
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
    handleDetail(card) {
      sessionStorage.setItem("cardData", JSON.stringify(card));
      this.$router.push("cardDetail");
    },
    //获取列表数据
    getCardData() {
      this.$axios("/card_info", {
        params: { userId: this.query.userId },
      }).then((resp) => {
        if (resp.data.code == 200) {
          this.bankCards = resp.data.data.data;
        } else {
          this.bankCards = [];
        }
      });
    },
  },

  mounted() {
    var customerData = sessionStorage.getItem("customerData");
    this.ruleForm = JSON.parse(customerData);
    this.query.userId = this.ruleForm.id;
    this.getCardData();
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
.cardList {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
