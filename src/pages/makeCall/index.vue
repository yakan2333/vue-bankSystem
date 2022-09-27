<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <github-corner class="github-corner" />

      <el-row
        style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
      >
        <line-chart :chart-data="lineChartData" />
      </el-row>

      <el-row>
        <el-col :span="4">
          <el-button type="success" @click="getNumberClick" plain>点击叫号</el-button>
        </el-col>

        <el-col :span="4">
          <span style="color: #97a8be;">当前号码：</span>
          <el-tag style="size: 16px;" type="info">{{currentNo}}号</el-tag>
        </el-col>

        <el-col :span="4">
          <span style="color: #97a8be;">排队总人数：</span>
          <el-tag style="size: 16px;" type="info">110人</el-tag>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LineChart from "@/pages/makeCall/LineChart";

const lineChartData = {
  newVisitis: {
    /*expectedData: [100, 120, 161, 134, 105, 160, 165],*/
    actualData: [120, 82, 91, 154, 162, 140, 145],
  }
};

export default {
  name: "makeCall",
  components: {
    LineChart,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      currentNo: 0,
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    getNumberClick() {
      /**
       * 取号按钮 点击事件
       */

      this.$message({
        message: '你已经成功取号，当前号码为：8号',
        type: 'success',
        offset: 400
      });

      this.currentNo = 8
    }
  },

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
