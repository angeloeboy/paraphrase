import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Nav from "../components/nav";

import logo from "../components/images/inktoollogo.png";

const Div = styled.div`
  .features {
    display: flex;
    flex-wrap: wrap;
    padding: 5%;
    justify-content: center;
    padding-top: 2rem;

    .feature {
      width: 45%;
      background-color: #f2fdf2;
      padding: 3rem;
      border-radius: 0.5rem;
      margin: 1rem;
      h1 {
        font-size: 1.3rem;
      }

      p {
        color: #000000;
        font-size: 1.125rem;
        margin-top: 2rem;
      }

      @media (max-width: 720px) {
        width: 100%;
      }
    }
  }
`;
export default function Home() {
  const [name, setName] = useState("");

  return (
    <Div>
      <Head>
        <title>Ink Tool</title>
        <meta
          name="description"
          content="A tool for the dropkicks. Paraphrase, correct grammar and citate things easily."
        />
        <link rel="icon" href="/inktoollogo.png" />
      </Head>
      <Nav />

      <div className="features">
        <div className="feature">
          <h1>Free to use</h1>
          <p>
            Our article rewriter is entirely free of cost to use. We dont need
            your credit card or any payment information to help you generate the
            rephrased article or essay.
          </p>
        </div>

        <div className="feature">
          <h1>No signup required</h1>
          <p>
            Our software does not require any signup, login, or registration.
            Just provide the text you need to be rewritten and click the
            Paraphrase button. Nothing else needed.
          </p>
        </div>

        <div className="feature">
          <h1>How do you use a paraphrasing tool?</h1>
          <p>
            Our article rewriter is one of the easiest software on the internet
            for rephrasing phrases or articles. To use our tool, you need to
            either write or paste your input article into the first box.
          </p>

          <p>
            After that, click the Paraphrase button. Once you submit the
            information, our AI will start analyzing and rewriting the article
            while keeping the original intent identical.
          </p>

          <p>
            When the AI has finished processing, youll be able to see the
            results in the second box. Also, you can copy results by clicking on
            the Copy Result button.
          </p>
        </div>

        <div className="feature">
          <h1>Which is the best paraphrasing tool?</h1>
          <p>
            Our tool is amongst the best online software out there for
            paraphrasing and article & essay rewriting.
          </p>

          <p>
            You can find lots of different paraphrasing tools online. Almost all
            of them are either very poor in the level of quality and accuracy of
            the sentences they generate. Either ask for money or need signup
            before continuing. They are ad-ridden most of the time and do not
            have a good usability experience while using.
          </p>

          <p>
            Most of these online tools rely on simple text synonym replacement,
            hence their low quality. They dont understand the meaning behind the
            sentences entirely.
          </p>

          <p>
            On the other hand, our software uses advanced artificial
            intelligence models that excel at paraphrasing. Our AI models have
            spent countless hours analyzing English phrases. These models
            understand the semantics behind the sentences, due to which they can
            perform a much better job of rewriting.
          </p>
        </div>

        <div className="feature">
          <h1>No signup required</h1>
          <p>
            One of the most common causes of plagiarism is paraphrasing and not
            giving any citations.
          </p>

          <p>
            So, when you rephrase the article and keep the key points as is. One
            way to avoid plagiarism would be to cite the sources appropriately.
          </p>

          <p>
            By following the best practices set by your organization, you should
            be able to avoid plagiarism.
          </p>
        </div>

        <div className="feature">
          <h1>How can you paraphrase without plagiarizing?</h1>
          <p>
            If you copy the information from a source, a good rule of thumb is
            to cite that source. By doing that, you are not trying to take
            credit for someone elses original work.
          </p>

          <p>
            If the person or organization receiving the article or essay has
            provided the criteria regarding paraphrasing. It will be a good idea
            to follow that.
          </p>
        </div>
      </div>
    </Div>
  );
}
