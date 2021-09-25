import styled from "styled-components";
import { useState } from "react";

const Div = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .tool {
    .title {
      font-size: 48px;
      text-align: center;
      font-weight: bold;
      padding: 2rem 1.5rem;
    }

    .btn {
      padding: 0.75rem 2.5rem;
      background-color: #a9d191;
      opacity: 0.7;
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 500;
      color: white;
      justify-content: space-between;
      width: 200px;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        opacity: 1;
      }

      svg {
        width: 1.5rem;
      }
    }
  }

  .paraphrasing-tool {
    .buttons {
      display: flex;
      justify-content: center;

      button {
        margin: 1rem;
        padding: 1rem;
        width: 200px;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
      }
    }
    .text-inputs {
      display: flex;
      width: 90%;
      margin: 16px auto;
      .text-container {
        width: 100%;
        padding: 10px;
        .text-instruction {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          text-align: center;
          color: rgb(71, 85, 105);
          padding-bottom: 0.5rem;
        }

        textarea {
          width: 100%;
          max-width: 100%;
          font-size: 1.125rem;
          padding: 1rem;
          border-width: 2px;
          border-radius: 0.5rem;
          height: 24rem;
          border-color: rgba(226, 232, 240, 1);
          resize: none;
          line-height: 1.75rem;

          &:focus {
            outline: none;
            border: 2px solid #a9d191;
            //   outline: 2px #474ed9 solid;
          }
        }

        ::placeholder {
          color: #c2c6d2;
        }
      }
    }

    .extras {
      width: 90%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: space-between;
      align-items: center;

      .num-of-words {
        span {
          color: green;
        }
      }
    }

    .copy-clear {
      text-align: right;
      div {
        display: inline-flex;
        padding: 0.5rem 1rem;
        width: initial;
        font-size: 1rem;
        svg {
          margin-right: 0.25rem;
        }
      }

      .clear-btn {
        background-color: rgba(255, 0, 0, 0.164);
        color: red;
      }

      .copy-btn {
        color: #64748b;
        background-color: #64748b21;
      }
    }

    .paraphrase-btn {
      display: flex;
      margin: 0 auto;
    }
  }
`;

let Paraphrase = () => {
  const [origText, setorigText] = useState("");
  const [charCount, setcharCount] = useState(0);
  const [resultText, setresultText] = useState("");
  const [loading, setloading] = useState(false);
  const [paraphraseMode, setparaphraseMode] = useState("standard");

  let handleOrigTextChange = (e) => {
    setorigText(e.target.value);
    setcharCount(e.target.value.length);
  };

  let sendText = () => {
    if (charCount < 450) {
      setloading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        text: origText,
        mode: paraphraseMode,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("/api/paraphrase", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setresultText(result.text[0]);
          console.log(result);
          setloading(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

  let clearText = () => {
    setorigText("");
    setresultText("");
  };

  let setMode = (text) => {
    setparaphraseMode(text);
  };

  return (
    <Div>
      <div className="paraphrasing-tool tool">
        <h1 className="title"> Paraphrasing Tool</h1>
        <div className="buttons">
          <button
            onClick={() => setMode("standard")}
            style={
              paraphraseMode == "standard"
                ? { backgroundColor: "#c3dfb2" }
                : { backgroundColor: "#f4fdee" }
            }
          >
            Standard Mode
          </button>
          <button
            onClick={() => setMode("fluent")}
            style={
              paraphraseMode == "fluent"
                ? { backgroundColor: "#c3dfb2" }
                : { backgroundColor: "#f4fdee" }
            }
          >
            Fluent Mode
          </button>
          <button
            onClick={() => setMode("creative")}
            style={
              paraphraseMode == "creative"
                ? { backgroundColor: "#c3dfb2" }
                : { backgroundColor: "#f4fdee" }
            }
          >
            Creative Mode
          </button>
        </div>
        <div className="text-inputs">
          <div className="text-original text-container">
            <p className="text-instruction">
              Enter the text you want to paraphrase
            </p>
            <textarea
              name=""
              id=""
              placeholder="Enter the text you want to paraphrase. You can select any of the modes above for different levels of paraphrasing. After writing or pasting your text, use the Paraphrase button below."
              value={origText}
              onChange={(e) => handleOrigTextChange(e)}
            ></textarea>
          </div>

          <div className="text-result text-container">
            <p className="text-instruction">Paraphrased text</p>
            <textarea
              name=""
              placeholder="You will get the resulting text here after the paraphrasing tool has finished rephrasing."
              readOnly
              value={resultText}
            ></textarea>
          </div>
        </div>
        <div className="extras">
          <p className="num-of-words">
            <span
              className="number"
              style={{ color: charCount < 450 ? "green" : "red" }}
            >
              {charCount}
            </span>{" "}
            /450 characters
          </p>
          <div className="paraphrase-btn btn" onClick={() => sendText()}>
            <svg
              className="w-6 h-6 mr-2 -ml-1"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
            <span>{loading ? "Loading.." : "Paraphrase"}</span>
          </div>

          <div className="copy-clear" onClick={() => clearText()}>
            <div className="clear-btn btn">
              <svg
                className="w-6 h-6 mr-2 -ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Clear all</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>

              <p>Clear all</p>
            </div>
            <div className="copy-btn btn">
              <svg
                className="w-6 h-6 mr-2 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <title>Copy result</title>
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
              </svg>
              <p> Copy result</p>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Paraphrase;
