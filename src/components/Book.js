const Book = ({displayId, info, changeBook}) => {
    return <li>
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                    width: 128,
                    height: 193,
                    backgroundImage: info.hasOwnProperty("imageLinks") && info.imageLinks.hasOwnProperty("thumbnail") ? `url(${info.imageLinks.thumbnail})` : null}
                    }
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
                <div className="book-title">{info.hasOwnProperty('title') ? info.title : "n/a"}</div>
                <div className="book-authors">{info.hasOwnProperty('authors') ? info.authors.join(', ') : "n/a"}</div>
            </div>
        </li>;
  };
  
  export default Book;