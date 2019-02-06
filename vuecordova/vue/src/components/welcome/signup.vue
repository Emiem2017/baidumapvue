<template>
  <transition name="Lmove">
    <div v-show="showRegister" class="register">
      <div class="back" @click="hide">
        返回
      </div>
      <div class="register-wrap" id="RegisterScroll">
        <div class="rs">
          <h3>Register</h3>
          <p v-show="showAlert">{{alert}}</p>
          <input type="text" placeholder="请输入用户名" v-model="newUsername">
          <input type="password" placeholder="请输入密码" v-model="newPassword">
          <button v-on:click="register">注册</button>
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
        showRegister: false,
        newPassword:'',
        newUsername:'',
        showAlert: false,
        alert: ''
      };
    },
    methods: {
      show() {
        this.showRegister = true;
        var rs = document.getElementById("RegisterScroll")
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(rs, {
              click: false
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showRegister = false;
      },
      addEntity(){
        let data = {
          'ak':'V6bGVqaumHc7sdAWG11ckAwQKFsbO50G',   //bfimplzNgNSaaTGywRWKfdZqW6OafU3t
          'service_id': 209085,   //208318
          'entity_name': this.newUsername
        }
//        alert(data['ak']+data['service_id']+data['entity_name'])
//        this.$http.post(this.baidumap+'entity/add',data).then((res)=>{
        this.$http.post('http://yingyan.baidu.com/api/v3/entity/add',data).then((res)=>{
          console.log(res)
          if(res.ok){
            alert("success!!!")
          }
        })
      },
      register(){
        if(this.newUsername == "" || this.newPassword == ""){
          alert("请输入用户名或密码")
        }else{
          this.alert = "注册成功"
          this.addEntity()
          this.showAlert = true
          this.username = ''
          this.password = ''
          setTimeout(function(){
            this.showRegister = false
            this.showAlert = false
            setCookie('username',this.newUsername,1000*60)
            this.$router.push({path:'main',query:{id:1}})
          }.bind(this),1000)
//          let data = {'username':this.newUsername,'password':this.newPassword}
//          this.$http.post(this.rootUrl+'register',data).then((res)=>{
//            console.log(res)
//            if(res.ok){
//              this.alert = "注册成功"
//              this.addEntity()
//              this.showAlert = true
//              this.username = ''
//              this.password = ''
//              setTimeout(function(){
//                this.showRegister = false
//                this.showAlert = false
//                setCookie('username',this.newUsername,1000*60)
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
  .register {
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 30;
    width: 100%;
    height: 100%;
    background: #fff;
    transition: all 0.2s linear;
  }

  .Lmove-enter-active, .Lmove-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .Lmove-enter, .Lmove-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .register .back {
    position: absolute;
    width: 40px;
    height: 20px;
    top: 10px;
    left: 10px;
    font-size: 20px;
  }

  .register-wrap {
    margin-top: 140px;
    text-align: center;
    height: 100%;
  }
  .rs{
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

  button:active{
    background-color: green;
  }

  span {
    cursor: pointer;
  }

  span:hover {
    color: cornflowerblue;
  }
</style>
