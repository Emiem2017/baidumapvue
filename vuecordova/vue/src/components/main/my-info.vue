<template>
  <transition name="move">
    <div class="info" v-show="info">
      <div class="back" @click="hide">
        返回
      </div>
      <h3>欢迎 <span>{{name}}</span></h3>
      <a href="javascript:void(0);" @click="quit">注销登录</a>
    </div>
  </transition>
</template>


<script type="text/ecmascript-6">
  import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
  import BScroll from 'better-scroll'
  export default {
    data(){
      return{
        info: false,
        name: ''
      }
    },
    mounted(){
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let uname = getCookie('username')
      this.name = uname
      /*如果cookie不存在，则跳转到登录页*/
      if(uname == ""){
        this.$router.push('/')
      }
    },
    methods:{
      hide(){
        this.info=false
      },
      show(){
        this.info=true
      },
      quit(){
        delCookie('username')
        this.$router.push('/')
      }
    }
  }
</script>


<style>
  .info{
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 50;
    width: 100%;
    height: 100%;
    background: #fff;
    transition: all 0.2s linear;
  }
  .info .back{
    position: absolute;
    width: 40px;
    height: 20px;
    top: 10px;
    left: 10px;
    font-size: 20px;
  }
  .move-enter-active, .move-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .move-enter, .move-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .info h3{
    margin-top: 100px;
  }
  .info h3 span{
    color: green;
  }
</style>
