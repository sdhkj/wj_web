<template>
    <div>
        <quill-editor theme="snow" :options="{ modules: { toolbar: false } }" v-model:content="localdata.content"
            contentType="html" placeholder="请输入试题描述" @blur="updateSurveyQuestion">
        </quill-editor>
        <div>
            <el-radio-group v-model="localdata.correctAnswer" @change="updateSurveyQuestion">
                <ul>
                    <li v-for="(answerItem, index) in localdata.answerOptions" :key="index">
                        <div class="left">
                            <div><el-radio :label="answerItem.id" size="large">&nbsp;</el-radio></div>
                            <el-input type="textarea" @blur="updateSurveyQuestionOption(index)" placeholder="请完善该选项内容" :rows="1" autosize v-model="answerItem.optionContent" class="input"></el-input>
                        </div>

                        <div class="right">
                            <div class="button">
                                <el-button type="primary" icon="Plus" circle size="small" @click="addItem(index)" ></el-button>
                                <el-button type="danger" icon="Minus" circle size="small" @click="deleteItem(index)"></el-button>
                            </div>
                                <el-radio :label="answerItem.id" style="margin-left: 20px;"   border>正确答案</el-radio>
                        </div>
                    </li>
                </ul>
            </el-radio-group>
        </div>
    </div>
</template>

<script setup>
import { ref,watchEffect,onMounted } from 'vue'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { toRefs } from 'vue'
const props = defineProps(['localdata'])
const { localdata } = toRefs(props)
localdata.value.correctAnswer = localdata.value.correctAnswer -0;

import {ElMessage, ElMessageBox} from 'element-plus'
import surveyApi from '@/api/surveyApi';
const updateSurveyQuestion = async () => {
  localdata.value.content = localdata.value.content.replace(/<img/g, "<img style='max-width:100%;height:auto'");
  let res = await surveyApi.updateSurveyQuestion(localdata.value)
  ElMessage({
    message: '更新成功',
    type: 'success',
  })
}

const updateSurveyQuestionOption = async(index) => {
  let option = localdata.value.answerOptions[index];
  await surveyApi.updateSurveyQuestionOption(option);
  ElMessage({
    message: '更新成功',
    type: 'success',
  })
}

const addItem = async (index) => {
  let option = localdata.value.answerOptions[index];
  let newOption = {
      questionId: option.questionId,
      surveyId: option.surveyId,
      orderNum: option.orderNum,
  }
  await surveyApi.addSurveyQuestionOption(newOption)
  let res = await surveyApi.getSurveyQuestionOptionList(option.questionId)
  localdata.value.answerOptions = res.data;
}

const deleteItem = (index) => {
  let option = localdata.value.answerOptions[index];
  ElMessageBox.confirm('确定删除该选项吗？', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
     await surveyApi.deleteSurveyQuestionOption(option.id);
     let res = await surveyApi.getSurveyQuestionOptionList(option.questionId)
     localdata.value.answerOptions = res.data;
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
  })
  .catch(() => {

  })
}


// 当 WjRadioEditor.vue 组件被创建并挂载时，localdata 会从父组件传递过来

/* const questionForm = ref({
    correctAnswer: [],
    answerOptions: [
        { id: "", answerDesc: "选项1", orderNum: 0 },
        { id: "", answerDesc: "选项2" , orderNum: 1},
        { id: "", answerDesc: "选项3" , orderNum: 2},
        { id: "", answerDesc: "选项4", orderNum: 3},
    ]
}) */






const updateAnswerOptionsIndex = () => {
    localdata.value.answerOptions = localdata.value.answerOptions.map((item,index) => {
        item.orderNum = index;
        return item;
    })
}





</script>

<style lang='scss' scoped>
:deep(.quill-editor) {
    min-height: 100px;
}

.el-radio-group {
    width: 100%;

    ul {
        padding: 15px 0;
        width: 100%;

        li {

            display: flex;
            align-items: center;
            justify-content: space-between;



            .left {
                display: flex;
                align-items: center;

                .input {
                    margin-left: -10px;
                    width: 600px;
                    border: none;
                    --el-input-border-color: white;
                }

                .input:hover {
                    --el-input-border-color: #e8e8e8;
                }
            }

            .right {

                height: 40px;
                line-height: 40px;
                display: flex;
                align-items: center;

                .button{
                    display: none;
                }
                
            }

        }

        li:hover .right>.button{
            display: block;
        }

    }

}</style>