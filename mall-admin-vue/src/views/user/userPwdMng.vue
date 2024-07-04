<template>
    <div class="register-center">
        <el-form>
            <el-form-item label="原来密码" v-if="operType == '1'">
                <el-input prefix-icon="el-icon-lock" style="height: 44px" class="login-input"
                    v-model="pwdFormData.oldPwd" placeholder="请输入密码" type="password">
                </el-input>
            </el-form-item>

            <el-form-item label="新密码">
                <el-input prefix-icon="el-icon-lock" style="height: 44px" class="login-input"
                    v-model="pwdFormData.newPwd" placeholder="请输入密码" type="password">
                </el-input>
            </el-form-item>

            <el-form-item label="确认密码">
                <el-input prefix-icon="el-icon-lock" style="height: 44px" class="login-input"
                    v-model="pwdFormData.confirmPwd" placeholder="请输入密码" type="password">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button style="margin-left: 120px" type="primary" @click="next">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import router from "../../router/router";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { pwdUpd,pwdReset } from "../../api/user";
import { md5 } from "js-md5";
import { sm2 } from "sm-crypto";
import { Base64 } from "js-base64";
export default {
    name: "userpwdMng",
    data() {
        return {
                
            operType:'',
            pwdFormData: {
                oldPwd: "",
                newPwd: "",
                confirmPwd: ""
            },
        };
    },

    mounted() {
        const route = useRoute();
        this.operType = route.query.operType;
    },

    methods: {
        next() {
            if (this.operType == "1") {
                this.userPwdUpd(); // 修改密码
            } else {
                this.userPwdReset(); // 重置密码
            }
        },

        /**
         * 修改密码
         */
         userPwdUpd() {
            var that = this;
            var userName = localStorage.getItem("userName");
            that.pwdFormData.oldPwd = that.userPasswordEnc(
                userName,
                that.pwdFormData.oldPwd
            );
            that.pwdFormData.newPwd = that.userPasswordEnc(
                userName,
                that.pwdFormData.newPwd
            );
            that.pwdFormData.confirmPwd = '';
            pwdUpd(that.pwdFormData)
                .then((res) => {
                    if (res.code === "200") {
                        setTimeout(() => {
                            ElMessage({
                                type: "success",
                                message: "密码修改成功",
                            });
                            router.push({ path: "/index" });
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
         * 重置密码
         */
         userPwdReset() {
            var that = this;
            var userName = localStorage.getItem("userName");
            that.pwdFormData.newPwd = that.userPasswordEnc(
                userName,
                that.pwdFormData.newPwd
            );
            that.pwdFormData.confirmPwd = '';
            pwdReset(that.pwdFormData)
                .then((res) => {
                    if (res.code === "200") {
                        setTimeout(() => {
                            ElMessage({
                                type: "success",
                                message: "密码重置成功",
                            });
                            router.push({ path: "/index" });
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