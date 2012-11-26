import { ModelOptions } from './ModelOptions';

/**
 * Live2D模型配置选项
 */
export interface Live2dOptions {
    /**
     * 要渲染到的HTML元素ID
     */
    element_id: string;
    /**
     * 模型配置选项
     */
    models: ModelOptions[];
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