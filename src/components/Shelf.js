import Book from "./Book";

const Shelf = ({title, books, changeBook}) => {
    return <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => {
                    return <Book key={book.id} info={book} changeBook={changeBook}/>})}
            </ol>
        </div>
    </div>;
  };
  
  export default Shelf;