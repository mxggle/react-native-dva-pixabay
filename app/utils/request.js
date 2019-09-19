import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true;

axios.interceptors.request.use((request) => {
    // post的bugfix
    if (request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        request.data = qs.stringify(request.data)
    }
    // ie cache策略
    if (request.method === 'get'){
        request.params = { ...request.params, stamp: new Date().getTime() }
    }

    return request
})

axios.interceptors.response.use(function(res){

    if(res.status === 200){
        return res.data
    }else{
        throw new Error(res.data.msg)
    }
    throw new Error("网络错误")
})

export default axios;