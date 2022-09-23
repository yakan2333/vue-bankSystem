<template>
  <div class="container">
    <el-descriptions
      title="机构基本信息"
      direction="vertical"
      :column="3"
      border
    >
      <el-descriptions-item label="机构号">1234567</el-descriptions-item>
      <el-descriptions-item label="机构名称" :span="2"
        >第一千零一个银行</el-descriptions-item
      >
      <el-descriptions-item label="机构类型"
        >A国B省C市DD银行支行</el-descriptions-item
      >
      <el-descriptions-item label="邮编">340000</el-descriptions-item>
      <el-descriptions-item label="联系地址" :span="2"
        >江西省南昌市红谷滩新区沙井街道696号南昌航空大学</el-descriptions-item
      >
      <el-descriptions-item label="联系电话">18100000000</el-descriptions-item>
      <el-descriptions-item label="机构营业日">周一至周五</el-descriptions-item>
      <el-descriptions-item label="营业时间">9:00-16:00</el-descriptions-item>
      <el-descriptions-item label="更新日志" :span="3">
        <p>2022/9/16 16:27 管理员A修改了机构配置信息</p>
        <p>2022/9/16 16:27 管理员A修改了机构配置信息</p>
        <p>2022/9/16 16:27 管理员A修改了机构配置信息</p>
      </el-descriptions-item>
    </el-descriptions>
    <div class="buttonConfig">
      <el-button type="primary" icon="el-icon-edit">编辑</el-button>
      <el-button type="success" icon="el-icon-check">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.el-descriptions {
  padding: 20px;
}
.buttonConfig {
  padding: 0 20px 0 20px;
}
</style>