<template>
  <!-- 费率表，作为组件使用 -->
  <div>
    <el-row :gutter="40">
      <el-col :span="12">
        <el-table
          :data="tableData1"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#DBEBF7', color: '#333333' }"
        >
          <el-table-column prop="amount" label="购买金额（M）">
          </el-table-column>
          <el-table-column prop="PurchaseRates" label="认购费率">
          </el-table-column>
          <el-table-column prop="SubscriptionRate" label="申购费率">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="tableData2"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#DBEBF7', color: '#333333' }"
        >
          <el-table-column prop="holdingTime" label="持有时间（T交易日）">
          </el-table-column>
          <el-table-column prop="redemptionRates" label="赎回费率">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "fundCard",
  data() {
    return {
      tableData1: [
        {
          amount: "M＜100.00万元",
          PurchaseRates: "1.20%",
          SubscriptionRate: "1.50%",
        },
        {
          amount: "M＜100.00万元",
          PurchaseRates: "1.20%",
          SubscriptionRate: "1.50%",
        },
        {
          amount: "M＜100.00万元",
          PurchaseRates: "1.20%",
          SubscriptionRate: "1.50%",
        },
      ],
      tableData2: [
        {
          holdingTime: "T＜30天",
          redemptionRates: "0.75%",
        },
        {
          holdingTime: "30天≤T＜185天",
          redemptionRates: "0.50%",
        },
        {
          holdingTime: "185天≤T＜366天",
          redemptionRates: "0.25%",
        },
        {
          holdingTime: "366天≤T＜-天",
          redemptionRates: "0.00%",
        },
      ],
    };
  },
};
</script>

<style>
</style>