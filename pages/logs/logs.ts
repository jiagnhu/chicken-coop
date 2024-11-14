// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

Component({
  data: {
    logs: [],
    text: ''
  },
  lifetimes: {
    attached() {
      console.log('大家好1')
      this.setData({
        logs: (wx.getStorageSync('logs') || []).map((log: string) => {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log
          }
        }),
      })
    }
  },
  // 首次加载页面使用 show，次函数只执行一次
  pageLifetimes: {
    show() {
      console.log('页面显示了')
    },
  },
  methods: {
    onInput(e: WechatMiniprogram.Input) {
      this.setData({
        text: e.detail.value
      })
    }
  }
})
