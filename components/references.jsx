import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Success from "./success";

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
      <div className="popup">
        <AnimatePresence>
          {copied && (
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
              <Success text="Copied to clipboard" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <h1>References</h1>
      <div className="references" id="references">
        <AnimatePresence>
          {props.references.map((reference, index) => {
            return (
              <div key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
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
                </motion.div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default References;
