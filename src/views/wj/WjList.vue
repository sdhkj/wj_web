<template>
    <div style="margin-top:30px;">
        <div class="top">
            <div class="title">问卷列表</div>
            <div class="search">
                <el-dropdown>
                    <div class="order" style="width:80px;">
                        <div>时间倒序</div><el-icon>
                            <DCaret />
                        </el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>时间倒序</el-dropdown-item>
                            <el-dropdown-item>时间正序</el-dropdown-item>
                            <el-dropdown-item>答卷倒序</el-dropdown-item>
                            <el-dropdown-item>答卷正序</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown>
                    <div class="order" style="width: 80px;">
                        <span>状态</span><el-icon>
                            <DCaret />
                        </el-icon>
                    </div>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>状态</el-dropdown-item>
                            <el-dropdown-item>已发布</el-dropdown-item>
                            <el-dropdown-item>未发布</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-input v-model="searchModel.surveysName" placeholder="请输入问卷名进行搜索..." suffix-icon="Search">
                </el-input>
            </div>
        </div>

        <div class="list">
            <WjCard v-for="(item, index) in wjList" :key="item.id" :localdata="item"></WjCard>
        </div>
        <el-pagination v-model:current-page="searchModel.pageNo" v-model:page-size="searchModel.pageSize"
            :page-sizes="[5, 10]" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <div style="margin-top: 50px;"></div>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();

const wjList = ref([
    { id: 200303032, title: "Java基础测试", status: 0, statusDesc: '未发布', answerCount: 0, fcd: '2046/12/08 18:30' },
    { id: 200303039, title: "Docker培训评测", status: 0, statusDesc: '未发布', answerCount: 23, fcd: '2046/7/12 14:21', star: 1 },
    { id: 200303027, title: "SpringBoot3+Vue3综合测试", status: 1, statusDesc: '已发布', answerCount: 0, fcd: '2046/12/26 09:25' },
    { id: 200303044, title: "UniApp入门测试", status: 1, statusDesc: '已发布', answerCount: 0, fcd: '2046/12/29 12:13' }
]);




const searchModel = ref({})
const total = ref(4)

const handleSizeChange = () => {

}

const handleCurrentChange = () => {

}

if (router.currentRoute.value.query.star == 1) {
    let count = 0;
    wjList.value = wjList.value.filter(item => {
        if (item.star == 1) {
            count++;
            return item;
        }
    }) 
    total.value = count;
}

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

    .search {
        display: flex;
        align-items: center;

        .el-input {
            height: 40px;
            border-radius: 20px;
        }

        .order {
            cursor: pointer;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
            font: 14px;
            color: #a6a6a6;
            border: none;
            outline: none;
        }
    }


}

.list {
    margin-bottom: 10px;
}
</style>