<template>
    <!-- 条件查询 -->
    <div style="margin-top: 30px;margin-left: 20px;">
        <el-form :inline="true" :model="conditionForm" class="demo-form-inline">
            <div>
                <el-form-item label="商户Id">
                    <el-input v-model="conditionForm.merchantId" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="商户名称">
                    <el-input v-model="conditionForm.merchantName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="conditionForm.status" placeholder="" style="width: 100px">
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                
            </div>
            <div>
                <el-form-item label="开始日期">
                    <el-date-picker
                        v-model="conditionForm.startDate"
                        type="date"
                        placeholder="请选择开始日期"
                        :size="default"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    />
                </el-form-item>

                <el-form-item label="结束日期">
                    <el-date-picker
                        v-model="conditionForm.endDate"
                        type="date"
                        placeholder="请选择结束日期"
                        :size="default"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    />
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
            <el-table-column width="auto" min-width="30%" label="商户Id" prop="merchantId" />
            <el-table-column width="auto" min-width="40%" label="商户名称" prop="merchantName" />
            <el-table-column width="auto" min-width="30%" label="状态" prop="statusDesc" />
            <el-table-column width="auto" min-width="30%" label="注册日期" prop="estalDate" />
            <el-table-column>
                <template #default="scope">
                    <el-button size="small" @click="clickAdd()">
                    Add
                    </el-button>
                    <el-button size="small" type="danger" @click="clickDel(scope.$index, scope.row)">
                    Del
                    </el-button>
                    <el-button size="small" @click="clickEdit(scope.$index, scope.row)">
                    Edit
                    </el-button>
                    <el-button size="small" @click="goMerchantDetail(scope.$index, scope.row)">
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
            <el-form :rules="rules">
                <el-form-item label="商户名称">
                    <el-input v-model="itemForm.merchantName" clearable	></el-input>
                </el-form-item>
                <el-form-item label="商户类型">
                    <el-select v-model="itemForm.merchantType" placeholder="" style="width: 100px">
                        <el-option
                            v-for="item in merchantTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="商户地址">
                    <el-input v-model="itemForm.merchantAddr"	></el-input>
                </el-form-item>
                <el-form-item label="商户电话">
                    <el-input v-model="itemForm.merchantTel" ></el-input>
                </el-form-item>
                <el-form-item label="法人代表">
                    <el-input v-model="itemForm.legalPerson" ></el-input>
                </el-form-item>
                <el-form-item label="注册日期">
                    <el-date-picker
                        v-model="itemForm.estalDate"
                        type="date"
                        placeholder="选择日期"
                        format="YYYY年MM月DD日"
                        value-format="YYYY-MM-DD">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="clickAddConfirm">
                确认
                </el-button>
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
        <span>确定删除 {{ itemForm.merchantName }}</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="delVisible = false">取消</el-button>
                <el-button type="primary" @click="handleDel">
                确认
                </el-button>
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
                    <el-input v-model="itemForm.merchantName" ></el-input>
                </el-form-item>
                <el-form-item label="商户类型">
                    <el-select v-model="itemForm.merchantType" placeholder="" style="width: 100px">
                        <el-option
                            v-for="item in merchantTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="商户地址">
                    <el-input v-model="itemForm.merchantAddr" ></el-input>
                </el-form-item>
                <el-form-item label="商户电话">
                    <el-input v-model="itemForm.merchantTel" ></el-input>
                </el-form-item>
                <el-form-item label="法人">
                    <el-input v-model="itemForm.legalPerson" ></el-input>
                </el-form-item>
                <el-form-item label="注册日期">
                    <el-input v-model="itemForm.estalDate" ></el-input>
                </el-form-item>
                
            </el-form>
            <div class="dialog-footer">
                <el-button @click="editVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEdit">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!--授权-->
    <div v-if="grantVisible">
        <child 
            :propVisible="grantVisible" 
            title="新增商户授权" 
            userLable="授权用户"
            pwdLabel="授权密码" 
            @grant="grantAuth"></child>
    </div>

</template>
    
<script>
import { qryList,add,del,upd,qryById,getCurDate} from "../../api/merchant";
import { ElMessage } from "element-plus";
import router from "../../router/router";
import child from "../components/pwd/grantAuth.vue";
export default {
    components: {
        child: child
    },
    data () {
        return {
            conditionForm: {
                merchantId: '',
                merchantName: '',
                status: '',
                startDate:'',
                endDate:''
            },

            grantVisible: false,

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

            addVisible: false,
            delVisible: false,
            editVisible: false,
            selVisible: false,
            tableData:[
                
            ],
            stripe: true,
            // status:'',
            statusOptions:[
                {
                    value: '1',
                    label: '上架',
                },
                {
                    value: '2',
                    label: '下架',
                },
                {
                    value: '3',
                    label: '注销',
                }
            ],
            merchantTypeOptions:[
                {
                    value: '1',
                    label: '小企业',
                },
                {
                    value: '2',
                    label: '中型企业',
                },
                {
                    value: '3',
                    label: '大型企业',
                }
            ],
            rules: {
                merchantName: [
                    { required: true, message: "商户名称不能为空", trigger: "blur" }
                ],
                merchantType: [
                    { required: true, message: "商户类型不能为空", trigger: "blur" }
                ]
            },
        };
    },

    mounted() {
        getCurDate()
        .then(res => {
            if(res && res.code === '200'){
                this.conditionForm.startDate = res.data.startDate;
                this.conditionForm.endDate = res.data.endDate;
            }
        })
        .catch(err => {
            console.log(err)
        }),

        this.query();
    },

    methods: {
        clickAdd(){
            this.addVisible = true;
            this.itemForm = {};
        },
        clickAddConfirm(){
            this.grantVisible = true;

        },
        grantAuth(){
            this.grantVisible = false;
            this.addVisible = false;
            this.handleAdd();
        },

        clickDel(index,row){
            this.itemForm = row;
            this.delVisible = true;
        },
        clickEdit(index,row){
            // this.itemForm = JSON.parse(JSON.stringify(row)) ;
            console.log(">>>>>>>itemForm>>>>>> ",this.itemForm);
            this.qryDetailById(row.merchantId);
            this.editVisible = true;
        },
        clickSel(index,row){
            this.itemForm = row;
            this.selVisible = true;
        },

        addClose(){
            this.addVisible = false;
            this.itemForm = {};
        },
        delClose(){
            this.delVisible = false;
        },
        editClose(){
            this.editVisible = false;
        },
        selClose(){
            this.selVisible = false;
        },

        handleAdd(){
            add(this.itemForm)
            .then(res => {
                console.log("handleAdd >>> res",res);
                if(res && res.code === '200'){
                    this.addVisible = false;
                    this.query();
                    this.itemForm = {};
                    ElMessage({
                        message: '增加成功',
                        type: 'success',
                        plain: true,
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        handleDel(){
            del(this.itemForm)
            .then(res => {
                if(res && res.code === '200'){
                    this.query();
                    this.delVisible = false;
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                        plain: true,
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        handleEdit(){
            upd(this.itemForm)
            .then(res => {
                if(res && res.code === '000000'){
                    this.editVisible = false;
                    this.query();
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                        plain: true,
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
            
        },
        qryDetailById(merchantId){
            let param = {
                merchantId: merchantId
            }
            qryById(param)
            .then(res => {
                if(res && res.code === '000000'){
                    console.log("res.data",res)
                    this.itemForm = res.data;
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
       
        query(){
            qryList(this.conditionForm)
            .then(res => {
                console.log(">>>>>>res>>>>>>",res)
                if(res && res.code === '200'){
                    this.tableData = res.data;
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        goMerchantDetail(index,row){
            console.log("进入详情页");
            router.push({
                path:'/merchantDetail',
                query: {
                    merchantId: row.merchantId
                }
            });
        }
    },

    // computed:{
    //     filterTableData(){
    //         return this.tableData.filter((item)=>{
    //             let type = item.type;
    //             if(type === conditionForm.type){
    //                 return true;
    //             }
    //             return false;
    //         })
    //     }
    // }
};
</script>
    
<style lang="scss" scoped>
</style>