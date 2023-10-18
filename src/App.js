import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import {get, getAll} from './BooksAPI';
import { Routes, Route, DefaultRoute } from 'react-router-dom';
import BookList from './components/BookList';
import Search from './components/Search';

function App() {
  // The list of books that I have read, am reading, or want to read.
  const [myBookList, changeBookList] = useState(JSON.parse(window.sessionStorage.getItem('my-book-list')||"[]"));
  const [showSearchPage, setShowSearchpage] = useState(false);

  // Change the shelf that a book is on, without mutating the book list itself.
  function changeBook(book, shelfId) {
    if (book.hasOwnProperty("shelf") && book.shelf === shelfId) {
      return;
    }
    
    let newBookList = myBookList.filter(b => b.id !== book.id);
    book.shelf = shelfId;
    newBookList.push(book);
    changeBookList(newBookList);

    // Persist the book list to session storage.
    window.sessionStorage.setItem('my-book-list', JSON.stringify(newBookList));

    // This is where I would also call the BooksAPI to update the shelf for the book.
  }
  
  // Add a book to the list of books that I have read, am reading, or want to read.
  function addBook(book) {
    if (myBookList.find(b => b.id === book.id)) {
      return;
    }

    let newBookList = [].concat(myBookList, [book]);
    changeBookList(newBookList);
    window.sessionStorage.setItem('my-book-list', JSON.stringify(newBookList));
  }

  function removeBook(book) {
    if (!myBookList.find(b => b.id === book.id)) {
      return;
    }

      let newBookList = myBookList.filter(b => b.id !== book.id);
      changeBookList(newBookList);
      window.sessionStorage.setItem('my-book-list', JSON.stringify(newBookList));
  }

  useEffect(() => {
  
    // Only load the book list from the API if it is not already in session storage and only on app startup.
    if (myBookList.length === 0) {
      console.log("Calling getAll");
      getAll().then(allBooks => {
        changeBookList(allBooks);
        window.sessionStorage.setItem('my-book-list', JSON.stringify(allBooks));
        }).catch(err => console.log("Error reading books", err));
      }
    }, []);

  // Select (route) between the book list and the search page.
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<BookList myBookList={myBookList} changeBook={changeBook} />} />
        <Route exact path="/search" element={<Search myBookList={myBookList} changeBook={changeBook} />} />
      </Routes>
    </div>
  );
}

export default App;