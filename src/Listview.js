import { EventEmitter, createElement } from './helpers';

class ListView extends EventEmitter {
  constructor() {
    super();
    this.form = document.getElementById('books-form');
    this.nameBooks = document.getElementById('name-books');
    this.nameAuthor = document.getElementById('name-author');
    this.nameDescription = document.getElementById('name-description');
    this.list = document.getElementById('books-list');

    this.form.addEventListener('submit', this.handleAdd.bind(this)); // добавление элемента
  }

  createListItem(book) {
    const label = createElement('label', { className: 'title' }, book.title);
    const author = createElement('label', { className: 'author' }, `${book.author}`);
    const editInputName = createElement('input', { type: 'text', className: 'changeName' }); // изменяет имя
    const editInputAuthor = createElement('input', { type: 'text', className: 'changeAuthor' }); // изменяет автора
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const viewButtonDescription = createElement('button', { className: 'view' }, ' Описание');
    const deleteButton = createElement('button', { className: 'remove' });
    const item = createElement(
      'li',
      {
        className: `book-item${book.completed ? ' completed' : ''}`,
        'data-id': book.id,
        'data-description': book.description,
      },
      label,
      author,
      editInputName,
      editInputAuthor,
      editButton,
      viewButtonDescription,
      deleteButton
    );
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const editButton = item.querySelector('button.edit');
    const removeButton = item.querySelector('button.remove');
    const viewDescription = item.querySelector('button.view');
    editButton.addEventListener('click', this.handleEdit.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    viewDescription.addEventListener('click', this.viewDescription.bind(this));
    const itemlabel = item.querySelector('label.title');
    itemlabel.addEventListener('dragstart', this.handleDragStart.bind(this));
    return item;
  }

  viewDescription(mouseEvent) {
    const modal = document.getElementById('mymodal');
    const close = document.getElementById('close_modal_window');
    const modal_description = document.querySelector('.modal_description');
    const title = document.createElement('div');
    title.className = 'title';
    const label = `<h3>Описание:</h3>`;
    const label2 = `<div class ='modalDescription'>  ${mouseEvent.path[1].getAttribute(
      'data-description'
    )} </div>`;
    title.innerHTML = label + label2;
    modal_description.append(title);
    modal.style.display = 'block';
    const id = mouseEvent.path[1].getAttribute('data-description'); // id книги
    close.onclick = function() {
      modal.style.display = 'none';
      title.remove();
    };
  }

  findListItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleAdd(event) {
    event.preventDefault();
    if (!this.nameBooks.value) return alert('Необходимо ввести название книги');
    if (!this.nameAuthor.value) return alert('Необходимо ввести автора книги');
    const name = this.nameBooks.value;
    const author = this.nameAuthor.value;
    const description = this.nameDescription.value;
    console.log(name + author + description);
    const value = [];
    value.push(name, author, description);
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
    const label2 = listItem.querySelector('.author');
    const changeName = listItem.querySelector('.changeName'); // input
    const changeAuthor = listItem.querySelector('.changeAuthor');
    const editButton = listItem.querySelector('button.edit');
    const title = changeName.value; // тут новое название книги
    const author = changeAuthor.value; //  автор книги
    const isEditing = listItem.classList.contains('editing');
    if (isEditing) {
      editButton.textContent = 'Изменить';
      this.emit('editName', { id, title });
      this.emit('editAuthor', { id, author });
      listItem.classList.remove('editing');
    } else {
      changeName.value = label.textContent;
      changeAuthor.value = label2.textContent;
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
      this.emit('editDescription', { id, title }); // передали id и то что написали в описание
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
    // перетаскиваем элемент (точнее его имя)
    event.dataTransfer.setData('Text', event.target.textContent);
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
    this.nameBooks.value = '';
    this.nameAuthor.value = '';
    this.nameDescription.value = '';
    this.list.appendChild(listItem);
  }

  editItem(book) {
    console.log(book);
    const listItem = this.findListItem(book.id);
    const label = listItem.querySelector('.title');
    const editButton = listItem.querySelector('button.edit');

    label.textContent = book.title;
    editButton.textContent = 'Изменить';
    listItem.classList.remove('editing');
  }

  editItemAuthor(book) {
    const listItem = this.findListItem(book.id);
    const label = listItem.querySelector('.author');
    const editButton = listItem.querySelector('button.edit');

    label.textContent = book.author;
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
