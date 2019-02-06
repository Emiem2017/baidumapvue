<template>
  <div class="welcome">
    <img src="../../assets/xberlogo.png">
    <div class="note">
      Xber司机端
    </div>
    <div class="copyright">
      copyright@ITIPC
    </div>
    <div id="bottom">
      <a @click="login">登 录</a>
      <a @click="register">注 册</a>
    </div>
    <sign-in ref="signIn"></sign-in>
    <sign-up ref="signUp"></sign-up>
  </div>
</template>


<script type="text/ecmascript-6">
  /* eslint-disable no-trailing-spaces */
  import signIn from './signin.vue';
  import signUp from './signup.vue';
  import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'

  export default {
    methods:{
      login(){
        this.$refs.signIn.show();
      },
      register(){
        this.$refs.signUp.show();
      }
    },
    created: function () {
      let username = getCookie('username')
      if (username != ""){
        this.$router.push('/main')
      }
    },
    components:{
      signIn,
      signUp
    }
  }
</script>


<style>
  .welcome img{
    margin-top: 70px;
    margin-bottom: 20px;
    width: 100px;

  }
  .welcome #bottom{
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: cornflowerblue;
  }
  .welcome #bottom a{
    display: inline-block;
    line-height: 60px;
    width: 48%;
    height: 100%;
    text-align: center;
    color: #fff;
  }
  .welcome .note{
    width: 100%;
    height:80px;
    font-size: 30px;
  }
  .welcome .copyright{
    margin-top: 100px;
    width: 100%;
    height:40px;
    margin-bottom: 20px;
  }
</style>
