import * as request from '../https'; // 引入封装好的请求方法
import { applyTheme, initializeTheme } from './theme';
import { eventBus } from './eventBus';
let my: any
export const pageMixins = {
  data: {
    pageCommonData: '页面通用数据',
    theme: 'light',
    themeStyles: {},
    themeStyleButton: '',
  }, 
  onLoad() {
    my = this
    console.log('页面加载');
    initializeTheme(my);
    // @ts-ignore
    eventBus.on('themeChange', my.applyTheme.bind(my)); // 监听主题变化事件
  },
  // 页面卸载
  onUnload() {
    console.log('my', my)
    if (my) {
      // @ts-ignore
      eventBus.off('themeChange', my.applyTheme.bind(my)); // 取消监听
    }
  },
  applyTheme(theme: any) {
    applyTheme({context: this, theme});
  },
  pageCommonFunction() {
    console.log('页面通用函数');
  },
  ...request, // 将 request 方法注入到所有页面中
};