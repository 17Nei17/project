function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if (key.startsWith('data-')) {
      element.setAttribute(key, props[key]);
    } else {
      element[key] = props[key];
    }
  });

  children.forEach(elem => {
    if (typeof elem === 'string') {
      elem = document.createTextNode(elem);
    }
    element.appendChild(elem);
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

function save(data, booksType) {
  const string = JSON.stringify(data);
  localStorage.setItem(`${booksType}`, string);
}

function load(booksType) {
  const books = localStorage.getItem(`${booksType}`);
  const dataBooks = JSON.parse(books);
  return dataBooks;
}

function CreateBookObject(title, author, description) {
  this.title = title;
  this.author = author;
  this.description = description;
}

export { createElement, EventEmitter, save, load, CreateBookObject };
