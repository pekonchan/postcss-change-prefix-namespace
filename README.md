# postcss-change-prefix-namespace

The postcss plugin to change the css selector prefix namespace

这是一个postcss插件。

可对项目中所用到的css代码中指定选择器的前缀部分进行替换。特别适用于对第三方组件样式进行命名空间自定义。

如对`element-ui`的el命名空间自定义，把`el-`改成`ex-`：

改造前
```css
.el-input {
    /* ... */
}
```
改造后
```css
.ex-input {
    /* ... */
}
```

> 该插件改造于`postcss-change-css-prefix`，主要是因为`postcss-change-css-prefix`排除了对`element-ui`的icon的处理，而我这个插件则会把icon的类名也处理掉，这样才更倾向于通用的插件，而不是单单是一个针对饿了么组件库的插件

# Install
```
npm i postcss-change-prefix-namespace -D

yarn add postcss-change-prefix-namespace -D

pnpm add postcss-change-prefix-namespace -D
```

# Usage

在对postcss的配置中使用该插件。配置的方式有多种，在不同的脚手架中可能还不一样。这里对官方的配置方式进行举例说明。

例如对`postcss.config.js`中添加本插件

```js
const addCssPrefix = require('postcss-change-prefix-namespace')

module.exports = {
    plugins: [
        addCssPrefix({
            prefix: 'el-',
            replace: 'ex-'
        })
    ]
}
```

# 注意
该插件只会改变css代码的选择器前缀，如果你需要改动第三方组件的情况，例如`element-ui`，除了光该样式文件外，还需要对组件生成的HTML标签上的类名进行调整，可配合 [element-namespace-loader](https://github.com/pekonchan/element-namespace-loader) webpack loader完成。