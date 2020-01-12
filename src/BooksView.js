import { EventEmitter, createElement } from './helpers';
// zapchasti
class BookView extends EventEmitter {
  constructor() {
    super();
    this.myBook = document.getElementById('put');
    this.endBook = document.getElementById('end');
    this.myBook.addEventListener('drop', this.handleDrop.bind(this));
    this.myBook.addEventListener('dragover', this.handleDragOver.bind(this));
    this.myBook.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  createListItem(book) {
    const endBookButton = createElement('button', { className: 'endBookButton' });
    const label = createElement('label', { className: 'titleMyBook' }, book.title);
    const author = createElement('label', { className: 'authorMyBook' }, `Автор: ${book.author}`);
    const deleteButton = createElement('button', { className: 'removeBooks' });
    const item = createElement(
      'li',
      {
        className: `book-item${book.completed ? ' completed' : ''}`,
        'data-id': book.id,
        'data-description': book.description,
      },
      endBookButton,
      label,
      author,
      deleteButton
    );
    return this.addEventListeners(item);
  }

  createEndItem(book) {
    const label = createElement('label', { className: 'titleMyEndBook' }, book.title);
    const author = createElement(
      'label',
      { className: 'authorMyEndBook' },
      `Автор: ${book.author}`
    );
    const deleteButton = createElement('button', { className: 'removeBooks' });
    const item = createElement(
      'li',
      {
        className: `book-item${book.completed ? ' completed' : ''}`,
        'data-id': book.id,
        'data-description': book.description,
      },
      label,
      author,
      deleteButton
    );
    return this.addEventListenersForEnd(item);
  }

  addEventListeners(item) {
    const removeButton = item.querySelector('button.removeBooks');
    const endButton = item.querySelector('button.endBookButton');
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    endButton.addEventListener('click', this.completeBook.bind(this));
    return item;
  }

  addEventListenersForEnd(item) {
    const removeButton = item.querySelector('button.removeBooks');
    removeButton.addEventListener('click', this.handleRemoveEnd.bind(this));
    return item;
  }

  completeBook({ target }) {
    const listItem = target.parentNode;
    this.emit('moveToCompleted', listItem.getAttribute('data-id'));
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    this.emit('remove', listItem.getAttribute('data-id'));
  }

  handleRemoveEnd({ target }) {
    const listItem = target.parentNode;
    this.emit('removeEnd', listItem.getAttribute('data-id'));
  }

  findListItem(id) {
    return this.myBook.querySelector(`[data-id="${id}"]`);
  }

  findListItemEnd(id) {
    return this.endBook.querySelector(`[data-id="${id}"]`);
  }

  handleDragOver(event) {
    event.preventDefault();
    const dragOverLabel = event.target;
    dragOverLabel.style.opacity = 1;
    return this;
  }

  handleDragLeave(event) {
    event.preventDefault();
    const dragLeavingLabel = event.target;
    dragLeavingLabel.style.opacity = 1;
    return this;
  }

  handleDrop(event) {
    event.preventDefault();
    this.emit('getObject', event.dataTransfer.getData('Text')); // передали название книги
    return this;
  }

  addItem(book) {
    //   this.emit('getID', book.id);
    const listItem = this.createListItem(book);
    this.myBook.appendChild(listItem);
  }

  addItemInEnded(book) {
    const listItem = this.createEndItem(book);
    this.endBook.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findListItem(id);
    this.myBook.removeChild(listItem);
  }

  removeItemEnd(id) {
    const listItem = this.findListItemEnd(id);
    this.endBook.removeChild(listItem);
  }
}
console.log('BookView ok');
export default BookView;
