<template>
    <div class="exam">
        <div class="main">
            <el-watermark :content="config.content" :font="config.font" :z-index="config.zIndex" :rotate="config.rotate"
                :gap="config.gap">
                <div class="logo"></div>
            </el-watermark>
            <el-form :model="examForm">
                <div class="title">
                    {{ examForm.title }}
                </div>
                <div class="card" v-for="(item, index) in examForm.questionList1" :key="item.id">
                    <div class="question">{{ item.questionDesc }}：</div>
                    <div class="answerList">
                        <el-input style="width: 398px;height: 38px;" v-model="item.answer"></el-input>
                    </div>
                </div>
                <div class="card" v-for="(item, index) in examForm.questionList2" :key="item.id">
                    <div class="question">
                        <span>{{ index + 1 }}.</span>
                        {{ item.questionDesc }}
                        [ {{ item.questionTypeDesc }} ]
                    </div>
                    <div class="answerList">
                        <component :is="item.component" :localdata="item"
                            style="width: 18px;padding: 0; margin-right: 10px; ">
                        </component>
                    </div>
                </div>
            </el-form>
            <div style="height: 200px;text-align: center;line-height: 200px;">
                <el-button @click="submitExam" type="primary" size="large" icon="Select"
                    style="width: 200px;height: 44px;font-size: 16px">提
                    交</el-button>
            </div>
            <div class="footer">
                <img src="/src/assets/logo1.png" style="background-color: #ff399b;height: 16px;border-radius: 5px;">
                <span style="margin: 0 10px 0 3px;">问卷君</span>
                <span style="color: #bebebe;">青青菜鸟提供技术支持</span>
            </div>

        </div>
    </div>
    <div class="ttl">
        <el-icon color="red" size="20">
            <Clock />
        </el-icon>
        <span v-if="ttl > 0">{{ remainder }}</span>
        <span v-else>考试结束</span>
    </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();

const ttl = ref(90 * 60);
let ttlIntervalId = setInterval(() => {
    ttl.value -= 1;
}, 1000);

watchEffect(() => {
    if (ttl.value <= 0) {
        clearInterval(ttlIntervalId);
        // 提交考试
    }
})

const remainder = computed(() => {
    const hours = leftPad0(Math.floor(ttl.value / 3600));
    const minutes = leftPad0(Math.floor((ttl.value % 3600) / 60));
    const remainingSeconds = leftPad0(ttl.value % 60);

    return hours + ":" + minutes + ":" + remainingSeconds;
})

const leftPad0 = (str) => {
    if (str < 10) {
        return "0" + str;
    }
    return str;
}

const submitExam = () => {
    console.log(examForm.value);
    router.push("/exam/result")
}

const examForm = ref({
    title: "Java开发岗入职测试",
    questionList1: [
        {
            id: 0, questionDesc: "您的姓名", placeholder: "姓名", questionType: 4, questionTypeDesc: '填空', orderNum: 0, prefixIcon: "User"
        }
    ],
    questionList2: [
        {
            id: 0, questionDesc: "关于Java描述，以下错误的是？", component: "WjRadioList", questionType: 0, questionTypeDesc: '单选', orderNum: 0,
            answerOptions: [
                { id: 0, answerDesc: "Java语言是一种面向对象的编程语言", correctAnswer: 0, orderNum: 0 },
                { id: 1, answerDesc: "运行效率比C语言更快", correctAnswer: 1, orderNum: 1 },
                { id: 2, answerDesc: "支持多线程", correctAnswer: 0, orderNum: 2 },
                { id: 3, answerDesc: "Java不依赖于平台，具备可移植性", correctAnswer: 0, orderNum: 3 },
            ], correctAnswer: []
        },
        {
            id: 1, questionDesc: "Redis有什么特点？", component: "WjCheckboxList", questionType: 1, questionTypeDesc: '多选', orderNum: 1,
            answerOptions: [
                { id: 0, answerDesc: "非关系型数据库", correctAnswer: 1, orderNum: 0 },
                { id: 1, answerDesc: "存取速度贼快，因为它把数据都读取到内存当中操作", correctAnswer: 1, orderNum: 1 },
                { id: 2, answerDesc: "提供了丰富的数据结构", correctAnswer: 1, orderNum: 2 },
                { id: 3, answerDesc: "是MySql的良好替代品", correctAnswer: 0, orderNum: 3 },
            ], correctAnswer: []
        },
        {
            id: 2, questionDesc: "关于微服务架构描述错误的是", component: "WjRadioList", questionType: 0, questionTypeDesc: '单选', orderNum: 1,
            answerOptions: [
                { id: 0, answerDesc: "微服务架构的本质依然是面向服务的其本质依然是解耦展现层与业务层", correctAnswer: 1, orderNum: 0 },
                { id: 1, answerDesc: "微服务架构中，服务是自治的，之间采用轻量级通信，去掉了ESB集中转发", correctAnswer: 1, orderNum: 1 },
                { id: 2, answerDesc: "微服务间绝对没有依赖关系，可独立开发、部署，无需考虑服务前向兼容", correctAnswer: 1, orderNum: 2 },
                { id: 3, answerDesc: "与面向服务架构相比，微服务划分粒度更细，通常设计遵循单一职责原则", correctAnswer: 0, orderNum: 3 },
            ], correctAnswer: []
        }
    ]
})



const config = ref({
    content: '问卷君',
    font: {
        fontSize: 16,
        fontWeight: 100,
        color: 'rgba(0, 149, 255, 0.5)',
    },
    rotate: -22,
    gap: [100, 80]
})
</script>

<style lang='scss' scoped>
.exam {

    justify-content: center;
    padding-top: 80px;
    background-image: linear-gradient(-45deg, #d9effc, #f5f5f5, #dfe5fe);
    min-height: 100vh;

    .main {
        position: relative;
        margin: 0 auto;
        width: 900px;
        background-color: white;

        .logo {
            height: 90px;
            background-color: #bee4ff;
        }

        .title {
            height: 100px;
            padding: 40px 0 30px;
            color: #0095ff;
            font-weight: bolder;
            font-size: 24px;
            text-align: center;
        }

        .card {
            padding: 30px 0 30px;

            .question {
                color: 16px;
                padding: 0 40px 0;
            }

            .answerList {
                margin: 10px 0;
                color: #595959;
                padding: 0 40px 0;

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
        }
    }
}

.ttl {
    border-radius: 8px;
    background-color: #eebe77;
    font-size: 18px;
    color: white;
    padding: 10px 20px;
    position: fixed;
    right: 20px;
    top: 40%;
    display: flex;
    align-items: center;

    span {
        margin-left: 6px;
    }
}
</style>