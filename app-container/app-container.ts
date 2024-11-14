// @ts-ignore
const app = getApp()

import { menuBehavior } from '../utils/behaviors/menuBehavior';
Component({
  behaviors: [menuBehavior],
  properties: {},
  data: {
    currentPage: 'home', // 当前显示的页面
    bodyHeight: 'height: 100vh;',
    title: '首页',
    timers: {} as { [key: string]: any }, // 定时器存储
    animationClass: 'fade-enter-active', // 初始动画
    // 页面过度时间
    transitionDuration: 200,
    // 页面销毁时间
    destroyDuration: 180000, // 3分钟 = 180000毫秒,
    scrollTop: 0 // 当前页面的滚动位置
  },
  // 组件加载时
  lifetimes: {
    attached() {
    },
    // 组件渲染完成后
    ready() {
      // 获取导航栏和菜单的高度
      this.getNavHeight();
    },
  },

  methods: {
    switchPage(e: any) {
      // 记录当前页面的滚动位置
      const currentPage = `scrollPositions.${this.data.currentPage}`
      this.setData({ [currentPage]: this.data.scrollTop });
      // 保存当前页面的滚动位置
      const page = e.detail.path
      const name = e.detail.name
      this.setData({
        animationClass: 'fade-leave-active',
        currentPage: page,
        title: name
      });
      // 启动计时器以移除非活跃组件的缓存
      this.startInactiveTimers(page);
      
      // @ts-ignore
      const pageCache: any = this.data.pageCache;
      if (!pageCache[page]) {
        pageCache[page] = true; // 标记页面为已加载
        this.setData({ pageCache });
        const savedState = wx.getStorageSync(`${page}-data`);
        if (savedState) {
          const pageComponent = this.selectComponent(`#${page}-content`);
          if (pageComponent) {
            savedState.theme = app.globalData.theme
            pageComponent.setData(savedState); // 恢复状态
            // 清除缓存
            wx.removeStorageSync(`${page}-data`);
          }
          console.log(`${page}-data:激活页面了, 恢复了状态`)
        }
      }

      
      // 切换页面并设置进场动画
      setTimeout(() => {
        this.setData({
          animationClass: 'fade-enter-active'
        });
      }, this.data.transitionDuration); // 与过渡时间匹配
      
    },

    handleScroll(e: any) {
      let scrollTop =  e.detail.scrollTop
      this.setData({ scrollTop });
    },

    // 销毁非活跃组件定时计算器
    startInactiveTimers(activePage: string) {
      const timers = this.data.timers;

      // 停止当前激活页面的计时器
      if (timers[activePage]) {
        clearTimeout(timers[activePage] as any);
        timers[activePage] = null;
      }

      // 启动其他非活跃页面的计时器, 3分钟后销毁
      // @ts-ignore
      Object.keys(this.data.pageCache).forEach((page) => {
        // @ts-ignore
        if (page !== activePage && this.data.pageCache[page]) {
          timers[page] = setTimeout(() => {
            this.removePageFromCache(page);
          }, this.data.destroyDuration); // 3分钟 = 180000毫秒
        }
      });
      
      this.setData({ timers });
    },

    // 销毁非活跃组件
    removePageFromCache(page: string) {
      const timers = this.data.timers;
      // @ts-ignore
      const pageCache: any = this.data.pageCache;
      if (timers[page]) {
        // 储存即将销毁的组件数据 (如果页面被再次激活，则在组件attached里恢复数据)
        const pageComponent = this.selectComponent(`#${page}-content`);
        if (pageComponent) {
          wx.setStorageSync(`${page}-data`, pageComponent.data); // 保存数据到本地存储
        }
        // 销毁
        clearTimeout(timers[page] as any);
        timers[page] = null;
        pageCache[page] = false;
        this.setData({ timers, pageCache });
      }
    },

    // 获取导航栏和菜单的高度
    getNavHeight() {
      const query = wx.createSelectorQuery().in(this);
      query.select('#navigation-bar').boundingClientRect();
      query.select('#tabber-bar').boundingClientRect();
      query.exec((res) => {
        const navHeight = res[0].height;
        const tabberHeight = res[1].height;
        const bodyHeight =  `height: calc(100vh - ${navHeight + tabberHeight}px);`
        this.setData({
          bodyHeight
        });
        // 缓存bodyHeight
        app.globalData.bodyHeight = bodyHeight;
        // 本地缓存bodyHeight
        wx.setStorageSync('bodyHeight', bodyHeight);
      });
    },
  },
});