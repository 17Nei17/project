import './styles/main.css';

import { ListModel, BooksModel } from './model';

import ListView from './Listview';
import BookView from './BooksView';
// import EndView from './EndView';

import { ListController, BookController } from './controller';

const listModel = new ListModel();
const booksModel = new BooksModel();
// const endModel = new EndModel();

const bookView = new BookView();
// const endView = new EndView();
const listview = new ListView();
const listController = new ListController(listModel, listview); // предпологаю что они и не нужны
const bookController = new BookController(booksModel, listview, bookView);
// const endController = new EndController(endModel, listview, bookView, endView); // предпологаю что они и не нужны

const beginBooks = [
  'Гарри Поттер и Кубок огня',
  'Властелин колец 2 том: Две крепости ',
  'Превращение',
  'Война и мир',
];

function start(arrBook) {
  arrBook.forEach(elem => {
    listController.addDrawing(elem);
  });
}

start(beginBooks);
