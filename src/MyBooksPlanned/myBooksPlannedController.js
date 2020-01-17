class MyBooksPlannedController {
  constructor(bookmodel, bookview, listModel) {
    this.bookmodel = bookmodel;
    this.bookview = bookview;
    this.listModel = listModel;

    bookview.on('addBook', this.addBook.bind(this));
    bookview.on('remove', this.removeBook.bind(this));
    bookview.on('removeEnd', this.removeBookEnd.bind(this));
    bookview.on('draging', this.dragBook.bind(this));
    bookview.on('getObject', this.getObject.bind(this));
    bookmodel.on('returnBook', this.returnBook.bind(this));
    bookview.on('moveToCompleted', this.moveToCompleted.bind(this));
  }

  getObject(name) {
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

  removeBook(id) {
    this.bookmodel.removeItem(id);
    this.bookview.removeItem(id);
  }

  removeBookEnd(id) {
    this.bookmodel.removeItem(id);
    this.bookview.removeItemEnd(id);
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
console.log('ListController ok');
export default MyBooksPlannedController;
