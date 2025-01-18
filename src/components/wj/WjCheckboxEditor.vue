<template>
    <div>
        <quill-editor theme="snow" :options="{ modules: { toolbar: false } }" v-model:content="localdata.questionDesc"
            contentType="html" placeholder="标题">
        </quill-editor>
        <div>
            <el-checkbox-group v-model="localdata.correctAnswer">
                <ul>
                    <li v-for="(answerItem, index) in localdata.answerOptions" :key="index">
                        <div class="left">
                            <div><el-checkbox  :label="answerItem.answerDesc" size="large">&nbsp;</el-checkbox ></div>
                            <el-input type="textarea" placeholder="请完善该选项内容" :rows="1" autosize v-model="answerItem.answerDesc" class="input"></el-input>
                        </div>

                        <div class="right">
                            <div class="button">
                                <el-button type="primary" icon="Plus" circle size="small" @click="addItem(index)" ></el-button>
                                <el-button type="danger" icon="Minus" circle size="small" @click="deleteItem(index)"></el-button>
                            </div>
                                <el-checkbox  :label="answerItem.answerDesc" style="margin-left: 20px;"   border>正确答案</el-checkbox >
                        </div>
                    </li>
                </ul>
            </el-checkbox-group>
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

 


const addItem = (index) => {
    localdata.value.answerOptions.splice(index+1,0,{
        id: "",answerDesc: "", orderNum: 99
    });
    updateAnswerOptionsIndex()
}

const updateAnswerOptionsIndex = () => {
    //因插入或删除元素，整体重新更新orderNum属性值
    localdata.value.answerOptions = localdata.value.answerOptions.map((item,index) => {
        item.orderNum = index;
        return item;
    })
}

const deleteItem = (index) => {
    localdata.value.answerOptions.splice(index,1)
    updateAnswerOptionsIndex()
}



</script>

<style lang='scss' scoped>
:deep(.quill-editor) {
    min-height: 100px;
}

.el-checkbox-group {
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