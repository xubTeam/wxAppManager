<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo区域 -->
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <!-- 用户名 -->
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input prefix-icon="el-icon-s-goods" v-model="loginForm.pwd" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" native-type="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        pwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return;
        }
        console.log(process.env.NODE_ENV);
        let params = {
          userName: this.loginForm.username,
          pwd: this.loginForm.pwd,
          verifyCode: "13123"
        };
        this.$api
          .login(params)
          .then(res => {
            //console.log(res);
            // 登录成功
            if (res.code === 0) {
              //console.log("登录成功");
              this.prototype.$message({
                type: "success",
                message: res.msg,
                duration: 3000,
                showClose: true
              });
              // 跳转index页面
              this.$router.push("/index");
            } else {
              //console.log("登录失败");
              this.$message({
                type: "warning",
                message: res.msg,
                duration: 3000,
                showClose: true
              });
            }
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 650px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  border-radius: 3px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.logo {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eee;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
