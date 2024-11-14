// components/refresh-scroll-view/refresh-scroll-view.ts
// @ts-ignore
Component({
  properties: {
    height: {
      type: String,
      value: 'height: 500rpx' // 默认高度
    },
    top: {
      type: Number,
      value: 0,
    },
  },
  data: {
    isLoading: false,
    isRefreshing: false,
    debounceTimer: null as ReturnType<typeof setTimeout> | null,
    scrollTop: 0
  },
  observers: {
    'top': function(top: number) {
      console.log('发送了变化', top)
      // 在 top 被设置时，执行这个函数
      setTimeout(() => {
        this.setData({
          scrollTop: top
        });
        this.triggerEvent('scroll', { scrollTop: top });
      }, 0);
    }
  },

  methods: {
    onScroll(e: any) {
      if (this.data.debounceTimer) {
        clearTimeout(this.data.debounceTimer);
      }
      this.data.debounceTimer = setTimeout(() => {
        this.triggerEvent('scroll', { scrollTop: e.detail.scrollTop });
        this.setData({ debounceTimer: null });
      }, 200); // 200ms 的防抖间隔
    },
    onRefresherPulling() {
      // 可以添加下拉刷新动画等
    },
    onRefresherRefresh() {
      if (this.data.isRefreshing) {
        return;
      }
      this.setData({ isRefreshing: true });
      this.triggerEvent('pullDownRefresh', {
        done: () => {
          this.setData({ isRefreshing: false });
        }
      });
    },
    onLoadMore() {
      if (this.data.isLoading) {
        return;
      }
      this.setData({ isLoading: true });
      this.triggerEvent('loadMore', {
        done: () => {
          this.setData({ isLoading: false });
        }
      });
    }
  }
});
