import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Success from "./success";

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
  const [dayAccessed, setdayAccessed] = useState("");
  const [monthAccessed, setmonthAccessed] = useState("");
  const [yearAccessed, setyearAccessed] = useState("");
  const [error, seterror] = useState(false);
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

    setauthorList(text);
  }, [author]);

  useEffect(() => {
    let referencesArr = localStorage.getItem("sources");
    populateReferences();
  }, []);

  let getMonth = (n) => {
    let month;

    switch (n) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;

      case "03":
        month = "March";
        break;

      case "04":
        month = "April";
        break;

      case "05":
        month = "May";
        break;

      case "06":
        month = "June";
        break;

      case "07":
        month = "July";
        break;

      case "08":
        month = "August";
        break;

      case "09":
        month = "September";
        break;

      case "10":
        month = "October";
        break;

      case "11":
        month = "November";
        break;

      case "12":
        month = "December";
        break;
    }

    return month;
  };

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
    setauthor([]);
    setmonthAccessed("");
    setdayAccessed("");
    setyearAccessed("");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      link: websiteLink,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/web-citate", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.errors == undefined) {
          let infos = data.data;
          console.log(data);

          if (infos !== undefined) {
            if (infos.attributes.author[0] !== undefined) {
              console.log(infos.attributes.author);

              let authors = infos.attributes.author.filter((auth) =>
                auth.type == "organization" ? false : true
              );

              console.log(authors);
              setauthor(authors);
            } else {
              console.log("False");
            }

            setyearPublished(
              infos.attributes.issued[0] !== undefined
                ? infos.attributes.issued[0][0]
                : ""
            );

            let date = infos.attributes.accessed[0];
            console.log(date);
            setyearAccessed(date[0]);
            setmonthAccessed(getMonth(date[1]));
            setdayAccessed(date[2]);

            setdateAccessed(infos.attributes.accessed[0]);
            setpageTitle(infos.attributes.title);
            setreferenceVisible(true);
            seterror(false);
          }
        } else {
          seterror(true);

          setTimeout(() => {
            seterror(false);
          }, 1000);
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

      <div className="popup">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: 0,
              }}
              animate={{
                opacity: 1,
                y: 24,
              }}
              exit={{ opacity: 0, y: 0 }}
            >
              <Success text="Error finding website details. Please input manually" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
            <input
              type="text"
              name=""
              id=""
              value={yearAccessed}
              onChange={(e) => setyearAccessed(e.target.value)}
            />
          </label>
          <label>
            Month
            <input
              type="text"
              name=""
              id=""
              value={monthAccessed}
              onChange={(e) => monthAccessed(e.target.value)}
            />
          </label>

          <label>
            Day
            <input
              type="text"
              name=""
              id=""
              value={dayAccessed}
              onChange={(e) => setdayAccessed(e.target.value)}
            />
          </label>
        </div>
        {referenceVisible && (
          <p className="text-result">
            {authorList} {yearPublished ? `(${yearPublished})` : ""} {pageTitle}
            [Online]. Available at: {websiteLink} (Accessed: {dayAccessed}{" "}
            {monthAccessed} {yearAccessed}
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
