<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <panel-group @handleSetLineChartData="handleSetLineChartData" />

      <el-row
        style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
      >
        <line-chart :chart-data="lineChartData" />
      </el-row>
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <radar-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PanelGroup from "../dashboard/PanelGroup.vue";
import LineChart from "../dashboard/LineChart";
import RadarChart from "@/components/Echarts/RadarChart";
import PieChart from "@/components/Echarts/PieChart";
import BarChart from "@/components/Echarts/BarChart";

const lineChartData = {
  newVisitis: {
    expectedData: [20, 21, 27, 25, 24, 25, 27],
    actualData: [25, 24, 27, 21, 25, 27, 26],
  },
  messages: {
    expectedData: [1200, 1092, 1120, 1144, 1260, 1030, 940],
    actualData: [1180, 1060, 1151, 1006, 1145, 1150, 1030],
  },
  purchases: {
    expectedData: [380, 400, 421, 404, 405, 490, 400],
    actualData: [420, 390, 500, 438, 442, 430, 430],
  },
  shoppings: {
    expectedData: [30, 40, 41, 42, 45, 50, 60],
    actualData: [30, 62, 71, 54, 62, 40, 30],
  },
};

export default {
  name: "Dashboard",
  components: {
    PanelGroup,
    LineChart,
    RadarChart,
    PieChart,
    BarChart,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
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
