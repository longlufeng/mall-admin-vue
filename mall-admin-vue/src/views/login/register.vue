<template>
  <div class="register-center">
    <el-form>
      <span style="margin-left: 110px">{{
        registerType == "1" ? " 商户注册" : "用户注册"
      }}</span>
      <el-form-item label="用户">
        <el-input
          prefix-icon="el-icon-user"
          style="height: 44px"
          class="login-input"
          v-model="registerFormData.userName"
          placeholder="请输入用户名"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input
          prefix-icon="el-icon-lock"
          style="height: 44px"
          class="login-input"
          v-model="registerFormData.userPassword"
          placeholder="请输入密码"
          type="password"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button style="margin-left: 120px" type="primary" @click="next"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import router from "../../router/router";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { userAdd } from "../../api/user";
import { merchantRegister } from "../../api/merchant";
import { md5 } from "js-md5";
import { sm2 } from "sm-crypto";
import { Base64 } from "js-base64";
export default {
  name: "register",
  data() {
    return {
      registerType: "",
      registerFormData: {
        userName: "",
        password: "",
      },
    };
  },

  mounted() {
    const route = useRoute();
    this.registerType = route.query.registerType;
  },

  methods: {
    next() {
      if (this.registerType == "1") {
        this.merchantRester(); // 商户注册
      } else {
        this.userRester(); // 用户注册
      }
    },

    /**
     * 商户注册
     */
    merchantRester() {
      var that = this;
      that.registerFormData.userPassword = that.userPasswordEnc(
        that.registerFormData.userName,
        that.registerFormData.userPassword
      );
      merchantRegister(that.registerFormData)
        .then((res) => {
          if (res.code === "200") {
            setTimeout(() => {
              ElMessage({
                type: "success",
                message: "注册成功",
              });
              router.push({ path: "/commodityIndex" });
            }, 500);
          } else {
            console.log("交易失败", JSON.stringify(res));
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
     * 用户注册
     */
    userRester() {
      var that = this;
      that.registerFormData.userPassword = that.userPasswordEnc(
        that.registerFormData.userName,
        that.registerFormData.userPassword
      );
      userAdd(that.registerFormData)
        .then((res) => {
          if (res.code === "200") {
            setTimeout(() => {
              ElMessage({
                type: "success",
                message: "注册成功",
              });
              if (that.registerType == "1") {
                router.push({ path: "/merchantIndex" });
              } else {
                router.push({ path: "/commodityClientIndex" });
              }
            }, 500);
          } else {
            console.log("交易失败", JSON.stringify(res));
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
      pwd = sm2.doEncrypt(pwd, publicKey, cipherMode);

      // base64加密
      pwd = Base64.encode(pwd);

      return pwd;
    },
  },
};
</script>

<style lang="scss" scoped>
.register-center {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  border-radius: 1rem;
  box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);
}
</style>
