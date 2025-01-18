<template>
    <div class="blanknew">
        <div class="title">
            创建{{ route.query.wjTypeName }}问卷
        </div>
        <div class="method">
            <div class="blank">
                <div style="color: #262626;font-size: 18px; font-weight: bolder;">从空白创建</div>
                <el-input style="height: 40px;" v-model="wj.title" placeholder="请输入标题"></el-input>
                <el-button @click="createWj" style="height: 40px;" type="primary">立即创建</el-button>
            </div>
            <div class="text">
                <div style="color: #262626;font-size: 18px; font-weight: bolder;">文本导入</div>
                <div style="color: #a6a6a6;display: flex;flex-direction: column; align-items: center;height: 70px;">
                    <span>批量导入，自由编辑</span>
                    <span>自动生成问卷</span>
                </div>
                <div>
                    <el-icon size="56" color="#ff9604"><Document /></el-icon>
                </div>
            </div>
            <div class="manual">
                <div style="color: #262626;font-size: 18px; font-weight: bolder;">人工录入服务</div>
                <div style="color: #a6a6a6;display: flex;flex-direction: column; align-items: center;height: 70px;">
                    <span>客服协助录入</span>
                    <span>便捷省事</span>
                </div>
                <div>
                    <el-icon size="56" color="#00cd71"><User /></el-icon>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <img src="/src/assets/logo1.png" style="background-color: #ff399b;height: 16px;border-radius: 5px;">
        <span style="margin: 0 10px 0 3px;">问卷君</span>
        <span style="color: #bebebe;">青青菜鸟提供技术支持</span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();

const wj = ref({})
const createWj = () => {
    router.push({
        path: '/wj/design'
    })
}

</script>

<style lang='scss' scoped>
.blanknew {
    width: 1000px;

    .title {
        font-size: 20px;
        color: #262626;
        line-height: 68px;
    }
    .method{
        display: flex;
        justify-content: space-between;
        .blank{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 592px;
            height: 268px;
            background-color: white;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
            padding: 36px 40px 40px;
        }
        .text, .manual{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 192px;
            height: 268px;
            background-color: white;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
            padding: 36px 0 40px;
        }
    }
}
.footer {
    font-size: 14px;
    color: #8c8c8c;
    height: 50px;
    line-height: 50px;
    background-color: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 20px;
}
</style>