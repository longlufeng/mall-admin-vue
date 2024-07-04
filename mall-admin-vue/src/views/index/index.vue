<template>
    <div>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item index="1">商户管理</el-menu-item>
            <el-menu-item index="2">商品管理</el-menu-item>
            <el-menu-item index="3">订单管理</el-menu-item>
            <el-menu-item index="4">库存管理</el-menu-item>
            <el-menu-item index="5">积分管理</el-menu-item>
            <el-sub-menu index="6">
                <template #title>工作台</template>
                <el-menu-item index="6-1">item one</el-menu-item>
                <el-menu-item index="6-2">item two</el-menu-item>
                <el-menu-item index="6-3">item three</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="10">
                <template #title>设置</template>
                <el-menu-item index="10-1">修改密码</el-menu-item>
                <el-menu-item index="10-2">重置密码</el-menu-item>
                <el-menu-item index="10-3">退出</el-menu-item>
            </el-sub-menu>
            <el-avatar style="margin-top: 10px;"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span style="margin-left: 20px;margin-top: 17px;"> 欢迎，{{userName}} </span>
        </el-menu>
    </div>

    <div style="margin-top: 5px;">
        <img height="500" width="100%" src="@/assets/liulian_bg.jpeg" lazy />
    </div>

</template>

<script lang="ts" setup>
import router from "../../router/router";
import { h, ref,onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const userName = ref("");
onMounted(() => {
    userName.value = localStorage.getItem("userName");
    console.log("userName:{}",userName);
    console.log("userName.value:{}",userName.value);
});
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    let oneKey = keyPath[0];
    let twoKey = key;
    let operType = '';
    console.log("oneKey={},twoKey={}", oneKey, twoKey);
    if (oneKey == '10') {
        if (twoKey == '10-1') {
            operType = '1'
            console.log("operType={}", operType);
            router.push({
                path: "/userPwdMng",
                query: {
                    operType: operType
                }
            });
        } else if (twoKey == '10-2') {
            operType = '2';
            console.log("operType={}", operType);
            router.push({
                path: "/userPwdMng",
                query: {
                    operType: operType
                }
            });
        } else if (twoKey == '10-3') {


            ElMessageBox.confirm(
                '你确认退出系统吗?',
                '提醒',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: '退出系统',
                    })

                    router.push({
                        path: "/"
                    });
                })
                .catch(() => {
                    
                })
        }
    }else if(oneKey == '2'){
        router.push({ path: "/commodityClientIndex" });
    }else if(oneKey == '1'){
        router.push({ path: "/merchantIndex" });
    }
   
}
</script>

<style scoped>
.img-container {
    position: relative;
    display: flex;
    justify-content: space-around;
}
</style>