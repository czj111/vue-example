import axios from 'axios';
const Util={
    imgPath:'http://127.0.0.1/img/',
    apiPath:'http://127.0.0.1:8010/'
};
//api通用配置
Util.ajax=axios.create({
    baseURL:Util.apiPath
});
//响应拦截器
Util.ajax.interceptors.response.use((res)=>{
    return res.data;
});
export default Util;