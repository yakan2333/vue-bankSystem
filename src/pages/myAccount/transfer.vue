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
              <el-form-item label="收款账号" prop="collectionCardNo">
                <el-input  @blur="onBsp($event)" v-model="ruleForm.collectionCardNo"/>
                <span style="color: #5a5e66">例如：6222020896475210582</span>
              </el-form-item>
            </el-row>
            <el-row v-if="active === 0">
              <el-form-item label="收款户名" prop="collectionUsername">
                <el-input disabled v-model="ruleForm.collectionUsername"/>
              </el-form-item>
            </el-row>
            <el-row v-if="active === 1">
              <el-form-item label="卡号" prop="transferCardNo">
                <el-select
                  v-model="ruleForm.transferCardNo"
                  placeholder="请选择银行卡"
                >
                  <el-option v-for="item in cardIds"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row v-if="active === 1">
              <el-form-item label="转账金额" prop="transferMoney">
                <el-input type="number" v-model="ruleForm.transferMoney"/>
              </el-form-item>
            </el-row>
            <el-row v-if="active === 2">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"/>
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
      cardIds: [],
      user: {},
      active: 0,
      //表单数据
      ruleForm: {
        collectionUsername: "", // 收款户名
        collectionCardNo: "", // 收款账号
        transferBank: "中国建设银行", // 收款银行
        transferCardNo: "", // 转账卡号
        transferMoney: "", // 转账金额
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
        transferMoney: [
          {
            required: true,
            message: "请输入转账金额",
            trigger: "blur",
          },
        ],
        transferCardNo: [
          {
            required: true,
            message: "请选择转账卡号",
            trigger: "blur",
          },
        ],
        transferBank: [
          {
            required: true,
            message: "请选择收款银行",
            trigger: "blur",
          },
        ],
        collectionCardNo: [
          {
            required: true,
            message: "请输入收款账号",
            trigger: "blur",
          },
        ],
        collectionUsername: [
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
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"))
    }
    this.getCardIds()
  },
  methods: {
    onBsp(event) {
      this.$axios("/tf/getName", {
        params: {
          cardNo: event.target.value
        },
      }).then((resp) => {
        if (resp.data.code == 200) {
          let name = resp.data.data.name
          this.ruleForm.collectionUsername = name.replace(/([\u4e00-\u9fa5])[\u4e00-\u9fa5]([\u4e00-\u9fa5]*)/, '$1*$2')
        } else {
          this.$message({
            type: "error",
            message: resp.data.msg,
          });
          this.ruleForm.collectionUsername = ''
        }
      });
    },
    getCardIds() {
      this.$axios("/tf/getCardIds", {
        params: {userId: this.user.id,},
      }).then((resp) => {
        if (resp.data.code == 200) {
          this.cardIds = resp.data.data
        } else {
        }
      });
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active = 3;
          this.$axios("/tf/transfer", {
            params: {
              userId: this.user.id,
              transferCardNo: this.ruleForm.transferCardNo,
              collectionUsername: this.ruleForm.collectionUsername,
              collectionCardNo: this.ruleForm.collectionCardNo,
              transferMoney: this.ruleForm.transferMoney,
              transferBank: this.ruleForm.transferBank,
              password: this.ruleForm.password
            },
          }).then((resp) => {
            if (resp.data.code == 200) {
              this.active = 3
              this.$message({
                type: "success",
                message: "转账成功",
              });
            } else {
              this.active = 4
              this.$message({
                type: "error",
                message: resp.data.msg,
              });
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
      this.$router.push({name: "cardDetail"});
    },
    next() {
      if (this.active < 2) {
        this.active++;
      }
    },
    pre() {
      if (this.active > 3)
        this.active = 3

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

