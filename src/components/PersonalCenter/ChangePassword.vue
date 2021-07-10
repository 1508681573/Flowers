<template>
  <div class="change-password">
    <div class="title">
      <h1>修改密码</h1>
    </div>
    <div class="form">
      <el-form
        :model="formInfo"
        status-icon
        :rules="rules"
        ref="formInfo"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk="true"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input
            type="password"
            v-model="formInfo.oldPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input
            type="password"
            v-model="formInfo.newPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkNewPass">
          <el-input
            type="password"
            v-model="formInfo.checkNewPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formInfo)"
            >提交</el-button
          >
          <el-button @click="resetForm('formInfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiChangePass } from '../../utils/api'

export default {
  data() {
    let validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
          // 判断旧密码 与 localstorage 里是否相同
        if(value != JSON.parse(window.localStorage.getItem('userData')).password) {
            callback(new Error("旧密码错误"));
        }else{
            callback();
        }
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.formInfo.checkNewPass !== "") {
          this.$refs.formInfo.validateField("checkNewPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formInfo.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        newPass: [{ validator: validatePass, trigger: "blur" }],
        checkNewPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      formInfo: {
        oldPass: '',
        newPass: '',
        checkNewPass: '',
      },
    };
  },
  methods: {
    // 提交修改
    submitForm(val) {
        // 从 localstorage 里取 id
        let id = JSON.parse(window.localStorage.getItem('userData')).id
        // 收集修改信息
        let obj = {
            id: id,
            oldPass: this.formInfo.oldPass,
            newPass: this.formInfo.newPass
        }
        // 发送请求修改
        apiChangePass(obj).then(res => {
            // 成功
            if(res.code == 200) {
                this.$message.success('修改成功')
                // 清空 input
                this.resetForm('formInfo')
            }else {
                this.$message.error('修改失败')
            }
        })
    },
    // 清空 input
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='scss'>
.change-password {
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
