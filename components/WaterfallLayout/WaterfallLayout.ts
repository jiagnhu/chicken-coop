// WaterfallLayout.ts
Component({
  properties: {
    images: {
      type: Array,
      value: []
    },
  },

  data: {
    isSliderActive: false,
    startX: 0,
    showSlider: false,  // 是否显示 slider，初始为 false
    col: 2,
    urls: [],
    columns: [], // 存储各列的数组
    imageStyles: {
      horizontal: {},
      vertical: {}
    } // 存储图片样式
  },

  observers:
  {
    'images': async function () {
      const columnCount = Number(this.data.col);
      await this.calculateImageDimensions(columnCount);
      await this.setupWaterfall(columnCount);
    },
    'col': async function () {
      const columnCount = Number(this.data.col);
      await this.calculateImageDimensions(columnCount);
      await this.setupWaterfall(columnCount);
    }
  },

  lifetimes: {
    async attached() {
      
    }
  },

  methods: {
    async setupWaterfall(columnCount: number) {
      const images = this.data.images.reduce((acc: any[], item: any) => {
        let style;
        if (item.isHorizontal) {
          style = { ...item, ...this.data.imageStyles.horizontal };
        } else {
          style = { ...item, ...this.data.imageStyles.vertical };
        }
      
        acc.push(style);
        return acc;
      }, []);
      
      this.arrangeImages(images, columnCount);
    },

    arrangeImages(images: any[], columnCount: number) {
      const columns: any = Array.from({ length: columnCount }, () => []); // 初始化列数组
      const columnHeights = Array.from({ length: columnCount }, () => 0); // 初始化列高度数组

      images.forEach(image => {
        // 找到当前最矮的列
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columns[shortestColumnIndex].push(image); // 将图片放入当前最矮的列
        columnHeights[shortestColumnIndex] += image.height + 20; // 更新列高度，20 为底部间距
      });

      // 创建 urls 数组，将图片的 src 按横向顺序添加
      const urls: any = [];
      const maxColumnLength = Math.max(...columns.map((column: any) => column.length));

      // 按行从每一列中取出图片的 src 属性
      for (let row = 0; row < maxColumnLength; row++) {
        for (let col = 0; col < columnCount; col++) {
          if (columns[col][row]) {
            urls.push(columns[col][row].src);
          }
        }
      }
      this.setData({
        urls,
        columns: columns // 更新状态，保存每列的图片
      });
    },

    calculateImageDimensions(imagesPerRow: number) {
      return new Promise((resolve) => {
        const screenWidth = 710; // 屏幕宽度固定为750rpx
        const margin = imagesPerRow === 1 ? 10 : 20 / imagesPerRow; // 每张图片的左右margin总计为20rpx

        // 计算每张图片的宽度
        const imageWidth = screenWidth / imagesPerRow - margin * 2;
        console.log('imageWidth', imageWidth)
        // 黄金比例
        const goldenRatio = 1.618;

        // 竖图高度为宽度的1.618倍
        const verticalImageHeight = imageWidth * goldenRatio;

        // 横图高度为宽度的1/1.618倍
        const horizontalImageHeight = imageWidth / goldenRatio;

        const horizontal = {
          padding: margin,
          width: imageWidth,
          height: horizontalImageHeight,
        }

        const vertical = {
          padding: margin,
          width: imageWidth,
          height: verticalImageHeight,
        }

        function getStyle (obj: any) {
          for (let key in obj) {
            obj[key] = obj[key] + 'rpx'
          }
          return JSON.stringify(obj).slice(1, -1).replace(/,/g, ';').replace(/"/g, ' ')
        }



        this.setData({
          imageStyles: {
            horizontal: {
              ...horizontal,
              style: getStyle(horizontal),
            },
            vertical: {
              ...vertical,
              style: getStyle(vertical),
            }
          }
        });
        resolve(true)
      })
    },

    // 当滑动条值变化时，更新列数
    onSliderChange(event: any) {
      this.setData({
        isSliderActive: false,
        col: event.detail.value  // 更新列数
      });
    },
    
    // 记录触摸起始位置
    onTouchStart(event: any) {
      this.setData({
        startX: event.touches[0].pageX
      });
    },

     // 判断滑动方向
    onTouchEnd(event: any) {
      // 如果 slider 正在滑动，忽略此触摸事件
      if (this.data.isSliderActive) return;

      const endX = event.changedTouches[0].pageX;
      const deltaX = this.data.startX - endX;

      if (deltaX < 30) {
        // 左滑，显示 slider
        this.setData({
          showSlider: true
        });
      } else if (deltaX > -30) {
        // 右滑，隐藏 slider
        this.setData({
          showSlider: false
        });
      }
    },

    // 当 slider 开始滑动时，设置标志位
    onSliderTouchStart() {
      this.setData({
        isSliderActive: true
      });
    },

    // 当 slider 滑动结束时，重置标志位
    onSliderTouchMove() {
      this.setData({
        isSliderActive: false
      });
    },

    onTouchmove () {}
  }
});