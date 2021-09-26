import { useState } from "react";
import styled from "styled-components";

let References = (props) => {
  const [copied, setcopied] = useState(false);

  let deleteReference = (e) => {
    let index = e.currentTarget.dataset.index;
    let referencesArr = props.references;
    referencesArr.splice(index, 1);
    localStorage.setItem("sources", JSON.stringify(referencesArr));
    props.populateReferences();
  };

  return (
    <div className="citation-links box">
      <h1>References</h1>
      <div className="references" id="references">
        {props.references.map((reference, index) => {
          return (
            <div key={index}>
              <div className="reference-item">
                <p>{reference}</p>
                <div className="reference-buttons">
                  <button
                    className="delete"
                    onClick={(e) => deleteReference(e)}
                    data-index={index}
                  >
                    Delete
                  </button>

                  <button
                    className="copy"
                    onClick={(e) => {
                      navigator.clipboard.writeText(reference);
                      setcopied(true);

                      setTimeout(() => {
                        setcopied(false);
                      }, 500);
                    }}
                    data-index={index}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default References;
