import styled from "styled-components";
import { useState } from "react";

const Div = styled.div``;

let BookCitate = () => {
  const [author, setauthor] = useState([]);
  const [year, setyear] = useState("");
  const [title, settitle] = useState("");
  const [publisher, setpublisher] = useState("");
  const [publicationPlace, setpublicationPlace] = useState("");

  return (
    <Div>
      <div className="author">
        Add Author
        <button onClick={() => addAuthor()}>Add</button>
        <div>
          <label className="initial">
            Initials
            <input
              type="text"
              //   value={addedAuthorInitial}
              //   onChange={(e) => setaddedAuthorInitial(e.target.value)}
            />
          </label>
          <label>
            Surname
            <input
              type="text"
              //   value={addedAuthorName}
              //   onChange={(e) => setaddedAuthorName(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="author">
        Author list
        {author.map((auth, index) => {
          return (
            <div key={index}>
              <label className="initial">
                Initials
                <input
                  type="text"
                  value={auth.initials !== undefined ? auth.initials : ""}
                  data-index={index}
                  //   onChange={(e) => handleAuthorInitialsEdit(e)}
                />
              </label>
              <label>
                Surname
                <input
                  type="text"
                  value={auth.family !== undefined ? auth.family : ""}
                  data-index={index}
                  //   onChange={(e) => handleAuthorNameEdit(e)}
                />
              </label>

              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          );
        })}
      </div>

      <label htmlFor="">
        Year
        <input type="text" />
      </label>

      <label htmlFor="">
        Title
        <input type="text" />
      </label>

      <label htmlFor="">
        Publisher
        <input type="text" />
      </label>

      <label htmlFor="">
        Place of Publication
        <input type="text" />
      </label>
    </Div>
  );
};

export default BookCitate;
