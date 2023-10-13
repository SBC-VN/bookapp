import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import {get, getAll} from './BooksAPI';
import BookCase from './components/BookCase';

function App() {
  // The list of books that I have read, am reading, or want to read.
  const [myBookList, changeBookList] = useState(JSON.parse(window.sessionStorage.getItem('my-book-list')||"[]"));
  const [showSearchPage, setShowSearchpage] = useState(false);

  // Change the shelf that a book is on, without mutating the book list itself.
  function changeBook(book, shelfId) {
    console.log("changeBook", book, shelfId);
    if (book.hasOwnProperty("shelf") && book.shelf === shelfId) {
      return;
    }
    
    let newBookList = myBookList.filter(b => b.id !== book.id);
    book.shelf = shelfId;
    newBookList.push(book);
    changeBookList(newBookList);

    // Persist the book list to session storage.
    window.sessionStorage.setItem('my-book-list', JSON.stringify(newBookList));
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

  // Load the initial set of books - from session storage if available, otherwise from the API.
 if (myBookList.length === 0) {
    getAll().then(allBooks => {
      changeBookList(allBooks);
      window.sessionStorage.setItem('my-book-list', JSON.stringify(allBooks));
      }).catch(err => console.log("Error reading books", err));
  }

  // Return the app body, which is mostly a list of shelves.
  return (
    <div className="App">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookCase books={myBookList} changeBook={changeBook} addBook={addBook} removeBook={removeBook} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
    )}
    </div>
  );
}

export default App;