import './Styles/main.css';

import AllBooksListModel from './AllBooksList/allBooksListModel';
import MyBooksPlannedModel from './MyBooksPlanned/myBooksPlannedModel';

import AllBooksListView from './AllBooksList/allBooksListView';
import MyBooksPlannedView from './MyBooksPlanned/myBooksPlannedView';

import AllBooksListController from './AllBooksList/allBooksListController';
import MyBooksPlannedController from './MyBooksPlanned/myBooksPlannedController';

import { save, load } from './helpers';

const State = load('books');
const MyBooks = load('myBooks');

const booksModel = new MyBooksPlannedModel(MyBooks || undefined);
const listModel = new AllBooksListModel(State || undefined);

booksModel.on('change', myBooks => save(myBooks, 'myBooks'));
listModel.on('change', state => save(state, 'books'));

const bookView = new MyBooksPlannedView();
const listview = new AllBooksListView();

const listController = new AllBooksListController(listModel, listview);
const bookController = new MyBooksPlannedController(booksModel, bookView, listModel);
const beginBooks = [
  {
    title: 'Властелин колец, братство кольца',
    author: 'Толкиен',
    description:
      'Роман-эпопея английского писателя Дж. Р. Р. Толкина, одно из самых известных произведений жанра фэнтези. «Властелин колец» был написан как единая книга, но из-за объёма при первом издании его разделили на три части — «Братство Кольца», «Две крепости» и «Возвращение короля». В виде трилогии он публикуется и по сей день, хотя часто в едином томе. ',
  },
  {
    title: 'Три товарища',
    author: 'Эрих Мария Ремарк',
    description:
      '«Три товарища» (нем. Drei Kameraden) — роман Эриха Марии Ремарка, работу над которым он начал в 1932 году. Роман был закончен и опубликован в датском издательстве Gyldendal под названием «Kammerater» в 1936 году[1][2]. В 1958 году был переведён на русский язык.Роман продолжает тематику «потерянного поколения»Люди, прошедшие через горнило войны, не могут уйти от призраков прошлого. Военные воспоминания постоянно мучают главного героя. Голодное детство стало причиной болезни его любимой. Но именно военное братство сплотило трёх товарищей: Роберта Локампа, Отто Кестера и Готтфрида Ленца. И они готовы на всё ради дружбы. Несмотря на пропитавшую его смерть, роман говорит о жажде жизни.  ',
  },
  {
    title: 'Мастер и Маргарита',
    author: 'Михаил Афанасьевич Булгаков',
    description:
      '«Ма́стер и Маргари́та» — роман Михаила Афанасьевича Булгакова, работа над которым началась в конце 1920-х годов и продолжалась вплоть до смерти писателя. Роман относится к незавершённым произведениям; редактирование и сведение воедино черновых записей осуществляла после смерти мужа вдова писателя — Елена Сергеевна. Первая версия романа, имевшая названия «Копыто инженера», «Чёрный маг» и другие, была уничтожена Булгаковым в 1930 году. В последующих редакциях среди героев произведения появились автор романа о Понтии Пилате и его возлюбленная. Окончательное название — «Мастер и Маргарита» — оформилось в 1937 году. ',
  },
  {
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    description:
      '«Ма́ленький принц» (фр. Le Petit Prince) — аллегорическая повесть-сказка, наиболее известное произведение Антуана де Сент-Экзюпери.Сказка рассказывает о Маленьком принце, который посещает различные планеты в космосе, включая Землю. Повесть обращается к темам одиночества, дружбы, любви и потери. Несмотря на стиль детской книги, ее герой рассуждает о жизни и человеческой природе[1].Впервые опубликована 6 апреля 1943 года в Нью-Йорке. Было продано 140 миллионов экземпляров по всему миру, что поставило её в ряд самых продаваемых книг. ',
  },
  {
    title: 'Трудно быть Богом',
    author: 'братья Стругацкие',
    description:
      '«Трудно быть богом». Наверное, самый прославленный из романов братьев Стругацких. История землянина, ставшего «наблюдателем» на планете, застрявшей в эпохе позднего средневековья, и принужденного «не вмешиваться» в происходящее, экранизирована уже несколько раз – однако даже лучший фильм не в силах передать всего таланта книги, на основе которой он снят!..',
  },
];
// начальные книги если лента пуста
function start(arrBeginBooks) {
  if (State === null || State.length === 0) {
    arrBeginBooks.forEach(elem => {
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
start(beginBooks);
