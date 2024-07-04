<template>
    <div style="margin-top: 5%;margin-left: 5%;">
        <el-descriptions title="商户详细信息">
            <el-descriptions-item label="商户Id"> {{merchantDetail.merchantId}}</el-descriptions-item>
            <el-descriptions-item label="商户名称">{{ merchantDetail.merchantName }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ merchantDetail.status }}</el-descriptions-item>
            <el-descriptions-item label="商户类型">{{ merchantDetail.merchantType }} </el-descriptions-item>
            <el-descriptions-item label="商户地址">
            <el-tag size="small">{{ merchantDetail.merchantAddr }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="商户电话">{{ merchantDetail.merchantTel }}</el-descriptions-item>
            <el-descriptions-item label="注册日期">{{ merchantDetail.estalDate }}</el-descriptions-item>
        </el-descriptions>
    </div> 
</template>

<script>
import {qryById} from '../../api/merchant'
import {useRouter,useRoute} from 'vue-router'

export default {
    data() {
        return {
            merchantDetail:{
                merchantId: '',
                merchantName: '',
                status: '',
                merchantType:'',
                merchantAddr:'',
                merchantTel:'',
                legalPerson:'',
                estalDate:''
            }
        }
    },

    mounted(){
        const route=useRoute();
        console.log(route.query.merchantId);
        let param = {
            merchantId: route.query.merchantId
        }
        
        qryById(param)
        .then(res =>{
            if(res.code == '000000'){
                this.merchantDetail = res.data;
            }
        })
        .catch(err =>{
            console.log(err);
        })
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>
</style>