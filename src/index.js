import './Styles/main.css';

import defaultBookCollection from './defaultBooks';

import AllBooksListModel from './AllBooksList/allBooksListModel';
import MyBooksPlannedModel from './MyBooksPlanned/myBooksPlannedModel';

import AllBooksListView from './AllBooksList/allBooksListView';
import MyBooksPlannedView from './MyBooksPlanned/myBooksPlannedView';

import AllBooksListController from './AllBooksList/allBooksListController';
import MyBooksPlannedController from './MyBooksPlanned/myBooksPlannedController';

import { saveBooksToLocalStorage, loadBooksFromLocalStorage } from './helpers';

const BooksInLibrary = loadBooksFromLocalStorage('booksInLibrary');
const MyBooks = loadBooksFromLocalStorage('myBooks');

const booksModel = new MyBooksPlannedModel(MyBooks || undefined);
const listModel = new AllBooksListModel(BooksInLibrary || undefined);

booksModel.on('change', myBooks => saveBooksToLocalStorage(myBooks, 'myBooks'));
listModel.on('change', booksInLibrary => saveBooksToLocalStorage(booksInLibrary, 'booksInLibrary'));

const bookView = new MyBooksPlannedView();
const listview = new AllBooksListView();

const listController = new AllBooksListController(listModel, listview);
const bookController = new MyBooksPlannedController(booksModel, bookView, listModel);

// начальные книги если лента пуста
function loadStartPage(defaultBook) {
  if (BooksInLibrary === null || BooksInLibrary.length === 0) {
    defaultBook.forEach(elem => {
      listController.addBookOnListController(elem);
    });
  }

  MyBooks.forEach(elem => {
    // перебираем желания
    if (booksModel.getItem(elem.id) === undefined) {
      // если такой еще не загружено
      bookController.addBook(elem);
    } else if (booksModel.getItem(elem.id).completed === true) {
      bookView.addItem(elem);
      bookController.moveToCompleted(elem.id);
    } else {
      bookView.addItem(elem);
    }
  });
}
loadStartPage(defaultBookCollection);
