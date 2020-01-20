import { EventEmitter, createElement, CreateBookObject } from '../helpers';

class AllBooksListView extends EventEmitter {
  constructor() {
    super();
    this.form = document.getElementById('books-form');
    this.nameBook = document.getElementById('name-books');
    this.nameAuthor = document.getElementById('name-author');
    this.nameDescription = document.getElementById('name-description');
    this.modal = document.getElementById('mymodal');
    this.close = document.getElementById('close_modal_window');
    this.list = document.getElementById('books-list');

    this.form.addEventListener('submit', this.handleAdd.bind(this)); // добавление элемента
  }

  createListItem(book) {
    const title = createElement('label', { className: 'title' }, book.title);
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
      title,
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
    const modalDescription = document.querySelector('.modal_description');
    const title = document.createElement('div');
    title.className = 'titleModal';
    const modalTopic = `<h3>Описание:</h3>`;
    const modalText = `<div class ='modalDescription'>   ${mouseEvent.path[1].getAttribute(
      'data-description'
    )} </div>`;
    title.innerHTML = modalTopic + modalText;
    modalDescription.append(title);
    this.modal.style.display = 'block';
    this.close.onclick = () => {
      this.modal.style.display = 'none';
      title.remove();
    };
  }

  findListItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleAdd(event) {
    event.preventDefault();
    if (!this.nameBook.value) return alert('Необходимо ввести название книги');
    if (!this.nameAuthor.value) return alert('Необходимо ввести автора книги');
    const title = this.nameBook.value;
    const author = this.nameAuthor.value;
    const description = this.nameDescription.value;

    const value = new CreateBookObject(title, author, description);
    return this.emit('add', value);
  }

  handleEdit({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const labelTitle = listItem.querySelector('.title');
    const labelAuthor = listItem.querySelector('.author');
    const changeName = listItem.querySelector('.changeName'); // input
    const changeAuthor = listItem.querySelector('.changeAuthor');
    const editButton = listItem.querySelector('button.edit');
    const title = changeName.value; // тут новое название книги
    const author = changeAuthor.value; //  автор книги
    const isEditing = listItem.classList.contains('editing');
    if (isEditing) {
      editButton.textContent = 'Изменить';
      this.emit('editName', { id, title, author });
      listItem.classList.remove('editing');
    } else {
      changeName.value = labelTitle.textContent;
      changeAuthor.value = labelAuthor.textContent;
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
    } else {
      input.value = label.textContent; // тут то что пишем в поле "добавить описание"
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
    const listItem = this.createListItem(book);
    this.nameBook.value = '';
    this.nameAuthor.value = '';
    this.nameDescription.value = '';
    this.list.appendChild(listItem);
  }

  editItem(book) {
    const listItem = this.findListItem(book.id);
    const title = listItem.querySelector('.title');
    const author = listItem.querySelector('.author');
    const editButton = listItem.querySelector('button.edit');

    title.textContent = book.title;
    author.textContent = book.author;
    editButton.textContent = 'Изменить';
    listItem.classList.remove('editing');
  }

  removeItem(id) {
    const listItem = this.findListItem(id);
    this.list.removeChild(listItem);
  }
}
console.log('allBooksListView ok');

export default AllBooksListView;
