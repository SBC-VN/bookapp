/**
* @description The book component displays a single book on a shelf, and allows the user to change the shelf.
* @param {json} info - The info (json) of the book.
* @param {callback} changeBook - A callback function in the parent that will do the actual shelf change.
*/

// Used to define the valid values of the select element.   This is used to do a better check on values than `info.shelf || "none"` when
// setting the default value of the select element.
const selectValues = ["currentlyReading", "wantToRead", "read", "none"];

const Book = ({info, changeBook}) => {
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
                    <select onChange={e => {changeBook(info,e.target.value)}} value={selectValues.includes(info.shelf) ? info.shelf : "none"}>
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