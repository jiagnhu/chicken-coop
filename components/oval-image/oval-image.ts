// components/oval-image/oval-image.ts
// @ts-ignore
const app = getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
    },
    urls: {
      type: Array,
      value: []
    },
    imageStyle: {
      type: Object,
      value: {}
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        bodyHeight: app.globalData.bodyHeight || wx.getStorageSync('bodyHeight'),
        windowWidth: wx.getWindowInfo().windowWidth,
        windowHeight: wx.getWindowInfo().windowHeight,
      })
    }
  },

  data: {
    loaded: false, // 是否加载完毕
    isFullScreen: false, // 是否全屏展示
    imageAnimationStyle: '', // 图片样式
    bodyHeight: '',
    windowWidth: 0,
    windowHeight: 0
  },

  methods: {
    // 图片加载完成
    onImageLoad() {
      this.setData({
        loaded: true
      });
    },

    // 点击图片触发全屏
    onImageTap() {
      wx.previewImage({
        current: this.data.src, // 当前显示图片的http链接
        urls: this.data.urls // 需要预览的图片http链接列表
      })
    }
  }
})