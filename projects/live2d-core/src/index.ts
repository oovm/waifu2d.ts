import { Live2DModel, MotionManager } from 'pixi-live2d-display';
import * as PIXI from 'pixi.js';
import { Live2dOptions } from './types';
// @ts-ignore
import * as Cubism2 from '../lib/cubism2.min.js';
// @ts-ignore
import * as Cubism5 from '../lib/cubism5.min.js';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { InteractionManager } from '@pixi/interaction';

export * from './types';
export { Live2DModel, MotionManager, PIXI };


/**
 * 创建Live2D模型
 * @param options 模型配置选项
 * @returns Promise<Live2DModel> 加载完成的Live2D模型实例
 */
export async function createLive2dModel(options: Live2dOptions): Promise<Live2DModel> {
    const {
        models,
        element_id,
        auto_fit = true,
        auto_motion = true,
        mouse_tracking = true
    } = options;

    // 初始化PIXI应用
    const app = new PIXI.Application({
        view: document.getElementById(element_id) as HTMLCanvasElement,
        width: 300,
        height: 300,
        backgroundAlpha: 0,
        autoDensity: true,
        antialias: true
    });

    // 加载模型
    const model = await Live2DModel.from(models[0]);

    // 添加模型到舞台
    app.stage.addChild(model);

    // 自动适应大小
    if (auto_fit) {
        const scale = Math.min(300 / model.width, 300 / model.height);
        model.scale.set(scale);

        // 居中显示
        model.x = (300 - model.width * scale) / 2;
        model.y = (300 - model.height * scale) / 2;
    }

    // 启用鼠标跟踪
    if (mouse_tracking) {
        enableMouseTracking(model, app.view);
    }

    // 自动开始动画
    if (auto_motion) {
        await startIdleAnimation(model);
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
                await model.motion('idle');
            } else if (motions.tap_body) {
                // 如果没有idle动作，尝试使用tap_body动作
                await model.motion('tap_body');
            } else {
                // 使用第一个可用的动作组
                const firstMotionGroup = Object.keys(motions)[0];
                if (firstMotionGroup) {
                    await model.motion(firstMotionGroup);
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
 * @param cubismCore 可选的CubismCore对象，如果在非浏览器环境中使用，需要传入
 */
export async function initializeLive2D(cubismCore?: any) {
    // 为 Live2DModel 注册 Ticker
    Live2DModel.registerTicker(Ticker);
    // 为 Application 注册 Ticker
    PIXI.extensions.add(TickerPlugin)
    // 注册 InteractionManager 以支持 Live2D 模型的自动交互
    PIXI.extensions.add(InteractionManager);
    // 注册Cubism SDK
    // if (typeof window !== 'undefined' && window.Live2DCubismCore) {
    //     Live2DModel.registerCubismCore(Cubism2);
    // } else if (cubismCore) {
    //     Live2DModel.registerCubismCore(Cubism5);
    // } else {
    //     console.warn('Live2DCubismCore is not loaded. Please include the Cubism SDK.');
    // }
}

// 导出默认对象
export default {
    createLive2dModel,
    initializeLive2D,
    Live2DModel,
    MotionManager
};