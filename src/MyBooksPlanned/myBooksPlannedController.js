class MyBooksPlannedController {
  constructor(bookmodel, bookview, listModel) {
    this.bookmodel = bookmodel;
    this.bookview = bookview;
    this.listModel = listModel;

    bookview.on('addBook', this.addBook.bind(this));
    bookview.on('remove', this.removeBook.bind(this));
    bookview.on('draging', this.dragBook.bind(this));
    bookview.on('addBookFromDrag', this.addBookFromDrag.bind(this));
    bookmodel.on('returnBook', this.returnBook.bind(this));
    bookview.on('moveToCompleted', this.moveToCompleted.bind(this));
  }

  addBookFromDrag(name) {
    // после перетягивания книги у нас есть только ее имя, но нам нужны все ее данные для того, чтобы добавить в model и view
    this.addBook(this.listModel.getItemByName(name));
  }

  addBook(book) {
    if (this.bookmodel.getItem(book.id) === undefined) {
      this.bookmodel.addItem(book);
    } else {
      alert('Такая книга уже есть в списке');
    }
  }

  returnBook(name) {
    this.bookview.addItem(name);
  }

  removeBook(bookInfo) {
    this.bookmodel.removeItem(bookInfo.id);
    if (bookInfo.status === 'end') {
      this.bookview.removeItem(bookInfo.id, bookInfo.status);
    }
    if (bookInfo.status === 'put') {
      this.bookview.removeItem(bookInfo.id, bookInfo.status);
    }
  }

  moveToCompleted(id) {
    this.bookmodel.addStatus(id);
    this.bookview.removeItem(id);
    this.bookview.addItemInEnded(this.bookmodel.getItem(id));
  }

  dragBook(book) {
    this.bookview.usingDraw.textContent = book;
  }
}
export default MyBooksPlannedController;
