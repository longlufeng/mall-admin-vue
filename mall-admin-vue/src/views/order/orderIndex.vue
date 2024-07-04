<template>
  <div style="margin-top: 30px">
    <el-table :data="tableData" empty-text="查无数据" style="width: 100%">
      <el-table-column width="auto" min-width="30%" label="订单号" prop="orderId" />
      <el-table-column width="auto" min-width="40%" label="商户名称" prop="merchantName" />
      <el-table-column width="auto" min-width="30%" label="商品名称" prop="commodityName" />
      <el-table-column width="auto" min-width="30%" label="数量" prop="number" />
      <el-table-column width="auto" min-width="30%" label="单价" prop="price" />
      <el-table-column width="auto" min-width="30%" label="下单时间" prop="createTime" />
      <el-table-column width="auto" min-width="30%" label="状态" prop="statusDesc" />
      <el-table-column>
        <template #default="scope">
          <el-button size="primary" @click="clickPay(scope.$index, scope.row)" >
            去支付
          </el-button>
          <el-button size="small" type="danger" @click="clickDel(scope.$index, scope.row)">
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!--订单支付-->
  <el-dialog v-model="payVisible" title="订单支付" width="300" :before-close="payClose">
    <div>
      <span>订单总价为: {{ itemForm.number * itemForm.price }}</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="payVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePay"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  <div v-show="grantVisible">
    <child :propVisible="grantVisible" title="新增商户授权" userLable="授权用户" pwdLabel="授权密码" @received="hideDrawer"></child>
  </div>
</template>

<script>
import { add, upd, qryById, qryList } from "../../api/order";
import { transfer } from "../../api/pay";
import { ElMessage } from "element-plus";
import router from "../../router/router";
import { useRoute } from "vue-router";
import child from "../components/pwd/grantAuth.vue";
export default {
  components: {
    child: child,
  },
  data() {
    return {
      conditionForm: {
        merchantId: "",
      },
      itemForm: {
        // merchantId: '',
        // merchantName: '',
        // status: '',
        // merchantType:'',
        // merchantAddr:'',
        // merchantTel:'',
        // legalPerson:'',
        // estalDate:''
      },

      payVisible: false,
      grantVisible: false,
      tableData: [],
    };
  },

  mounted() {
    this.qryOrderList();
  },

  methods: {
    qryOrderList() {
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

    clickPay(index, row) {
      this.itemForm = row;
      this.payVisible = true;
    },

    payClose() {
      this.payVisible = false;
      this.itemForm = {};
    },

    hideDrawer(info) {
      ElMessage({
        message: info,
        type: "success",
        plain: true,
      });

      this.grantVisible = false;
      this.addVisible = true;
      this.itemForm = {};
    },

    handlePay() {
      this.itemForm.status = "1";
      transfer(this.itemForm)
        .then((res) => {
          if (res && res.code === "200") {
            this.payVisible = false;
            this.itemForm = {};
            ElMessage({
              message: "支付成功",
              type: "success",
              plain: true,
            });
            router.push({
              path: "/payResult"
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    qryDetailById(merchantId) {
      let param = {
        merchantId: merchantId,
      };
      qryById(param)
        .then((res) => {
          if (res && res.code === "000000") {
            console.log("res.data", res);
            this.itemForm = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goOrderDetail(index, row) {
      console.log("进入详情页");
      router.push({
        path: "/orderDetail",
        query: {
          merchantId: row.merchantId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
