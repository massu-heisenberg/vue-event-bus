/*
 * @Author: shmao
 * @Date: 2020-08-22 16:40:37
 * @LastEditors: shmao
 * @LastEditTime: 2020-08-23 00:19:17
 * @email: maosuhui@gamil.com
 */

class EventBus {
  constructor(vue) {
    if (!this.handles) {
      Reflect.defineProperty(this, 'handles', {
        value: {},
        enumerable: false,
      });
    }
    this.Vue = vue;
    this.eventMapUid = {};
  }
  setEventMapUid(uid, eventName) {
    if (!this.eventMapUid[uid]) this.eventMapUid[uid] = [];
    if (Reflect.has(this.eventMapUid, uid)) {
      this.eventMapUid[uid].push(eventName);
    }
  }
  $on(eventName, callback, vm) {
    if (!this.handles[eventName]) this.handles[eventName] = [];

    this.handles[eventName].push(callback);

    // 判断this.vue的原型对象在不在vm的原型链中

    if (vm instanceof this.Vue) this.setEventMapUid(vm._uid, eventName);
  }
  $emit() {
    let args = [...arguments],
      eventName = args[0],
      params = args.slice(1);
    if (this.handles[eventName]) {
      let len = this.handles[eventName].length;
      for (let i = 0; i < len; i++) {
        this.handles[eventName][i](...params);
      }
      // this.handles[eventName].forEach((event) => {
      //   event(...params);
      // });
    }
  }
  $offVmEvent(uid) {
    let currentEvents = this.eventMapUid[uid] || [];

    if (currentEvents.length === 0) return;

    currentEvents.forEach((event) => {
      // console.log(`组件${uid}的事件${event}已销毁`);
      this.$off(event);
    });
  }
  $off(eventName) {
    Reflect.deleteProperty(this.handles, eventName);
  }
}

let $EventBus = {};

$EventBus.install = (Vue, option) => {
  Vue.prototype.$eventBus = new EventBus(Vue);
  Vue.mixin({
    beforeDestroy() {
      this.$eventBus.$offVmEvent(this._uid);
    },
  });
};

export default $EventBus;
