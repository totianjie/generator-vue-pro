# vue_test

> A Vue.js project

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

## 静态文件cdn方式

----------

#### 需要调整index.html加载webpack中的配置，再调整webpack的prod环境，需要注意排除的模块和写入的外链要一一对应

./build/webpack.prod.config.js

```javascript
plugins: [
    ...
    new HtmlWebpackPlugin({
        ...
        // 静态文件采用cdn方式，直接写在index.html会影响本地开发时的调试。
        scripts: '<script src="https://cdn.bootcss.com/vue/2.2.2/vue.min.js"></script><script src="https://cdn.bootcss.com/vue-resource/1.2.0/vue-resource.min.js"></script><script src="https://cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"></script><script src="https://cdn.bootcss.com/vuex/2.2.1/vuex.min.js"></script>'
    }),
    ...
    new CopyWebpackPlugin([
        {
            from: './.htaccess',
            to: config.build.assetsRoot
        }
    ])
    ...

// 添加externals，vue、vuex、vue-router等使用cdn方式，在此排除后，需要在上面的HtmlWebpackPlugin.scripts中设置外链。
externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios': 'Axios',
    'vuex': 'Vuex',
    'vue-resource': 'VueResource'
}
```

./index.html

```javascript
...
        <%= htmlWebpackPlugin.options.scripts %>
    </body>
</html>
```



#### 每个页面除根外，还得加多一层.page  class的div

```javascript
// 主要是用于做全局最小宽度限制
<template>
	<div class="test-wrap">
		<div class="page">
          	......书写代码的地方
		</div>
	</div>
</template>
```

