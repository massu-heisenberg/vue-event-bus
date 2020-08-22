<!--
 * @Author: shmao
 * @Date: 2020-08-23 00:25:20
 * @LastEditors: shmao
 * @LastEditTime: 2020-08-23 00:30:56
-->

在 Vue 项目中使用 EventBus 拥有生命周期，不用再去手动销毁
参考文章：[让在 Vue 中使用的 EventBus 也有生命周期](https://zhuanlan.zhihu.com/p/39537979) ##使用
npm install vue-custom-eventbus

```js
import eventBus from 'vue-custom-eventbus';
Vue.use(eventBus);
```

##组件中使用

```js
 created () {
   let text = Array(1000000).fill('xxx').join(',')
   this.$eventBus.$on('MY_EVENT', (...args) => {
     // todo something
   }, this) // 注意第三个参数要传this 否则需要手动销毁事件
 },
 click () {
    this.$eventBus.$emit('MY_EVENT', '这是$emit参数')
 }
```
