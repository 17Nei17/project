import EventEmitter from './helpers';
// zapchasti
class EndView extends EventEmitter {
  constructor() {
    super();
    this.form = document.getElementById('tools-Box');
    this.input = document.getElementById('add-tools');
    this.list = document.getElementById('tools-list');

    this.form.addEventListener('submit', this.handleAdd.bind(this));
  }

  createToolItem(tools) {
    const removeToolButton = document.createElement('button');
    removeToolButton.className = 'removeTool';
    const label = document.createElement('label');
    label.className = 'title';
    label.textContent = tools.title;
    label.draggable = 'true';
    const item = document.createElement('li');
    item.className = 'tools-Item';
    item.setAttribute('data-id', tools.id);
    item.appendChild(removeToolButton);
    item.appendChild(label);
    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const removeToolButton = item.querySelector('button.removeTool');
    const itemlabel = item.querySelector('label.title');
    itemlabel.addEventListener('dragstart', this.handleDragStart.bind(this));
    removeToolButton.addEventListener('click', this.handleRemove.bind(this));
    return item;
  }

  handleAdd(event) {
    event.preventDefault();

    if (this.input.value === '' || this.input.value === 'Введите название запчасти') {
      this.input.value = 'Введите название запчасти';
      return null;
    }

    this.emit('add', this.input.value);

    return null;
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;

    this.emit('removeTool', listItem.getAttribute('data-id'));
  }

  handleDragStart(event) {
    event.dataTransfer.setData('Text', event.target.textContent);
    return this;
  }

  findlistItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  addItem(tools) {
    const listItem = this.createToolItem(tools);
    this.input.value = '';
    this.list.appendChild(listItem);
  }

  removeItem(id) {
    const listItem = this.findlistItem(id);
    this.list.removeChild(listItem);
  }
}

export default EndView;
