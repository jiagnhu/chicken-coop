
// @ts-ignore
const app = getApp()
Component({
  data: {
    theme: app.globalData.theme,
    images: [
      // { src: 'https://fastly.picsum.photos/id/572/200/300.jpg?hmac=Rt4zD8IxoA-nMVDrBQ72mgbTVRfQ6OwW3MhWy_3lpdk' },
      // { src: 'https://fastly.picsum.photos/id/168/300/200.jpg?hmac=aHd-GLvW4OCCSkYeJYccwzc5JK-SYP8Si01hWIzUBJw' },
      // { src: 'https://fastly.picsum.photos/id/168/300/200.jpg?hmac=aHd-GLvW4OCCSkYeJYccwzc5JK-SYP8Si01hWIzUBJw' },
      // { src: 'https://fastly.picsum.photos/id/665/200/300.jpg?hmac=N-XMC7MU7lBNaQh5wZrn0uyEcJkpIGQP2s1vL_A8kF8' },
      // { src: 'https://fastly.picsum.photos/id/168/300/200.jpg?hmac=aHd-GLvW4OCCSkYeJYccwzc5JK-SYP8Si01hWIzUBJw' },
      // { src: 'https://oss.school365.org.cn/school365oss/panda/moments/school365oss1727664279602.jpg?x-oss-process=image/resize,l_360'},
      // { src: 'https://img1.baidu.com/it/u=1046630760,1711311937&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1428'},
      // { src: 'https://wx2.sinaimg.cn/large/a21f71c6ly4gwtnxgy9zdj20u00jy79h.jpg'},
      // 更多图片...
    ]
  },
  lifetimes: {
    attached() {
      // @ts-ignore
      this.get('wallpapers/').then((res: any) => {
        if (res && res.length) {
          this.setData({
            images: res.map((item: any) => {
              item.src = item.image
              return item
            })
          })
        }
      })
    }
  },
  methods: {
  }
});