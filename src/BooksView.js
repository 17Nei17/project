import { EventEmitter, createElement } from './helpers';
// zapchasti
class BookView extends EventEmitter {
  constructor() {
    super();
    this.list = document.getElementById('books-list');
    this.firstTool = document.getElementById('div1');
    this.firstTool.addEventListener('drop', this.handleDrop.bind(this));
    this.firstTool.addEventListener('dragover', this.handleDragOver.bind(this));
    this.firstTool.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  createListItem(todo) {
    const checkbox = createElement('input', {
      type: 'checkbox',
      className: 'checkbox',
      checked: todo.completed ? 'checked' : '',
    });
    const label = createElement('label', { className: 'title' }, todo.title);
    const label2 = createElement('label', { className: 'description' });
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const editButton2 = createElement('button', { className: 'edit2' }, 'Добавить описание');
    const deleteButton = createElement('button', { className: 'remove' }, 'Удалить');
    const item = createElement(
      'li',
      { className: `todo-item${todo.completed ? ' completed' : ''}`, 'data-id': todo.id },
      checkbox,
      label,
      label2,
      editInput,
      editButton,
      editButton2,
      deleteButton
    );
    return this.addEventListeners(item);
  }

  findListItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleDragOver(event) {
    event.preventDefault();
    const dragOverLabel = event.target;
    dragOverLabel.style.opacity = 0.5;
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
    const dropTool = event.target; // место куда перемещаем
    //  if (event.dataTransfer.getData('Text') !== '')
    const x = [];
    x.push(event.dataTransfer.getData('Text')); // сюда приходит Id книги
    const listItem = this.findListItem(x); // тут вся html коллекция
    // dropTool.textContent = event.dataTransfer.getData('Text');
    dropTool.style.opacity = 1;
    console.log(listItem);
    this.firstTool.appendChild(listItem); // отрисовали все что получили
    this.emit('addBook', listItem.attributes);
    // this.firstTool.value = '';
    // this.emit('remove', listItem.getAttribute('data-id'));
    return this;
  }
}

export default BookView;
