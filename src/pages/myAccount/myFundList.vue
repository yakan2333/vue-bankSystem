<template>
  <!-- 我的基金列表 -->
  <div>
    <el-row type="flex" justify="end" :gutter="3" style="margin: 15px 0px">
      <!--搜索条件-->
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
      <el-table-column label="编号" sortable prop="fundNum" />
      <el-table-column label="基金名称" sortable prop="name" />
      <el-table-column label="金额" sortable prop="holdingMoney" />
      <el-table-column label="昨日收益" sortable prop="lastDayProfit">
        <template scope="scope">
          <span v-if="scope.row.lastDayProfit >= 0" style="color: red">{{
            scope.row.lastDayProfit
          }}</span>
          <span v-else style="color: #37b328">{{
            scope.row.lastDayProfit
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="持有收益" sortable prop="allProfit">
        <template scope="scope">
          <span v-if="scope.row.allProfit >= 0" style="color: red">{{
            scope.row.allProfit
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.allProfit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="持有收益率" sortable prop="profitRate">
        <template scope="scope">
          <span v-if="scope.row.profitRate >= 0" style="color: red">{{
            scope.row.profitRate
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.profitRate }}</span>
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
            卖出
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
          id: 1,
          fundNum: 3486,
          name: "万家引擎",
          holdingMoney: 189.53,
          lastDayProfit: 2.71,
          allProfit: -16.47,
          profitRate: -7.99,
        },
      ],
      query: {
        userId: 2,
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
      this.$axios("/my_funds", {
        params: this.query,
      }).then((resp) => {
        if (resp.data.code == 200) {
          this.pagination.currentPage = resp.data.data.current;
          this.pagination.pageSize = resp.data.data.size;
          this.pagination.total = resp.data.data.total;
          this.fund = resp.data.data;
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
      this.query.type = "";
      this.query.pageSize = 10;
      this.query.currentPage = 1;
      this.getData();
    },
    //查看详情
    handleEdit(row) {
      this.postFundData = JSON.stringify(row);
      sessionStorage.setItem("postFundData", this.postFundData);
      // this.$bus.$emit("staffData", this.postData);
      this.$router.push("myFundDetail");
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
    if (localStorage.getItem("user")) {
      let p = JSON.parse(localStorage.getItem("user"));
      this.query.userId = p.id;
      // this.loginForm.password = p.password;
    }
    this.getData();
  },
};
</script>

<style>
</style>
