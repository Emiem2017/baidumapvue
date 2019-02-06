<template>
  <div class="main">
    <div class="mapDisplay" v-on:click="hideDetail">
      <div class="tab" v-show="true" >
        <img src="../../assets/xberlogo2.png"/>
        <div class="title">xber司机</div>
        <div id="more" class="more" v-on:click="showDetail">...</div>
        <div id="detail" class="detail" v-show="detail">
          <div class="myInfo" v-on:click="showInfo">我的信息</div>
          <div class="exit" v-on:click="exit">退出登录</div>
        </div>
      </div>

      <baidu-map class="baiduMap" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" v-on:click="hideDetail">
        <bm-marker :position="{lng:  this.longitude, lat: this.latitude}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          <bm-label content="起点" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
        </bm-marker>
        <bm-marker :position="{lng: this.newLongitude, lat: this.newLatitude}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          <bm-label content="当前位置" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
        </bm-marker>
        <bm-marker :position="{lng: 116.542287, lat: 49.423545}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          <bm-label content="终点" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
        </bm-marker>
        <bm-navigation class="suofang" anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
        <!--<bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="4" :editing="false" @lineupdate="updatePolylinePath"></bm-polyline>-->
        <button class="uploadTrackPoint" v-on:click="locate">定位</button>
        <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="false"></bm-polyline>
        <!--<button class="select" v-on:click="addPolylinePoint2">查询</button>-->
      </baidu-map>

    </div>
    <myInfo ref="myInfo"></myInfo>
  </div>
</template>

<script>
  import myInfo from './my-info.vue'
  import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'

	export default{
		data(){
			return{
				list: '',
        detail: false,
        center: {lng: 116.404000, lat: 39.915000},
        zoom: 3,
        name: '',
        latitude:39.915000,
        longitude:116.404000,
        newLatitude:39.915000,
        newLongitude:116.404000,
        polylinePath: [
//          {lng: 116.404000, lat: 39.915000}
        ],
        timer:null
			}
		},
//    computed: {
//		    center:function () {
//          this.center.lng=this.newLongitude
//          this.center.lat=this.newLatitude
//          return this.center
//        }
//    },
//    watch: {
//      // 如果 `newLatitude` 发生改变，这个函数就会运行
//      newLatitude: function (newQuestion, oldQuestion) {
//        this.center.lat=this.newLatitude
//      },
//      newLongitude: function (newQuestion, oldQuestion) {
//        this.center.lng=this.newLongitude
//      }
//    },
    mounted(){
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let uname = getCookie('username')
      this.name = uname
      /*如果cookie不存在，则跳转到登录页*/
      if(uname == ""){
        this.$router.push('/')
      }

      this.realTimeLocate()
      this.longitude=this.newLongitude
      this.latitude=this.newLatitude
      if(this.timer){
        clearInterval(this.timer)
      }else{
        this.timer=setInterval(()=>{this.realTimeLocate()},5000)
      }
    },
    destroyed: function () {
      // `this` 指向 vm 实例
      clearInterval(this.timer)
    },
    methods:{
      addPolylinePoint () {
        this.polylinePath.push({lng: this.newLongitude, lat: this.newLatitude})
//        this.polylinePath.push({lng: 116.542287, lat:  49.423545})
      },
      locate(){
        this.center.lat=this.newLatitude
        this.center.lng=this.newLongitude
      },
      queryPoint(){
        var getTimestamp = new Date().getTime()
        let condition={
          'ak':'V6bGVqaumHc7sdAWG11ckAwQKFsbO50G',
          'service_id': 209085,
          'entity_name':this.name,
          'r':getTimestamp
//           "process_option":"need_denoise=0,radius_threshold=20,need_mapmatch=0,transport_mode=walking"
        }
//        this.$http.get(this.baidumap+'entity/list',condition).then((res)=>{
        // http://yingyan.baidu.com/api/v3/track/getlatestpoint?service_id=1000&entity_name=小明&coord_type_output=bd09ll&process_option=need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving&ak=你的'''AK'''
        //  http://yingyan.baidu.com/api/v3/track/getlatestpoint?service_id=208318&entity_name=CC&coord_type_output=bd09ll&process_option=need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving&ak=bfimplzNgNSaaTGywRWKfdZqW6OafU3t
        this.$http.get('http://yingyan.baidu.com/api/v3/track/getlatestpoint',{params:condition}).then((res)=>{
          console.log(res.bodyText)
          if(res.ok){
            alert("查询成功！！！")
            var res_data = JSON.parse(res.bodyText)
            console.log(res_data)
            console.log(res_data['latest_point'])
            console.log(res_data['latest_point']['latitude'])
            console.log(res_data['latest_point']['longitude'])
            this.newLatitude=res_data['latest_point']['latitude']
            this.newLongitude=res_data['latest_point']['longitude']
            this.addPolylinePoint()
          }
          else{
            alert("查询失败")
          }
        })
      },
      realTimeLocate(){
        var _this=this
        window.baiduLocation.startLocation(
          function (success) {
//            alert(success.latitude + "," + success.longitude+"..."+_this.newLatitude+","+_this.newLongitude);
            var flag=0
            if(success.latitude!=_this.newLatitude){
//              alert('lat cha')
              _this.newLatitude=success.latitude
              flag=1
            }
            if(success.longitude!=_this.newLongitude){
//              alert('lon cha')
              _this.newLongitude=success.longitude
              flag=1
            }

            if(flag==1) _this.uploadPoint()
          }, function (error) {
            /*
                 error={
                        code:   //code=-1,为本地错误,code>0为百度定位的错误码
                        msg:  //错误描述
                 }
            */
          },{//这个参数也可以不传
            CoorType:'bd09ll', //设置坐标系默认'bd09ll'
            IsNeedAddress:false //是否需要返回坐标的地址信息，默认是false
          });
      },
      uploadPoint(){
        var timestamp = Date.parse(new Date())
        let data = {
          'ak':'V6bGVqaumHc7sdAWG11ckAwQKFsbO50G',
          'service_id': 209085,
          'entity_name':this.name,
          'latitude':this.newLatitude,
          'longitude':this.newLongitude,
          'loc_time':timestamp/1000,
          'coord_type_input':'bd09ll',
          'mcode':'D6:20:39:B9:B1:EC:88:89:B3:60:89:81:8D:D0:A1:53:EF:4C:3D:50'
        }
        alert(data.latitude+"   "+data.longitude+"..."+this.newLatitude+"   "+this.newLongitude)
//        this.$http.post(this.baidumap+'track/addpoint',data).then((res)=>{
        this.$http.post('http://yingyan.baidu.com/api/v3/track/addpoint',data).then((res)=>{
          console.log(res)
          if(res.ok){
//              alert("success!!!")
              this.queryPoint()
          }
        })
//        alert(timestamp)
      },
		  showDetail() {
		    this.detail=true
      },
      hideDetail(){
        var more = document.getElementById("more");
        var detail = document.getElementById("detail");
        if(more){
          if(!more.contains(event.target)&&!detail.contains(event.target)){            //这句是说如果我们点击到了id为more以外的区域
            this.detail=false
          }
        }
      },
      showInfo(){
        this.$refs.myInfo.show();
        this.detail=false;
      },
      exit(){
        delCookie('username')
        this.$router.push('/')
      },
      handler ({BMap, map}) {
//        console.log(BMap, map)
        this.center.lng = this.newLongitude
        this.center.lat = this.newLatitude
        this.zoom = 15
      }
    },
    components:{
		  myInfo
    }

	}
</script>

<style>
  .main{
    width: 100%;
    height: 100%;
  }
  .mapDisplay{
    width: 100%;
    height: 100%;
  }
  .tab{
    position: fixed;
    top: 0px;
    z-index: 30;
    width: 100%;
    height: 40px;
    background-color: cornflowerblue;
  }
  .tab img{
    position: absolute;
    display: inline-block;
    top: 5px;
    left: 5px;
    width: 25px;
  }
  .tab .title{
    margin: 0 auto;
    margin-top: 10px;
    width: 100px;
    color: #fff;
    font-family: "Microsoft YaHei UI";
  }
  .tab .more{
    position: absolute;
    display: inline-block;
    top: -13px;
    right: 5px;
    font-size: 40px;
    color: #fff;
  }
  .detail{
    position: absolute;
    right: 5px;
    width: 170px;
    background: #fff;
  }
  .detail .myInfo,.detail .exit{
    padding-left: 25px;
    height: 40px;
    line-height: 40px;
    text-align: left;
  }
  .detail .myInfo:active,.detail .exit:active{
    background: #2f83c7;
    color: #fff;
  }

  .baiduMap{
    height: 100%;

  }
  .baiduMap .anchorBL{
    display:none;
  }
  .uploadTrackPoint{
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 40px;
  }
  .select{
    position: fixed;
    bottom: 10px;
    right: 90px;
    width: 50px;
    height: 40px;
  }


</style>
