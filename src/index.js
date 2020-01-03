import './styles/main.css';

import { ListModel, BooksModel } from './model';

import ListView from './Listview';
import BookView from './BooksView';

import { ListController, BookController } from './controller';
import { save, load } from './helpers';

const booksModel = new BooksModel();
const State = load();
const listModel = new ListModel(State || undefined);
listModel.on('change', State => save(State));

const bookView = new BookView();
const listview = new ListView();
const listController = new ListController(listModel, listview); // предполагаю что они и не нужны
const bookController = new BookController(booksModel, bookView, listModel);
const beginBooks = [
  ['Властелин колец, братство кольца', 'Толкиен', 'Книга о кольце'],
  ['Три товарища', 'Эрих Мария Ремарк', 'Книга'],
  ['Мастер и Маргарита', 'Михаил Афанасьевич Булгаков', 'Книга'],
  ['Маленький принц', 'Антуан де Сент-Экзюпери', 'Книга'],
  ['Трудно быть Богом', 'братья Стругацкие', 'Книга'],
];

function start(arrBook) {
  arrBook.forEach(elem => {
    listController.addBook(elem);
  });
}
start(beginBooks);
