import { ModelOptions } from './ModelOptions.ts';

/**
 * Live2D模型配置选项
 */
export interface Live2dOptions {
    /**
     * 要渲染到的HTML元素ID
     */
    elementId: string;
    models: ModelOptions[];
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