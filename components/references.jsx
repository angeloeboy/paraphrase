import styled from "styled-components";

let References = (props) => {
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
                <button onClick={(e) => deleteReference(e)} data-index={index}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default References;
