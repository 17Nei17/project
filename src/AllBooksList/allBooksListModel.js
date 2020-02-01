import { EventEmitter } from '../helpers';

class AllBooksListModel extends EventEmitter {
  constructor(booksOnList = []) {
    super();
    this.booksOnList = booksOnList;
  }

  getItem(id) {
    return this.booksOnList.find(item => item.id === id);
  }

  getItemByName(name) {
    return this.booksOnList.find(item => item.title === name);
  }

  addItem(item) {
    this.booksOnList.push(item);
    this.emit('change', this.booksOnList);
    return item;
  }

  updateItem(id, title, author) {
    const item = this.getItem(id);

    Object.keys(title, author).forEach(function(prop) {
      item[prop] = title[prop];
      item[prop] = author[prop];
    });

    this.emit('change', this.booksOnList);
    return item;
  }

  removeItem(id) {
    const index = this.booksOnList.findIndex(item => item.id === Number(id));
    if (index > -1) {
      this.booksOnList.splice(index, 1);
      this.emit('change', this.booksOnList);
    }
  }
}

export default AllBooksListModel;
