import { defineConfig } from 'vitepress';
import { live2dVitePressPlugin } from '@doki-land/live2d-vitepress';

export default defineConfig({
    title: 'Live2D TypeScript Runtime',
    description: '基于pixi-live2d-display的TypeScript运行库',
    lang: 'zh-CN',

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
        server: {
            host: '0.0.0.0',
            port: 9999
        }
    },
});