<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'select': item.select}" @click="selectMenu(item)">{{item.txt}}</li>
      </ul>
      <!-- 输入框 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium ">
        <el-form-item prop="username" class="item-form">
          <label>用户</label>
          <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="15"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
          <label>重复密码</label>
          <el-input type="passwords" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="15"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model.number="ruleForm.code" maxlength="6"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Stripscript, validateUser, validatePass, validateCodeNum } from '../../utils/validate.js'
import { stringify } from 'querystring';
export default {
  name: "login",
  data() {
    // 表单验证
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }else if(!validateUser(value)){
        callback(new Error("用户名格式有误"));
      }else{
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)/;
      // 过滤字符
      this.ruleForm.password = Stripscript(value);
      value = this.ruleForm.password
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      }else if(!validatePass(value)){
        callback(new Error("密码为6-15位数字和字母"));
      }else{
        callback();
      }
    };
    var validatePasswords = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)/;
      // 过滤字符
      this.ruleForm.passwords = Stripscript(value);
      value = this.ruleForm.passwords
      // console.log(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }else if(value !== this.ruleForm.password){
        callback(new Error("两次输入密码不一致"));
      }else{
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      }else if(!validateCodeNum(value)) {
        return callback(new Error("验证码格式有误"));
      }else{
        callback();
      }
    };

    return {
      menuTab: [{ txt: "登录", select: true, type: 'login' }, { txt: "注册", select: false, type: 'register'}],
      model: 'login',
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      // 验证规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    // vue数据驱动视图渲染
    selectMenu(item) {
      // 将所有选择状态都为false
      this.menuTab.forEach(item => {
        item.select = false;
      });
      // 将鼠标点击的状态为true
      item.select = true;
      this.model = item.type
    },
    // 验证方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  overflow: hidden;
}
.login-wrap {
  width: 330px;
  margin: 100px auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-style: 14px;
    color: #fff;
    border-radius: 2px;
  }
}
.select {
  background-color: rgba(0, 0, 0, 0.1);
}
.login-form {
  margin-top: 30px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 12px;
    margin-left: 0px !important;
    el-input {
      display: block;
      width: 100%;
    }
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 18px;
  }
}
</style>