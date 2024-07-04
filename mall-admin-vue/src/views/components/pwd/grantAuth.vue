<template>
    <div class="login-right" style="width: 300px">
        <el-dialog
            v-model="visible"
            :title="titleText"
            width="500"
        >
            <el-form>
            <el-form-item :label="userLableText">
                <el-input
                prefix-icon="el-icon-user"
                style="height: 44px; margin-right: 10px"
                class="login-input"
                v-model="loginFormData.userName"
                placeholder="请输入授权用户"
                >
                </el-input>
            </el-form-item>
            <el-form-item :label="pwdLabelText">
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
            <el-button class="login-btn" type="primary" @click="grant">授权</el-button >
            </el-form>
        </el-dialog>
      </div>
</template>
    
<script>

export default {

    //接收父组件传递的数据
    props: {
        title: {
            type: String,
            required: true
        },
        userLable: {
            type: String,
            required: true
        },
        pwdLabel: {
            type: String,
            required: true
        },
        propVisible: {
            type: Boolean,
            required: true
        }
    },

    data () {
        return {
            titleText:'',
            userLableText:'',
            pwdLabelText:'',
            loginFormData: {
                userName: "",
                password: "",
            },
            visible: true

        };
    },

    mounted() {
        this.titleText = this.title;
        this.userLableText = this.userLable;
        this.pwdLabelText = this.pwdLabel;
        this.visible = this.propVisible;
        console.log("visible",this.visible);
    },

    methods: {
        grant(){
            const msg = "授权成功";
            this.$emit("grant", msg);
        }
       
    },
};
</script>
    
<style lang="scss" scoped>
</style>