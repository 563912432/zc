<template>
  <div class="detail">
    <div v-wechat-title="$route.meta.title = bookTitle"></div>
    <div class="content">
      <div class="back" @click="back">
        <img src="../assets/back.png" alt="back">
      </div>
      <iframe :src="url" frameborder="0" style="width: 100%;height: 100%"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      host: '/',
      bookTitle: '',
      url: '',
      bookTag: ''
    }
  },
  created () {
    let formdata = new FormData()
    formdata.append('id', this.$route.params.id)
    let url = this.host + 'Api/Zc/detail'
    this.post(url, formdata, res => {
      if (res.status) {
        this.bookTitle = res.info.book
        this.bookTag = res.info.bookTag
        this.url = res.info.url
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
    back () {
      this.$router.push({path: '/' + this.bookTag})
    }
  }
}
</script>

<style scoped>
  .detail{
    flex: 1;
    display: flex;
    z-index: 2;
  }
  .detail .content{
    flex: 1;
    z-index: 3;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .detail .content img{
    flex: 1;
    width: 100%;
    height: auto;
  }
  .detail .content .back {
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 10;
    width: 48px;
    height: 48px;
  }
</style>
