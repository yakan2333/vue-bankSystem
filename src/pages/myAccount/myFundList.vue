<template>
  <!-- 我的基金列表 -->
  <div>
    <el-row type="flex" justify="end" :gutter="3" style="margin: 15px 0px">
      <!--搜索条件-->
      
    </el-row>
    <!-- 上面是table的搜索部分-->

    <el-table :data="fund" border size="small" :header-cell-style="{ background: '#DBEBF7', color: '#333333' }"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" fixed />
      <!--根据查询改-->
      <el-table-column label="编号" sortable prop="num" min-width="40" />
      <el-table-column label="基金名称" sortable prop="name" min-width="200" />
      <el-table-column label="金额" sortable prop="buyHold" />
      <el-table-column label="昨日收益" sortable prop="yesterdayEarn">
        <template scope="scope">
          <span v-if="scope.row.yesterdayEarn >= 0" style="color: red">{{
            scope.row.yesterdayEarn
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.yesterdayEarn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="持有收益" sortable prop="holdIncome">
        <template scope="scope">
          <span v-if="scope.row.holdIncome >= 0" style="color: red">{{
            scope.row.holdIncome
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.holdIncome }}</span>
        </template>
      </el-table-column>
      <el-table-column label="持有收益率" sortable prop="convenienceValueRation">
        <template scope="scope">
          <span v-if="scope.row.convenienceValueRation >= 0" style="color: red">{{
            scope.row.convenienceValueRation
          }}</span>
          <span v-else style="color: #37b328">{{ scope.row.convenienceValueRation }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="60">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 20, 50, 100]" :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" background>
      </el-pagination>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        postData: "", //传递数据
        fund: [{
          id: 1,
          num: 3486,
          name: '交银施罗德医药创新股票C',
          buyHold: 189.53,
          yesterdayEarn: 2.71,
          holdIncome: -16.47,
          convenienceValueRation: -7.99,
        }, ],
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
  };
</script>

<style>
</style>
