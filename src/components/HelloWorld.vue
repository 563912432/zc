<template>
  <div class="hello">
    <div v-wechat-title="$route.meta.title = ''"></div>
    <!--上为logo-->
    <div class="logo-wrap">
      <img src="../assets/logo1.png" alt="logo" style="height: 35px;width: auto">
    </div>
    <!--下为正文内容-->
    <div class="wrap">
      <!--title-->
      <div class="title">{{ bookTitle }}</div>
      <!--内容-->
      <div class="wrap-content">
        <div class="wrap-content-block" v-for="(item) in moduleInfo" :key="item.id" @click="detail(item.id)">
          <span>{{item.title}}</span>
          <img src="../assets/music.png" alt="music" style="width: 16px;height: 16px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      host: '/',
      bookTitle: '',
      moduleInfo: ''
    }
  },
  created () {
    let formdata = new FormData()
    formdata.append('tag', this.$route.params.tag)
    let url = this.host + 'Api/Zc/index'
    this.post(url, formdata, res => {
      if (res.status) {
        this.bookTitle = res.info.book.title
        this.moduleInfo = res.info.info
      } else {
        console.log(res.info)
      }
    })
  },
  methods: {
    // post请求方法
    post (url, data, fn) { // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
      let obj = new XMLHttpRequest()
      obj.open('POST', url, true)
      obj.onreadystatechange = function () {
        if (+obj.readyState === 4 && (+obj.status === 200 || +obj.status === 304 || +obj.status === 0)) { // 304未修改
          fn.call(this, JSON.parse(obj.responseText))
        }
      }
      obj.send(data)
    },
    detail (el) {
      this.$router.push({path: '/d/' + el})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    flex: 1;
    z-index: 2;
    overflow-y: auto;
  }

  .hello .logo-wrap {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 75px;
    background-color: #f8f8f8;
    border: solid 1px #e7e7e7;
    display: flex;
    align-items: center;
    padding-left: 20px;
    z-index: 4;
  }

  .hello .wrap {
    position: relative;
    height: auto;
    margin: 20px 15px;
    border-radius: 5px;
    border: solid 1px #337ab7;
    display: flex;
    flex-direction: column;
    z-index: 4;
  }

  .hello .wrap .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #337ab7;
    color: #fff;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .hello .wrap .wrap-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 15px;
  }

  .hello .wrap .wrap-content .wrap-content-block {
    margin-bottom: 20px;
    padding: 15px;
    border: solid 1px #c0e9f2;
    background-color: #d9edf7;
    color: #337190;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
