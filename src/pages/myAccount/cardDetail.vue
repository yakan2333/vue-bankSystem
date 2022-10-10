<template>
  <div class="container">
    <el-container>
      <el-header height="150px">
        <el-form :inline="true" class="demo-form-inline">
          <el-col :span="8">
            <el-form-item label="户名">
              <el-input
                v-model="cardInfo.name"
                placeholder="姓名"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号">
              <el-input
                readonly
                v-model="cardInfo.id"
                placeholder="8888888888888888"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete"
              >
                注销此卡
              </el-button>
            </el-form-item></el-col
          >
        </el-form>
        <el-form :inline="true" class="demo-form-inline">
          <el-col :span="8">
            <el-form-item label="币种">
              <el-select v-model="cardInfo.type" placeholder="人民币">
                <el-option label="人民币" value="shanghai"></el-option>
                <el-option label="美元" value="beijing"></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="激活日期">
              <el-input
                readonly
                v-model="cardInfo.date"
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
              <el-table-column prop="date" label="交易时间" width="280">
              </el-table-column>
              <el-table-column prop="type" label="交易类型" width="180">
              </el-table-column>
              <el-table-column prop="TransactionAmount" label="交易金额">
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
                  <h2>{{ c.TransactionAmount }}元</h2>
                  <p>
                    交易类型:{{ c.type }}
                    <span style="width: 30px; display: inline-block"></span>
                    对手信息:{{ c.counterParty }}
                  </p>
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
import { log } from "console";
export default {
  data() {
    return {
      total: 100,
      FormStyles: true,
      originalCardNo: '',
      cardInfo: {
        id: "",
        name: "",
        type: "人民币",
        date: "2019-08-01",
      },
      tableData: [
        {
          id: "1",
          date: "2019-05-02",
          type: "工资",
          TransactionAmount: "6666.00",
          balance: "9999.00",
          counterParty: "秋名山老司机",
        }
      ],
      cardData: [],
      customerData: [],
    };
  },
  methods: {
    getDate() {
      this.$axios("/tf/listHistory", {
        params: { transferCardNo: this.originalCardNo },
      }).then((resp) => {
        if (resp.data.code == 200) {
          this.tableData = []
          for (let v of  resp.data.data) {
            let item = {}
            item.id = v.id
            item.date = v.transferTime
            item.type = "工资"

            if (this.originalCardNo === v.transferCardNo) {
              item.TransactionAmount = '-' + v.transferMoney
            } else if (this.originalCardNo === v.collectionCardNo) {
              item.TransactionAmount = '+' + v.transferMoney
            }

            item.counterParty = v.collectionUsername
            this.tableData.push(item)
          }
        } else {
        }
      });
    },
    onChange() {
      this.FormStyles = !this.FormStyles;
    },
    handleDelete() {
      //确认删除
      this.$confirm("此操作将永久注销此卡, 是否确定?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          //删除
          console.log("执行删除操作中...");
          this.$router.push("customerEdit");
        })
        .catch(() => {
          this.array = [];
        });
    },
  },
  mounted() {
    let cardData = sessionStorage.getItem("cardData");
    this.cardData = JSON.parse(cardData);
    console.log(this.cardData);
    let userInfo = sessionStorage.getItem("user");
    this.customerData = JSON.parse(userInfo);
    // console.log(this.customerData);
    this.originalCardNo = this.cardData.originalCardNo
    this.cardInfo.id = this.cardData.cardNo;
    this.cardInfo.name = this.customerData.name;
    this.getDate();
  },
};
</script>

<style>
</style>
