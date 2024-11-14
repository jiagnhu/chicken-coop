// 定义请求的基础配置
const baseUrl = 'http://127.0.0.1:8001/api/'; // 替换为你的接口基础路径

// 定义请求参数的类型
interface RequestOptions {
  url: string;
  method?: | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';
  data?: any;
  header?: Record<string, string>;
}

// 定义响应数据的类型（可根据具体接口调整）
// interface ResponseData<T = any> {
//   code: number;
//   data: T;
//   message: string;
// }

// 全局请求拦截器
const requestInterceptor = (options: RequestOptions): RequestOptions => {
  const token = wx.getStorageSync('token') || '';

  options.header = {
    ...options.header,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return options;
};

// 全局响应拦截器
const responseInterceptor = <T>(response: WechatMiniprogram.RequestSuccessCallbackResult): Promise<T> => {
  const { statusCode, data } = response;

  if (statusCode === 200) {
    return Promise.resolve(data as T);
  } else {
    handleRequestError(response);
    return Promise.reject(data as T);
  }
};

// 错误处理函数
const handleRequestError = (response: WechatMiniprogram.RequestSuccessCallbackResult) => {
  const { statusCode } = response;

  switch (statusCode) {
    case 401:
      wx.showToast({
        title: '未授权，请登录',
        icon: 'none',
      });
      // 可以添加跳转到登录页面的逻辑
      break;
    case 403:
      wx.showToast({
        title: '拒绝访问',
        icon: 'none',
      });
      break;
    case 404:
      wx.showToast({
        title: '资源未找到',
        icon: 'none',
      });
      break;
    case 500:
      wx.showToast({
        title: '服务器错误',
        icon: 'none',
      });
      break;
    default:
      wx.showToast({
        title: `请求错误：${statusCode}`,
        icon: 'none',
      });
      break;
  }
};

// 封装基础请求方法
const request = <T>(options: RequestOptions): Promise<T> => {
  const finalOptions = requestInterceptor(options);
  console.log('finalOptions.data', finalOptions.data)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${finalOptions.url}`,
      method: finalOptions.method || 'GET',
      data: finalOptions.data,
      header: finalOptions.header,
      success: (res) => {
        responseInterceptor<T>(res)
          .then(resolve)
          .catch(reject);
      },
      fail: (err) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
        });
        reject(err);
      }
    });
  });
};

// 常用请求方法快捷封装
const get = <T>(url: string, data?: any, header?: Record<string, string>): Promise<T> =>
  request<T>({ url, method: 'GET', data, header });

const post = <T>(url: string, data?: any, header?: Record<string, string>): Promise<T> =>
  request<T>({ url, method: 'POST', data, header });

const put = <T>(url: string, data?: any, header?: Record<string, string>): Promise<T> =>
  request<T>({ url, method: 'PUT', data, header });

const del = <T>(url: string, data?: any, header?: Record<string, string>): Promise<T> =>
  request<T>({ url, method: 'DELETE', data, header });

// 导出封装好的方法
export {
  request,
  get,
  post,
  put,
  del as delete,
};