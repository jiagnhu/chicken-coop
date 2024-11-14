// @ts-ignore
const app = getApp<IAppOption>()
import { menuBehavior } from '../utils/behaviors/menuBehavior';

Component({
  behaviors: [menuBehavior],
  properties: {},
  // 页面加载时
  lifetimes: {
    attached() {
      // @ts-ignore
      const tabs = this.getTabs();
      this.triggerEvent('switch', {
        path: tabs[0].path,
        name: tabs[0].name
      })
    },
  },

  data: {
    selected: app.globalData.selected,
  },


  methods: {
    switchTab(e: WechatMiniprogram.TouchEvent) {
      // @ts-ignore
      const tabs = this.getTabs();
      const index = e.currentTarget.dataset.index;
      const path = tabs[index].path;
      const name = tabs[index].name;
      app.globalData.selected = index;
      this.setData({
        selected: Number(index)
      });
      this.triggerEvent('switch', {
        path,
        name
      })
    },
  },
});