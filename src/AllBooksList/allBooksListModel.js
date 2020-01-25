import { EventEmitter } from '../helpers';

class AllBooksListModel extends EventEmitter {
  constructor(booksArr = []) {
    super();
    this.booksArr = booksArr;
  }

  getItem(id) {
    return this.booksArr.find(item => item.id === id);
  }

  getItemByName(name) {
    return this.booksArr.find(item => item.title === name);
  }

  addItem(item) {
    this.booksArr.push(item);
    this.emit('change', this.booksArr);
    return item;
  }

  updateItem(id, title, author) {
    const item = this.getItem(id);

    Object.keys(title, author).forEach(function(prop) {
      item[prop] = title[prop];
      item[prop] = author[prop];
    });

    this.emit('change', this.booksArr);
    return item;
  }

  removeItem(id) {
    const index = this.booksArr.findIndex(item => item.id === Number(id));
    if (index > -1) {
      this.booksArr.splice(index, 1);
      this.emit('change', this.booksArr);
    }
  }
}

export default AllBooksListModel;
