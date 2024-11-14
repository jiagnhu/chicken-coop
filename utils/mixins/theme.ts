import { eventBus } from './eventBus';
// theme.ts
export const themes: any = {
  light: {
    button: {
      background: 'linear-gradient(135deg, #E0F7FA 0%, #FFFFFF 100%)',
      color: '#2C3E50',  // 深灰色，确保清晰对比
      fontSize: '24rpx',
    },
    // 一级标题
    h1: {
      color: '#000',
      fontSize: '32rpx',
    },
    // 二级标题
    h2: {
      color: '#000',
      fontSize: '28rpx',
    },
    // 普通文字
    p: {
      color: '#000',
      fontSize: '24rpx',
    },
  },
  dark: {
    button: {
      background: 'linear-gradient(135deg, #1C1C1C 0%, #444444 100%)',
      color: '#FAFAFA',  // 亮白色，确保对比
      fontSize: '24rpx',
    },
    // 一级标题
    h1: {
      color: '#000',
      fontSize: '32rpx',
    },
    // 二级标题
    h2: {
      color: '#000',
      fontSize: '28rpx',
    },
    // 普通文字
    p: {
      color: '#000',
      fontSize: '24rpx',
    },
  },
  blue: {
    button: {
      background: 'linear-gradient(135deg, #0D47A1 0%, #64B5F6 100%)',
      color: '#FFFFFF',  // 亮白色，确保对比
      fontSize: '24rpx',
    },
    // 一级标题
    h1: {
      color: '#000',
      fontSize: '32rpx',
    },
    // 二级标题
    h2: {
      color: '#000',
      fontSize: '28rpx',
    },
    // 普通文字
    p: {
      color: '#000',
      fontSize: '24rpx',
    },
  },
  // 橙色
  orange: {
    button: {
      background: 'linear-gradient( 270deg, #FFC461 0%, #FF9232 100%)',
      color: '#FFFFFF',  // 亮白色，确保对比
      fontSize: '24rpx',
    },
    // 一级标题
    h1: {
      color: '#000',
      fontSize: '32rpx',
    },
    // 二级标题
    h2: {
      color: '#000',
      fontSize: '28rpx',
    },
    // 普通文字
    p: {
      color: '#000',
      fontSize: '24rpx',
    },
  },
  // 可以添加更多主题
};

export function setTheme(theme: string) {
  const app = getApp();
  app.globalData.theme = theme;
  wx.setStorageSync('theme', theme);
  eventBus.emit('themeChange', theme); // 广播主题变化
}

export function applyTheme({context, theme}: any) {
  let themeStyles = themes[theme] || themes.light; // 默认使用 light 主题
  const themeStyleButton = styleStr(themeStyles.button)
  context.setData({ themeStyles, themeStyleButton, theme });
}

export function initializeTheme(context: any) {
  const theme = wx.getStorageSync('theme') || 'light';
  applyTheme({context, theme});
}

function styleStr(themeStyles: any) {
  const input =  JSON.stringify(themeStyles)
  // 去掉首尾字符
  let trimmedString = input.slice(1, -1);
  let result = '';
  let inQuotes = false;

  for (let i = 0; i < trimmedString.length; i++) {
    const char = trimmedString[i];

    if (char === '"') {
      inQuotes = !inQuotes; // 切换 inQuotes 状态
      result += char;
    } else if (char === ',' && !inQuotes) {
      result += ';'; // 只在不在引号中的逗号替换为分号
    } else {
      result += char;
    }
  }

  // 去掉所有的双引号
  result = result.split('"').join('');
  return result
}