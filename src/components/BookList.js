/**
* @description Implements a list of books (not tied to a particular shelf).   This is the main page of the app, pulled out to
*              make the mainline code more readable.
* @param {json[]} myBookList - The array of (all) books.
* @param {callback} changeBook - A callback function in the parent that will do the actual shelf change.
*/

import { Link } from 'react-router-dom';
import BookCase from './BookCase';

const BookList = ({myBookList, changeBook}) => {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookCase books={myBookList} changeBook={changeBook} />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
    );
}

export default BookList;