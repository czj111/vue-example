<template>
<div class="daily">
    <div class="daily-menu">
        <div class="daily-menu-item"
        :class="{on:type==='recommend'}"
        @click="handleToRecommend">每日推荐</div>
        <div class="daily-menu-item"
        :class="{on:type==='daily'}"
        @click="showThemes=!showThemes">主题日报</div>
        <ul v-show="showThemes">
            <li v-for="(item,index) in themes" :key="index">
                <a :class="{on:item.id===themeId && type==='daily'}"
                @click="handleToTheme(item.id)">{{item.name}}</a>
            </li>
        </ul>
    </div>
    <div class="daily-list" ref='list'>
        <div v-for="(list,index) in recommendList" :key="index" v-show="type==='recommend'">
            <div class="daily-date">{{formateDay(list.date)}}</div>
            <item v-for="(item,id) in list.stories" :key="id" :data="item"></item>
        </div>
        <div v-for="(list,index) in dailyList" :key="index" v-show="type==='daily'">
            <item :data="list"></item>
        </div>
    </div>
</div>
</template>
<script>
import $ from '../axios'
import item from './item'
export default {
    components:{item},
    data(){
        return {
            themes:[],
            type:"recommend",
            daily:"daily",
            showThemes:false,
            themeId:0,
            recommendList:[],
            dailyList:[]
        }
    },
    methods:{
        getThemes(){
            $.ajax.get('themes').then(res=>{
                this.themes=res.other;
            })
        },
        handleToTheme(id){
            this.type='daily';
            this.themeId=id;
            $.ajax.get('theme/'+id).then(res=>{
                this.dailyList=res.stories.filter(item=>item.type!==1);
            });
        },
        handleToRecommend(){
            this.type='recommend';
            this.recommendList=[];
            this.dailyTime=$.getTodayTime();
            this.getRecommendList();
        },
        getRecommendList(){
            this.isLoading=true;
            const prevDay=$.prevDay(this.dailyTime-86400000);
            $.ajax.get('news/before/'+prevDay).then((res)=>{
                this.recommendList.push(res);
                 this.isLoading=false;
            });
            
        },
        formateDay(date){
            date=date.toString();
            let month=date.slice(4,6);
            let day=date.slice(6,8);
            if(month.slice(0,1)==='0') month=month.slice(1);
            if(day.slice(0,1)==='0') day=day.slice(1);
            return `${month}月${day}日`

        }
    },
    mounted(){
        this.getThemes();
        this.handleToRecommend();
        //获取DOM
        const $list=this.$refs.list;
        //实现滚动自动加载数据
        $list.addEventListener('scroll',()=>{
            console.log($list.scrollTop);
            console.log(document.body);
            console.log($list.scrollHeight);

            if(this.type==='daily' || this.isLoading)
                return;
            if($list.scrollTop+document.body.clientHeight>=$list.scrollHeight){
                this.dailyTime-=86400000;
                this.getRecommendList();
            }
        });
    }
}
</script>
<style scoped>
.daily-menu{
    width:150px;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    overflow:auto;
    background:#f5f7f9;
}
.daily-menu-item{
   font-size:18px;
   text-align:center;
   margin:5px 0;
   padding:10px 0;
   cursor:pointer;
   border-right:2px solid transparent;
   transition: all .3s ease-in-out

}

.daily-menu li{
    cursor:pointer;
}
.daily-menu-item:hover{
    background:#e338ee;
}
.daily-menu .on{
   border-right:2px solid #3399ff; 
}
.daily-list{
    width:300px;
    position:fixed;
    top:0;
    bottom:0;
    left:150px;
    overflow:auto;
    border-right:1px solid #d7dde4;
}
</style>