// pages/accommodation/accommodation.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    rooms: [
      {
        id: 1,
        name: '湖景房',
        price: 500,
        image: '/images/f1.jpg',
        availability: '有空房',
      },
      {
        id: 2,
        name: '山景房',
        price: 400,
        image: '/images/f2.jpg',
        availability: '已订满',
      }
      // 更多房间
    ],
    reviews: [
      { user: '张三', comment: '房间很舒适，景色也很美！', rating: 5 },
      { user: '李四', comment: '服务周到，房间干净。', rating: 4 }
      // 更多用户评论
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    viewRoomDetail(event: any) {
      const roomId = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/room-detail/room-detail?id=${roomId}`
      });
    }
  }
})