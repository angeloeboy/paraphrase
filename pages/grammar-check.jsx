import { useState } from "react";
import styled from "styled-components";
import Nav from "../components/nav";

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
      text-align: center;
      margin: 0 auto;

      &:hover {
        opacity: 1;
      }

      svg {
        width: 1.5rem;
      }
    }
  }

  .grammar-tool {
    .text-inputs {
      /* display: flex; */
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
          }
        }

        ::placeholder {
          color: #c2c6d2;
        }
      }

      .text-result {
        border: 2px solid rgba(226, 232, 240, 1);
        padding: 1rem;
        border-radius: 0.5rem;
      }
    }

    .errors {
      margin-bottom: 40px;
    }
  }
`;

const Replacement = styled.p`
  background-color: #01a301;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 3px;
  display: inline-block;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  margin-right: 1rem;
  &:hover {
    background-color: #06d606;
  }
`;

let GrammarCheck = () => {
  const [origText, setorigText] = useState("");
  const [resultText, setresultText] = useState("");
  const [loading, setloading] = useState(false);
  const [result, setresult] = useState([]);
  const [corrected, setcorrected] = useState(false);

  let sendText = () => {
    setloading(true);
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

    fetch("/api/grammar", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.grammarResult);
        setresult(result.grammarResult);
        setresultText(origText);
        setloading(false);
      })
      .catch((error) => console.log("error", error));
  };

  let correctedText = (offset, length) => {
    let originalText = origText;
    let text = "";

    for (let x = 0; x < length; x++) {
      text = text + resultText.charAt(offset + x);
    }

    return text;
  };

  let handleReplacementClick = (text, correctedText, index) => {
    let texts = resultText.replace(correctedText, text);
    setorigText(texts);

    let resultARr = result;
    resultARr.splice(index, 1);
    setresult(resultARr);
  };

  return (
    <Div>
      <Nav />
      <div className="grammar-tool tool">
        <h1 className="title"> Grammar Checking Tool</h1>
        <div className="text-inputs">
          {/* Original Text Container */}
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
              </>
            )}
          </div>

          {/* Error Result Container */}
          <div className="text-result text-container">
            <p className="text-instruction">Errors ({result.length})</p>
            {result.map((res, index) => {
              return (
                <div key={index} className="errors">
                  <p>
                    {index + 1}. {correctedText(res.offset, res.length)} -
                    {res.message}
                  </p>
                  <p></p>

                  <p>Possible replacements</p>

                  {res.replacements.map((replacement, index) => {
                    return (
                      <Replacement
                        key={index}
                        onClick={() =>
                          handleReplacementClick(
                            replacement.value,
                            correctedText(res.offset, res.length, index)
                          )
                        }
                      >
                        {replacement.value}
                      </Replacement>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="fix-btn btn" onClick={() => sendText()}>
          <span>{loading ? "Loading.." : "Fix"}</span>
        </div>
      </div>
    </Div>
  );
};

export default GrammarCheck;
