import {vuePressLive2D} from '@doki-land/live2d-vuepress';
import {viteBundler} from '@vuepress/bundler-vite'
import {defineUserConfig} from 'vuepress'

export default defineUserConfig({
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
                            text: '安装',
                            link: '/guide/installation'
                        },
                        {
                            text: '快速开始',
                            link: '/guide/getting-started'
                        },
                        {
                            text: '配置',
                            link: '/guide/configuration'
                        }
                    ]
                }
            ],
            '/examples/': [
                {
                    text: '示例',
                    items: [
                        {
                            text: '示例列表',
                            link: '/examples/'
                        },
                        {
                            text: 'VuePress插件',
                            link: '/examples/vuepress'
                        }
                    ]
                }
            ]
        }
    },
    bundler: viteBundler(),
    plugins: [
        vuePressLive2D({
            models: [
                {
                    model_url: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json'
                }
            ],
        })
    ]
});