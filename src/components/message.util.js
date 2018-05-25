import Vue from 'vue';
import Main from './message';

const MessageConstructor = Vue.extend(Main);

let instance;
const instances = [];
let seed = 1;


const hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
}

const Message = function (options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options,
    };
  }


  const id = `message_${seed++}`;

  instance = new MessageConstructor({
    data: options,
  });
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};

['success', 'warning', 'info', 'danger', 'primary'].forEach((type) => {
  Message[type] = (options) => {
    if (typeof options === 'string') {
      options = {
        message: options,
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = function (id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
