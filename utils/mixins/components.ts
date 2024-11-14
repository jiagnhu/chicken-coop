import * as request from '../https'; // 引入封装好的请求方法
import { applyTheme, initializeTheme } from './theme';
import { eventBus } from './eventBus';
let my: any
export const componentMixins = {
  data: {
    componentCommonData: '组件通用数据',
    theme: 'light',
    themeStyles: {},
    themeStyleButton: '',
  },
  lifetimes: {
    attached() {
      my = this
      initializeTheme(my);
      // @ts-ignore
      eventBus.on('themeChange', my.applyTheme.bind(my)); // 监听主题变化事件
    },
    detached() {
      // @ts-ignore
      eventBus.off('themeChange', my.applyTheme.bind(my)); // 取消监听
    }
  },
  methods: {
    applyTheme(theme: any) {
      applyTheme({context: this, theme});
    },
    componentCommonFunction() {
      console.log('组件通用函数');
    },
    ...request  // 将 request 方法注入到所有组件中
  },
};