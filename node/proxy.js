const http=require("http");
const request=require("request");
const hostname='127.0.0.1';
const port=8010;
const imgPort=8011;
//代理服务
const apiServer=http.createServer((req,res)=>{
    console.log("jjjj");
    if(req.url=='/themes'){
        let data={
            other:[{
                name:"日常心理",
                id:0,
                color:15007,
                description:"hhhhhhh"
            }]
        };
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Content-Type','text/plain;charset=UTF-8');

        res.end(JSON.stringify(data));
    }
    // const url='http://news-at.zhihu.com/api/4'+req.url;
    // const options={
    //     url:url
    // };
    // function callback(error,response,body){
    //     if(!error && response.statusCode===200){
    //         res.setHeader('Content-Type','text/plain;charset=UTF-8');
    //         res.setHeader('Access-Control-Allow-Origin','*');
    //         res.end(body);
    //     }
    // }
    // req.get(options,callback);
});
apiServer.listen(port,hostname,()=>{
    console.log(`接口代理运行在：http://${hostname}:${port}/`);
});
const imgServer=http.createServer((req,res)=>{
    const url=req.url.split('/img/')[1];
    const options={
        url:url,
        encoding:null
    };
    function callback(error,response,body){
        if(!error && response.statusCode===200){
            const contentType=response.headers['content-type'];
            res.setHeader('Content-Type',contentType);
            res.setHeader('Access-Control-Allow-Origin','*');
            res.end(body);
        }
    }
    req.get(options,callback);
});
imgServer.listen(imgPort,hostname,()=>{
    console.log(`接口代理运行在：http://${hostname}:${imgPort}/`);
})