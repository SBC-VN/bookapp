import Shelf from "./Shelf";

const BookCase = ({books, changeBook}) => {
    // The shelves of books, AKA BookCase
    //   Note that there are two additional states that a book can be in: "I don't want to read this book", and "not evaluated".
    //     for now, those two states will not be displayed on a shelf, and will have a shelfId of undefined.
    let shelves = [
        { id: "currentlyReading", title: "Currently Reading", books: [] },
        { id: "wantToRead", title: "Want to Read", books: [] },
        { id: "read", title: "Read", books: [] }
    ];

    // Populate the shelves with books.
    books.forEach(book => {
        let shelf = shelves.find(s => s.id === book.shelf);
        if (shelf) {
            shelf.books.push(book);
        }
    });

    return <div className="books-case">
        {shelves.map(shelf => {
            return <Shelf key={shelf.id} title={shelf.title} books={shelf.books} changeBook={changeBook} />
        })}
    </div>;
}

export default BookCase;