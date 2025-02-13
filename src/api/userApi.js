import request from '@/utils/request';

export default{
    register(user){
        return request({
            method: "post",
            url: `/user/reg`,
            data: user
        });
    },
    login(user){
        return request({
            url: `/user/login`,
            method: 'post',
            data: user
        });
    },
    getUserInfo(token){
        return request({
            url: `/user/info`,
            method: 'get',
            params: {
                token
            }
        });
    },
    logout(){
        return request({
            url: `/user/logout`,
            method: 'post'
        })
    },
    updateNickname(userId,nickname){
        return request({
            url: `/user/nickname`,
            method: 'put',
            params:{
                userId,nickname
            }
        })
    },
    getNewToken(){
        return request({
            method: "get",
            url: `/user/token`
        });
    },

    updatePassword(userId,password,newPassword){
        return request({
            url: `/user/password`,
            method: 'put',
            data:{
                userId,password,newPassword
            }
        })
    },
    updateAvatar(userId,filename){
        return request({
            method: "put",
            url: `/user/avatar`,
            data: {
                userId,filename
            }
        });
    }

}