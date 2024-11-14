Page({
  data: {
    title: '预定餐饮',
    menu: [
      {
        id: 1,
        name: '土鸡煲',
        price: 128,
        image: '/images/c1.jpg',
      },
      {
        id: 2,
        name: '野菜煎饼',
        price: 48,
        image: '/images/c2.jpg',
      }
      // 更多菜品
    ],
    rooms: [
      {
        id: 1,
        name: '豪华包厢1号',
        status: '已预定',
        image: '/images/f3.jpg',
      },
      {
        id: 2,
        name: '豪华包厢2号',
        status: '可预定',
        image: '/images/f4.jpg',
      }
      // 更多房间
    ],
    bbqMap: '/images/y1.jpg', // 自助烧烤/野炊场地图
    selectedBBQArea: null as any
  },
  confirmReservation() {
    wx.showToast({
      title: '预订成功',
      icon: 'success',
      duration: 2000
    });
  },
  selectBBQArea(e: any) {
    // 根据用户点击位置选择烧烤区域（示例代码）
    const x = e.detail.x;
    const y = e.detail.y;
    this.setData({ selectedBBQArea: { x, y } });
    wx.showToast({
      title: `选择了区域 (${x}, ${y})`,
      icon: 'success',
      duration: 2000
    });
  }
});