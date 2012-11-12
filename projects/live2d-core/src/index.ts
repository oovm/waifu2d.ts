import { Live2DModel, MotionPreset } from 'pixi-live2d-display';
import * as PIXI from 'pixi.js';

// 确保Live2D命名空间可用
window.PIXI = PIXI;

// 导出pixi-live2d-display中的核心类型
export { Live2DModel, MotionPreset };

/**
 * Live2D模型配置选项
 */
export interface Live2DModelOptions {
  /**
   * 模型JSON文件的路径
   */
  modelPath: string;
  
  /**
   * 要渲染到的HTML元素ID
   */
  elementId: string;
  
  /**
   * 画布宽度
   * @default 300
   */
  width?: number;
  
  /**
   * 画布高度
   * @default 300
   */
  height?: number;
  
  /**
   * 是否自动适应模型大小
   * @default true
   */
  autoFit?: boolean;
  
  /**
   * 是否自动开始动画
   * @default true
   */
  autoMotion?: boolean;
  
  /**
   * 是否启用鼠标跟踪
   * @default true
   */
  mouseTracking?: boolean;
}

/**
 * 创建Live2D模型
 * @param options 模型配置选项
 * @returns Promise<Live2DModel> 加载完成的Live2D模型实例
 */
export async function createLive2DModel(options: Live2DModelOptions): Promise<Live2DModel> {
  const {
    modelPath,
    elementId,
    width = 300,
    height = 300,
    autoFit = true,
    autoMotion = true,
    mouseTracking = true
  } = options;
  
  // 初始化PIXI应用
  const app = new PIXI.Application({
    view: document.getElementById(elementId) as HTMLCanvasElement,
    width,
    height,
    backgroundAlpha: 0,
    autoDensity: true,
    antialias: true
  });
  
  // 加载模型
  const model = await Live2DModel.from(modelPath);
  
  // 添加模型到舞台
  app.stage.addChild(model);
  
  // 自动适应大小
  if (autoFit) {
    const scale = Math.min(width / model.width, height / model.height);
    model.scale.set(scale);
    
    // 居中显示
    model.x = (width - model.width * scale) / 2;
    model.y = (height - model.height * scale) / 2;
  }
  
  // 启用鼠标跟踪
  if (mouseTracking) {
    enableMouseTracking(model, app.view);
  }
  
  // 自动开始动画
  if (autoMotion) {
    startIdleAnimation(model);
  }
  
  return model;
}

/**
 * 启用鼠标跟踪功能
 * @param model Live2D模型实例
 * @param canvas 画布元素
 */
function enableMouseTracking(model: Live2DModel, canvas: HTMLCanvasElement) {
  // 跟踪鼠标移动
  document.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 计算鼠标位置相对于画布中心的偏移
    const mouseX = (event.clientX - centerX) / rect.width;
    const mouseY = (event.clientY - centerY) / rect.height;
    
    // 更新模型的视线方向
    if (model.internalModel) {
      model.internalModel.focusController?.focus(mouseX, mouseY);
    }
  });
}

/**
 * 开始空闲动画
 * @param model Live2D模型实例
 */
async function startIdleAnimation(model: Live2DModel) {
  // 尝试播放内置的动作组
  try {
    // 获取模型支持的动作组
    const motions = model.internalModel?.motionManager.definitions;
    
    if (motions) {
      // 优先使用Idle动作组
      if (motions.idle) {
        model.motion('idle');
      } else if (motions.tap_body) {
        // 如果没有idle动作，尝试使用tap_body动作
        model.motion('tap_body');
      } else {
        // 使用第一个可用的动作组
        const firstMotionGroup = Object.keys(motions)[0];
        if (firstMotionGroup) {
          model.motion(firstMotionGroup);
        }
      }
    }
  } catch (error) {
    console.warn('Failed to start idle animation:', error);
  }
}

/**
 * 加载Cubism SDK
 * 在使用Live2D功能前必须调用此函数
 */
export async function initLive2D() {
  // 设置Cubism SDK的路径
  Live2DModel.registerTicker(PIXI.Ticker);
  
  // 注册Cubism SDK
  if (window.Live2DCubismCore) {
    Live2DModel.registerCubismCore(window.Live2DCubismCore);
  } else {
    console.warn('Live2DCubismCore is not loaded. Please include the Cubism SDK.');
  }
}

// 导出默认对象
export default {
  createLive2DModel,
  initLive2D,
  Live2DModel,
  MotionPreset
};