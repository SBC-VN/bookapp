const Book = ({displayId, info, changeBook}) => {
    console.log("Shelf",info.shelf);

    return <li>
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${info.imageLinks.thumbnail})`
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={e => {changeBook(info,e.target.value)}} value={info.shelf}>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{info.title}</div>
                <div className="book-authors">{info.authors.join(', ')}</div>
            </div>
        </li>;
  };
  
  export default Book;