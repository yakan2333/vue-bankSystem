<template>
  <div>
    <el-row type="flex" justify="end" :gutter="3" style="margin: 15px 0px">
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">
          添加
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" icon="el-icon-delete" @click="handleDelete()">
          删除
        </el-button>
      </el-col>

      <!--搜索条件-->
      <el-col :span="10">
        <el-input v-model="query.name" placeholder="请输入员工姓名">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-col>

      <el-col :span="6" align="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh-left" @click="resetForm()">
          重置
        </el-button>
      </el-col>
    </el-row>
    <!-- 上面是table的搜索部分-->

    <el-table
      v-loading="loading"
      :data="customers"
      style="width: 100%"
      size="small"
      stripe
      border
      :header-cell-style="{ background: '#409EFF', color: '#FFFFFF' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" fixed />
      <!--根据查询改-->
      <el-table-column
        label="身份证号"
        sortable
        prop="idCard"
        min-width="100%"
      />
      <el-table-column label="客户名称" sortable prop="name" />
      <el-table-column label="性别" sortable prop="sex" min-width="50%" />
      <el-table-column label="联系方式" sortable prop="phone" />
      <el-table-column
        label="邮箱地址"
        sortable
        prop="email"
        min-width="100%"
      />
      <el-table-column label="地址" sortable prop="address" min-width="140%" />
      <el-table-column align="center" label="操作" min-width="130">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            编辑明细
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteRow(scope.row.id)"
          >
            删除
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
      loading: false,
      postData: "", //传递数据
      customers: [
        {
          idCard: "1",
          name: "1",
          sex: "1",
          phone: "1",
          address: "1",
          email: "1",
        },
      ],
      query: {
        name: "",
        role: 1, //普通客户
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
      this.$axios("/user/list", {
        params: this.query,
      }).then((resp) => {
        if (resp.data.code == 200) {
          this.pagination.currentPage = resp.data.data.current;
          this.pagination.pageSize = resp.data.data.size;
          this.pagination.total = resp.data.data.total;
          this.customers = resp.data.data.records;
          console.log(customers);
        } else {
          this.pagination = {};
          this.customers = [];
        }
      });
      this.loading = false;
    },
    //添加
    handleAdd() {
      this.$router.push("customerAdd");
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
    //选择单选
    handleDeleteRow(id) {
      this.array.push(id);
      this.handleDelete();
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
        .delete("/customer/deleteBatch", {
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
    //修改
    handleEdit(row) {
      this.customerData = JSON.stringify(row);
      sessionStorage.setItem("customerData", this.customerData);
      // this.$bus.$emit("staffData", this.postData);
      // this.$store.commit("business/EDIT_STAFF", this.postData);
      this.$router.push("customerEdit");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
/*  .block {
    height: 100px;
    width: 100%;
    position: absolute;
    left: 20%;
    margin: 0 auto;
    bottom: 0;
  } */
</style>
