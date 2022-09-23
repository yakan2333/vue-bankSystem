<template>
  <div style="padding: 40px">
    <div class="title">
      <img src="./images/ico.jpg" />
      <span>产品名称</span>
      <span>{{ ruleForm.name }}</span>
    </div>
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
            <el-form-item label="员工编号" prop="id">
              <el-input v-model="ruleForm.num" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="员工名称" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            确定
          </el-button>
          <el-button @click="resetForm('ruleForm')"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import vDistpicker from "v-distpicker";
import { judgeEensit } from "@/utils/judge-Eensit";
export default {
  components: {
    vDistpicker,
  },
  name: "fundPurchase",
  data() {
    return {
      titleMsg: "",
      //表单数据
      ruleForm: {
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
      },
    };
  },
  computed: {},
  methods: {
    /*标题敏感词判断*/

    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/staff/save", this.$qs.stringify(this.ruleForm))
            .then((resp) => {
              if (resp.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "添加成功!",
                });
                this.$router.push("staffList");
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    // var postData = sessionStorage.getItem("postFundData");
    // this.ruleForm = postData;
  },
};
</script>
<style  scoped>
.title {
  height: 60px;
  width: 800px;
}
.title span {
  display: inline-block;
  height: 60px;
  width: 300px;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
}
.card {
  margin: 20px;
}
</style>