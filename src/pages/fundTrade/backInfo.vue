<template>
  <div class="container">
    <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-descriptions title="购买信息" :column="2" border>
          <el-descriptions-item label="用户名">{{
            userInfo.name
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            userInfo.phone
          }}</el-descriptions-item>
          <el-descriptions-item label="基金编号">{{
            purchaseResult.fundNum
          }}</el-descriptions-item>
          <el-descriptions-item label="购买金额">
            {{ purchaseResult.purchaseAmount }}元
          </el-descriptions-item>
          <el-descriptions-item label="币种"> 人民币 </el-descriptions-item>
          <el-descriptions-item label="银行卡号">
            {{ purchaseResult.purchaseCardNo }}
          </el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" size="medium" @click="goBack"
          >返回我的基金</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  data() {
    return {
      purchaseResult: "",
      userInfo: "",
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "myFundList" });
    },
  },
  mounted() {
    let p = sessionStorage.getItem("purchaseResult");
    this.purchaseResult = JSON.parse(p);
    let u = sessionStorage.getItem("user");
    this.userInfo = JSON.parse(u);
  },
};
</script>

<style>
.el-result {
  padding: 60px 30px;
}
</style>