<template>
    <div style="margin-top: 5%;margin-left: 5%;">
        <el-descriptions title="商品详细信息">
            <el-descriptions-item label="商品名称："> {{commodityInfo.commodityName}}</el-descriptions-item>
            <el-descriptions-item label="商户名称：">{{ commodityInfo.merchantName }}</el-descriptions-item>
            <el-descriptions-item label="状态：">{{ commodityInfo.status }}</el-descriptions-item>
            <el-descriptions-item label="商品类型：">{{ commodityInfo.commodityType }} </el-descriptions-item>
            <el-descriptions-item label="商品描述：">
            <el-tag size="small">{{ commodityInfo.commodityDesc }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="库存：">{{ commodityInfo.inventory }}</el-descriptions-item>
            <el-descriptions-item label="url：" style="width: 100px;">{{ commodityInfo.url }}</el-descriptions-item>
            <el-descriptions-item label="价格：">{{ commodityInfo.price }}</el-descriptions-item>
        </el-descriptions>
    </div> 
</template>

<script>
import {qryById} from '../../api/commodity'
import {useRoute} from 'vue-router'

export default {
    data() {
        return {
            commodityInfo:{}
        }
    },

    mounted(){
        let merchantId = localStorage.getItem("merchantId")
        const route = useRoute();
        let param = {
            merchantId: merchantId,
            commodityId: route.query.commodityId
        }
        
        qryById(param)
        .then(res =>{
            if(res.code == '000000'){
                this.commodityInfo = res.data;
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