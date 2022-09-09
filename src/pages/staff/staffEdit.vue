<template>
  <div style="padding: 40px">
    <div class="card">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        style="text-align: left"
      >
        <!--el-row el-col 行列栅格，:span=12为占12格子-->
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="职工号" prop="id">
              <el-input v-model="ruleForm.id" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="职工姓名" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="ruleForm.age" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="ruleForm.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="地址" prop="location">
              <el-input v-model="ruleForm.location" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-form-item label="简历">
          <el-upload ref="upload" class="upload-demo" action="../file/upload" :limit="1" :on-success="handleSuccess"
            :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">
              选取简历
            </el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
              上传
            </el-button>
          </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            确定
          </el-button>
          <el-button @click="resetForm('ruleForm')"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [], //绑定文件控件
      //表单数据
      ruleForm: {
        id: "",
        name: "",
        sex: "",
        age: "",
        phone: "",
        location: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          {
            min: 2,
            message: "姓名长度不能少于2",
            trigger: "blur",
          },
          {
            max: 8,
            message: "姓名长度不能大于8",
            trigger: "blur",
          },
          {
            pattern: "^[\u4e00-\u9fa5]+$",
            message: "姓名必须是汉字",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: false,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .put("/staff/update", this.$qs.stringify(this.ruleForm))
            .then((resp) => {
              if (resp.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                this.$router.go(-1);
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    // var postData = sessionStorage.getItem("postData");
    this.ruleForm = this.$store.state.business.staff;
    console.log(this.$store.state);
  },
};
</script>
<style>
</style>
