import styled from "styled-components";
import { useState, useEffect } from "react";

const Div = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
  .books {
    margin-bottom: rem;

    .book {
      background-color: #deecd5;
      padding: 1rem;
      margin-bottom: 1rem;
    }
  }

  .citate {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;

    .btn {
      margin-top: 0px !important;
      margin-bottom: 10px;
      margin-left: 1.5rem;
    }
  }
`;

let BookCitate = ({ populateReferences, setshowSuccess }) => {
  const [author, setauthor] = useState([]);
  const [year, setyear] = useState("");
  const [title, settitle] = useState("");
  const [publisher, setpublisher] = useState("");
  const [publicationPlace, setpublicationPlace] = useState("");
  const [loading, setloading] = useState(false);
  const [books, setbooks] = useState([]);
  const [bookSearchString, setbookSearchString] = useState("");
  const [booksVisible, setbooksVisible] = useState(false);
  const [authorList, setauthorList] = useState("");
  const [addedAuthorInitial, setaddedAuthorInitial] = useState("");
  const [addedAuthorName, setaddedAuthorName] = useState("");
  const [referenceVisible, setreferenceVisible] = useState(false);

  let clearText = () => {
    setauthor([]);
    setyear("");
    settitle("");
    setpublisher("");
    setpublicationPlace("");

    setreferenceVisible(false);
  };

  useEffect(() => {
    let text = "";
    author.map((aut, index) => {
      if (index != 0) {
        if (index + 1 == author.length && author.length !== 1) {
          text = ` ${text} and ${aut.lastname}, ${aut.initials}`;
        } else {
          text = `${text} ${aut.lastname}, ${aut.initials},`;
        }
      } else {
        text = `${text} ${aut.lastname}, ${aut.initials}`;
      }
    });

    console.log(author.length);
    setauthorList(text);
    console.log(text);
  }, [author]);

  let getBooks = () => {
    setloading(true);
    console.log("testet");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://www.googleapis.com/books/v1/volumes?key=AIzaSyC17dTOHVMttB5cy8fRqtaPvVLtrFZ14dE&q=${encodeURIComponent(
        bookSearchString
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setloading(false);
        let bookarr = result.items.splice(5, result.items.length);

        let booksArrFixed = [];

        bookarr.map((book) => {
          let bookData = {
            datePublished: book.volumeInfo.publishedDate
              ? book.volumeInfo.publishedDate.substring(0, 4)
              : "",
            title: book.volumeInfo.title ? book.volumeInfo.title : "",
            authors: book.volumeInfo.authors ? book.volumeInfo.authors : [],
            publisher: book.volumeInfo.publisher
              ? book.volumeInfo.publisher
              : "",
          };

          booksArrFixed.push(bookData);
        });

        console.log(booksArrFixed);
        setbooks(booksArrFixed);
        setbooksVisible(true);
        setreferenceVisible(true);
      })
      .catch((error) => console.log("error", error));
  };

  let bookClicked = (book) => {
    let authorArr = [];

    book.authors.map((author) => {
      let authorDetails = {
        lastname: author.split(" ").pop(),
        initials: author.split(" ")[0].split("")[0],
      };

      authorArr.push(authorDetails);
    });

    setyear(book.datePublished);
    settitle(book.title);
    setpublisher(book.publisher);
    setauthor(authorArr);
    setbooksVisible(false);
    console.log(authorArr);
  };

  let handleDelete = (i) => {
    let arr = author;

    arr.splice(i, 1);

    console.log(arr);
    setauthor([...arr]);
  };

  let handleAuthorInitialsEdit = (e) => {
    let index = e.currentTarget.dataset.index;

    let authorArr = author;
    authorArr[index].initials = e.target.value;
    console.log(authorArr[index].initials);
    setauthor([...authorArr]);
  };

  let handleAuthorNameEdit = (e) => {
    let index = e.currentTarget.dataset.index;

    let authorArr = author;
    authorArr[index].family = e.target.value;
    console.log(authorArr[index].initials);
    setauthor([...authorArr]);
  };

  let addReference = () => {
    if (title !== "") {
      let references = localStorage.getItem("sources");
      let referencesArr = [];
      let text = `${authorList}
      ${year ? `(${year})` : " "} ${title}.
      ${publicationPlace ? `${publicationPlace}: ` : ""}
      ${publisher ? `${publisher}.` : ""})`;

      if (references == undefined) {
        console.log("undefined");
        referencesArr.push(text);
        localStorage.setItem("sources", JSON.stringify(referencesArr));
      } else {
        referencesArr = JSON.parse(references);
        console.log(referencesArr);
        referencesArr.push(text);
        localStorage.setItem("sources", JSON.stringify(referencesArr));
      }

      populateReferences();
      setshowSuccess(true);
      setTimeout(() => {
        setshowSuccess(false);
      }, 1000);
    }
  };

  let addAuthor = () => {
    let added = {
      initials: addedAuthorInitial,
      lastname: addedAuthorName,
    };

    let authArr = author.filter((auth) => {
      if (auth.initials !== undefined && auth.lastname !== undefined) {
        return true;
      }
    });

    authArr.push(added);
    setauthor([...authArr]);
    setaddedAuthorInitial("");
    setaddedAuthorName("");
  };

  return (
    <Div>
      <h1 className="citation-title">Books Citation</h1>

      <label htmlFor="">
        Book Title, Author
        <div className="citate">
          <input
            type="text"
            value={bookSearchString}
            onChange={(e) => setbookSearchString(e.target.value)}
          />
          <div className="cite btn" onClick={() => getBooks()}>
            <span>{loading ? "Loading" : "Cite"}</span>
          </div>
        </div>
      </label>
      {booksVisible && (
        <div className="books">
          <h3>Select which book</h3>
          {books.map((book, index) => {
            return (
              <div
                key={index}
                onClick={() => bookClicked(book)}
                className="book"
              >
                <p>{book.title}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="author">
        Add Author
        <div>
          <label className="initial">
            Initials
            <input
              type="text"
              value={addedAuthorInitial}
              onChange={(e) => setaddedAuthorInitial(e.target.value)}
            />
          </label>
          <label>
            Surname
            <input
              type="text"
              value={addedAuthorName}
              onChange={(e) => setaddedAuthorName(e.target.value)}
            />
          </label>
          <button onClick={() => addAuthor()}>Add</button>
        </div>
      </div>
      <div className="author">
        {author.map((auth, index) => {
          return (
            <div key={index}>
              <label className="initial">
                Initials
                <input
                  type="text"
                  value={auth.initials ? auth.initials : ""}
                  data-index={index}
                  onChange={(e) => handleAuthorInitialsEdit(e)}
                />
              </label>
              <label>
                Surname
                <input
                  type="text"
                  value={auth.lastname ? auth.lastname : ""}
                  data-index={index}
                  onChange={(e) => handleAuthorNameEdit(e)}
                />
              </label>

              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          );
        })}
      </div>

      <label htmlFor="">
        Year
        <input
          type="text"
          value={year}
          onChange={(e) => setyear(e.target.value)}
        />
      </label>

      <label htmlFor="">
        Title
        <input type="text" value={title} />
      </label>

      <label htmlFor="">
        Publisher
        <input
          type="text"
          value={publisher}
          onChange={(e) => setpublisher(e.target.value)}
        />
      </label>

      <label htmlFor="">
        Place of Publication
        <input
          type="text"
          value={publicationPlace}
          onChange={(e) => setpublicationPlace(e.target.value)}
        />
      </label>

      {referenceVisible && (
        <p className="text-result">
          {authorList}
          {year ? `(${year})` : " "} {title}.{" "}
          {publicationPlace ? `${publicationPlace}: ` : ""}{" "}
          {publisher ? `${publisher}.` : ""}
        </p>
      )}

      <div className="add-citation btn" onClick={() => addReference()}>
        <span>Add to references</span>
      </div>

      <div className="clear-btn btn" onClick={() => clearText()}>
        <p>Clear all</p>
      </div>
    </Div>
  );
};

export default BookCitate;
