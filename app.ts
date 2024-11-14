// app.ts

import { mixins } from './utils/mixins/index'; // 引入混入方法
App<IAppOption>({
  globalData: {
    bodyHeight: '',
    selected: 0,
    theme: wx.getStorageSync('theme') || 'light', // 初始主题，可以是 'light' 或 'dark'
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })

    const originalPage = Page;
    Page = (options: WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>) => {
      // 深拷贝 options，确保不影响原有数据
      // const mergedOptions = Object.assign({}, mixins.page, options);
      // 合并 data
      options.data = {
        ...mixins.page.data,
        ...options.data,
      };

      options = {
        ...mixins.page,
        ...options
      }
      originalPage(options);
    };

    const originalComponent = Component;
    // @ts-ignore
    Component = (options: WechatMiniprogram.Component.Options<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>) => {
      // 合并 data
      options.data = {
        ...mixins.component.data,
        ...options.data,
      };

      // 合并 methods
      options.methods = {
        ...mixins.component.methods,
        ...options.methods,
      };

      // 初始化 lifetimes，如果没有定义的话
      options.lifetimes = options.lifetimes || {};

      // 逐一合并生命周期函数
      for (const key in mixins.component.lifetimes) {
        if (mixins.component.lifetimes.hasOwnProperty(key)) {
          // @ts-expect-error
          const original = options.lifetimes[key];
          // @ts-expect-error
          options.lifetimes[key] = function (...args: any[]) {
            // @ts-expect-error
            if (mixins.component.lifetimes[key]) {
              // @ts-expect-error
              mixins.component.lifetimes[key]!.call(this, ...args);
            }
            if (original) {
              original!.call(this, ...args);
            }
          };
        }
      }

      originalComponent(options);
    };
  },
})