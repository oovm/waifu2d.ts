import { ModelOptions } from './ModelOptions';

/**
 * Live2D模型配置选项
 */
export interface Live2dOptions {
    /**
     * 模型配置选项
     */
    models: ModelOptions[];
    /**
     * 画布的ID
     * @default 'live2d-canvas'
     */
    element_id?: string,
    /**
     * 画布的宽度
     * @default 300
     */
    width?: number;
    /**
     * 画布的高度
     * @default 300
     */
    height?: number;
    /**
     * 是否自动适应模型大小
     * @default true
     */
    auto_fit?: boolean;
    /**
     * 是否自动开始动画
     * @default true
     */
    auto_motion?: boolean;
    /**
     * 是否启用鼠标跟踪
     * @default true
     */
    mouse_tracking?: boolean;
}