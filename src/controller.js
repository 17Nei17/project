// controller
class ListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addBook.bind(this));
    view.on('toggle', this.toggleList.bind(this));
    view.on('remove', this.removeBook.bind(this));
    view.on('draging', this.dragBook.bind(this));
    view.on('edit', this.editList.bind(this));
    view.on('getObject', this.getObject.bind(this));

    view.show(model.items);
  }

  getObject(name) {
    return this.model.getItemByName(name);
  }

  addBook(book) {
    const item = this.model.addItem({
      id: Date.now(),
      title: book[0],
      author: book[1],
      description: book[2],
      completed: false,
    });
    this.view.addItem(item);
  }

  removeBook(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  dragBook(draw) {
    this.craftingview.usingDraw.textContent = draw;
  }

  editList({ id, title }) {
    const item = this.model.updateItem(id, { title });

    this.view.editItem(item);
  }

  toggleList({ id, completed }) {
    const item = this.model.updateItem(id, { completed });

    this.view.toggleItem(item);
  }
}

class BookController {
  constructor(model, bookview, listModel) {
    this.model = model;
    this.bookview = bookview;
    this.listModel = listModel;

    bookview.on('addBook', this.addBook.bind(this));
    bookview.on('remove', this.removeBook.bind(this));
    bookview.on('draging', this.dragBook.bind(this));
    bookview.on('getObject', this.getObject.bind(this));
    model.on('returnBook', this.returnBook.bind(this));
  }

  getObject(name) {
    //  this.listview.getItemByName(name);
    this.addBook(this.listModel.getItemByName(name));
  }

  addBook(tool) {
    this.model.addItem(tool);
  }

  returnBook(name) {
    this.bookview.addItem(name);
  }

  removeBook(id) {
    this.model.removeItem(id);
  }

  dragBook(tool) {
    this.bookview.usingDraw.textContent = tool;
  }
}
/*
class EndController {
  constructor(model, view, craftingview) {
    this.model = model;
    this.view = view;
    this.craftingview = craftingview;

    view.on('add', this.addTool.bind(this));
    craftingview.on('add', this.addTool.bind(this));
    view.on('removeTool', this.removeTool.bind(this));
    view.on('draging', this.dragTool.bind(this));
  }

  addTool(title) {
    const tool = this.model.addItem({
      id: Date.now(),
      title,
    });

    this.view.addItem(tool);
  }

  removeTool(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  dragTool(tool) {
    this.craftingview.usingDraw.textContent = tool;
  }
}
*/
console.log('ListController ok');
export { ListController, BookController };
