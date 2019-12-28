import { EventEmitter, createElement } from './helpers';

class ListView extends EventEmitter {
  constructor() {
    super();
    this.form = document.getElementById('books-form');
    this.input = document.getElementById('add-books');
    this.list = document.getElementById('books-list');

    this.form.addEventListener('submit', this.handleAdd.bind(this));
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

  addEventListeners(item) {
    const checkbox = item.querySelector('.checkbox');
    const editButton = item.querySelector('button.edit');
    const editButton2 = item.querySelector('button.edit2');
    const removeButton = item.querySelector('button.remove');
    const BookName = item.querySelector('label.title');
    checkbox.addEventListener('change', this.handleToggle.bind(this));
    editButton.addEventListener('click', this.handleEdit.bind(this));
    editButton2.addEventListener('click', this.handleDescription.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    BookName.addEventListener('click', this.viewDescription.bind(this)); // событие для того чтобы при наведение увидеть описание книги
    const itemlabel = item.querySelector('label.title');
    itemlabel.addEventListener('dragstart', this.handleDragStart.bind(this));
    return item;
  }

  viewDescription(mouseEvent) {
    const listItem = mouseEvent;
    const modal = document.getElementById('mymodal');
    const close = document.getElementById('close_modal_window');
    const content = document.getElementById('modal_content');
    modal.style.display = 'block';
    if (listItem.originalTarget.nextSibling.parentElement.attributes.description !== undefined) {
      content.outerHTML = `<div id="modal_content"> \n  ${listItem.originalTarget.nextSibling.parentElement.attributes.description.nodeValue}<span class=\"close_modal_window\" id=\"close_modal_window\">×</span> \n         </div>"`;
    }
    close.onclick = function() {
      modal.style.display = 'none';
    };
  }

  findListItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleAdd(event) {
    event.preventDefault();

    if (!this.input.value) return alert('Необходимо ввести название книги');

    const value = this.input.value;

    this.emit('add', value);
  }

  handleToggle({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const completed = target.checked;

    this.emit('toggle', { id, completed });
  }

  handleEdit({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const label = listItem.querySelector('.title');
    const input = listItem.querySelector('.textfield');
    const editButton = listItem.querySelector('button.edit');
    const title = input.value; // тут новое название книги
    const isEditing = listItem.classList.contains('editing');
    if (isEditing) {
      editButton.textContent = 'Изменить';
      this.emit('edit', { id, title });
      listItem.classList.remove('editing');
    } else {
      input.value = label.textContent;
      editButton.textContent = 'Сохранить';
      listItem.classList.add('editing');
    }
  }

  handleDescription({ target }) {
    // задает описание
    const listItem = target.parentNode; // тут нужный элемент и его id
    const id = listItem.getAttribute('data-id');
    const label = listItem.querySelector('.description'); // html часть с классом description
    const input = listItem.querySelector('.textfield'); // поле ввода
    const title = input.value; // значение того что ввели
    const isEditing = listItem.classList.contains('editing');
    if (isEditing) {
      this.emit('edit2', { id, title }); // передали id и то что написали в описание
      //  this.emit('mouseenter', listItem.getAttribute('description'));
      listItem.setAttribute('description', title);
      listItem.classList.remove('editing');
      target.textContent = 'Изменить описание';
    } else {
      input.value = label.textContent; // тут то что пишем в поле "добавить описание"
      target.textContent = 'Сохранить';
      listItem.classList.add('editing');
    }
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    this.emit('remove', listItem.getAttribute('data-id'));
  }

  handleDragStart(event) {
    // отвечает за начало перетягивания (работает)
    const x = [];
    x.push(event.originalTarget.parentElement.parentElement.attributes[1].nodeValue);
    event.dataTransfer.setData('Text', x);
    return this;
  }

  show(books) {
    books.forEach(book => {
      const listItem = this.createListItem(book);

      this.list.appendChild(listItem);
    });
  }

  addItem(book) {
    // сюда передается обьект со всеми данным
    const listItem = this.createListItem(book);
    this.input.value = '';
    this.list.appendChild(listItem);
  }

  toggleItem(book) {
    // галочка выполнения задания
    const listItem = this.findListItem(book.id);
    const checkbox = listItem.querySelector('.checkbox');

    checkbox.checked = book.completed;

    if (book.completed) {
      listItem.classList.add('completed');
    } else {
      listItem.classList.remove('completed');
    }
  }

  editItem(book) {
    const listItem = this.findListItem(book.id);
    const label = listItem.querySelector('.title');
    const editButton = listItem.querySelector('button.edit');

    label.textContent = book.title;
    editButton.textContent = 'Изменить';
    listItem.classList.remove('editing');
  }

  removeItem(id) {
    const listItem = this.findListItem(id);
    this.list.removeChild(listItem);
  }
}
console.log('ListView ok');

export default ListView;
