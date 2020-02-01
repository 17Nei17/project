import { EventEmitter, createElement, CreateBookObject } from '../helpers';

class AllBooksListView extends EventEmitter {
  constructor() {
    super();
    this.addBookForm = document.getElementById('booksForm');
    this.nameBookInput = document.getElementById('nameNewBook');
    this.nameAuthorInput = document.getElementById('nameNewAuthor');
    this.nameDescription = document.getElementById('newDescription');
    this.modal = document.getElementById('bookDescription');
    this.close = document.getElementById('closeModalWindow');
    this.list = document.getElementById('booksList');

    this.addBookForm.addEventListener('submit', this.handleAdd.bind(this)); // добавление элемента
  }

  createListItem(book) {
    const titleBook = createElement('label', { className: 'title' }, book.title);
    const authorBook = createElement('label', { className: 'author' }, `${book.author}`);
    const editInputName = createElement('input', { type: 'text', className: 'changeName' }); // изменяет имя (изначально скрытый инпут)
    const editInputAuthor = createElement('input', { type: 'text', className: 'changeAuthor' }); // изменяет автора(изначально скрытый инпут)
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const viewDescriptionButton = createElement('button', { className: 'view' }, ' Описание');
    const deleteButton = createElement('button', { className: 'remove' });
    const item = createElement(
      'li',
      {
        className: `bookItem`,
        'data-id': book.id,
        'data-description': book.description,
      },
      titleBook,
      authorBook,
      editInputName,
      editInputAuthor,
      editButton,
      viewDescriptionButton,
      deleteButton
    );
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const editButton = item.querySelector('button.edit');
    const removeButton = item.querySelector('button.remove');
    const viewDescription = item.querySelector('button.view');
    const BookLabelName = item.querySelector('label.title');

    editButton.addEventListener('click', this.handleEdit.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    viewDescription.addEventListener('click', this.viewDescription.bind(this));
    BookLabelName.addEventListener('dragstart', this.handleDragStart.bind(this));
    return item;
  }

  viewDescription(mouseEvent) {
    const modalDescription = document.querySelector('.modalDescriptionList');
    const modalTitle = document.createElement('div');
    modalTitle.className = 'titleModal';
    const modalTopic = `<h3>Описание:</h3>`;
    const modalText = `<div class ='modalDescription'>   ${mouseEvent.path[1].getAttribute(
      'data-description'
    )} </div>`;
    modalTitle.innerHTML = modalTopic + modalText;
    modalDescription.append(modalTitle);
    this.modal.style.display = 'block';
    this.close.onclick = () => {
      this.modal.style.display = 'none';
      modalTitle.remove();
    };
  }

  findListItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleAdd(event) {
    event.preventDefault();
    if (!this.nameBookInput.value) return alert('Необходимо ввести название книги');
    if (!this.nameAuthorInput.value) return alert('Необходимо ввести автора книги');
    const title = this.nameBookInput.value;
    const author = this.nameAuthorInput.value;
    const description = this.nameDescription.value;

    const value = new CreateBookObject(title, author, description);
    return this.emit('add', value);
  }

  handleEdit({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const labelBookTitle = listItem.querySelector('.title');
    const labelBookAuthor = listItem.querySelector('.author');
    const changeName = listItem.querySelector('.changeName'); // input name  (cкрытый)
    const changeAuthor = listItem.querySelector('.changeAuthor');
    const editButton = listItem.querySelector('button.edit');
    const newTitleBook = changeName.value; // тут новое название книги
    const newAuthorBook = changeAuthor.value;
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
      editButton.textContent = 'Изменить';
      this.emit('editName', { id, newTitleBook, newAuthorBook }); // заносим изменения в model
      labelBookTitle.textContent = newTitleBook; // заносим изменения в view
      labelBookAuthor.textContent = newAuthorBook;
      listItem.classList.remove('editing');
    } else {
      changeName.value = labelBookTitle.textContent;
      changeAuthor.value = labelBookAuthor.textContent;
      editButton.textContent = 'Сохранить';
      listItem.classList.add('editing');
    }
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    this.emit('remove', listItem.getAttribute('data-id'));
  }

  handleDragStart(event) {
    event.dataTransfer.setData('Text', event.target.textContent);
    return this;
  }

  show(books) {
    books.forEach(book => {
      const listItem = this.createListItem(book);
      this.list.appendChild(listItem);
    });
  }

  addBookInList(book) {
    const listItem = this.createListItem(book);
    this.nameBookInput.value = '';
    this.nameAuthorInput.value = '';
    this.nameDescription.value = '';
    this.list.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findListItem(id);
    this.list.removeChild(listItem);
  }
}

export default AllBooksListView;
