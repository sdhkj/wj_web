<template>
    
        <div class="logo">
             <el-image src="/src/assets/logo1.png"></el-image>
            <span>在线问卷平台</span>
        </div>
        <div class="body" :style="{ backgroundImage: 'url(' + bgUrl + ')' }">
            <div class="login">
                <div class="login-tab">
                    <div class="item" :class="{ selected: activeIndex == 0 }" @click="changTab(0)">
                        <span>账号登录</span>
                        <div class="none" style="width: 40px;"></div>
                    </div>
                    <div class="item" :class="{ selected: activeIndex == 1 }" @click="changTab(1)">
                        <span>验证码登录</span>
                        <div class="none" style="width: 40px;"></div>
                    </div>
                </div>
                <div class="login-form">
                    <el-form ref="userFormRef" :model="userForm" :rules="rules" v-if="activeIndex == 0">
                        <el-form-item prop="username">
                            <el-input v-model="userForm.username" placeholder="用户名/手机号码" prefix-icon="User" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="userForm.password" type="password" placeholder="密码" prefix-icon="Lock" />
                        </el-form-item>
                        <el-form-item>
                            <div style="width:100%; display: flex;justify-content: space-between;align-items: center;">
                                <div>
                                    <el-checkbox style="height: 20px;line-height: 20px;" v-model="userForm.autoLogin"
                                        label="下次自动登录" size="small" />
                                </div>
                                <div style="position: relative;bottom: 2px;">
                                    <el-link>忘记用户名/密码?</el-link>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                    <el-form ref="userFormRef" :model="userForm" :rules="rules" v-else>

                        <el-form-item prop="phone">
                            <el-input v-model="userForm.phone" placeholder="手机号码" prefix-icon="Iphone" />
                        </el-form-item>



                        <el-form-item prop="captcha">
                            <el-input v-model="userForm.captcha" placeholder="验证码" prefix-icon="Message">
                                <template #append>
                                    <el-button @click="getSmsCaptcha">获取验证码</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <div style="height: 51px;"></div>
                    </el-form>

                    <el-button type="primary" :loading = "loading" @click="login"
                        style="width: 100%;height: 40px;background-color: #f79000;border: none; outline: none;">登录
                        </el-button>
                    <div style="margin:20px 0; height: 30px; display: flex; justify-content: center;">
                        <el-link href="/reg" :underline="false"
                            style="text-decoration: underline;color: #0095ff;">立即注册</el-link>
                    </div>
                    <div style="margin: 30px 0;">
                        <el-divider>
                            <span style="color: #a6a6a6;font-size: 12px;">更多登录方式</span>
                        </el-divider>
                    </div>

                    <div class="otherLogin">
                        <div @mouseenter="switchImg(index, item.img1)" @mouseleave="switchImg(index, item.img0)"
                            class="item" v-for="(item, index) in otherLogins " :key="item.id">
                            <el-image :src="item.img"></el-image>
                            {{ item.desc }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 背景图描述 -->
        <div style="width: 250px;position: fixed;right: 100px;bottom: 70px;">
            <div style="font-size: 20px;color: white;"></div>
            <div style="font-size: 14px;color: white;line-height: 30px;padding-left: 10px;"></div>
        </div>
</template>

<script setup >
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();

import { ElMessage } from 'element-plus'
const userFormRef = ref()
import {useUserStore} from "@/stores/user.js";
import userApi from "@/api/userApi.js";
import smsApi from "@/api/smsApi.js";

const loading = ref(false)
const login = async () => {
    // router.push({
    //     path: '/'
    // })
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 3000);
    // 表单验证
    let valid = await userFormRef.value.validate(() => {});
    if(valid){

    // 调用登录接口
    let userStore = useUserStore();
    let loginRes =  await userStore.login(userForm.value);

    // 调用token换取用户信息接口
    await userStore.getUserInfo(loginRes.data)
    // 成功提示，跳转到首页
    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    setTimeout(() => {
      router.replace({
        path: '/'
      })
    }, 1000);
  }
}

/*const login = async () => {
  loading.value = true;
  try {
    let valid = await userFormRef.value.validate(() => {});
    if (valid) {
      if (activeIndex.value === 1) {
        // 验证码登录
        let captchaRes = await smsApi.checkCaptcha(userForm.value.phone, userForm.value.captcha);
        if (captchaRes.data === true) {
          // 调用登录接口
          let userStore = useUserStore();
          let loginRes = await userStore.login(userForm.value);
          // 调用token换取用户信息接口
          await userStore.getUserInfo(loginRes.data);
          // 成功提示，跳转到首页
          ElMessage({
            message: '登录成功',
            type: 'success',
          });
          setTimeout(() => {
            router.replace({
              path: '/'
            });
          }, 1000);
        } else {
          ElMessage({
            message: captchaRes.data.message,
            type: 'error',
          });
        }
      } else {
        // 账号密码登录
        let userStore = useUserStore();
        let loginRes = await userStore.login(userForm.value);
        // 调用token换取用户信息接口
        await userStore.getUserInfo(loginRes.data);
        // 成功提示，跳转到首页
        ElMessage({
          message: '登录成功',
          type: 'success',
        });
        setTimeout(() => {
          router.replace({
            path: '/'
          });
        }, 1000);
      }
    }
  } catch (error) {
    ElMessage({
      message: error.response?.data?.message || '登录失败',
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
};*/

let otherLogins = ref([
    { id: 1, desc: 'QQ登录', img: '/src/assets/images/qq0.png', img0: '/src/assets/images/qq0.png', img1: '/src/assets/images/qq1.png' },
    { id: 2, desc: '微信登录', img: '/src/assets/images/wx0.png', img0: '/src/assets/images/wx0.png', img1: '/src/assets/images/wx1.png' },
    { id: 3, desc: '支付宝登录', img: '/src/assets/images/zfb0.png', img0: '/src/assets/images/zfb0.png', img1: '/src/assets/images/zfb1.png' },
])
const switchImg = (index, img) => {
    otherLogins.value[index].img = img;
}

const userForm = ref({})
const rules = ref({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度6~20', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入手机号码', trigger: 'blur'},

  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' }
  ]
})

const bgUrl = ref('/src/assets/images/bjf.jpg');

const activeIndex = ref(0)
const changTab = (index) => {
    activeIndex.value = index;
}

const getSmsCaptcha = async () => {
    let valid = await userFormRef.value.validateField("phone",()=>{})
    if(valid){
        let res = await smsApi.getCaptcha(userForm.value.phone)
        ElMessage({
            message: '验证码已发送',
            type: 'success',
        })
    }
}


</script>

<style lang="scss" scoped>
@keyframes star {
    100% {
        filter: hue-rotate(360deg);
    }
}
.logo {
    position: fixed;
    left: 80px;
    top: 50px;
    color: #63acdb;
    font-size: 25px;
    font-weight: bold;
    display: flex;
    align-items: center;
    // text-shadow: -2px -2px 5px white;

    .el-image {
        width: 40px;
        //border-radius: 20px;
        //background-color: rgba(255, 57, 155, 0.99);
		    //background-image: conic-gradient(red, #ff399b, #5282b0, red);
        //animation: star 5s linear infinite;
        margin-right: 10px;
        //opacity: 0.8;
        //box-shadow: 0 0 10px white;
    }
}

.body {
    height: 100vh;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    .login {
        width: 480px;

        background-color: white;
        border-radius: 12px;
        padding: 40px;

        .login-tab {
            display: flex;
            color: #8c8c8c;
            font-weight: 600;
            font-family: Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;

            .item {
                cursor: pointer;
                margin-right: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 20px;

                .none {
                    color: white;
                }
            }

            .selected {
                color: #262626;
                font-family: '微软雅黑';

                .none {
                    border: 1px solid #f79000;
                }
            }
        }

        .login-form {
            margin-top: 40px;

            .el-input {
                height: 40px;
            }

            /* 修改输入后获得焦点的颜色 */
            .el-input {
                --el-input-focus-border-color: #f79000;
            }
        }

        .otherLogin {
            display: flex;
            justify-content: space-around;
            color: #8c8c8c;
            font-size: 12px;

            .item {
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;

                .el-image {
                    margin-bottom: 6px;
                    width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    border: 1px solid lightgray;
                    padding: 0;
                }
            }
            .item:hover .el-image{
                border: none;
            }
        }
    }
}</style>