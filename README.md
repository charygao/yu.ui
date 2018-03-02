## yu.ui
vue ui 框架

# 引入vuex步骤
~~~
1.cnpm install --save vuex
2.const Vuex = require('vuex/dist/vuex');//选择这个文件是因为这个文件可以使用require,并且没有使用到node的process
3.Vue.use(Vuex); //让vue使用vuex
4.
// vuex
const state = {
  count: 1,
};
const store = new Vuex.Store({
  state,
  mutations: {
    add(state) {
      state.count += 1;
    },
    reduce(state) {
      state.count -= 1;
    },
  },
});

ctrl.install(() => {
  new Vue({
    el: '#container',
    data,
    methods: {
    },
    store,
  });
});
~~~

## 使用vue element 饿了吗的dispatch实现emitter.js

1.引入emitter.js这个文件
~~~
const emitter = require('../../utils/emitter');
~~~
2.父组件mixins混入emitter
~~~
mixins: [emitter],
~~~
3.父组件定义组件名称（因为emitter中的dispatch要根据这个名称来判断来处理事件）
~~~
componentName: 'BSelect',
~~~
4.父组件在创建时监听事件
~~~
created() {
      this.$on('handleSelect', this.handleSelect);
},
~~~
5.子组件同样引入emitter这个文件，并混入
~~~
handleClick() {
  this.dispatch('BSelect', 'handleSelect', 4);// 传入步骤3中定义的组件名称componentName，并传入要触发的父组件的事件名称，参数
},
~~~
# css书写规范
每一个独立的模块、页面、组件都要有一个独立的不重复的命名空间
比如 
~~~
.ui-button{
  ...
}
~~~
通过xx-name形成一个独立的命名空间
命名空间下，css的名字尽可能的短，css的类尽可能少
~~~
.ui-button{
  .head{}
  .content{}
  .footer{}
}
~~~
