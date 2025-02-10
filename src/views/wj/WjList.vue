<template>
    <div style="margin-top:30px;">
        <div class="top">
            <div class="title">问卷列表</div>
            <div class="search">
                <el-dropdown>
                    <div class="order" style="width:80px;">
                        <div>{{selectedOrder}}</div><el-icon>
                            <DCaret />
                        </el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="selectOrder(item.paramName,item.paramValue)"
                             v-for="(item, index) in orderList " :key="item.id">{{item.paramName}}</el-dropdown-item>
<!--                            <el-dropdown-item>时间正序</el-dropdown-item>-->
<!--                            <el-dropdown-item>答卷倒序</el-dropdown-item>-->
<!--                            <el-dropdown-item>答卷正序</el-dropdown-item>-->
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown>
                    <div class="order" style="width: 80px;">
                        <span>{{selectedStatus}}</span><el-icon>
                            <DCaret />
                        </el-icon>
                    </div>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="selectStatus(item.paramName,item.paramValue)" v-for="(item, index) in statusList " :key="item.id">{{item.paramName}}</el-dropdown-item>
<!--                            <el-dropdown-item>已发布</el-dropdown-item>-->
<!--                            <el-dropdown-item>未发布</el-dropdown-item>-->
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-input v-model="searchModel.title" @keydown.enter="getSurveyList" placeholder="请输入问卷名进行搜索..." suffix-icon="Search">
                </el-input>
            </div>
        </div>

        <div class="list">
            <WjCard v-for="(item, index) in wjList" :key="item.id" :localdata="item" :statusDesc = "getStatusDesc(item.status)"></WjCard>
        </div>
        <el-pagination v-model:current-page="searchModel.pageNo" v-model:page-size="searchModel.pageSize"
            :page-sizes="[5, 10,20]" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <div style="margin-top: 50px;"></div>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();

import baseApi from '@/api/baseApi';

const orderList = ref([]);
const selectedOrder = ref("");
const getOrderParamList = async () => {
  let res = await baseApi.getParamListByBaseName("surveyOrder")
  orderList.value = res.data;
  selectedOrder.value = orderList.value[0].paramName;
}
getOrderParamList();

// 以时间为条件分页查询
const selectOrder = (paramName,paramValue) => {
  selectedOrder.value = paramName;
  searchModel.value.orderCondition = paramValue;
  getSurveyList()
}

const statusList = ref([]);
const selectedStatus = ref("");
const statusMap = new Map();
// const statusList = [
//   {id:0, paramName: "状态", paramValue: null},
//   {id:1, paramName: "编辑中", paramValue: 0},
//   {id:2, paramName: "已就绪", paramValue: 1},
//   {id:3, paramName: "已发布", paramValue: 2}
// ]


const getStatusList = async () => {
  let res = await baseApi.getParamListByBaseName("surveyStatus")
  statusList.value = res.data;
  selectedStatus.value = statusList.value[0].paramName;
  statusList.value.forEach(item => {
    statusMap.set(item.paramValue, item.paramName)
  });
  console.log(statusMap);

  getSurveyList();

}

getStatusList();

const getStatusDesc = (status) => {
  console.log(status," ----> ", statusMap.get(status+""));
  return statusMap.get(status+"")
}

const total = ref(0)
const wjList = ref([]);
const searchModel = ref({
  pageNo: 1,
  pageSize: 5
})

import surveyApi from "@/api/surveyApi.js";
const getSurveyList = async () => {
  let res = await surveyApi.getSurveyList(searchModel.value)
  wjList.value = res.data.rows;
  total.value = res.data.total;
}






const handleSizeChange = (pageSize) => {
  searchModel.value.pageSize = pageSize;
  getSurveyList();
}

const handleCurrentChange = (pageNo) => {
  searchModel.value.pageNo = pageNo;
  getSurveyList();
}









// 以状态为条件分页查询
const selectStatus = (paramName,paramValue) => {
  selectedStatus.value = paramName;
  searchModel.value.status = paramValue;
  getSurveyList()
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