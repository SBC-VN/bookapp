import { useState } from "react";
import {search, getAll} from '../BooksAPI';
import Shelf from "./Shelf";

const Search = ({myBookList, changeBook, setShowSearchpage}) => {
    const [allBookList, changeBookList] = useState([]);
    let clearedSearch = false;  // Handle timing issues due to async calls.
    
    // On event handler for the search term input box.  Filters books based on the search term.
    function changeSearchTerm(e) {
        let searchTerm = e.target.value;
        if (searchTerm === "") {
            clearedSearch = true;
            changeBookList([]);  // Clear the search results.
        }
        else {
            // Initiate the book search from the API.
            clearedSearch = false;
            search(searchTerm).then(searchResults => {
                if (!searchResults.hasOwnProperty('error') && !clearedSearch) {
                    let newBookList = searchResults.filter(b => !myBookList.find(mb => mb.id === b.id));  // Don't show books that are already on a shelf.
                    changeBookList(newBookList);  
                }
            }).catch(err => console.log("Error reading books", err));
        }
    }

    // Local version of changeBook, that will also display that the book has been added.
    function searchChangeBook(book, shelfId) {
        console.log("Search change book", book, shelfId);
        changeBook(book, shelfId);
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
        <input onChange={e => changeSearchTerm(e)}
          type="text"
          placeholder="Search by title, author, or ISBN"
        />
      </div>
    </div>
    <div className="search-books-results">
        <div className="list-books-content">
            {allBookList.length > 0 ? <Shelf title="Current Search Results" books={allBookList} changeBook={searchChangeBook}/> : null}
        </div>
    </div>
  </div>
  };
  
  export default Search;