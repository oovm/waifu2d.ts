import { defineConfig } from 'vuepress';
import { live2dVuePressPlugin } from '../../../live2d-vuepress/src';

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
  plugins: [
    live2dVuePressPlugin({
      // 模型配置
      models: [
        {
          model_url: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json'
        }
      ],
      // 画布配置
      width: 280,
      height: 320,
      // 位置配置
      position: 'right',
      spacing_x: 20,
      spacing_y: 20,
      // 行为配置
      auto_fit: true,
      auto_motion: true,
      mouse_tracking: true,
      // 路由配置
      include_route: ['*'],
      exclude_route: ['/examples/vuepress']
    })
  ]
});