<template>
  <div style="padding: 20px" v-loading="loading">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="chart_example1">
              <h1>售出书籍总数</h1>
              <h1 class="content">
                <i class="el-icon-s-management">{{ bookTotal }}</i>
              </h1>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="chart_example1">
              <h1>售出书籍种数</h1>
              <h1 class="content">
                <i class="el-icon-s-ticket">{{ this.headData.allKindNum }}</i>
              </h1>
            </div>
          </el-col>
        </el-row>

        <div style="text-align: center">
          <el-row>
            <el-col>
              请选择时间：
              <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="timeChange"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-col>
          </el-row>
        </div>
        <br />
        <el-row>
          <el-col :span="12">
            <div id="chart1" class="chart_example" />
          </el-col>
          <el-col :span="12">
            <div id="chart2" class="chart_example" />
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div id="chart3" class="chart_example" />
          </el-col>
          <el-col :span="12">
            <div id="chart4" class="chart_example" />
          </el-col>
        </el-row>

        <div style="text-align: center">
          <el-row>
            <el-col>
              请选择年份：
              <el-select v-model="year" @change="changeYear">
                <el-option
                  v-for="(year, index) in years"
                  :key="index"
                  :label="year.year"
                  :value="year.value"
                />
              </el-select>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24">
            <div id="chart5" class="chart_example" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      bookTotal: 0,
      years: [
        {
          year: "2021",
          value: "2021",
        },
        {
          year: "2022",
          value: "2022",
        },
      ],
      year: "2022",
      time: "",
      // loading: false,//加载动画
      headData: "", //头部数据
      // warehouses: [],//动态仓库
      query: {
        startTime: null, //开始时间
        endTime: null, //结束时间
      },
      bookList: "", //书籍图表信息，
      bookName: [], //书籍名字信息 柱状图
      bookCount: [], //书籍数量 柱状图
      orderData: [], //各种出入账按类型划分数量
      orderByTime: [], //这个是在某一年的按月份输出卖出书金额加上卖出书的数量
    };
  },
  methods: {
    changeYear() {
      console.log(this.year);
      this.bookList = "";
      this.bookCount = [];
      this.bookName = [];
      this.orderByTime = [];
      this.loadCharts();
    },
    timeChange() {
      //从选择器中获取开始时间和结束时间
      console.log(this.time[0]);
      console.log(this.time[1]);
      this.query.startTime = this.time[0];
      this.query.endTime = this.time[1];
      this.changeCharts();
    },
    /**
     * 加载图表方法
     */
    loadCharts() {
      this.getHeadData();
      this.getBookList();
      this.getOrderType();
      this.getOrderByTime();
    },
    /**
     * 改变仓库 加载新图表
     */
    changeCharts() {
      this.bookList = "";
      this.bookCount = [];
      this.bookName = [];
      this.loadCharts();
    },

    //获取出入账类型+数量
    getOrderType() {
      this.$axios("/census/orderBytime", {
        params: this.query,
      }).then((resp) => {
        if (resp.data.code == 0) {
          console.log("下方双饼图");
          console.log(resp.data);
          this.orderData = resp.data.data;

          this.getecharts3();
          this.getecharts4();
        } else {
        }
      });
    },

    getBookList() {
      this.$axios("/census/booklistBytime", {
        params: this.query,
      }).then((resp) => {
        if (resp.data.code == 0) {
          console.log(resp.data);
          this.bookList = resp.data.data;
          for (let i = 0; i < this.bookList.length; i++) {
            this.bookName.push(this.bookList[i].name);
          }
          this.bookTotal = 0;
          for (var i = 0; i < this.bookList.length; i++) {
            this.bookCount.push(this.bookList[i].value);
            this.bookTotal = this.bookTotal + this.bookList[i].value;
          }

          this.getecharts1();
          this.getecharts2();
        } else {
          // console.log(444)
        }
      });
    },

    //头部数据
    getHeadData() {
      this.$axios("/census/headData").then((resp) => {
        if (resp.data.code == 0) {
          console.log(resp.data);
          this.headData = resp.data.data;
        } else {
        }
      });
    },

    //按月份显示数据
    getOrderByTime() {
      console.log(this.year);
      this.$axios("/census/getOrderByTime", {
        params: {
          year: this.year,
        },
      }).then((resp) => {
        if (resp.data.code == 0) {
          console.log(resp.data);
          this.orderByTime = resp.data.data;
          this.getecharts5();
        } else {
        }
      });
    },

    /**
     * 柱状图
     */
    getecharts1() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("chart1"));
      let option = {
        title: {
          subtext: "书籍卖出数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          formatter: function (name) {
            return name.length > 6 ? name.slice(0, 8) + "..." : name;
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "15",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.bookList,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    /**
     * 按商品类型进行饼状图的渲染
     */
    getecharts2() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("chart2"));
      let option = {
        title: {
          subtext: "书籍卖出数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        //数据集形式
        xAxis: {
          type: "category",
          data: this.bookName,
          axisLabel: { interval: 0, rotate: 40 },
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.bookCount,
            // data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    //出入账对比饼图
    getecharts3() {
      let chartdata = [];
      let value = 0;
      this.orderData.forEach((item) => {
        console.log(item.name);
        if (item.name == "入账") {
          chartdata.push(item);
          // console.log("gg")
        } else {
          value += item.value;
        }
      });
      chartdata.push({
        name: "出账",
        value: value,
      });

      let this_ = this;
      let myChart = echarts.init(document.getElementById("chart3"));
      let option = {
        title: {
          subtext: "出入账数量",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        //数据集形式
        series: [
          {
            type: "pie",
            data: chartdata,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    getecharts4() {
      let chartdata = [];
      this.orderData.forEach((item) => {
        if (item.name == "入账") {
        } else {
          chartdata.push(item);
        }
      });
      console.log(chartdata);
      let this_ = this;
      let myChart = echarts.init(document.getElementById("chart4"));
      let option = {
        title: {
          subtext: "出账几种类型的数量",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        //数据集形式
        series: [
          {
            type: "pie",
            data: chartdata,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    //入账量 出账量 销售金额
    getecharts5() {
      let month = [];
      let total = [];
      let amount = [];
      this.orderByTime.forEach((item) => {
        month.push(item.month);
        total.push(item.total);
        amount.push(item.amount);
      });
      let this_ = this;
      let myChart = echarts.init(document.getElementById("chart5"));
      let option = {
        title: {
          subtext: "出入账统计",
          left: "left",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["入账量", "销售金额"],
        },
        xAxis: [
          {
            type: "category",
            //一年中含有的月份
            data: month,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",

            axisLabel: {
              formatter: "{value} ",
            },
          },
          {
            type: "value",
            name: "销售金额",

            axisLabel: {
              formatter: "{value} ￥",
            },
          },
        ],
        series: [
          {
            name: "入账量",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + "";
              },
            },
            data: amount,
          },

          {
            name: "销售金额",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + "￥";
              },
            },
            data: total,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
  mounted() {
    this.loadCharts();
    this.getecharts5();
  },
};
</script>


<style scoped>
.content {
  align-self: center;
  font-size: 50px;
  font-family: "times new roman";
}

.chart_example {
  text-align: center;
  width: 100%;
  height: 400px;
  margin: 0 auto;
}

.chart_example1 {
  text-align: center;
  width: 100%;
  height: 150px;
  margin: 0 auto;
}
</style>
