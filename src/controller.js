// controller
class ListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addDrawing.bind(this));
    view.on('toggle', this.toggleTodo.bind(this));
    view.on('remove', this.removeDrawing.bind(this));
    view.on('draging', this.dragDrawing.bind(this));
    view.on('edit', this.editTodo.bind(this));

    view.show(model.items);
  }

  addDrawing(title) {
    const item = this.model.addItem({
      id: Date.now(),
      title,
      completed: false,
    });

    this.view.addItem(item);
  }

  removeDrawing(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  dragDrawing(draw) {
    this.craftingview.usingDraw.textContent = draw;
  }

  editTodo({ id, title }) {
    const item = this.model.updateItem(id, { title });

    this.view.editItem(item);
  }

  toggleTodo({ id, completed }) {
    const item = this.model.updateItem(id, { completed });

    this.view.toggleItem(item);
  }
}

class BookController {
  constructor(model, listview, bookview) {
    this.model = model;
    this.listview = listview;
    this.bookview = bookview;

    listview.on('add', this.addBook.bind(this));
    bookview.on('addBook', this.addBook.bind(this));
    bookview.on('removeTool', this.removeBook.bind(this));
    listview.on('draging', this.dragBook.bind(this));
  }

  addBook(tool) {
    this.model.addItem(tool);
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
