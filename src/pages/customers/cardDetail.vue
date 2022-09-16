<template>
  <div class="container">
    <el-container>
      <el-header height="150px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="户名">
            <el-input v-model="formInline.user" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input
              v-model="formInline.user"
              placeholder="8888888888888888"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" icon="el-icon-delete"> 删除 </el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="币种">
            <el-select v-model="formInline.region" placeholder="人民币">
              <el-option label="人民币" value="shanghai"></el-option>
              <el-option label="美元" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="激活日期">
            <el-input v-model="formInline.date" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onChange">切换</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <div>
          <div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="交易时间" width="180">
              </el-table-column>
              <el-table-column prop="type" label="交易类型" width="180">
              </el-table-column>
              <el-table-column prop="TransactionAmount" label="交易金额">
              </el-table-column>
              <el-table-column prop="balance" label="可用余额">
              </el-table-column>
              <el-table-column prop="counterParty" label="对手信息">
              </el-table-column>
            </el-table>
            <el-pagination
              :hide-on-single-page="total < 10"
              :total="100"
              layout="prev, pager, next"
            >
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 100,
      formInline: {
        user: "",
        region: "",
        date: "",
      },
      tableData: [
        {
          date: "2019-05-02",
          type: "王小虎",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
        {
          date: "2019-05-02",
          type: "王小虎",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
        {
          date: "2019-05-02",
          type: "王小虎",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
        {
          date: "2019-05-02",
          type: "王小虎",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
        {
          date: "2019-05-02",
          type: "王小虎",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
</style>