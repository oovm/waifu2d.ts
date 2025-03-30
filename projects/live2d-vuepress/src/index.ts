import type {App, Plugin} from 'vuepress';
import {generateCdn, generateElementId, generateModelList} from "@doki-land/live2d/helper";
import {VuePressPluginLive2D} from "./types.js";


/**
 * VuePress插件，用于在VuePress文档中使用Live2D模型
 * @param options 插件配置选项
 * @returns VuePress插件
 */
export function vuePressLive2D(options: VuePressPluginLive2D): Plugin {
    const elementId = generateElementId(options)
    const models = generateModelList(options)
    const cdn = generateCdn(options)

    return (app: App) => {
        return {
            name: 'vuepress-plugin-live2d',
            multiple: false,
            onInitialized(app: App) {
                // 注入脚本到head
                app.options.head.push(
                    ['script', { src: cdn, defer: true }],
                    ['script', {}, `
                        l2d.initializeLive2D();
                        l2d.createLive2D({
                            element_id: '${elementId}',
                            models: ${JSON.stringify(models)},
                            ...${JSON.stringify(options)}
                        });
                    `]
                );
            }
        }
    }
}
