import DefaultTheme from 'vitepress/theme';
import { live2dVitePressPlugin } from '@doki-land/live2d-vitepress';

export default {
    ...DefaultTheme,
    // async enhanceApp() {
    //     live2dVitePressPlugin({
    //         models: [
    //             {
    //                 model_url: 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Live2D/Senko_Normals/senko.model3.json'
    //             }
    //         ],
    //         element_id: ''
    //     });
    // }
};