import '../lib/cubism2.min.js';
import '../lib/cubism5.min.js';
import * as PIXI from 'pixi.js';

import { Ticker, TickerPlugin } from '@pixi/ticker';
import {
    Live2DModel,
    MotionManager,
    SoundManager
} from 'pixi-live2d-display-lipsyncpatch';
import { Application,  } from 'pixi.js';
import './icons/style.css';
import { Live2dOptions } from '@/types/index.js';

export { MotionManager, SoundManager, Live2DModel, PIXI };

/**
 * 创建Live2D模型
 * @param options 模型配置选项
 * @returns Promise<Live2DModel> 加载完成的Live2D模型实例
 */
export async function createLive2D(options: Live2dOptions): Promise<Live2DModel> {
    const {
        element_id = 'live2d-canvas',
        models,
        width = 300,
        height = 300,
        auto_fit = true,
        auto_motion = true,
        mouse_tracking = true
    } = options;
    // 创建画布
    let element = findOrCreateCanvas(element_id, options)
    // 初始化PIXI应用
    const app = new Application({
        view: element,
        width: width,
        height: height,
        // resolution: 1,
        backgroundAlpha: 0,
        autoDensity: true,
        antialias: true,
        eventMode: 'static',
        eventFeatures: {
            move: true,
            globalMove: true,
            click: true,
            wheel: true
        }
    });

    // 加载模型
    const model = await Live2DModel.from(models[0].model_url);

    // 添加模型到舞台
    app.stage.addChild(model);

    // 自动适应大小
    if (auto_fit) {
        // 修复auto_fit功能，确保模型不被截断且保持正确比例
        const scale = Math.min(width / model.width, height / model.height);
        model.scale.set(scale);

        // 居中显示，确保模型完全可见
        model.x = (width - model.width * scale) / 2;
        model.y = (height - model.height * scale) / 2;
    }

    // 启用鼠标跟踪
    if (mouse_tracking) {
        enableMouseTracking(model, app.view);
    }

    // 自动开始动画
    if (auto_motion) {
        await startIdleAnimation(model);
    }
    
    // 创建右侧图标栏
    // createIconPanel(model, element);

    return model;
}

function findOrCreateCanvas(id: string, options: Live2dOptions): HTMLCanvasElement {
    let canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = id;
        document.body.appendChild(canvas);
        canvas.style.display = 'none';
        canvas.style.position = 'fixed';
        // 设置画布样式
        canvas.style.display = 'block';
        canvas.style.position = 'absolute';
        canvas.style.bottom = `${options.spacing_y || 0}px`;
        canvas.style[options.position === 'left' ? 'left' : 'right'] = `${options.spacing_x || 0}px`;
        canvas.style.zIndex = '9999';
    }
    return canvas;
}


/**
 * 启用鼠标跟踪功能
 * @param model Live2D模型实例
 * @param canvas 画布元素
 */
function enableMouseTracking(model: Live2DModel, canvas: any) {
    // 跟踪鼠标移动
    document.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 计算鼠标位置相对于画布中心的偏移
        const mouseX = (event.clientX - centerX) / rect.width;
        // 修正Y轴方向，使用负值来反转方向
        const mouseY = -(event.clientY - centerY) / rect.height;

        // 更新模型的视线方向
        if (model.internalModel) {
            model.internalModel.focusController?.focus(mouseX, mouseY);
        }
    });
    
    // 添加点击模型触发动作的交互
    canvas.addEventListener('click', () => {
        // 尝试播放tap_body动作，如果没有则尝试其他可用动作
        try {
            const motions = model.internalModel?.motionManager.definitions;
            if (motions) {
                if (motions.tap_body) {
                    model.motion('tap_body');
                } else if (motions.tap) {
                    model.motion('tap');
                } else {
                    // 使用第一个可用的动作组
                    const firstMotionGroup = Object.keys(motions)[0];
                    if (firstMotionGroup) {
                        model.motion(firstMotionGroup);
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to play tap animation:', error);
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
                // 如果没有idle动作，尝试使用 tap_body 动作
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
 * @param cubism2 可选的CubismCore对象，如果在非浏览器环境中使用，需要传入
 * @param cubism5
 */
export async function initializeLive2D(cubism2?: any, cubism5?: any) {
    // 首先初始化 Cubism2 SDK
    // console.log('sdk2:', Cubism2);
    // console.log('sdk5:', Cubism5);
    // @ts-ignore
    // window.Live2D = cubism2 || Cubism2;
    // 然后初始化 Cubism5 SDK
    // @ts-ignore
    // window.Live2DCubismCore = cubism5 || Cubism5().Live2DCubismCore;

    // 最后初始化 PIXI 相关功能
    // 为 Live2DModel 注册 Ticker
    Live2DModel.registerTicker(Ticker);
    // 为 Application 注册 Ticker
    PIXI.extensions.add(TickerPlugin);
    // 注册 InteractionManager 以支持 Live2D 模型的自动交互
    // PIXI.extensions.add(InteractionManager);
}
