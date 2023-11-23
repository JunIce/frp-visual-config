import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import i18n from "./lang"
import App from './App.vue';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(createPinia()).use(i18n);

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');
