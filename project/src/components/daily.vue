<template>
<div class="daily">
    <div class="daily-menu">
        <div class="daily-menu-item"
        :class="{on:type==='recommend'}">每日推荐</div>
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
    <div class="daily-list">

    </div>
</div>
</template>
<script>
import $ from '../axios'
export default {
    data(){
        return {
            themes:[],
            type:"recommend",
            daily:"daily",
            showThemes:false,
            themeId:0
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
            this.list=[];
            $.ajax.get('themes/'+id).then(res=>{
                this.list=res.other.filter(item=>item.type!==1);
            });
        }
    },
    mounted(){
        this.getThemes();
    }
}
</script>
<style>
html,body{
    margin:0;
    padding:0;
    height:100%;
    color:#657180;
    font-size:16px;
}
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