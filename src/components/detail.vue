<template>
  <div class="detail">
    <div v-wechat-title="$route.meta.title = bookTitle"></div>
    <div class="content">
      <img v-if="thumb" :src="host + 'Uploads/zcfile/' + thumb">
      <audio ref="audio" class="audio"></audio>
      <div class="back1" v-if="isPlay" @click="play">
        <img src="../assets/pause.png" alt="pause">
      </div>
      <div class="back1" v-else @click="play">
        <img src="../assets/play.png" alt="play">
      </div>
      <div class="back" @click="back">
        <img src="../assets/back.png" alt="back">
      </div>
      <!--<div class="play">-->
        <!--<div v-if="isPlay" class="playButton" @click="play">暂停</div>-->
        <!--<div v-else class="playButton" @click="play">播放</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      host: '/',
      thumb: null,
      audio: null,
      isPlay: false,
      currentMp3: '',
      bookTitle: '',
      bookTag: ''
    }
  },
  created () {
    let formdata = new FormData()
    formdata.append('id', this.$route.params.id)
    let url = this.host + 'Api/Zc/detail'
    this.post(url, formdata, res => {
      if (res.status) {
        this.thumb = res.info.thumb
        this.currentMp3 = res.info.mp3
        this.bookTitle = res.info.book
        this.bookTag = res.info.bookTag
      } else {
        console.log(res.info)
      }
    })
  },
  destroyed () {
    this.isPlay = false
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
    // 音频播放器初始化
    createAudio () {
      if (!this.audio) {
        this.$refs.audio.setAttribute('controls', 'controls')
        this.audio = this.$refs.audio
        this.audio.addEventListener('ended', () => {
          this.isPlay = false
        })
      }
      this.audio.src = this.host + 'Uploads/zcMp3/' + this.currentMp3
    },
    play () {
      if (!this.audio) {
        this.createAudio()
      }
      if (!this.isPlay) {
        this.audio.play()
        this.isPlay = true
      } else {
        this.audio.pause()
        this.isPlay = false
      }
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
  .detail .content .audio {
    position: fixed;
    bottom:0;
    width: 100%;
    z-index: 10;
  }
  .detail .content img{
    flex: 1;
    width: 100%;
    height: auto;
  }
  .detail .content .back {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10;
    width: 48px;
    height: 48px;
  }
  .detail .content .back1 {
    position: fixed;
    top: 10px;
    right: 60px;
    z-index: 10;
    width: 48px;
    height: 48px;
  }
  .detail .content .play {
    position: absolute;
    bottom: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    z-index: 10;
  }
  .detail .play .playButton{
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: transparent;
    border: solid 1px #dfdfdf;
    font-size: 18px;
    border-radius: 3px;
  }
  .detail .play .playButton:active{
    background-color: #dfdfdf;
  }
</style>
