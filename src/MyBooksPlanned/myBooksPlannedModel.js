import { EventEmitter } from '../helpers';

class MyBooksPlannedModel extends EventEmitter {
  constructor(booksArr = []) {
    super();
    this.booksArr = booksArr;
  }

  getItem(id) {
    return this.booksArr.find(item => item.id === Number(id));
  }

  addItem(item) {
    this.booksArr.push(item);
    this.emit('returnBook', item);
    this.emit('change', this.booksArr);
    return item;
  }

  addStatus(id) {
    const index = this.getItem(Number(id));
    index.completed = true;
    this.emit('change', this.booksArr);
  }

  removeItem(id) {
    const index = this.booksArr.findIndex(item => item.id === Number(id));
    if (index > -1) {
      this.booksArr.splice(index, 1);
      this.emit('change', this.booksArr);
    }
  }
}

export default MyBooksPlannedModel;
