import { EventEmitter } from './helpers'; // EventEmitter позволяет выполнять функции (on. , emit.)
/*
class Model extends EventEmitter {
  // делает дела с элементами, добавка/удаление/поиск
  constructor(items = []) {
    // состояние модели (на старте пустой массив)
    super();
    this.items = items;
  }

  getItem(id) {
    // принимает id книги(id), возвращает нужное id
    return this.items.find(item => item.id == id);
  }

  getDescription(id) {
    return this.items.find(item => item.description == description);
  }

  addItem(item) {
    // принимает айтем(книгу), пушит ее в список айтемов (в класс Model)
    this.items.push(item);
    this.emit('change', this.items);
    return item;
  }

  updateItem(id, data) {
    // обновление по Id данных о книге (data)
    const item = this.getItem(id);

    Object.keys(data).forEach(prop => (item[prop] = data[prop]));

    this.emit('change', this.items);

    return item;
  }

  removeItem(id) {
    // удаление книги  из массива книг (model) по id
    const index = this.items.findIndex(item => item.id == id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.emit('change', this.items);
    }
  }
}
*/
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
    // это отвечает за передачу обьекта в другой класс при перетягивании
    return this.items.find(item => item.title == name);
  }

  addItem(item) {
    // сюда передается обьект и добавляется в массив Model
    this.items.push(item);
    return item;
  }

  updateItem(id, title) {
    const item = this.getItem(id);
    Object.keys(title).forEach(prop => (item[prop] = title[prop]));

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
    return item;
  }

  removeItem(id) {
    const index = this.items.findIndex(item => item.id == id);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}
/*
class EndModel extends EventEmitter {
  constructor(items = []) {
    // состояние модели (на старте пустой массив)
    super();
    this.items = items;
  }

  getItem(id) {
    return this.state.find(item => item.id === id);
  }

  addItem(item) {
    this.state.push(item);
    return item;
  }

  removeItem(id) {
    const index = this.state.findIndex(item => item.id === id);

    if (index > -1) {
      this.state.splice(index, 1);
    }
  }
}
*/
export { ListModel, BooksModel };
