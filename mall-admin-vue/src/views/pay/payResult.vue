<template>
    <div>
        <el-result icon="success" title="支付成功">
        </el-result>
        <el-button type="primary" size="medium" style="margin-left: 520px;" @click="goBackPayList">返回</el-button>
        <el-button @click="again"> 再来一单</el-button>
    </div>

</template>

<script>
export default {
    data() {
        return {
            contidion: {},
        };
    },

    mounted() {

    },

    methods: {
        goBackPayList() {

        },

        again() {

        }
    }



};
</script>

<style lang="scss" scoped></style>