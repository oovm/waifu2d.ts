import { defineConfig } from 'vitepress';
import {vitePressLive2D} from "@doki-land/live2d-vitepress";

export default defineConfig({
    title: 'Live2D PIXI Runtime',
    description: '基于 pixi.js 的 Live2D TypeScript 运行库',
    lang: 'zh-Hans',
    ignoreDeadLinks: true,
    themeConfig: {
        logo: '/logo.svg',
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '指南',
                link: '/guide/'
            },
            {
                text: 'API',
                link: '/api/'
            },
            {
                text: '示例',
                link: '/examples/'
            },
            {
                text: 'GitHub',
                link: 'https://github.com/your-username/oh-my-live2d'
            }
        ],

        sidebar: {
            '/guide/': [
                {
                    text: '指南',
                    items: [
                        {
                            text: '介绍',
                            link: '/guide/'
                        },
                        {
                            text: '快速开始',
                            link: '/guide/getting-started'
                        },
                        {
                            text: '基本用法',
                            link: '/guide/basic-usage'
                        },
                        {
                            text: '高级用法',
                            link: '/guide/advanced-usage'
                        }
                    ]
                }
            ],
            '/api/': [
                {
                    text: 'API参考',
                    items: [
                        {
                            text: '核心API',
                            link: '/api/'
                        },
                        {
                            text: 'Vite插件',
                            link: '/api/vite-plugin'
                        },
                        {
                            text: 'VitePress插件',
                            link: '/api/vitepress-plugin'
                        },
                        {
                            text: 'VuePress插件',
                            link: '/api/vuepress-plugin'
                        },
                        {
                            text: 'Hexo插件',
                            link: '/api/hexo-plugin'
                        }
                    ]
                }
            ]
        }
    },
    vite: {
        plugins: [
            vitePressLive2D({
                // cdn: '/l2d.umd.js',
                models:[
                    {
                        model_url: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json'
                    }
                ]
            })
        ],
        server: {
            host: '0.0.0.0',
            port: 5173,
            fs: {
                allow: ['../']
            }
        },
    }
});