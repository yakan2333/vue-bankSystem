<!-- 转账界面 -->

<template>
  <div class="container">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" description="填写收款人信息"></el-step>
      <el-step title="步骤 2" description="填写转账卡号和转账金额"></el-step>
      <el-step title="步骤 3" description="输入密码"></el-step>
    </el-steps>

    <el-container style="margin: 30px auto">
      <el-aside width="40%" style="margin: 0 auto">
        <div class="card">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
            style="text-align: left"
          >
            <el-row v-if="active === 0">
              <el-form-item label="收款户名" prop="payeeAccount">
                <el-input v-model="ruleForm.payeeAccount" />
              </el-form-item>
            </el-row>
            <el-row v-if="active === 0">
              <el-form-item label="收款账号" prop="accountNumber">
                <el-input v-model="ruleForm.accountNumber" />
              </el-form-item>
            </el-row>
            <el-row v-if="active === 0">
              <el-form-item label="收款银行" prop="bank">
                <el-select v-model="ruleForm.bank" placeholder="请选择银行">
                  <el-option label="中国建设银行" value="中国建设银行" />
                  <el-option label="中国工商银行" value="中国工商银行" />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row v-if="active === 1">
              <el-form-item label="卡号" prop="bankCard">
                <el-select
                  v-model="ruleForm.bankCard"
                  placeholder="请选择银行卡"
                >
                  <el-option
                    label="6222025814936045931"
                    value="6222025814936045931"
                  />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row v-if="active === 1">
              <el-form-item label="转账金额" prop="transferAmount">
                <el-input type="number" v-model="ruleForm.transferAmount" />
              </el-form-item>
            </el-row>
            <el-row v-if="active === 2">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" />
              </el-form-item>
            </el-row>
            <el-form-item v-if="active === 2">
              <el-button type="primary" @click="submitForm('ruleForm')">
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
    </el-container>

    <el-row :gutter="24" style="text-align: center">
      <el-col v-if="active === 3">
        <el-result
          icon="success"
          title="转账成功"
          subTitle="您已完成当前转账操作"
        ></el-result>
      </el-col>
      <el-col v-if="active === 4">
        <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
          <template slot="extra">
            <el-button type="primary" size="medium">返回</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="text-align: center">
      <el-button @click="pre">上一步</el-button>
      <el-button @click="next">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "transferList",
  data() {
    return {
      active: 0,
      //表单数据
      ruleForm: {
        payeeAccount: "李知林", // 收款户名
        accountNumber: "6222025814936045931", // 收款账号
        bank: "", // 收款银行
        bankCard: "6222025814936045932", // 转账卡号
        transferAmount: "", // 转账金额
        password: "", // 密码
      },
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        transferAmount: [
          {
            required: true,
            message: "请输入转账金额",
            trigger: "blur",
          },
        ],
        bankCard: [
          {
            required: true,
            message: "请选择转账卡号",
            trigger: "blur",
          },
        ],
        bank: [
          {
            required: true,
            message: "请选择收款银行",
            trigger: "blur",
          },
        ],
        accountNumber: [
          {
            required: true,
            message: "请输入收款账号",
            trigger: "blur",
          },
        ],
        payeeAccount: [
          {
            required: true,
            message: "请输入收款户名",
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
      },
    };
  },

  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active = 3;
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
    next() {
      if (this.active < 2) {
        this.active++;
      }
    },
    pre() {
      if (this.active > 0) {
        this.active--;
      }
    },
  },
};
</script>

<style scoped>
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

