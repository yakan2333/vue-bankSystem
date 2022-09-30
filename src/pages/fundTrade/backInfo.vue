<template>
  <div class="container">
    <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="goBack"
          >返回我的基金</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push({ name: "myFundList" });
    },
  },
};
</script>

<style>
.el-result {
  padding: 200px 30px;
}
</style>