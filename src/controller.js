// controller
class ListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addBook.bind(this));
    view.on('toggle', this.toggleList.bind(this));
    view.on('remove', this.removeBook.bind(this));
    view.on('draging', this.dragBook.bind(this));
    view.on('editName', this.editName.bind(this));
    view.on('editAuthor', this.editAuthor.bind(this));
    view.on('getObject', this.getObject.bind(this));

    view.show(model.items);
  }

  getObject(name) {
    return this.model.getItemByName(name);
  }

  addBook(book) {
    let ids = 0;
    if (this.model.items.length > 4) {
      ids = Date.now();
    } else {
      ids = Date.now() + this.model.items.length;
    }

    const item = this.model.addItem({
      id: ids,
      title: book[0],
      author: book[1],
      description: book[2],
      completed: false,
    });
    this.view.addItem(item);
    // setTimeout(this.view.addItem(item),1000);
  }

  removeBook(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  dragBook(draw) {
    this.craftingview.usingDraw.textContent = draw;
  }

  editName({ id, title }) {
    const item = this.model.updateItem(id, { title });
    this.view.editItem(item);
  }

  editAuthor({ id, author }) {
    const item = this.model.updateAuthor(id, { author });
    this.view.editItemAuthor(item);
  }

  toggleList({ id, completed }) {
    const item = this.model.updateItem(id, { completed });
    this.view.toggleItem(item);
  }
}

class BookController {
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

    // view.on('getID', this.getID.bind(this));
  }

  getID(id) {
    this.model.getItem(id);
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

  dragBook(tool) {
    this.bookview.usingDraw.textContent = tool;
  }
}
console.log('ListController ok');
export { ListController, BookController };
