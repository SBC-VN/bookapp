import { useState } from "react";
import {get, getAll} from '../BooksAPI';
import Shelf from "./Shelf";

const Search = ({myBookList, changeBook, setShowSearchpage}) => {
    const [allBookList, changeBookList] = useState([]);
   
    if (allBookList.length === 0) {
        getAll().then(allBooks => {
            let newBookList = allBooks.filter(b => !myBookList.find(mb => mb.id === b.id));  // Don't show books that are already on a shelf.
            if (newBookList.length == 0) {
                newBookList = allBooks;
            }
            changeBookList(newBookList);
          }).catch(err => console.log("Error reading books", err));
      }

    return <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => setShowSearchpage(false)}  // If we are showing this, then the value of showSearchPage is true.  Set it to false.
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
        <div className="list-books-content">
            {allBookList.length > 0 ? <Shelf title="Current Search Results" books={allBookList} changeBook={changeBook}/> : null}
        </div>
    </div>
  </div>
  };
  
  export default Search;