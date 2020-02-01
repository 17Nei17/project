import { EventEmitter, createElement } from '../helpers';

class MyBooksPlannedView extends EventEmitter {
  constructor() {
    super();
    this.myBook = document.getElementById('put'); // "Мои" книги
    this.finishedBook = document.getElementById('end'); // "завершенные" книги
    this.myBook.addEventListener('drop', this.handleDrop.bind(this));
    this.myBook.addEventListener('dragover', this.handleDragOver.bind(this));
    this.myBook.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  createListItem(book) {
    const addStatusComplete = createElement('button', { className: 'endBookButton' });
    const titleMyBook = createElement('label', { className: 'titleMyBook' }, book.title);
    const authorMyBook = createElement(
      'label',
      { className: 'authorMyBook' },
      `Автор: ${book.author}`
    );
    const deleteBookButton = createElement('button', { className: 'removeBooks' });
    const item = createElement(
      'li',
      {
        className: `bookItem${book.completed ? ' completed' : ''}`,
        'data-id': book.id,
        'data-description': book.description,
      },
      addStatusComplete,
      titleMyBook,
      authorMyBook,
      deleteBookButton
    );
    return this.addEventListeners(item, 'myBook');
  }

  createEndItem(book) {
    const titleMyCompleteBook = createElement('label', { className: 'titleMyEndBook' }, book.title);
    const authorMyCompleteBook = createElement(
      'label',
      { className: 'authorMyEndBook' },
      `Автор: ${book.author}`
    );
    const deleteBookButton = createElement('button', { className: 'removeBooks' });
    const item = createElement(
      'li',
      {
        className: `bookItem${book.completed ? ' completed' : ''}`,
        'data-id': book.id,
        'data-description': book.description,
      },
      titleMyCompleteBook,
      authorMyCompleteBook,
      deleteBookButton
    );
    return this.addEventListeners(item);
  }

  addEventListeners(item, status) {
    if (status === 'myBook') {
      // т.к перенос книги в "завершенные" возможен только для моих книг
      const transferToCompleteBook = item.querySelector('button.endBookButton');
      transferToCompleteBook.addEventListener('click', this.moveToCompleted.bind(this));
    }
    const deleteBookButton = item.querySelector('button.removeBooks');
    deleteBookButton.addEventListener('click', this.handleRemove.bind(this));
    return item;
  }

  moveToCompleted({ target }) {
    const listItem = target.parentNode;
    this.emit('moveToCompleted', listItem.getAttribute('data-id'));
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    const status = listItem.parentNode.id;
    const id = listItem.getAttribute('data-id');
    this.emit('remove', { id, status });
  }

  findListItem(id) {
    return this.myBook.querySelector(`[data-id="${id}"]`);
  }

  findListItemEnd(id) {
    return this.finishedBook.querySelector(`[data-id="${id}"]`);
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
    this.emit('addBookFromDrag', event.dataTransfer.getData('Text')); // передали название книги
    return this;
  }

  addItem(book) {
    const listItem = this.createListItem(book);
    this.myBook.appendChild(listItem);
  }

  addItemInEnded(book) {
    const listItem = this.createEndItem(book);
    this.myBook.removeChild(this.findListItem(book.id));
    this.finishedBook.appendChild(listItem);
  }

  removeItem(id, status) {
    const listItem = this.findListItem(id);
    const listItemEnd = this.findListItemEnd(id);

    if (status === 'put') {
      this.myBook.removeChild(listItem);
    }
    if (status === 'end') {
      this.finishedBook.removeChild(listItemEnd);
    }
  }
}
export default MyBooksPlannedView;
