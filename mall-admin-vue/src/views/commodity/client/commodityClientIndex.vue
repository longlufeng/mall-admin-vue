<template>
  <div style="margin-top: 30px; margin-left: 50px">
    <el-form :inline="true" v-model="conditionForm" >
      <div>
        <el-form-item label="商品名称">
          <el-input
            v-model="conditionForm.commodityName"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="conditionForm.status"
            placeholder=""
            style="width: 100px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="qryCommodityList">查询</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="tableData" empty-text="查无数据" style="width: 100%">
      <el-table-column
        width="auto"
        min-width="30%"
        label="商品名称"
        prop="commodityName"
      />
      <el-table-column
        width="auto"
        min-width="30%"
        label="价格"
        prop="price"
      />
      <el-table-column
        width="auto"
        min-width="30%"
        label="状态"
        prop="statusDesc"
      />
      <el-table-column>
        <template #default="scope">
          <el-button
            size="small"
            @click="goComodityDetail(scope.$index, scope.row)"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { qryList } from "../../../api/commodity";
import router from "../../../router/router";
export default {
  data() {
    return {
      conditionForm: {
        commodityName: "",
        status: "",
      },

      tableData: [],
      statusOptions: [
        {
          value: "1",
          label: "上架",
        },
        {
          value: "2",
          label: "下架",
        },
        {
          value: "3",
          label: "注销",
        },
      ],
    };
  },

  mounted() {
    this.qryCommodityList();
  },

  methods: {
    qryCommodityList() {
      qryList(this.conditionForm)
        .then((res) => {
          console.log(">>>>>>res>>>>>>", res);
          if (res && res.code === "200") {
            this.tableData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goComodityDetail(index, row) {
      console.log("进入详情页");
      router.push({
        path: "/commodityClientDetail",
        query: {
          merchantId: row.merchantId,
          commodityId: row.commodityId
        },
      });
    },

    goOrderIndex() {
      router.push({
        path: "/orderIndex",
        query: {}
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>
