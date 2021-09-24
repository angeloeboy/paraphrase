import { useState } from "react";
import styled from "styled-components";

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
    // display: none;
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

let GrammarCheck = () => {
  const [origText, setorigText] = useState("");
  const [charCount, setcharCount] = useState(0);
  const [resultText, setresultText] = useState("");
  const [loading, setloading] = useState(false);
  const [result, setresult] = useState([]);
  const [corrected, setcorrected] = useState(false);

  let sendText = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      text: origText,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/grammar-check", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // setresult(result.grammarResult);
        // setcorrected(true);
        // setresultText(origText);
      })
      .catch((error) => console.log("error", error));
  };

  let correctedText = (offset, length) => {
    let originalText = origText;
    let text = "";

    for (let x = 0; x < length; x++) {
      text = text + originalText.charAt(offset + x);
    }

    return text;
  };

  let handleReplacementClick = (text, correctedText) => {
    let texts = resultText.replace(correctedText, text);
    setresultText(texts);
  };

  return (
    <Div>
      <div className="paraphrasing-tool tool">
        <h1 className="title"> Grammar Checking Tool</h1>
        <div className="text-inputs">
          <div className="text-original text-container">
            <p className="text-instruction">
              Enter the text you want to be corrected
            </p>
            {!corrected ? (
              <textarea
                name=""
                id=""
                placeholder="Enter the text you want to paraphrase. You can select any of the modes above for different levels of paraphrasing. After writing or pasting your text, use the Paraphrase button below."
                value={origText}
                onChange={(e) => setorigText(e.target.value)}
              ></textarea>
            ) : (
              <>
                <textarea
                  name=""
                  id=""
                  placeholder="Enter the text you want to paraphrase. You can select any of the modes above for different levels of paraphrasing. After writing or pasting your text, use the Paraphrase button below."
                  value={resultText}
                  onChange={(e) => setresultText(e.target.value)}
                ></textarea>
                <p>result</p>
              </>
            )}
          </div>

          <div className="text-result text-container">
            <p className="text-instruction">Result</p>
            {result.map((res, index) => {
              return (
                <div key={index}>
                  <p>
                    {index + 1}. {res.message}
                  </p>
                  <p>{correctedText(res.offset, res.length)}</p>

                  <p>Possible replacements</p>

                  {res.replacements.map((replacement, index) => {
                    return (
                      <div key={index}>
                        <p
                          onClick={() =>
                            handleReplacementClick(
                              replacement.value,
                              correctedText(res.offset, res.length)
                            )
                          }
                        >
                          {replacement.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="extras">
          {/* <p className="num-of-words">
            <span className="number">{charCount}</span> /500 characters
          </p> */}
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
        </div>
      </div>
    </Div>
  );
};

export default GrammarCheck;
