import { EventEmitter } from './helpers'; // EventEmitter позволяет выполнять функции (on. , emit.)

console.log('ListModel ok');
class ListModel extends EventEmitter {
  constructor(items = []) {
    // состояние модели (на старте пустой массив. заполняется обьектами с инфой о книге)
    super();
    this.items = items;
  }

  getItem(id) {
    return this.items.find(item => item.id == id);
  }

  getItemByName(name) {
    return this.items.find(item => item.title == name);
  }

  addItem(item) {
    // сюда передается обьект и добавляется в массив Model
    this.items.push(item);
    this.emit('change', this.items);
    return item;
  }

  updateItem(id, title) {
    const item = this.getItem(id);
    Object.keys(title).forEach(prop => (item[prop] = title[prop]));
    this.emit('change', this.items);
    return item;
  }

  updateAuthor(id, author) {
    const item = this.getItem(id);
    Object.keys(author).forEach(prop => (item[prop] = author[prop]));
    this.emit('change', this.items);
    return item;
  }

  removeItem(id) {
    const index = this.items.findIndex(item => item.id == id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.emit('change', this.items);
    }
  }
}

class BooksModel extends EventEmitter {
  constructor(items = []) {
    // состояние модели (на старте пустой массив)
    super();
    this.items = items;
  }

  getItem(id) {
    return this.items.find(item => item.id == id);
  }

  getItemByName() {
    return this.items.find(item => item);
  }

  addItem(item) {
    this.items.push(item);
    this.emit('returnBook', item);
    this.emit('change', this.items);
    return item;
  }

  addStatus(id) {
    const index = this.getItem(id);
    index.completed = true;
    this.emit('change', this.items);
  }

  removeItem(id) {
    const index = this.items.findIndex(item => item.id == id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.emit('change', this.items);
    }
  }
}
export { ListModel, BooksModel };
