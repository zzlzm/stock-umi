import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    copy: ['assets/stock.json'],
    routes: [{ path: '/', component: '@/pages/index' }],
});
