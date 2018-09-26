# vue-model-mobile-vux

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


移动端vue-cli基于webpack的单页面Model

## 主要功能
 1. 支持vue-router路由按需加载
 2. 整合了UI库`vux`(可按需引入)
 3. 支持px转rem,默认750*750 50px = 1rem; 1rem = 50px;
 4. 基于`webpack2`，全面支持`ES6 Modules`
 5. 热更新
 6. 支持`Sass`css预处理 `less`css预处理
 7. 支持axios
 8. 支持v-lazyload图片懒加载
 9. 引入fastclick解决移动端300ms事件延迟

## 目录结构
```
webpack
 |---build
 |---src
    |---api    
        |---index.js   #api接口
    |---assets    #资源
    |---components #组件
        |---HelloWorld.vue
    |---config  #个人配置
        |---js/axios.js    #axios配置+全局注入vux(loading，toast，confirm)
        |---js/rem.js    #rem自适应
        |---js/lib.js    #微信,以及封装的方法
        |---js/utils.js    # 自定义方法
        |---js/filter.js    #vue过滤器
    |---view    #页面模块
    |---router
        |---index.js    #路由配置
    |---store 
        |---index.js    #Vuex状态管理
    |---App.vue    #根组件
    |---main.js    #入口文件        
......

  ```

