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
            <el-form-item label="员工编号" prop="id">
              <el-input v-model="ruleForm.id" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="员工名称" prop="name">
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
              <v-distpicker @selected="sel" />
            </el-form-item>
          </el-col>
        </el-row>
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
import vDistpicker from "v-distpicker";
export default {
  components: {
    vDistpicker,
  },
  name: "ruleForm",
  data() {
    return {
      titleMsg: "",
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
            required: true,
            message: "请输入年龄",
            trigger: "blur",
          },
          {
            max: 3,
            message: "年龄位数不能大于3",
            trigger: "blur",
          },
          {
            pattern: "^[0-9]*$",
            message: "年龄必须是数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    "ruleForm.name": {
      deep: true,
      handler(val) {
        var b = this.judgeEensitiveWord(val);
        if (this.judgeEensitiveWord(val)) this.$data.ruleForm.name = b;
      },
    },
  },
  computed: {},
  methods: {
    sel(data) {
      this.citydata = data.province.value + data.city.value + data.area.value;
      console.log(this.citydata);
      this.ruleForm.location = this.citydata;
    },
    /*标题敏感词判断*/
    judgeEensitiveWord(value) {
      let word = [
        "妈的",
        "你妈",
        "他妈",
        "法轮功",
        "死",
        "逼",
        "草",
        "日",
        "狗",
        "吊",
        "屮",
        "靠",
      ];
      for (let i in word) {
        /*替换全部空格*/
        // let arr = obj.replace(/\s+/g,"")
        //全局替换
        let reg = new RegExp(word[i], "g");
        //判断内容中是否包括敏感词
        if (value.indexOf(word[i]) != -1) {
          var result = value.replace(reg, "*");
          value = result;
          this.$message({
            type: "error",
            message: `不能包含敏感词${'"'}${word[i]}${'"'}`,
          });
          return value;
        }
      }
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/staff/save", this.$qs.stringify(this.ruleForm))
            .then((resp) => {
              if (resp.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "添加成功!",
                });
                this.$router.push("staffList");
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getLastData() {
      this.$axios("/staff/last").then((resp) => {
        if (resp.data.code == 0 && resp.data.data != null) {
          let lastId = resp.data.data.id.substring(2);
          let id = parseInt(lastId) + 1;
          this.ruleForm.id = "st" + id;
        } else {
          this.ruleForm.id = "st1001";
        }
      });
    },
  },
  mounted() {
    this.getLastData();
  },
};
</script>
<style>
</style>
