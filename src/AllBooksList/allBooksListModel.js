import { EventEmitter } from '../helpers';

console.log('allBooksListModel ok');
class AllBooksListModel extends EventEmitter {
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
    this.items.push(item);
    this.emit('change', this.items);
    return item;
  }

  updateItem(id, title, author) {
    const item = this.getItem(id);
    Object.keys(title).forEach(prop => (item[prop] = title[prop]));
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

export default AllBooksListModel;
