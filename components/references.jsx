import styled from "styled-components";

const Div = styled.div`
  width: 50%;
  .references {
    // background-color: red;
    .reference-item {
      padding: 1rem;
      background-color: rgb(245, 245, 245);
      margin-top: 0.6rem;
      cursor: pointer;
      border-radius: 0.5rem;
      width: 100%;
      // word-break: break-all;
    }
  }
`;

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
              <p className="reference-item">{reference}</p>
              <button onClick={(e) => deleteReference(e)} data-index={index}>
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default References;
