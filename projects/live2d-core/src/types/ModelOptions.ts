
export interface ModelOptions {
    /**
     * 模型JSON文件的路径
     */
    modelPath: string;
    desktop?: ModelPosition;
    mobile?: ModelPosition;
}

export interface ModelPosition {
    /**
     * 模型在画布中的缩放
     */
    scale?: number,
    /**
     * 模型在画布中的位置
     */
    x?: number;
    /**
     * 模型在画布中的位置
     */
    y?: number;
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
}