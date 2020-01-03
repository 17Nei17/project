function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if (key.startsWith('data-')) {
      element.setAttribute(key, props[key]);
    } else {
      element[key] = props[key];
    }
  });
  children.forEach(child => {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;
}
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, arg) {
    console.log(type, arg);
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(arg));
    }
  }
}

function save(data) {
  const string = JSON.stringify(data);
  console.log(string);
  localStorage.setItem('books', string);
}

function load() {
  const string = localStorage.getItem('books');
  console.log(string);
  const data = JSON.parse(string);
  return data;
}
export { createElement, EventEmitter, save, load };
