# WebAPP Basic Framework

> 基于vue + vue-router + vuex + axios + iview + webpack4 的webapp基础开发框架

# 核心技术栈
1. MVVM框架/Vue  http://cn.vuejs.org/
2. 路由/Vue-Router  http://router.vuejs.org/zh-cn/
3. 状态管理/Vuex  http://vuex.vuejs.org/zh-cn/
4. 前端UI框架/iView  https://www.iviewui.com
5. Ajax框架/axios  https://github.com/mzabriskie/axios
6. 打包工具/webpack4  http://webpack.github.io/
7. 国际化/VueI18n
8. 富文本／tinymce-vue(src/components/vueEditor) https://github.com/tinymce/tinymce-vue

# 远程公共组件
1. 公共导航： package.json配置（ npm run init ）http://npm.vipkid.com.cn/#/package/itsys-pcheader/v1.0.7

# 目录结构
1. build： webpack配置文件
2. config： 应用配置文件
3. src：源码存放目录
- src/assets：资源目录（CSS、JS、IMAGES）
- src/assets/css/base.css css重置
- src/commons: 应用公共库
- src/libs：第三方库
- src/utils：公共方法
- src/utils/cookie.js cookie的处理方法
- src/utils/storage.js localStorage的处理方法
- src/commponents： 公共vue组件
- src/pages：vue组件页面
- src/plugins：插件
- src/plugins/http.js：axios全局请求和响应拦截处理
- src/plugins/sso.heart-1.0.1.min：心跳方法
- src/router：路由配置
- src/store：vuex状态管理
- src/App.vue：入口组件
- src/main.js：webpack打包入口文件

4. static：静态资源
5. .babelrc
6. .eslintrc.js：eslint配置
7. .eslintignore：eslint忽略文件配置
8. .gitignore：git忽略文件
9. package.json npm依赖描述文件
10. index.html html模板

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev ／ npm run start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
