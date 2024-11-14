// @ts-ignore
import { setTheme, themes } from '@/utils/mixins/theme';
Component({
  data: {
    themeList: [],
    showPanel: false,
    buttonTop: 0,
    buttonLeft: 10,
    panelAnimation: {}
  },
  lifetimes: {
    attached() {
      if (themes) {
        const themeList: any = []
        for (const theme in themes) {
          themeList.push({
            name: theme,
            label: theme + ' Theme'
          })
        }
        this.setData({
          themeList,
          windowWidth: wx.getWindowInfo().windowWidth,
          windowHeight: wx.getWindowInfo().windowHeight,
        })
      }
      this.animatePanel('close');
      this.getSystemInfo()
      
    },
    ready() {
    },
    detached() {
    }
  },
  methods: {
    createScene(THREE: any, canvas: any) {
      // 创建场景
      const scene = new THREE.Scene();

      // 设置 Canvas 的宽高
      const width = canvas.width;
      const height = canvas.height;
 
      // 创建相机
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 2;
 
      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true }); // 设置 alpha 为 true，确保背景颜色可以更改
      renderer.setSize(width, height);
      renderer.setClearColor(0xffffff, 1); // 设置背景颜色为白色
 
      // 添加光源（如果需要其他类型的材质）
      const light = new THREE.PointLight(0xffffff);
      light.position.set(10, 10, 10);
      scene.add(light);

      const geometry1 = new THREE.BoxGeometry();
      const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry1, material1);
      scene.add(cube);
 
      // 渲染循环
      const animate = function () {
        canvas.requestAnimationFrame(animate);
        // cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
 
      animate();
    },
    switchTheme(e: any) {
      const theme = e.currentTarget.dataset.theme;
      console.log('主题修改', theme)
      setTheme(theme); // 更新全局主题
    },
    toggleThemePanel(e: any) {
      const type = e.target.dataset.type
      if (type === 'add') {
        this.setData({ showPanel: true })
        setTimeout(() => {
          this.animatePanel(type);
        }, 400)
      }

      if (type === 'close') {
        this.animatePanel(type);
        setTimeout(() => {
          this.setData({ showPanel: false })
        }, 300)
      }
    },
    onTouchMove(e: any) {
      const { clientX, clientY } = e.touches[0];
      const buttonRadius = 25; // 按钮半径
      const screenWidth = this.data.windowWidth;
      const screenHeight = this.data.windowHeight;
      
      // 限制按钮不能超出可视范围
      let buttonLeft = clientX - buttonRadius;
      let buttonTop = clientY - buttonRadius;

      // 判断左右边界
      if (buttonLeft < 0) buttonLeft = 0;
      if (buttonLeft > screenWidth - buttonRadius * 2) buttonLeft = screenWidth - buttonRadius * 2;

      // 判断上下边界
      if (buttonTop < 0) buttonTop = 0;
      if (buttonTop > screenHeight - buttonRadius * 2) buttonTop = screenHeight - buttonRadius * 2;

      this.setData({
        buttonTop,
        buttonLeft
      });
    },
    onTouchEnd() {
      // 触摸结束后可以处理一些逻辑，比如保存当前位置
    },
    animatePanel(type: string) {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out'
      });
      if (type === 'add') {
        animation.translateX(0).step();
      } else {
        // @ts-ignore
        animation.translateX('100%').step();
      }
      this.setData({ panelAnimation: animation.export() });
    },
    // 获取屏幕高度，将buttonTop的值设置到底部
    getSystemInfo() {
      const windowInfo = wx.getWindowInfo()
      this.setData({
        buttonTop: windowInfo.windowHeight - 120,
        buttonLeft: windowInfo.windowWidth - 70
      });
    }
  }
});