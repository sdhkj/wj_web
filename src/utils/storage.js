const tokenKey = "Authorization"
export default {
    setStorageToken(token){
        localStorage.setItem(tokenKey, "Bearer " + token)
    },
    getStorageToken(){
        return localStorage.getItem(tokenKey)
    },
    removeStorageToken(){
        localStorage.removeItem(tokenKey)
    }
}