<template>
  <div style="margin-top: 5%; margin-left: 5%">
    <el-image
      style="width: 100px; height: 100px"
      :src="commodityInfo.url"
      :fit="fit"
    ></el-image>
  </div>
  <div style="margin-top: 1%; margin-left: 5%">
    <el-descriptions title="商品详细信息">
      <el-descriptions-item label="商品名称：">
        {{ commodityInfo.commodityName }}</el-descriptions-item
      >
      <el-descriptions-item label="商户名称：">
        {{ commodityInfo.merchantName }}</el-descriptions-item
      >
      <el-descriptions-item label="商品类型："
        >{{ commodityInfo.commodityType }}
      </el-descriptions-item>
      <el-descriptions-item label="商品描述：">
        <el-tag size="small">{{ commodityInfo.commodityDesc }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="库存：">{{
        commodityInfo.inventory
      }}</el-descriptions-item>
      <el-descriptions-item label="价格：">{{
        commodityInfo.price
      }}</el-descriptions-item>
    </el-descriptions>
  </div>

  <div style="margin-top: 1%; margin-left: 5%">
    <el-button type="plain" @click="toBuy"> 去购买 </el-button>
  </div>
  
</template>

<script>
import { qryById } from "../../../api/commodity";
import { useRoute } from "vue-router";
import { add } from "../../../api/order";
import router from "../../../router/router";

export default {
  data() {
    return {
      merchantId:'',
      commodityId:'',
      commodityInfo: { }
    };
  },

  mounted() {
    const route = useRoute();
    this.merchantId = route.query.merchantId;
    this.commodityId = route.query.commodityId;

    this.qryComodityDetail();
  },

  methods: {
    qryComodityDetail() {
      let that = this;
      let param = {
        merchantId: this.merchantId,
        commodityId: this.commodityId,
      };

      qryById(param)
        .then((res) => {
          if (res.code == "200") {
            that.commodityInfo = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    toBuy() {
      let that = this;

      this.$confirm("确定要购买此商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.createOrder();
        })
        .catch((err) => {
            console.log(err);
        });
    },

    createOrder() {
      let that = this;
      add(that.commodityInfo)
        .then((res) => {
          if (res.code == "200") {
            that.$message({
              type: "success",
              message: "下单成功!",
            });
          }

          router.push({
            path: "/orderIndex",
            query: {
              commodityInfo: that.commodityInfo
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
