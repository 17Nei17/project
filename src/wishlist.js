/* import EventEmitter from './helpers';

console.log('wichlist ok');

class Wichlist extends EventEmitter {
  constructor() {
    super();
    this.Tool = document.getElementById('using-First-Tool');
  //  this.firstTool.addEventListener('drop', this.handleDrop.bind(this));
 //   this.firstTool.addEventListener('dragover', this.handleDragOver.bind(this));
  //  this.firstTool.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  handleDragOver(event) {
    event.preventDefault();
    const dragOverLabel = event.target;
    dragOverLabel.style.opacity = 0.5;
    return this;
  }

  handleDragLeave(event) {
    event.preventDefault();
    const dragLeavingLabel = event.target;
    dragLeavingLabel.style.opacity = 1;
    return this;
  }

  handleDrop(event) {
    event.preventDefault();
    const dropTool = event.target;
    if (event.dataTransfer.getData('Text') !== '')
      dropTool.textContent = event.dataTransfer.getData('Text');
    dropTool.style.opacity = 1;

    return this;
  }

}

export default Wichlist;
*/
