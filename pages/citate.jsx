import styled from "styled-components";
import { useState, useEffect } from "react";
import References from "./../components/references";
import WebsiteCitate from "../components/websiteCitate";
import BookCitate from "../components/bookCitate";
import { motion } from "framer-motion";
import Nav from "../components/nav";

let Div = styled.div`
  .citation-tool {
    .citation-title {
      text-align: center;
      margin-bottom: 30px;
    }

    .buttons {
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;

      button {
        padding: 1rem 2rem;
        min-width: 200px;
        font-size: 1rem;
        margin: 0px 1rem;
        border: 1px solid #63744d;
        cursor: pointer;
        background-color: #63744d;
        color: white;
      }

      .selected {
        color: white;
        background-color: #63744d;
      }

      @media (max-width: 500px) {
        flex-flow: column;

        button {
          margin-bottom: 1rem;
        }
      }
    }

    .container {
      display: flex;
      justify-content: space-between;
      flex-flow: row;
      align-items: flex-start;
      margin: 1rem;

      .box {
        border: 1px solid green;
        border-radius: 1rem;
        margin: 1rem;
        padding: 5%;
        width: 100%;
      }

      .citation-area {
        max-width: 50%;
        background-color: rgb(250, 250, 250);

        label {
          margin-right: 0.5rem;
          font-weight: 400;
        }

        input {
          font-size: 1rem;
          padding: 0.75rem;
          border-width: 2px;
          border-radius: 0.5rem;
          border-color: rgba(226, 232, 240, 1);
          line-height: 1.75rem;
          width: 100%;
          border: 1px solid rgba(226, 232, 240, 1);
          margin: 10px auto;
          display: block;
          &:focus {
            outline: none;
            border: 2px solid #a9d191;
            //   outline: 2px #474ed9 solid;
          }
        }

        .date-accessed {
          display: flex;
        }

        .author {
          button {
            padding: 1rem;
            min-width: 100px;
            margin: 10px;
            border: 1px solid #63744d;
            cursor: pointer;
            color: black;
            background-color: #63744d;
            color: white;
          }
          div {
            display: flex;
            align-items: flex-end;
          }
        }

        .text-result {
          /* display: none; */
          opacity: 0.8;
          padding: 1.5rem;
          background-color: rgb(241, 241, 241);
          margin: 1rem 0px;
          cursor: pointer;
        }

        .btn {
          text-align: center;
          margin-top: 2rem;
          display: inline-block;
          width: initial;
          background-color: #63744d;
          margin-right: 20px;
        }

        .success {
          background-color: #acc58c;
          color: white;
          padding: 1rem;
          font-size: 1rem;
          position: fixed;
          width: 200px;
          text-align: center;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .citation-links {
        width: 50%;

        .references {
          .reference-item {
            padding: 1rem;
            background-color: rgb(245, 245, 245);
            margin-top: 0.6rem;
            cursor: pointer;
            border-radius: 0.5rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 600px) {
              flex-flow: column;

              button {
                margin-top: 1rem;
                padding: 0.8rem;
                font-size: 14px;
              }
            }
          }
        }

        button {
          padding: 1rem 2rem;
          /* min-width: 200px; */
          font-size: 1rem;
          margin: 0px 1rem;
          border: 1px solid #63744d;
          cursor: pointer;
          color: black;
          background-color: #63744d;
          color: white;
        }
      }

      @media (max-width: 1278px) {
        flex-flow: column;

        .box {
          margin: 0px;
          margin-bottom: 1rem;
        }
        .citation-area {
          width: 100%;
          max-width: 100%;
        }
        .citation-links {
          width: 100%;
        }
      }

      @media (max-width: 600px) {
        .citation-links {
          .references {
            .reference-item {
              word-break: break-all;
            }
          }
        }
      }
    }
  }
`;

let Citate = () => {
  const [references, setreferences] = useState([]);
  const [websiteCitationVisible, setwebsiteCitationVisible] = useState(true);
  const [showSuccess, setshowSuccess] = useState(false);

  let populateReferences = () => {
    let references = localStorage.getItem("sources");

    if (references == undefined) {
      setreferences([]);
    } else {
      setreferences(JSON.parse(references));
    }
  };

  return (
    <Div>
      <Nav />
      <div className="citation-tool tool">
        <h1 className="title"> Citation Tool</h1>

        <div className="container">
          <div className="citation-area box">
            <div className="buttons">
              <button onClick={() => setwebsiteCitationVisible(true)}>
                Website
              </button>
              <button onClick={() => setwebsiteCitationVisible(false)}>
                Book
              </button>
            </div>
            {showSuccess && (
              <motion.div
                initial="pageInitial"
                animate="pageAnimate"
                exit={{ opacity: 0 }}
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                  },
                }}
              >
                <div className="success">Success!</div>
              </motion.div>
            )}

            {websiteCitationVisible ? (
              <WebsiteCitate
                populateReferences={populateReferences}
                setshowSuccess={setshowSuccess}
              />
            ) : (
              <BookCitate
                populateReferences={populateReferences}
                setshowSuccess={setshowSuccess}
              />
            )}
          </div>

          <References
            references={references}
            populateReferences={populateReferences}
          />
        </div>
      </div>
    </Div>
  );
};

export default Citate;
