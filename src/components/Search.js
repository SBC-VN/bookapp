/**
* @description Encapsulates the search page of the app.
* @param {json[]} myBookList - The array of (all) books.
* @param {callback} changeBook - A callback function in the parent that will do the actual shelf change.
*/

import { useState } from "react";
import { Link } from 'react-router-dom';
import {search } from '../BooksAPI';
import Shelf from "./Shelf";
import BookCase from "./BookCase";

const Search = ({myBookList, changeBook}) => {
    const [searchList, changeSearchList] = useState([]);
    let clearedSearch = false;  // Handle timing issues due to async calls.
    
    // On event handler for the search term input box.  Filters books based on the search term.
    function changeSearchTerm(e) {
        let searchTerm = e.target.value;
        if (searchTerm === "") {
            clearedSearch = true;
            changeSearchList([]);  // Clear the search results.
        }
        else {
            // Initiate the book search from the API.
            clearedSearch = false;
            search(searchTerm).then(searchResults => {
                if (!searchResults.hasOwnProperty('error') && !clearedSearch) {
                    let newBookList = searchResults.filter(b => !myBookList.find(mb => mb.id === b.id));  // Don't show books that are already on a shelf.
                    changeSearchList(newBookList);  
                }
                else {
                    //console.log("issue with search",searchResults.error);
                    changeSearchList([]);  // Clear the search results.
                }
            }).catch(err => console.log("Error reading books", err));
        }
    }

    // Local version of changeBook, that will also display that the book has been added.
    function searchChangeBook(book, shelfId) {     
        let newBookList = searchList.filter(b => (book.id !== b.id));  // Remove this book from the list.
        changeSearchList(newBookList); 
        changeBook(book, shelfId);
    }
   
    return <div className="search-books">
    <div className="search-books-bar">
      <Link to="/" className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        <input onChange={e => changeSearchTerm(e)}
          type="text"
          placeholder="Search by title, author, or ISBN"
        />
      </div>
    </div>
    <div className="search-books-results">
        <div className="list-books-content">
            <Shelf title={`Current Search Results (${searchList.length})`} books={searchList} changeBook={searchChangeBook}/>
        </div>
    </div>
    <BookCase books={myBookList} changeBook={changeBook} />
  </div>
  };
  
  export default Search;