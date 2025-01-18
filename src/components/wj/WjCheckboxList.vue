<template>
    <div class="answerOptions">
        <el-checkbox-group v-model="localdata.correctAnswer" :disabled="localdata.disabled">
            <ul type="none" style="padding: 0 15px;">
                <li v-for="(item, index) in localdata.answerOptions" :key="item.id">
                    <el-checkbox :label="item.id" size="large">
                        {{ item.answerDesc }}
                        <span class="correct" v-if="localdata.correctAnswer.includes(item.id) && localdata.disabled" style="margin-left: 20px;color: limegreen">（正确答案）</span>
                    </el-checkbox>
                </li>
            </ul>
        </el-checkbox-group>
    </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
const props = defineProps(['localdata'])
const { localdata } = toRefs(props)


</script>

<style lang='scss' scoped>
.answerOptions {
    .el-checkbox {
        :deep(.el-checkbox__input.is-disabled+span.el-checkbox__label) {
            color: #606266 !important;
        }
        --el-checkbox-disabled-checked-icon-color:white;
        --el-checkbox-disabled-checked-input-fill: #409eff;
        --el-checkbox-disabled-checked-input-border-color:#409eff;

    }
}
</style>