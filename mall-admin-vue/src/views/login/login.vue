<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-left">
        <!-- <div title="未设计" class="login-logo">LOGO</div> -->
        <img width="450" src="@/assets/bg.png" alt="" />
      </div>
      <div class="login-right">
        <el-form :model="loginFormData">
          <el-form-item>
            <!-- 选择登录类型 1-商户 2-用户 -->
            <el-select v-model="loginType" placeholder="登录类型">
              <el-option
                v-for="item in loginTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input
              prefix-icon="el-icon-user"
              style="height: 44px; margin-right: 10px"
              class="login-input"
              v-model="loginFormData.userName"
              placeholder="请输入用户"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input
              prefix-icon="el-icon-lock"
              style="height: 44px; margin-right: 10px"
              class="login-input"
              v-model="loginFormData.userPassword"
              placeholder="请输入密码"
              type="password"
            >
            </el-input>
          </el-form-item>
          <el-button class="login-btn" type="primary" @click="loginBtn"
            >登录</el-button
          >
          <el-button type="text" @click="register">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router/router";
import { ElMessage } from "element-plus";
import { login } from "../../api/user";
import { merchantRegister, merchantLogin } from "../../api/merchant";
import { md5 } from "js-md5";
import { sm2 } from "sm-crypto";
import { Base64 } from "js-base64";
export default {
  name: "login",
  data() {
    return {
      registerVisible: false,
      loginType: "",
      registerType: "",
      loginTypeOptions: [
        {
          value: "1",
          label: "商户",
        },
        {
          value: "2",
          label: "用户",
        },
      ],
      loginFormData: {
        userName: "",
        password: "",
      },
      registerFormData: {
        userName: "",
        password: "",
      },
    };
  },

  methods: {
    //加密的方法
    ms2EncData(data) {
      //publicKey 为sm2的公钥，公钥用来前端加密，私钥用来后端解密
      const publicKey = import.meta.env.VITE_PUBLICKEY;
      const cipherMode = 1;
      //data为加密的数据
      const result = sm2.doEncrypt(data, publicKey, cipherMode);
      return result;
    },

    registerClose() {
      this.registerVisible = false;
    },

    handleRegister() {
      if (!this.registerType) {
        this.$message.error("注册类型不能为空");
        return;
      }
      if (
        !this.registerFormData.userName ||
        !this.registerFormData.userPassword
      ) {
        ElMessage("用户名或者密码不能为空");
        return;
      }

      if (this.registerType === "1") {
        this.merchantRegister();
      } else {
        this.userRegister();
      }
    },

    /**
     * 商户发起注册
     */
    merchantRegister() {
      merchantRegister(this.registerFormData)
        .then((res) => {
          if (res.code === "200") {
            console.log(">>>>>>res>>>>>>", res);
            setTimeout(() => {
              ElMessage({
                type: "success",
                message: "注册成功",
              });
              if (res.data.roleId == "001") {
                router.push({ path: "/merchantIndex" });
              } else {
                router.push({ path: "/commodityIndex" });
              }
            }, 500);
          } else {
            ElMessage({
              message: res.msg,
              duration: 500,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * 注册
     */
    register() {
      if (!this.loginType) {
        ElMessage("请选择注册类型 ");
        return;
      }
      router.push({
        path: "/register",
        query: {
          registerType: this.loginType,
        },
      });
    },

    loginBtn() {
      if (!this.loginType) {
        this.$message.error("登录类型不能为空");
        return;
      }
      if (!this.loginFormData.userName || !this.loginFormData.userPassword) {
        ElMessage("用户名或者密码不能为空");
        return;
      }

      if (this.loginType === "1") {
        this.merchantLogin();
      } else {
        this.userLogin();
      }
    },

    /**
     * 商户登录
     */
    merchantLogin() {

      this.loginFormData.userPassword = this.userPasswordEnc(
        this.loginFormData.userName,
        this.loginFormData.userPassword
      );

      merchantLogin(this.loginFormData)
        .then((res) => {
          if (res.code === "200") {
            setTimeout(() => {
              ElMessage({
                type: "success",
                message: "登录成功",
              });
              if (res.data && res.data.roleId && res.data.roleId === "001") {
                router.push({ path: "/merchantIndex" });
              } else {
                router.push({ path: "/commodityIndex" });
              }
              localStorage.setItem("merchantId", res.data.merchantId);
            }, 500);
          } else {
            ElMessage({
              message: res.msg,
              duration: 500,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * 用户登录
     */
    async userLogin() {
      this.loginFormData.userPassword = this.userPasswordEnc(
        this.loginFormData.userName,
        this.loginFormData.userPassword
      );

      login(this.loginFormData)
        .then((res) => {
          if (res.code === "200") {
            console.log(">>>>>>res>>>>>>", res);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("userName", res.data.userName);
            setTimeout(() => {
              ElMessage({
                type: "success",
                message: "登录成功",
              });
              router.push({ path: "/index" });
            }, 500);
          } else {
            ElMessage({
              message: res.msg,
              duration: 500,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    userPasswordEnc(userName, userPassword) {
      // MD5加密
      let salt = import.meta.env.VITE_SALT;
      let pwd = md5(userName + userPassword + salt);
      console.log("MD5加密为：", pwd);

      // SM2加密
      let publicKey = import.meta.env.VITE_PUBLICKEY;
      let cipherMode = import.meta.env.VITE_CIPHER_MODE;
      // let publicKey = "0443cbfde3ad0308294ce1752cbc3345d7692ee813a83672a9e93fb80355b96ae4b941fe100336f3c03fb2471c4242659edb275cb928b6f8bfb16312c8a0d2db37";
      // let cipherMode = "1";
      pwd = sm2.doEncrypt(pwd, publicKey, cipherMode);
      console.log("SM@加密为：", pwd);

      // base64加密
      pwd = Base64.encode(pwd);

      return pwd;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-login {
  position: relative;
  height: 100vh;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  padding: 0 1rem;
  overflow: hidden;
}

.login-container {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login-footer {
  position: absolute;
  bottom: 10px;
}

.login-left {
  width: 25%;
  min-width: 300px;
  max-width: 500px;
  background-size: 100%;
}

.login-right {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 400px;
  border-radius: 1rem;
  box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);
}

$input-height: 44px;

.login-input {
  font-size: 17px;
  width: 300px;

  :deep(.el-input__inner) {
    height: $input-height;
    line-height: $input-height;
    background: #f5f5f5;
    border: 0;

    &:focus + .el-input__prefix {
      color: black;
    }
  }
}

.login-btn {
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 16px;
}

@media screen and (max-width: $sm-width) {
  .login-left {
    display: none;
  }
  .login-right {
    width: 100%;
  }
}
</style>
