<template>
    <div class="exam">
        <div class="main">
            <div class="title">
              您的测试结果
<!--                {{ examResult.title }}-->
            </div>

            <div style="padding: 0 40px 0;">
                <table class="result">
                    <tr>
                        <td>
                            <div
                                style="height: 100px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
                                <span style="font-size: 40px; color: #ff6a00;line-height: 50px; ">{{scoreResult.score}}</span>
                                <span style="color: #999999;font-weight: bolder;">得分</span>
                            </div>
                        </td>
                        <td>
                            <div
                                style=" height: 100px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
                                <span style=" font-size: 40px; color: #ff6a00;line-height: 50px;">{{scoreResult.correctNum}}</span>
                                <span style="color: #999999;font-weight: bolder;">答对</span>
                            </div>
                        </td>
                    </tr>

                    <tr style="height: 40px; font-size: 16px;background-color: #f5f5f5;text-align: center;">
                        <td>总分{{scoreResult.surveyScore}}</td>
                        <td>共{{scoreResult.questionNumber}}题</td>
                    </tr>
                </table>
            </div>

            <div style="margin-bottom: 50px;text-align: center;">
                <el-button type="primary" plain @click="viewAnwserKey">
                    <span v-if="answerKey">隐藏</span>
                    <span v-else>查看</span>
                    答题解析 <el-icon style="margin-left: 3px;">
                        <ArrowDownBold />
                    </el-icon></el-button>

            </div>

            <div v-if="answerKey">
                <div style="padding: 5px 40px;" v-for="(item, index) in examResult.examineeList" :key="item.id">
                    <div class="question" style="font-size: 16px; ">
                        <span style="font-weight: bolder">{{ item.content }}：</span>
                         {{ item.userAnswer }} 
                    </div>
                </div>
                <div class="card" v-for="(item, index) in examResult.questionList" :key="item.id">
                    <div class="question">
                        <span style="margin-right: 5px;">{{ index + 1 }}.</span>
                        <div v-html="item.content"></div>
                        
                    </div>
                    <div class="answerList">
                        <component :is="item.component" :localdata="item" :disabled="true"
                            style="width: 18px;padding: 0; margin-right: 10px; ">
                        </component>
                        <div v-if="item.answerValid == 1" class="answer-desc">
                            <div style="display: flex;align-items: center;">
                                <el-icon color="#01ad56" size="24"><CircleCheckFilled /></el-icon>
                                回答正确
                            </div>
                            <div>+{{item.score}}分</div>
                        </div>
                        <div v-else class="answer-desc" style="color: red;">
                            <div style="display: flex;align-items: center;">
                                <el-icon color="red" size="24"><CircleCloseFilled /></el-icon>
                                回答错误
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <img src="/src/assets/logo1.png" style="height: 16px;border-radius: 5px;">
                <span style="margin: 0 10px 0 3px;">在线问卷</span>
<!--                <span style="color: #bebebe;">青青菜鸟提供技术支持</span>-->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const answerKey = ref(false)
const viewAnwserKey = () => {
    answerKey.value = !answerKey.value;
}


import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
import surveyApi from '@/api/surveyApi';
let scoreId = route.query.scoreId;
const scoreResult = ref({})
const getExamResult = async() => {
  let res = await surveyApi.getExamResult(scoreId);
  scoreResult.value = res.data;
}
getExamResult();




// const examResult = ref({
//     title: 'XXX测试结果',
//     questionList: [
//         {
//             id: 0, content: "关于Java描述，以下错误的是？", component: "WjRadioList", questionType: 1, questionTypeDesc: '单选', orderNum: 0,
//             answerOptions: [
//                 { id: 0, optionContent: "Java语言是一种面向对象的编程语言", correctAnswer: 0, orderNum: 0 },
//                 { id: 1, optionContent: "运行效率比C语言更快", correctAnswer: 1, orderNum: 1 },
//                 { id: 2, optionContent: "支持多线程", correctAnswer: 0, orderNum: 2 },
//                 { id: 3, optionContent: "Java不依赖于平台，具备可移植性", correctAnswer: 0, orderNum: 3 },
//             ], correctAnswer: [],answerValid:1,score:10
//         },
//         {
//             id: 1, content: "Redis有什么特点？", component: "WjCheckboxList", questionType:2, questionTypeDesc: '多选', orderNum: 1,
//
//             answerOptions: [
//                 { id: 0, optionContent: "非关系型数据库", correctAnswer: 1, orderNum: 0 },
//                 { id: 1, optionContent: "存取速度贼快，因为它把数据都读取到内存当中操作", correctAnswer: 1, orderNum: 1 },
//                 { id: 2, optionContent: "提供了丰富的数据结构", correctAnswer: 1, orderNum: 2 },
//                 { id: 3, optionContent: "是MySql的良好替代品", correctAnswer: 0, orderNum: 3 },
//             ], userAnswer: "2",correctAnswer:"0,1,2"
//         },
//         {
//             id: 2, content: "关于微服务架构描述错误的是", component: "WjRadioList", questionType: 1, questionTypeDesc: '单选', orderNum: 1,
//             answerOptions: [
//                 { id: 0, optionContent: "微服务架构的本质依然是面向服务的其本质依然是解耦展现层与业务层", correctAnswer: 1, orderNum: 0 },
//                 { id: 1, optionContent: "微服务架构中，服务是自治的，之间采用轻量级通信，去掉了ESB集中转发", correctAnswer: 1, orderNum: 1 },
//                 { id: 2, optionContent: "微服务间绝对没有依赖关系，可独立开发、部署，无需考虑服务前向兼容", correctAnswer: 1, orderNum: 2 },
//                 { id: 3, optionContent: "与面向服务架构相比，微服务划分粒度更细，通常设计遵循单一职责原则", correctAnswer: 0, orderNum: 3 },
//             ], userAnswer: "2",correctAnswer:"2",answerValid:1,score:10
//         }
//     ]
// })


</script>

<style lang='scss' scoped>
.exam {
    justify-content: center;
    padding-top: 80px;
    background-image: linear-gradient(-45deg, #d9effc, #f5f5f5, #dfe5fe);
    min-height: 100vh;
    width: 100%;

    .main {
        margin: 0 auto;
        width: 900px;
        background-color: white;

        .title {
            height: 100px;
            padding: 40px 0 30px;
            color: #0095ff;
            font-weight: bolder;
            font-size: 24px;
            text-align: center;
        }

        .result {
            width: 100%;
            margin: 20px auto 50px;
            border-collapse: collapse;

            td {
                border: 1px solid #efefef;
            }
        }

        .card {
            padding: 30px 0 30px;

            .question {
                color: 16px;
                padding: 0 40px 0;
                display: flex;
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
</style>