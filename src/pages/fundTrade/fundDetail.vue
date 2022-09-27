<template>
  <div class="container">
    <h1 class="title">{{ fundDetail.name }}</h1>
    <!-- gutter为栅栏间隔 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <el-descriptions :column="3" size="mini" border>
          <template slot="title"
            ><el-tag>{{ fundDetail.type }}</el-tag></template
          >
          <template slot="extra">
            {{ fundDetail.num }} ，{{ fundDetail.name }}管理有限公司
          </template>
          <el-descriptions-item label="单位净值">{{
            fundDetail.cumulativeEquity
          }}</el-descriptions-item>
          <el-descriptions-item label="币种">{{
            fundDetail.currency
          }}</el-descriptions-item>
          <el-descriptions-item label="成立日期">{{
            getDate(fundDetail.time)
          }}</el-descriptions-item>
          <el-descriptions-item label="日增长率">{{
            fundDetail.oneDay
          }}</el-descriptions-item>
          <el-descriptions-item label="近三月">{{
            fundDetail.threeMonth
          }}</el-descriptions-item>
          <el-descriptions-item label="近一年">{{
            fundDetail.oneYear
          }}</el-descriptions-item>
          <el-descriptions-item label="基金类型">{{
            fundDetail.type
          }}</el-descriptions-item>
          <el-descriptions-item label="风险等级">{{
            fundDetail.riskLevel
          }}</el-descriptions-item>
          <el-descriptions-item label="当前状态">
            {{ fundDetail.state }}
          </el-descriptions-item>
        </el-descriptions>
        <el-row>
          <i class="el-icon-plus">关注</i>
          <span>|</span>
          <i class="el-icon-share">分享</i>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-input placeholder="10" v-model="num">
              <span
                slot="suffix"
                style="line-height: 40px; color: black; margin-right: 10px"
                >元
              </span>
              <el-button
                style="margin-right: -5px"
                slot="suffix"
                type="primary"
                @click="handToBuy"
                >购买</el-button
              >
            </el-input>
          </el-col>
          <div style="float: right">
            <el-button type="primary" plain @click="handToBuy"
              ><i class="el-icon-coin"></i>定投</el-button
            >
          </div>
        </el-row>
        <el-row>
          <p style="font-size: 14px; padding: 3px 0 0 0; color: #666666">
            申购10元起，定投10元起。费率1.50%，手续费从购买金额中扣除。
          </p>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div class="chart1" ref="chart"></div>
      </el-col>
    </el-row>
    <fundCard></fundCard>
  </div>
</template>

<script>
//引入 echarts组件
import echarts from "echarts";
import fundCard from "./fundCard.vue";
export default {
  components: {
    fundCard,
  },
  data() {
    return {
      // 客户买入数量
      num: 10,
      // 基金信息
      fundDetail: {
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
      data1: [
        ["2000-06-05", 116],
        ["2000-06-06", 129],
        ["2000-06-07", 135],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 130],
        ["2000-06-15", 245],
        ["2000-06-16", 139],
        ["2000-06-17", 115],
        ["2000-06-18", 111],
        ["2000-06-19", 309],
        ["2000-06-20", 206],
        ["2000-06-21", 137],
        ["2000-06-22", 128],
        ["2000-06-23", 85],
        ["2000-06-24", 94],
        ["2000-06-25", 71],
        ["2000-06-26", 106],
        ["2000-06-27", 84],
        ["2000-06-28", 93],
        ["2000-06-29", 85],
        ["2000-06-30", 73],
        ["2000-07-01", 83],
        ["2000-07-02", 125],
        ["2000-07-03", 107],
        ["2000-07-04", 82],
        ["2000-07-05", 44],
        ["2000-07-06", 72],
        ["2000-07-07", 106],
        ["2000-07-08", 107],
        ["2000-07-09", 66],
        ["2000-07-10", 91],
        ["2000-07-11", 92],
        ["2000-07-12", 113],
        ["2000-07-13", 107],
        ["2000-07-14", 131],
        ["2000-07-15", 111],
        ["2000-07-16", 64],
        ["2000-07-17", 69],
        ["2000-07-18", 88],
        ["2000-07-19", 77],
      ],
    };
  },
  methods: {
    // 计数器组件变化捕获
    handleChange(value) {
      console.log(value);
    },
    // 日期格式转换方法
    getDate(time) {
      var today = new Date(time);
      //日期
      var DD = String(today.getDate()).padStart(2, "0"); // 获取日
      var MM = String(today.getMonth() + 1).padStart(2, "0"); //获取月份，1 月为 0
      var yyyy = today.getFullYear(); // 获取年
      // 时间
      var hh = String(today.getHours()).padStart(2, "0"); //获取当前小时数(0-23)
      var mm = String(today.getMinutes()).padStart(2, "0"); //获取当前分钟数(0-59)
      var ss = String(today.getSeconds()).padStart(2, "0"); //获取当前秒数(0-59)
      // today = yyyy + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
      today = yyyy + "-" + MM + "-" + DD;
      return today;
    },
    // 图标绘制
    drawChart1() {
      //2.初始化
      this.chart = echarts.init(this.$refs.chart);
      //3.配置数据
      const dateList = this.data1.map(function (item) {
        return item[0];
      });
      const valueList = this.data1.map(function (item) {
        return item[1];
      });
      let option = {
        // Make gradient line here
        visualMap: {
          show: false,
          type: "continuous",
          seriesIndex: 0,
          min: 0,
          max: 400,
        },
        title: {
          left: "center",
          text: "近三月数据走向",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: dateList,
        },
        yAxis: {},
        grid: {},
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList,
          },
        ],
      };
      // 4.传入数据
      this.chart.setOption(option);
    },
    // 跳转到购买页面
    handToBuy() {
      sessionStorage.setItem("postFundData", this.fundDetail);
      this.$router.push("fundPurchase");
    },
  },
  mounted() {
    let fundData = sessionStorage.getItem("postFundData");
    this.fundDetail = JSON.parse(fundData);
    console.log(this.fundDetail);
    this.drawChart1();
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
}
.title {
  padding-bottom: 20px;
}
.el-icon-share,
.el-icon-plus {
  color: #0066b3;
  margin: 20px 10px;
  font-size: 14px;
}
.buttonConfig {
  padding: 0 20px 0 20px;
}

.chart1 {
  height: 300px;
  width: 100%;
}
</style>