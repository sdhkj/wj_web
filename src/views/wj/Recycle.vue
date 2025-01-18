<template>
    <div style="margin-top:30px;">
        <div class="top">
            <div class="title">回收站</div>
            <div class="search">
                <el-button type="danger" icon="Delete">清空回收站</el-button>
            </div>
        </div>

        <div class="list">
            <el-table :data="wjList" border stripe>
                <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
                <el-table-column prop="title" label="问卷名" align="center"></el-table-column>
                <el-table-column prop="fcd" label="发布时间" align="center" width="160"></el-table-column>
                <el-table-column prop="answerCount" label="答卷数" align="center" width="80"></el-table-column>
                <el-table-column label="清空数据" align="center" width="100">
                    <template v-slot="scope">
                        <el-link v-if="scope.row.answerCount > 0">清空数据</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="恢复" align="center" width="80">

                    <template v-slot="scope">
                        <el-icon color="green" size="18">
                            <RefreshLeft />
                        </el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="彻底删除" align="center" width="100">

                    <template v-slot="scope">
                        <el-icon color="red" size="18">
                            <CloseBold />
                        </el-icon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="color:red">
            重要提示：被删除的问卷保留3个月后将被彻底删除，无法再恢复运行！
        </div>
    </div>
    <div style="margin-top: 50px;"></div>
</template>

<script setup>
import { ref } from 'vue'


const wjList = ref([
    { id: 200303032, title: "Java基础测试", status: 0, statusDesc: '未发布', answerCount: 0, fcd: '2046/12/08 18:30' },
    { id: 200303039, title: "Docker培训评测", status: 0, statusDesc: '未发布', answerCount: 23, fcd: '2046/07/12 14:21', star: 1 },
    { id: 200303027, title: "SpringBoot3+Vue3综合测试", status: 1, statusDesc: '已发布', answerCount: 0, fcd: '2046/12/26 09:25' },
    { id: 200303052, title: "HTML第五章测试", status: 0, statusDesc: '未发布', answerCount: 0, fcd: '2046/12/08 18:30' },
    { id: 200303034, title: "Vue3基础知识测试", status: 0, statusDesc: '未发布', answerCount: 36, fcd: '2046/07/12 14:21', star: 1 },
    { id: 200303023, title: "八点半公司入职测试", status: 1, statusDesc: '已发布', answerCount: 0, fcd: '2046/12/26 09:25' }
]);


</script>

<style lang='scss' scoped>
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: 20px;
        color: black;
        font-weight: bold;
    }



}

.list {
    margin-bottom: 10px;
    padding: 15px 0;

    .el-icon {
        cursor: pointer;
    }
}
</style>