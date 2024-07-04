<template>
  <div style="margin-top: 30px; margin-left: 50px">
    <el-form :inline="true" :model="conditionForm" class="demo-form-inline">
      <div>
        <el-form-item label="商品名称1">
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
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickAdd()">新增</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="tableData" empty-text="查无数据" style="width: 100%">
      <el-table-column
        width="auto"
        min-width="30%"
        label="商品Id"
        prop="commodityId"
      />
      <el-table-column
        width="auto"
        min-width="40%"
        label="商品名称"
        prop="commodityName"
      />
      <el-table-column
        width="auto"
        min-width="30%"
        label="状态"
        prop="statusDesc"
      />
      <el-table-column>
        <template #default="scope">
          <el-button size="small" @click="clickAdd()"> Add </el-button>
          <el-button
            size="small"
            type="danger"
            @click="clickDel(scope.$index, scope.row)"
          >
            Del
          </el-button>
          <el-button size="small" @click="clickEdit(scope.$index, scope.row)">
            Edit
          </el-button>
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

  <!--添加-->
  <el-dialog
    v-model="addVisible"
    title="新增数据"
    width="500"
    :before-close="addClose"
  >
    <template #footer>
      <el-form :model="itemForm" :rules="rules" ref="itemForm">
        <el-form-item label="商品名称" prop="commodityName">
          <el-input v-model="itemForm.commodityName" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="commodityType">
          <el-select
            v-model="itemForm.commodityType"
            placeholder=""
            style="width: 100px"
          >
            <el-option
              v-for="item in commodityTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" prop="commodityDesc">
          <el-input v-model="itemForm.commodityDesc" type="textarea" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="库存(单位斤)" prop="inventory">
          <el-input v-model="itemForm.inventory" type="number"></el-input>
        </el-form-item>
        <el-form-item label="图片url" prop="url">
          <el-input v-model="itemForm.url"></el-input>
        </el-form-item>
        <el-form-item label="价格(单位元)" prop="price">
          <el-input v-model="itemForm.price" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd"> 确认 </el-button>
        <el-button @click="resetForm('itemForm')">重置</el-button>
      </div>
    </template>
  </el-dialog>

  <!--删除-->
  <el-dialog
    v-model="delVisible"
    title="删除"
    width="300"
    :before-close="delClose"
  >
    <span>确定删除 {{ itemForm.commodityName }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="delVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDel"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  <!--修改-->
  <el-dialog
    v-model="editVisible"
    title="修改数据"
    width="500"
    :before-close="editClose"
  >
    <template #footer>
      <el-form>
        <el-form-item label="商户名称">
          <el-input v-model="itemForm.commodityName"></el-input>
        </el-form-item>
        <el-form-item label="商户类型">
          <el-select
            v-model="itemForm.commodityType"
            placeholder=""
            style="width: 100px"
          >
            <el-option
              v-for="item in commodityTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商户地址">
          <el-input v-model="itemForm.merchantAddr"></el-input>
        </el-form-item>
        <el-form-item label="商户电话">
          <el-input v-model="itemForm.merchantTel"></el-input>
        </el-form-item>
        <el-form-item label="法人">
          <el-input v-model="itemForm.legalPerson"></el-input>
        </el-form-item>
        <el-form-item label="注册日期">
          <el-input v-model="itemForm.estalDate"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEdit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { qryList, add, del, upd } from "../../api/commodity";
import { ElMessage } from "element-plus";
import router from "../../router/router";
export default {
  data() {
    return {
      conditionForm: {
        commodityName: "",
        status: "",
      },

      itemForm: {
        // commodityId: '',
        // commodityName: '',
        // status: '',
        // commodityType:'',
        // merchantAddr:'',
        // merchantTel:'',
        // legalPerson:'',
        // estalDate:''
      },

      addVisible: false,
      delVisible: false,
      editVisible: false,
      selVisible: false,
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
      commodityTypeOptions: [
        {
          value: "1",
          label: "水果",
        },
        {
          value: "2",
          label: "蔬菜",
        },
        {
          value: "3",
          label: "粮油",
        },
      ],
      rules: {
        commodityName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        commodityType: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
        commodityDesc: [
          { required: true, message: "请填写商品描述", trigger: "blur" },
        ],
        inventory: [{ required: true, message: "请输入库存", trigger: "blur" }],
        url: [{ required: true, message: "请输入url", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }]
      },
    };
  },

  mounted() {

    let merchantId = localStorage.getItem("merchantId")
    console.log(">>>>>>merchant:"+merchantId);
    if(merchantId){
      this.conditionForm.merchantId=merchantId
    }
    console.log(">>>>>>conditionForm:"+JSON.stringify(this.conditionForm));
    qryList(this.conditionForm)
      .then((res) => {
        console.log(">>>>>>res>>>>>>", res);
        if (res && res.code === "000000") {
          this.tableData = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    clickAdd() {
      this.addVisible = true;
      this.itemForm = {};
    },
    clickDel(index, row) {
      this.itemForm = row;
      this.delVisible = true;
    },
    clickEdit(index, row) {
      // this.itemForm = JSON.parse(JSON.stringify(row)) ;
      console.log(">>>>>>>itemForm>>>>>> ", this.itemForm);
      this.qryDetailById(row.commodityId);
      this.editVisible = true;
    },
    clickSel(index, row) {
      this.itemForm = row;
      this.selVisible = true;
    },

    addClose() {
      this.addVisible = false;
      this.itemForm = {};
    },
    delClose() {
      this.delVisible = false;
    },
    editClose() {
      this.editVisible = false;
    },
    selClose() {
      this.selVisible = false;
    },

    handleAdd() {
        this.$refs['itemForm'].validate((valid) => {
            if (valid) {
                add(this.itemForm)
                .then((res) => {
                    console.log("handleAdd >>> res", res);
                    if (res && res.code === "000000") {
                        this.addVisible = false;
                        this.query();
                        this.itemForm = {};
                        ElMessage({
                        message: "增加成功",
                        type: "success",
                        plain: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            } else {
                return false;
            }
        });
    },

    resetForm(formName) {
        this.$refs[formName].resetFields();
    },

    handleDel() {
      del(this.itemForm)
        .then((res) => {
          if (res && res.code === "000000") {
            this.query();
            this.delVisible = false;
            ElMessage({
              message: "删除成功",
              type: "success",
              plain: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit() {
      upd(this.itemForm)
        .then((res) => {
          if (res && res.code === "000000") {
            this.editVisible = false;
            this.query();
            ElMessage({
              message: "修改成功",
              type: "success",
              plain: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    qryDetailById(commodityId) {
      let param = {
        commodityId: commodityId,
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

    query() {
      qryList(this.conditionForm)
        .then((res) => {
          console.log(">>>>>>res>>>>>>", res);
          if (res && res.code === "000000") {
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
        path: "/commodityDetail",
        query: {
          commodityId: row.commodityId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
