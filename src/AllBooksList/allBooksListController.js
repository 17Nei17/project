class AllBooksListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addBookOnListController.bind(this));
    view.on('remove', this.removeBook.bind(this));

    view.show(model.booksOnList);
  }

  addBookOnListController(book) {
    let newID = 0;
    newID = Date.now() + this.model.booksOnList.length;

    const item = this.model.addItem({
      id: newID,
      title: book.title,
      author: book.author,
      description: book.description,
      completed: false,
    });
    this.view.addBookInList(item);
  }

  removeBook(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }
}

export default AllBooksListController;
