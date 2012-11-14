export type ModelOptions = ModelMainOptions & ModelMobileAdaptation;
export interface ModelMobileAdaptation {
    /**
     * 移动端配置, 会覆盖 desktop 中的主配置
     * @default null
     */
    mobile?: Partial<ModelOptions>;
}
export interface ModelMainOptions {
    /**
     * 模型JSON文件的路径
     */
    model_url: string;
    position?: ModelPosition;
}

export interface ModelPosition {
    /**
     * 模型在画布中的缩放
     */
    scale?: number,
    /**
     * 模型在画布中的位置
     */
    anchor_x?: number;
    /**
     * 模型在画布中的位置
     */
    anchor_y?: number;
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