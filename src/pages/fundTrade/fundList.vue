<template>
  <div>
    <el-row type="flex" justify="end" :gutter="3" style="margin: 15px 0px">
      <!--搜索条件-->
      <el-col :span="10">
        <el-input
          v-model="query.name"
          placeholder="基金名称/简拼/关键字/关键字"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-select v-model="fund.type" placeholder="请选择基金类型">
          <el-option label="股票型" value="股票型"></el-option>
          <el-option label="混合型" value="混合型"></el-option>
          <el-option label="债券型" value="债券型"></el-option>
          <el-option label="QDII" value="QDII"></el-option>
          <el-option label="货币型" value="货币型"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" align="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">
          基金搜索
        </el-button>
        <el-button icon="el-icon-refresh-left" @click="resetForm()">
          重置
        </el-button>
      </el-col>
    </el-row>
    <!-- 上面是table的搜索部分-->

    <el-table
      :data="fund"
      border
      size="small"
      :header-cell-style="{ background: '#DBEBF7', color: '#333333' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" fixed />
      <!--根据查询改-->
      <el-table-column label="编号" sortable prop="num" />
      <el-table-column label="基金名称" sortable prop="name" />
      <el-table-column label="最新净值" sortable prop="latestEquity" />
      <el-table-column label="累计净值" sortable prop="cumulativeEquity" />
      <el-table-column label="近一日" sortable prop="oneDay">
        <template scope="scope">
          <span v-if="scope.row.oneDay >= 0" style="color: red">{{
            scope.row.oneDay
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.oneDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近一月" sortable prop="oneMonth">
        <template scope="scope">
          <span v-if="scope.row.oneMonth >= 0" style="color: red">{{
            scope.row.oneMonth
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.oneMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近三月" sortable prop="threeMonth">
        <template scope="scope">
          <span v-if="scope.row.threeMonth >= 0" style="color: red">{{
            scope.row.threeMonth
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.threeMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近一年" sortable prop="oneYear">
        <template scope="scope">
          <span v-if="scope.row.oneYear >= 0" style="color: red">{{
            scope.row.oneYear
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.oneYear }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评级"
        sortable
        prop="galaxyRating"
        min-width="100"
      >
        <template scope="scope">
          <el-rate
            v-model="scope.row.galaxyRating"
            disabled
            text-color="#ff9900"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="140">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            查看
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handlePurchase(scope.row)"
          >
            购买
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[5, 10, 15, 20, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        background
      >
      </el-pagination>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postData: "", //传递数据
      fund: [
        {
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
      ],
      query: {
        currentPage: 1,
        pageSize: 10,
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      array: [],
    };
  },

  methods: {
    //获取列表数据
    getData() {
      this.$axios("/fund/list", {
        params: this.query,
      }).then((resp) => {
        console.log(resp);
        if (resp.data.code == 200) {
          this.pagination.currentPage = resp.data.data.current;
          this.pagination.pageSize = resp.data.data.size;
          this.pagination.total = resp.data.data.total * 101;
          this.fund = resp.data.data.records;
        } else {
          this.pagination = {};
          this.fund = [];
        }
      });
    },
    //搜索
    handleSearch() {
      this.getData();
    },
    //当前页改变
    handleCurrentChange(val) {
      this.query.currentPage = val;
      this.getData();
    },
    //页面大小改变
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.getData();
    },
    //选择多行
    handleSelectionChange(rows) {
      this.array = [];
      for (let i = 0; i < rows.length; i++) {
        this.array.push(rows[i].id);
      }
    },
    //删除
    handleDelete() {
      if (this.array.length <= 0) {
        this.$alert("请选择删除的数据", "提示", {
          confirmButtonText: "确定",
          center: true,
        });
        this.array = []; //数组清空
        return;
      }
      //确认删除
      this.$confirm("此操作将永久删除记录, 是否确定?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          //删除
          this.doDelete();
          this.array = [];
        })
        .catch(() => {
          this.array = [];
        });
    },
    //执行删除
    doDelete() {
      this.$axios
        .delete("/staff/deleteBatch", {
          params: {
            ids: this.array,
          },
          paramsSerializer: (params) => {
            return this.$qs.stringify(params, {
              indices: false,
            });
          },
        })
        .then((resp) => {
          if (resp.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getData();
          }
        });
    },
    //重置
    resetForm() {
      this.query.name = "";
      this.query.pageSize = 10;
      this.query.currentPage = 1;
      this.getData();
    },
    //查看详情
    handleEdit(row) {
      this.postFundData = JSON.stringify(row);
      sessionStorage.setItem("postFundData", this.postFundData);
      // this.$bus.$emit("staffData", this.postData);
      this.$router.push("fundDetail");
    },
    //购买基金
    handlePurchase(row) {
      this.postFundData = JSON.stringify(row);
      sessionStorage.setItem("postFundData", this.postFundData);
      // this.$bus.$emit("staffData", this.postData);
      this.$router.push("fundPurchase");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
/* 重置el表格组件的一些内置样式 */
.el-rate__icon {
  font-size: 10px;
}
.el-table .cell {
  padding-right: 0;
  line-height: 15px;
}
.el-table th.el-table__cell > .cell {
  padding-right: 0;
}
</style>
