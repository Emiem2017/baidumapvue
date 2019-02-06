<template>
  <transition name="Rmove">
    <div v-show="showLogin" class="login">
      <div class="back" @click="hide">
        返回
      </div>
      <div class="login-wrap" id="loginScroll">
        <div class="ls">
          <h3>Login</h3>
          <p v-show="showAlert">{{alert}}</p>
          <input type="text" placeholder="请输入用户名" v-model="username">
          <input type="password" placeholder="请输入密码" v-model="password">
          <button v-on:click="login">登录</button>
        </div>
      </div>
    </div>
  </transition>
</template>


<script type="text/ecmascript-6">
  import { setCookie,getCookie } from '../../assets/js/cookie.js'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        username: '',
        password: '',
        alert:'',
        showLogin: false,
        showAlert: false
      };
    },
    methods: {
      show() {
        var ls = document.getElementById("loginScroll")
        this.showLogin = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(ls, {
              click: false
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showLogin = false;
      },
      login(){
//        if (!event._constructed) {
//          return;
//        }
        if(this.username == "" || this.password == ""){
          alert("请输入用户名或密码")
        }else{
          this.alert = "登录成功"
          this.showAlert = true
          setCookie('username',this.username,1000*60)
          setTimeout(function(){
            this.$router.push({path:'main',query:{id:1}})
          }.bind(this),1000)
//          let data = {'username':this.username,'password':this.password}
//          this.$http.post(this.rootUrl+'login',data).then((res)=>{
//            console.log(res)
//            if(res.data == -1){
//              this.alert = "该用户不存在"
//              this.showAlert = true
//            }else if(res.data == 0){
//              this.alert = "密码输入错误"
//              this.showAlert = true
//            }else if(res.data == 'admin'){
//              this.$router.push('/main')
//            }else{
//              this.alert = "登录成功"
//              this.showAlert = true
//              setCookie('username',this.username,1000*60)
//              setTimeout(function(){
//                this.$router.push({path:'main',query:{id:1}})
//              }.bind(this),1000)
//            }
//          })
        }
      }
    }
  }
</script>


<style>
  .login {
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 30;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    transition: all 0.2s linear;
  }

  .Rmove-enter-active, .Rmove-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .Rmove-enter, .Rmove-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  .login .back {
    position: absolute;
    width: 40px;
    height: 20px;
    top: 10px;
    right: 10px;
    font-size: 20px;
  }

  .login-wrap {
    margin-top: 140px;
    text-align: center;
    height: 100%;
  }

  .ls{
    height: 150%;
  }
  h3{
    font-size: 40px;
    margin-bottom: 110px;
  }
  input {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
    width: 250px;
    height: 40px;
    line-height: 40px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
  }

  p {
    color: red;
  }

  button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: cornflowerblue;
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
  }

  span {
    cursor: pointer;
  }

  span:hover {
    color: cornflowerblue;
  }
</style>
