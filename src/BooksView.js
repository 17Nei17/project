import { EventEmitter, createElement } from './helpers';
// zapchasti
class BookView extends EventEmitter {
  constructor() {
    super();
    this.list = document.getElementById('books-list');
    this.firstTool = document.getElementById('put');
    this.firstTool.addEventListener('drop', this.handleDrop.bind(this));
    this.firstTool.addEventListener('dragover', this.handleDragOver.bind(this));
    this.firstTool.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  createListItem(book) {
    const checkbox = createElement('input', {
      type: 'checkbox',
      className: 'checkbox',
      checked: book.completed ? 'checked' : '',
    });
    const label = createElement('label', { className: 'title' }, book.title);
    const author = createElement('label', { className: 'author' }, `Автор: ${book.author}`);
    const deleteButton = createElement('button', { className: 'remove' }, 'Удалить');
    const item = createElement(
      'li',
      {
        className: `book-item${book.completed ? ' completed' : ''}`,
        'data-id': book.id,
        'data-description': book.description,
      },
      checkbox,
      label,
      author,
      deleteButton
    );
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const removeButton = item.querySelector('button.remove');
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    return item;
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    this.emit('remove', listItem.getAttribute('data-id'));
  }

  findListItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
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
    const dropTool = event.textContent; // место куда перемещаем
    this.emit('getObject', event.dataTransfer.getData('Text')); // передали название книги
    dropTool.style.opacity = 1;
    articleDiv.appendChild(elem);
    return this;
  }

  addItem(book) {
    const listItem = this.createListItem(book);
    this.firstTool.appendChild(listItem);
  }
}
console.log('BookView ok');
export default BookView;
