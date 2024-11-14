Component({
  data: {
    products: [
      {
        id: 1,
        name: '新鲜草莓',
        price: 30,
        stock: 100,
        image: '/images/caomei.jpg',
        description: '美味可口的新鲜草莓，来自自家农庄。',
        reviews: [
          { user: '张三', comment: '非常好吃，果然是自家种的！' }
        ]
      },
      {
        id: 2,
        name: '天然蜂蜜',
        price: 50,
        stock: 50,
        image: '/images/fengmi.jpg',
        description: '纯天然蜂蜜，健康美味。',
        reviews: [
          { user: '李四', comment: '口感很好，值得推荐！' }
        ]
      }
      // 可以添加更多产品
    ]
  },
  methods: {
    showProductDetail(event: any) {
      
      const productId = event.currentTarget.dataset.id;
      console.log('productId', productId)
      // 跳转到产品详情页面
      wx.navigateTo({
        url: `/subPackages/product/pages/product-detail/product-detail?id=${productId}`
      });
    },
    buyProduct(event: any) {
      const productId = event.currentTarget.dataset.id;
      // 模拟购买流程
      wx.showToast({
        title: `购买成功，产品ID: ${productId}`,
        icon: 'success',
        duration: 2000
      });
    }
  }
});