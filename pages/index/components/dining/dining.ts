// pages/dining/dining.ts
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
    introduction: {
      image: '/images/f1.jpg',
      description: '我们提供丰富的农家乐项目，让您体验自然与美食的完美结合。'
    },
    menu: [
      {
        id: 1,
        name: '土鸡煲',
        price: 128,
        image: '/images/c1.jpg',
        description: '用自家养殖的土鸡炖制而成，鲜美无比。'
      },
      {
        id: 2,
        name: '野菜煎饼',
        price: 48,
        image: '/images/c2.jpg',
        description: '使用新鲜的野菜制作，健康美味。'
      }
      // 可以添加更多菜单项
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    makeReservation() {
      wx.navigateTo({
        url: '/subPackages/dining/pages/dining-reservation/dining-reservation'
      });
    },
    makeBBQReservation() {
      wx.navigateTo({
        url: '/subPackages/dining/pages/dining-reservation/dining-reservation?type=bbq'
      });
    }
  }
})