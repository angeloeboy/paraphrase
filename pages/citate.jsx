import styled from "styled-components";
import { useState, useEffect } from "react";
import References from "./../components/references";
import WebsiteCitate from "../components/websiteCitate";
import BookCitate from "../components/bookCitate";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../components/nav";
import spinner from "../components/images/spinner.gif";
import Success from "../components/success";

let Div = styled.div`
  .popup {
    position: fixed;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
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
        cursor: pointer;
        background-color: #a9d191;

        border: none;
        transition: all 0.3s ease-in-out;
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
            border: none;
            cursor: pointer;
            color: black;
            background-color: #c3dfb2;
            text-align: center;
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
          background-color: #c3dfb2;
          color: black;
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

            .reference-buttons {
              margin-top: 1rem;

              button {
                padding: 10px;
                font-size: 1rem;
                cursor: pointer;
                color: black;
                color: white;
                width: 100px;
                margin-right: 1rem;
                border: none;
              }

              .delete {
                background-color: #ff5353;

                &:hover {
                  background-color: #fa2d2d;
                }
              }

              .copy {
                background-color: #c3dfb2;
                color: black;

                &:hover {
                  background-color: #91e75b;
                }
              }
            }
          }
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
  const [citateMode, setcitateMode] = useState("website");

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
              <button
                onClick={() => {
                  setwebsiteCitationVisible(true);
                  setcitateMode("website");
                }}
                style={
                  citateMode == "website"
                    ? { backgroundColor: "#c3dfb2" }
                    : { backgroundColor: "#deecd5" }
                }
              >
                Website
              </button>
              <button
                onClick={() => {
                  setwebsiteCitationVisible(false);
                  setcitateMode("book");
                }}
                style={
                  citateMode == "book"
                    ? { backgroundColor: "#c3dfb2" }
                    : { backgroundColor: "#deecd5" }
                }
              >
                Book
              </button>
            </div>
            {/* {showSuccess && (
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
            )} */}

            <div className="popup">
              <AnimatePresence>
                {showSuccess && (
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
                    <Success />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
