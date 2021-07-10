<template>
  <div class="change-info">
    <div class="title">
      <h1>修改个人信息</h1>
    </div>
    <div class="form">
      <el-form
        status-icon
        :rules="rules"
        :label-position="labelPosition"
        label-width="80px"
        :model="formInfo"
        ref="formInfo"
      >
        <el-form-item
          prop="name"
          :rules="rules.name"
          hide-required-asterisk="true"
          label="用户名:"
        >
          <el-input v-model="formInfo.name" prop=""></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          :rules="rules.phone"
          hide-required-asterisk="true"
          label="手机号:"
        >
          <el-input v-model="formInfo.phone"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          :rules="rules.email"
          hide-required-asterisk="true"
          label="E-mail:"
        >
          <el-input v-model="formInfo.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formInfo)"
            >提交
          </el-button>
          <el-button @click="resetForm('formInfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiChangeInfo } from '../../utils/api'

export default {
  data() {
    return {
      labelPosition: "right",
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        phone: [{ required: true, message: "手机号有误", pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      formInfo: {
        name: "",
        phone: "",
        email: "",
      },
    };
  },
  methods: {
    // 提交修改信息
    submitForm(val) {
        // 从 localstorage 里取 id
        let id = JSON.parse(window.localStorage.getItem('userData')).id
        // 收集请求信息
        let obj = {
            id: id,
            name: this.formInfo.name,
            phone: this.formInfo.phone,
            email: this.formInfo.email
        }
        // 发送请求修改
        apiChangeInfo(obj).then(res => {
            // 成功
            if(res.code == 200) {
                this.$message.success('修改成功')
                // 清空 input
                this.resetForm('formInfo')
            }else {
                this.$message.error('修改失败');
            }
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='scss'>
.change-info {
  width: 800px;
  padding: 50px 50px;
  background: white;
  text-align: center;
  .title {
    h1 {
      color: #757575;
      margin-bottom: 50px;
    }
  }
  .form {
    padding: 0 20%;
    text-align: center;
    .el-form {

        .el-form-item {
            margin: 50px 0;
        }
    }
  }
}
</style>
