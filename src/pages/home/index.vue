<template>
  <div style="padding: 20px">
    <el-container>
      <el-header>
        <h1 style="font-size: 20px">基本数据</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="6">
            <div class="chart_example1">
              <h1>物流供应商数量</h1>
              <h1 class="content">
                <i class="el-icon-office-building">{{
                  this.headData.supplierNum
                }}</i>
              </h1>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="chart_example1">
              <h1>合作客户数量</h1>
              <h1 class="content">
                <i class="el-icon-s-custom">{{ this.headData.customerNum }}</i>
              </h1>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="chart_example1">
              <h1>订单总数</h1>
              <h1 class="content">
                <i class="el-icon-s-order">{{ this.headData.orderNum }}</i>
              </h1>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="chart_example1">
              <h1>书籍种类</h1>
              <h1 class="content">
                <i class="el-icon-s-help">{{ this.headData.allKindNum }}</i>
              </h1>
            </div>
          </el-col>
        </el-row>

        <div style="text-align: center"></div>
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
          <el-col :span="24">
            <div id="chart4" class="chart_example" style="height: 600px" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div id="chart3" class="chart_example" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
//引入 echarts组件
import echarts from "echarts";
export default {
  data() {
    return {
      headData: "", //头部数据
      bookList: "", //书籍图表信息，
      bookName: [], //书籍名字信息 柱状图
      bookCount: [], //书籍数量 柱状图
      order1: "",
      order2: "",
      monthName: [], //横轴月份数据
      monthTotal: [], //纵轴月交易金额
      monthCount: [], //纵轴月交易数量
      book: [], //书籍库存量
    };
  },
  methods: {
    /**
     * 逻辑是依次调用从后台读取数据的方法
     */
    loadCharts() {
      this.getHeadData();
      this.getBookList();
      this.getOrder();
      this.getLostBook();
    },
    /**
     * 每次切换仓库 对数组进行清空 不然会出现累计
     */
    changeCharts() {
      this.goodName = [];
      this.goodValue = [];
      this.inputCountMonthName = [];
      this.inputCountMonthValue = [];
      this.OutputCountMonthName = [];
      this.OutputCountMonthValue = [];
      this.inputCountYearName = [];
      this.inputCountYearValue = [];
      this.outputCountYearName = [];
      this.outputCountYearValue = [];
      this.loadCharts();
    },

    //头部数据
    getHeadData() {
      this.$axios("/census/headData").then((resp) => {
        if (resp.data.code == 0) {
          console.log(resp.data);
          this.headData = resp.data.data;
        } else {
          // this.warehouses = [];
          console.log(444);
          // this.lo
        }
      });
    },
    getLostBook() {
      this.$axios("/census/getLostBook").then((resp) => {
        if (resp.data.code == 0) {
          this.book = resp.data.data;
          this.getecharts4();
        } else {
        }
      });
    },
    getBookList() {
      this.$axios("/census/booklist").then((resp) => {
        if (resp.data.code == 0) {
          console.log(resp.data);
          this.bookList = resp.data.data;
          for (let i = 0; i < this.bookList.length; i++) {
            this.bookName.push(this.bookList[i].name);
          }
          for (var i = 0; i < this.bookList.length; i++) {
            this.bookCount.push(this.bookList[i].value);
          }

          this.getecharts1();
          this.getecharts2();
        } else {
          console.log(444);
        }
      });
    },

    getOrder() {
      this.$axios("/census/yearMount").then((resp) => {
        if (resp.data.code == 0) {
          // console.log(resp.data)
          this.order1 = resp.data.data;
          for (let i = 0; i < this.order1.length; i++) {
            this.monthName.push(this.order1[i].name);
          }
          for (var i = 0; i < this.order1.length; i++) {
            this.monthCount.push(this.order1[i].value);
          }
          this.$axios("/census/yearTotal").then((resp) => {
            if (resp.data.code == 0) {
              this.order2 = resp.data.data;
              for (var i = 0; i < this.order2.length; i++) {
                this.monthTotal.push(this.order2[i].value);
              }
              this.getecharts3();
            } else {
              console.log("失败");
            }
          });
        } else {
        }
      });
    },
    //书籍饼状图和柱状图数据
    /**
     *获取柱状图 饼状图所需货物对象数组
     */
    getGoodsCount() {
      this.$axios("/statistics/goodsCount", {
        params: this.query,
      }).then((resp) => {
        if (resp.data.code == 0) {
          this.goodsCount = resp.data.data;
          /**
           * 把对象数组按属性分开
           */
          for (var i = 0; i < this.goodsCount.length; i++) {
            this.goodName.push(this.goodsCount[i].name);
          }
          for (var i = 0; i < this.goodsCount.length; i++) {
            this.goodValue.push(this.goodsCount[i].value);
          }
          this.getecharts1();
          this.getecharts2();
        } else {
          this.goodsCount = [];
        }
      });
    },

    /**
     * 书籍+数量
     * 按商品类型进行柱状图的渲染
     */
    getecharts1() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("chart1"));
      let option = {
        title: {
          subtext: "书籍卖出数据",
          left: "center",
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
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
      console.log(this.bookName);
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },

            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        //数据集形式
        xAxis: {
          type: "category",
          data: this.bookName,
          axisLabel: { interval: 0, rotate: 40 },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            // max:'dataMax',
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

    /**
     * 双点折线图 近一年销售记录的金额和数量 分月显示
     */
    getecharts3() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("chart3"));
      let option = {
        title: {
          subtext: "近一年销售金额和数量",
          left: "center",
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
          data: ["Evaporation", "Precipitation", "Temperature"],
        },
        xAxis: [
          {
            type: "category",
            data: this.monthName,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "金额",
            axisLabel: {
              formatter: "{value} ￥",
            },
          },
          {
            type: "value",
            name: "数量",
            min: 0,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + "￥";
              },
            },
            data: this.monthTotal,
          },
          {
            name: "数量",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + "";
              },
            },
            data: this.monthCount,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getecharts4() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("chart4"));
      let option = {
        title: {
          subtext: "库存书籍",
          left: "center",
        },
        legend: {
          top: "bottom",
          formatter: function (name) {
            return name.length > 6 ? name.slice(0, 8) + "..." : name;
          },
        },
        tooltip: {
          trigger: "item",
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: this.book,
            label: false,
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
  },
};
</script>


<style scoped>
.content {
  align-self: center;
  font-size: 60px;
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
  height: 200px;
  margin: 0 auto;
}
</style>
