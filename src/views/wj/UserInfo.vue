<template>
    <div class="user">
        <div>
            <span class="title">注册信息</span>
            <div class="info">
                <el-row class="row">
                    <el-col :span="5" class="label">用户名</el-col>
                    <el-col :span="19" class="value">
                      <span>{{ user.username }}</span>
                    </el-col>
                </el-row>
              <el-row class="row">
                <el-col :span="5" class="label">昵称</el-col>
                <el-col :span="19" class="value else" >
                  <span>{{ user.nickname }}</span>
                  <div class="right">
                    <el-icon @click="openNicknameWindow">
                      <EditPen />
                    </el-icon>
                  </div>
                </el-col>
              </el-row>
                <el-row class="row">
                    <el-col :span="5" class="label">账号ID</el-col>
                    <el-col :span="19" class="value">{{ user.id }}</el-col>
                </el-row>
<!--                <el-row class="row">-->
<!--                    <el-col :span="5" class="label">账户类型</el-col>-->
<!--                    <el-col :span="19" class="value" v-if="user.userType != 0">{{ user.userTypeDesc }}</el-col>-->
<!--                    <el-col :span="19" class="value else" v-else>-->
<!--                        <span>{{ user.userTypeDesc }}</span>-->
<!--                        <div class="right">-->
<!--                            <el-button type="primary" size="small"-->
<!--                                style="background-color:#ff8000 ;border: none">升级</el-button>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                </el-row>-->
                <el-row class="row">
                    <el-col :span="5" class="label">邮件地址</el-col>
                    <el-col :span="19" class="value" v-if="user.email">{{ user.email }}</el-col>
                    <el-col :span="19" class="value else" v-else>
                        <span>未设置</span>
                        <div class="right">
                            <span>设置后可用邮件地址登录</span>
                            <el-icon>
                                <EditPen />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5" class="label">手机号码</el-col>
                    <el-col :span="19" class="value else">
                        <span>{{ user.phone }}</span>
                        <div class="right">
                            <span>已验证</span>
                            <el-icon>
                                <EditPen />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5" class="label">微信</el-col>
                    <el-col :span="19" class="value else">
                        <span>已绑定</span>
                        <div class="right">
                            <el-link :underline="false" style="text-decoration: underline;color: #0095ff;">解绑</el-link>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5" class="label">密码</el-col>
                    <el-col :span="19" class="value else">
                        <el-link :underline="false" style="text-decoration: underline;color: #0095ff;">修改密码</el-link>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div>
            <span class="title">企业信息</span>
            <div class="info">
                <el-row class="row">
                    <el-col :span="5" class="label">企业名称</el-col>
                    <el-col :span="19" class="value">
                        <el-link :underline="false" style="text-decoration: underline;color: #0095ff;">请输入</el-link>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5" class="label">企业LOGO</el-col>
                    <el-col :span="19" class="value">
                        暂无
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5" class="label">自定义域名</el-col>
                    <el-col :span="19" class="value">
                        <el-link :underline="false" style="text-decoration: underline;color: #0095ff;">设置域名</el-link>
                    </el-col>
                </el-row>
            </div>
        </div>

    </div>

  <el-dialog v-model="dialogFormVisibleNickname" title="修改昵称" width="600">
    <el-form :model="nicknameForm" :rules="nicknameFormRules" ref="nicknameFormRef">
      <el-form-item label="新昵称" :label-width="formLabelWidth" prop="nickname">
        <el-input v-model="nicknameForm.nickname" style="width: 80%;" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisibleNickname = false">取消</el-button>
        <el-button type="primary" @click="updateNickname">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup>
import { ref,toRefs} from 'vue'
import { useUserStore } from '@/stores/user.js'
const userStore = useUserStore();
// 响应式处理，用户数据从pinia中获取
const {user} = toRefs(userStore)
// const user = ref({
//     username: "qingcai007",
//     nickname: "张三",
//     id: 2087212,
//     userType: 0,
//     userTypeDesc: "免费版",
//     email: "",
//     phone: "18899998899",
//     wechat: "qqcn007"
// })

const dialogFormVisibleNickname = ref(false)
const formLabelWidth = '110px'
const nicknameForm = ref({})
const openNicknameWindow = () => {
  dialogFormVisibleNickname.value = true;
}

const nicknameFormRules = ref({
  nickname: [
    {required: true, message: '请输入新昵称', trigger: 'blur'},
  ]
})

import { ElMessage } from 'element-plus'
const nicknameFormRef = ref();
import userApi from '@/api/userApi';
const updateNickname = async() => {
  let valid = await nicknameFormRef.value.validate(() => {});
  if(valid){
    let res = await userApi.updateNickname(user.value.id,nicknameForm.value.nickname)
    ElMessage({
      message: res.message,
      type: 'success',
    })
    dialogFormVisibleNickname.value = false;
    userStore.refreshToken()
  }
}
</script>

<style lang='scss' scoped>
.user {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;

    .title {
        color: #323232;
        font-size: 18px;
        font-weight: bolder;
        line-height: 50px;

    }

    .info {
        height: 320px;
        width: 496px;
        background-color: white;
        box-shadow: 0px 0px 1px lightgrey;
        padding: 20px 30px;

        .row {
            height: 36px;
            line-height: 36px;

            .label {
                font: 13px;
                color: #8c8c8c;
            }

            .value {
                font: 13px;
                color: #262626;
            }

            .else {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .right {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    .el-icon {
                        margin-left: 3px;
                        cursor: pointer;
                        color: #8c8c8c;
                    }

                    .el-icon:hover {
                        color: #ff8000;
                    }
                }
            }
        }
    }


}


</style>