/**
* @description Implements a shelf (subset) of books.   Will select from the list of books those that belong on the shelf.
* @param {string} title - The shelf title
* @param {json[]} books - The array of (all shelved) books.
* @param {callback} changeBook - A callback function in the parent that will do the actual shelf change.
*/

import Book from "./Book";

const Shelf = ({title, books, changeBook}) => {
    return <div className="bookshelf">
        {title !== "" ? (
            <h2 className="bookshelf-title">{title}</h2>
        ) : null}
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => {
                    return <Book key={book.id} info={book} changeBook={changeBook}/>})}
            </ol>
        </div>
    </div>;
  };
  
  export default Shelf;