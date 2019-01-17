<template>
  <div class="detail">
    <div v-wechat-title="$route.meta.title = bookTitle"></div>
    <div class="content">
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
      url: ''
    }
  },
  created () {
    let formdata = new FormData()
    formdata.append('id', this.$route.params.id)
    let url = this.host + 'Api/Zc/detail'
    this.post(url, formdata, res => {
      if (res.status) {
        console.log(res.info)
        this.thumb = res.info.thumb
        this.bookTitle = res.info.book
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
</style>
