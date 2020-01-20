class AllBooksListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addBookOnListController.bind(this));
    view.on('remove', this.removeBook.bind(this));
    view.on('editName', this.editName.bind(this));

    view.show(model.items);
  }

  addBookOnListController(book) {
    let newID = 0;
    if (this.model.items.length > 4) {
      newID = Date.now();
    } else {
      newID = Date.now() + this.model.items.length;
    }

    const item = this.model.addItem({
      id: newID,
      title: book.title,
      author: book.author,
      description: book.description,
      completed: false,
    });
    this.view.addItem(item);
  }

  removeBook(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  editName({ id, title, author }) {
    const item = this.model.updateItem(id, { title }, { author });
    this.view.editItem(item);
  }
}

console.log('ListController ok');
export default AllBooksListController;
