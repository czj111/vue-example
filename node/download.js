
function massage(nowPage,items,msg){//获得查询下载文件数据的结果
    return ResultInfo={code:0,message:"成功",
    paging:{
        countItems:10,
        items,
        count:4,
        nowPage,
        msg,
        pages:[{
           name:"111.txt" 
        },{
            name:"222.txt" 
         },{
            name:"333.txt"  
         },{
            name:"444.txt"  
         },{
            name:"555.txt"  
         },{
            name:"666.txt"  
         },{
            name:"777.txt"  
         },{
            name:"888.txt"  
         },{
            name:"999.txt"  
         },{
            name:"000.txt"  
         }
    ]   
    }}
}
module.exports=message