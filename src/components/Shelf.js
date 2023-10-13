import Book from "./Book";

const Shelf = ({title, books, changeBook}) => {
    console.log("Render shelf",title,books);
    return <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            {books.map(book => {
                return <Book key={book.id} info={book} changeBook={changeBook}/>})}
        </div>
    </div>;
  };
  
  export default Shelf;