<template>
  <div class="container">
    <el-container>
      <el-header height="150px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-col :span="8">
            <el-form-item label="户名">
              <el-input v-model="formInline.user" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号">
              <el-input
                v-model="formInline.user"
                placeholder="8888888888888888"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="danger" icon="el-icon-delete">
                注销此卡
              </el-button>
            </el-form-item></el-col
          >
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-col :span="8">
            <el-form-item label="币种">
              <el-select v-model="formInline.region" placeholder="人民币">
                <el-option label="人民币" value="shanghai"></el-option>
                <el-option label="美元" value="beijing"></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="激活日期">
              <el-input
                v-model="formInline.date"
                placeholder=""
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-s-operation"
                @click="onChange"
                >切换显示</el-button
              >
            </el-form-item></el-col
          >
        </el-form>
      </el-header>
      <el-main>
        <transition name="el-zoom-in-center">
          <div v-show="FormStyles">
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
        </transition>
        <transition name="el-fade-in-linear">
          <div class="block" v-show="!FormStyles">
            <el-timeline>
              <el-timeline-item
                v-for="(c, index) in tableData"
                :key="index"
                placement="top"
                :timestamp="c.date"
              >
                <el-card>
                  <h2>+{{ c.TransactionAmount }}元</h2>
                  <p>
                    交易类型:{{ c.type }}
                    <span style="width: 30px; display: inline-block"></span>
                    对手信息:{{ c.counterParty }}
                  </p>
                  <h4>余额:{{ c.balance }}</h4>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 100,
      FormStyles: true,
      formInline: {
        user: "",
        region: "",
        date: "",
      },
      tableData: [
        {
          id: "1",
          date: "2019-05-02",
          type: "工资",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
        {
          id: "2",
          date: "2019-05-02",
          type: "工资",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
        {
          id: "3",
          date: "2019-05-02",
          type: "工资",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
        {
          date: "2019-05-02",
          type: "工资",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
        {
          date: "2019-05-02",
          type: "工资",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        },
      ],
    };
  },
  methods: {
    onChange() {
      this.FormStyles = !this.FormStyles;
    },
  },
};
</script>

<style>
</style>