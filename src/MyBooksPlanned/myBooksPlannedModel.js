import { EventEmitter } from '../helpers';

class MyBooksPlannedModel extends EventEmitter {
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

export default MyBooksPlannedModel;
