<template>
  <div style="padding: 30px">
    <div class="title">
      <img src="./images/ico.jpg" />
      <span>产品名称:</span>
      <span>{{ FundData.name }}</span>
    </div>
    <el-divider content-position="left"> 请填写基金购买信息 </el-divider>
    <div class="card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="text-align: left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="基金代码" prop="num">
              <el-input v-model="FundData.num" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="交易类型" prop="name">
              <el-input v-model="FundData.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="购买金额" prop="amount">
              <el-input v-model="ruleForm.amount" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            首次购买：10.00元起，追加购买1.00元起，单笔上限--元，日累计上限--元
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="币种" prop="currency">
              <el-input v-model="FundData.currency" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="银行账户" prop="account">
              <el-select v-model="account" placeholder="请选择">
                <el-option
                  v-for="item in bankCards"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="附加码" prop="validCode">
              <el-input v-model="ruleForm.validCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="verifyCode">
              <a
                href="javascript:void(0);"
                rel="external nofollow"
                title="点击更换验证码"
              >
                <img
                  id="imgVerify"
                  :src="imgSrc"
                  alt="更换验证码"
                  @click="getVerify()"
                />
              </a>
            </div>
          </el-col>
        </el-row>
        <el-divider content-position="left"> 手续费信息信息 </el-divider>
        <FundCard></FundCard>
        <div class="checkList">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="1"
              >本人已阅读并同意
              <span>《中国建设银行证券投资基金投资人权益须知》</span>
              <span>《长城久嘉创新公募基金产品资料概要》</span>
            </el-checkbox>
            <el-checkbox label="2"
              >本人同意并授权建行按照
              <span>《中国建设银行代理销售开放式基金业务个人信息授权书》</span>
              相关约定处理本人的个人敏感信息</el-checkbox
            >
            <el-checkbox label="3">
              本人同意并授权建行按照
              <span>《中国建设银行代理销售开放式基金业务个人信息授权书》</span>
              相关约定对外提供本人的个人信息
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            确定
          </el-button>
          <el-button @click="resetForm('ruleForm')"> 取消 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { judgeEensit } from "@/utils/judge-Eensit";
import FundCard from "./fundCard.vue";
export default {
  components: {
    FundCard,
  },
  name: "fundPurchase",
  data() {
    return {
      titleMsg: "",
      checkList: ["3"],
      imgSrc: "",
      //表单数据
      userData: "",
      account: "",
      ruleForm: {
        amount: 10,
        validCode: "",
      },
      FundData: {
        cumulativeEquity: 1.8698,
        currency: "人民币",
        galaxyRating: 5,
        historyEquity: [],
        id: 1,
        latestEquity: 1.8698,
        name: "长城久嘉创新",
        num: 2486,
        oneDay: -2.39,
        oneMonth: -2.02,
        oneYear: -0.24,
        riskLevel: "中风险",
        sixMonth: 11.43,
        state: "可申购赎回",
        threeMonth: 20.28,
        time: 1499184000000,
        type: "混合型",
        year: -8.75,
      },
      bankCards: [],
      purchaseResult: "",
      rules: {
        amount: [
          {
            required: true,
            message: "请输入购买金额",
            trigger: "blur",
          },
          {
            min: 2,
            message: "金额不能小于10",
            trigger: "blur",
          },
          {
            max: 6,
            message: "已超过当前可购买金额上限",
            trigger: "blur",
          },
          {
            pattern: "^[0-9]*$",
            message: "金额必须是数字",
            trigger: "blur",
          },
        ],
        validCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    //获取验证码
    getVerify() {
      let v = Math.random();
      this.imgSrc = "http://localhost:8080/api/getVerify?" + v;
    },
    //提交
    submitForm(formName) {
      if (this.checkList.length == 3) {
        this.getChartData();
      } else {
        this.$message({
          type: "warning",
          message: "请阅读并同意所有协议!",
        });
      }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$axios
      //       .post("/staff/save", this.$qs.stringify(this.ruleForm))
      //       .then((resp) => {
      //         if (resp.data.code == 0) {
      //           this.$message({
      //             type: "success",
      //             message: "购买成功!",
      //           });
      //           this.$router.push("fundList");
      //         }
      //       });
      //   }
      // });
    },
    getChartData() {
      this.$axios("/checkVerify", {
        params: {
          code: this.ruleForm.validCode,
        },
      }).then((resp) => {
        if (resp.data.code == 200) {
          this.OpenCheckBox();
        } else {
          this.$alert("验证码错误，请重新输入！", "警告", {
            confirmButtonText: "确定",
            type: "warning",
          });
        }
      });
    },
    OpenCheckBox() {
      this.$prompt("确认支付密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
      })
        .then(({ value }) => {
          if (value == "123456") {
            this.$message({
              type: "success",
              message: "购买成功",
            });
            // this.$router.push({ name: "myFundList" });
            this.getResultData();
            this.$router.push({ name: "backInfo" });
          } else {
            this.$message({
              type: "error",
              message: "密码错误",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //获取购买结果
    getResultData() {
      this.$axios("/buy", {
        params: {
          currency: "人民币",
          purchaseCardNo: this.account,
          purchaseAmount: this.ruleForm.amount,
          fundNum: this.FundData.num,
          userId: this.userData.id,
          transferEquity: this.FundData.latestEquity,
        },
      }).then((resp) => {
        if (resp.data.code == 200) {
          this.purchaseResult = resp.data.data;
          sessionStorage.setItem(
            "purchaseResult",
            JSON.stringify(this.purchaseResult)
          );
          console.log("购买结果：");
          console.log(this.purchaseResult);
        } else {
          this.purchaseResult = {};
        }
      });
    },
    // 获取卡信息
    getCardData() {
      this.$axios("tf/getCardIds", {
        params: { userId: this.userData.id },
      }).then((resp) => {
        if (resp.data.code == 200) {
          this.bankCards = resp.data.data;
        } else {
          this.bankCards = [];
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    let postFundData = sessionStorage.getItem("postFundData");
    let user = sessionStorage.getItem("user");
    this.userData = JSON.parse(user);
    this.FundData = JSON.parse(postFundData);
    if (sessionStorage.getItem("amountData")) {
      this.ruleForm.amount = sessionStorage.getItem("amountData");
    }
    this.getVerify();
    this.getCardData();
  },
};
</script>
<style  scoped>
.title {
  display: flex;
  height: 60px;
  width: 800px;
}
.title span {
  display: inline-block;
  height: 60px;
  width: 250px;
  padding-left: 20px;
  text-align: left;
  line-height: 60px;
  font-size: 18px;
}
.el-divider__text {
  font-size: 16px;
}
.card {
  margin: 40px 20px;
}
.checkList {
  margin-top: 20px;
}
.checkList span {
  color: #0066b3;
  font-weight: bolder;
}
.verifyCode {
  line-height: 60px;
}
#imgVerify {
  height: 30px;
}
</style>