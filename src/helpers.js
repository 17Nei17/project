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
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(arg));
    }
  }
}

function save(data) {
  const string = JSON.stringify(data);

  localStorage.setItem('todos', string);
}

function load() {
  const string = localStorage.getItem('todos');
  const data = JSON.parse(string);

  return data;
}

// переместить в отдельный скрипт
const modal = document.getElementById('mymodal');
const btn = document.getElementById('btn_modal_window');
const close = document.getElementById('close_modal_window');
btn.onclick = function() {
  modal.style.display = 'block';
};
close.onclick = function() {
  modal.style.display = 'none';
};
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

export { createElement, EventEmitter, save, load };
