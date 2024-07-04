<template>
    <div>
        <el-form :inline="true" :model="formCondition" class="demo-form-inline">
            <div>
                <el-form-item label="用户Id">
                    <el-input v-model="formCondition.userId" placeholder="请输入Id"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="formCondition.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
            </div>
        </el-form>

        <el-table :data="tableData" style="width: 80%">
            <el-table-column label="userId" prop="userId" />
            <el-table-column label="userName" prop="userName" />
            <el-table-column label="userPassword" prop="userPassword" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="formCondition.userPassword" size="small" placeholder="userPassword to search" @change="query"/>
                </template>
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
                    <el-button size="small" @click="clickSel(scope.$index, scope.row)">
                    Sel
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
            <el-form>
            <el-form-item label="userId">
                <el-input v-model="addForm.userId" ></el-input>
            </el-form-item>
                <el-form-item label="userName">
                    <el-input v-model="addForm.userName" ></el-input>
                </el-form-item>
                <el-form-item label="userPassword">
                    <el-input v-model="addForm.userPassword" ></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAdd">
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
        <span>确定删除 {{ delForm.userName }}</span>
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
                <el-form-item label="userId">
                    <el-input v-model="editForm.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="userName">
                    <el-input v-model="editForm.userName" ></el-input>
                </el-form-item>
                <el-form-item label="userPassword">
                    <el-input v-model="editForm.userPassword" ></el-input>
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

    <el-button style="margin-top: 20px;" type="primary" @click="goMerchantIndex">进入商户首页</el-button>

    <el-button style="margin-top: 20px;" type="primary" @click="goCommodityIndex">进入商品首页</el-button>
    
</template>
    
<script>
import { qryList,userAdd,userDel,userEdit,userSel} from "../../api/user";
import { ElMessage } from "element-plus";
import router from "../../router/router";
export default {
    data () {
        return {
            addVisible: false,
            delVisible: false,
            editVisible: false,
            selVisible: false,
            addForm: {
                userId: '',
                userName: '',
                password: ''
            },
            delForm: {
                userId: '',
                userName: '',
                password: ''
            },
            editForm: {
                userId: '',
                userName: '',
                password: ''
            },
            selForm: {
                userId: '',
                userName: '',
                password: ''
            },
            formCondition: {
                userId: '',
                userName: '',
                password: ''
            },
            tableData:[
                
            ]
        };
    },

    mounted() {
        console.log("登录角色："+localStorage.getItem('loginRole'))

        qryList(this.formCondition)
        .then(res => {
            console.log(">>>>>>res>>>>>>",res)
            if(res && res.code === '000000'){
                this.tableData = res.data;
            }
        })
        .catch(err => {
            console.log(err)
        })
    },

    methods: {

        clickAdd(){
            this.addVisible = true;
            this.addForm = {
                userId: '',
                userName: '',
                password: ''
            }
        },
        clickDel(index,row){
            this.delForm = row;
            this.delVisible = true;
        },
        clickEdit(index,row){
            this.editForm = row;
            this.editVisible = true;
        },
        clickSel(index,row){
            this.selForm = row;
            this.selVisible = true;
        },

        addClose(){
            this.addVisible = false;
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
            userAdd(this.addForm)
            .then(res => {
                console.log("handleAdd >>> res",res);
                if(res && res.code === '000000'){
                    this.addVisible = false;
                    this.query();
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
            userDel(this.delForm)
            .then(res => {
                if(res && res.code === '000000'){
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
            userEdit(this.editForm)
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
        handleSel(){
            userSel(this.selForm)
            .then(res => {
                if(res && res.code === '000000'){
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
       
        query(){
            qryList(this.formCondition)
            .then(res => {
                console.log(">>>>>>res>>>>>>",res)
                if(res && res.code === '000000'){
                    this.tableData = res.data;
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        goMerchantIndex(){
            router.push({path:'/merchantIndex'});
        },

        goCommodityIndex(){
            router.push({path:'/commodityIndex'});
        }
    },

    computed:{
        filterTableData(){
            return this.tableData.filter((item)=>{
                let type = item.type;
                if(type === formCondition.type){
                    return true;
                }
                return false;
            })
        }
    }
};
</script>
    
<style lang="scss" scoped>
</style>