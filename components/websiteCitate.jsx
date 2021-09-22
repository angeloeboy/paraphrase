import { useState, useEffect } from "react";

let WebsiteCitate = ({ populateReferences }) => {
  const [author, setauthor] = useState([]);
  const [websiteLink, setwebsiteLink] = useState("");
  const [yearPublished, setyearPublished] = useState("");
  const [pageTitle, setpageTitle] = useState("");
  const [dateAccessed, setdateAccessed] = useState([]);
  const [referenceVisible, setreferenceVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [authorList, setauthorList] = useState("");
  const [addedAuthorInitial, setaddedAuthorInitial] = useState("");
  const [addedAuthorName, setaddedAuthorName] = useState("");

  useEffect(() => {
    let text = "";
    author.map((aut, index) => {
      if (index != 0) {
        if (index + 1 == author.length && author.length !== 1) {
          text = ` ${text} and ${aut.family}, ${aut.initials}`;
        } else {
          text = `${text} ${aut.family}, ${aut.initials},`;
        }
      } else {
        text = `${text} ${aut.family}, ${aut.initials}`;
      }
    });

    console.log(author.length);
    setauthorList(text);
  }, [author]);

  useEffect(() => {
    let referencesArr = localStorage.getItem("sources");
    populateReferences();
  }, []);

  useEffect(() => {
    console.log("testingg");
  }, [author]);

  let addAuthor = () => {
    let added = {
      initials: addedAuthorInitial,
      family: addedAuthorName,
    };

    let authArr = author.filter((auth) => {
      if (auth.initials !== undefined && auth.family !== undefined) {
        return true;
      }
    });

    authArr.push(added);
    setauthor([...authArr]);
    setaddedAuthorInitial("");
    setaddedAuthorName("");
  };

  let getWebsiteData = () => {
    setloading(true);
    setreferenceVisible(false);
    setyearPublished("");
    setpageTitle("");
    setdateAccessed([]);
    setauthor([{ initials: "", family: "" }]);

    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://citation-generator.scribbr.com/v2/webpages?q=${websiteLink}`
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        let infos = JSON.parse(data.contents).data;
        console.log(infos);

        if (infos !== undefined) {
          if (infos.attributes.author[0] !== undefined) {
            console.log("true");
            console.log(infos.attributes.author[0]);
            setauthor(infos.attributes.author);
          } else {
            console.log("False");
            setauthor([]);
          }

          setyearPublished(
            infos.attributes.issued[0] !== undefined
              ? infos.attributes.issued[0][0]
              : ""
          );

          setdateAccessed(infos.attributes.accessed[0]);
          setpageTitle(infos.attributes.title);

          setreferenceVisible(true);
        }

        setloading(false);
      });
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
    if (websiteLink !== "") {
      let references = localStorage.getItem("sources");
      let referencesArr = [];
      let text = `${authorList} ${
        yearPublished ? "(" + yearPublished + ")" : ""
      } ${pageTitle} [Online]. Available at: {websiteLink} ${websiteLink} (Accessed ${
        dateAccessed[2]
      } ${dateAccessed[1]} ${dateAccessed[0]}))`;

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
    }
  };
  return (
    <div className="web-citation">
      <h1 className="citation-title">Website Citation</h1>

      <label>Website Link</label>
      <input
        type="text"
        name=""
        id=""
        className="link"
        value={websiteLink}
        onChange={(e) => {
          setwebsiteLink(e.target.value);
          setreferenceVisible(false);
        }}
      />

      <div className="result">
        <div className="author">
          Author(s)
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
                    value={auth.initials !== undefined ? auth.initials : ""}
                    data-index={index}
                    onChange={(e) => handleAuthorInitialsEdit(e)}
                  />
                </label>
                <label>
                  Surname
                  <input
                    type="text"
                    value={auth.family !== undefined ? auth.family : ""}
                    data-index={index}
                    onChange={(e) => handleAuthorNameEdit(e)}
                  />
                </label>

                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            );
          })}
        </div>

        <label>Year of publishing</label>
        <input
          type="text"
          name=""
          id=""
          className="yearOfPublishing"
          value={yearPublished}
          onChange={(e) => setyearPublished(e.target.value)}
        />

        <label>Title of Page</label>
        <input
          type="text"
          name=""
          id=""
          className="websiteTitle"
          value={pageTitle}
          onChange={(e) => setpageTitle(e.target.value)}
        />

        <label>Date Accessed</label>
        <div className="date-accessed">
          <label>
            Year
            <input type="text" name="" id="" value={dateAccessed[0]} />
          </label>
          <label>
            Month
            <input type="text" name="" id="" value={dateAccessed[1]} />
          </label>
          <label>
            Day
            <input type="text" name="" id="" value={dateAccessed[2]} />
          </label>
        </div>
        {referenceVisible && (
          <p className="text-result">
            {authorList} {yearPublished ? `(${yearPublished})` : ""} {pageTitle}
            [Online]. Available at: {websiteLink} (Accessed: {dateAccessed[2]}{" "}
            {dateAccessed[1]} {dateAccessed[0]})
          </p>
        )}
      </div>

      <div className="cite btn" onClick={() => getWebsiteData()}>
        <span>{loading ? "Loading" : "Cite"}</span>
      </div>
      <div className="add-citation btn" onClick={() => addReference()}>
        <span>Add to references</span>
      </div>
    </div>
  );
};

export default WebsiteCitate;
