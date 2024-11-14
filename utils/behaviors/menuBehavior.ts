// behaviors/menuBehavior.ts

// 定义 Tab 类型
interface Tab {
  name: string;
  tabName: string;
  path: string;
  icon: string;
  iconSelected: string;
}

// 定义缓存和滚动位置的类型
interface PageData {
  [key: string]: boolean;
}

interface ScrollPosition {
  [key: string]: number;
}

export const menuBehavior = Behavior({
  data: {
    // 菜单列表
    tabs: [
      {
        name: '首页',
        tabName: '首页',
        path: 'home',
        icon: '/images/bar/icon_calendar.png',
        iconSelected: '/images/bar/icon_calendar.png',
      },
      {
        name: '农产品直销',
        tabName: '农产',
        path: 'product',
        icon: '/images/bar/icon_inbox.png',
        iconSelected: '/images/bar/icon_inbox.png',
      },
      {
        name: '餐饮与农家乐',
        tabName: '农家',
        path: 'dining',
        icon: '/images/bar/icon_index.png',
        iconSelected: '/images/bar/icon_index.png',
      },
      {
        name: '住宿与民宿',
        tabName: '住宿',
        path: 'accommodation',
        icon: '/images/bar/school365_logo.png',
        iconSelected: '/images/bar/online_service.png',
      },
      {
        name: '更多',
        tabName: '更多',
        path: 'user',
        icon: '/images/bar/icon_person.png',
        iconSelected: '/images/bar/icon_person.png',
      }
    ] as Tab[],

    // 页面缓存状态和滚动位置（延迟初始化）
    pageCache: {} as PageData,
    scrollPositions: {} as ScrollPosition
  },

  lifetimes: {
    attached() {
      // 调用初始化函数，生成 pageCache 和 scrollPositions 初始数据
      this.initializePageData();
    }
  },

  methods: {
    // 初始化 pageCache 和 scrollPositions 数据
    initializePageData() {
      const pageCache: PageData = {};
      const scrollPositions: ScrollPosition = {};

      // 根据 tabs 中的 path 动态生成初始数据
      this.data.tabs.forEach(tab => {
        pageCache[tab.path] = false;
        scrollPositions[tab.path] = 0;
      });

      // 设置生成的数据
      this.setData({
        pageCache,
        scrollPositions
      });
    },

    // 获取菜单项列表
    getTabs(): Tab[] {
      return this.data.tabs;
    },
  }
});
