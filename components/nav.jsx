import Link from "next/link";
import styled from "styled-components";
import logo from "../components/images/inktoollogo.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

let Navigation = styled.nav`
  padding: 20px 10% !important;
  align-items: center;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;

  .links {
    margin-top: 3rem;
    display: flex;
    justify-content: space-around;
    width: 100%;
    background-color: #a9d191;
    border: 4px solid #62744c;

    a {
      color: black;
      text-decoration: none;
      width: 100%;
      text-align: center;
      padding: 5px 10px;
      transition: all 0.3s ease-in-out;
      border-bottom: 1px solid green;
      border-color: transparent;
      padding: 1rem;
      color: #e1ffce;
      font-size: 1.5rem;
      font-weight: bold;
      width: 100%;
      /* background-color: green; */
      &:hover {
        color: white;
      }
    }
  }

  .img-container {
    width: 250px;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    .links {
      display: flex;
      align-items: center;
      flex-flow: column;

      a {
        margin-bottom: 1rem;
      }
    }
  }
`;

let Navlink = styled.div`
  padding: 20px 0px !important;
  width: 33.33%;
  text-align: center;
`;

let Nav = () => {
  const router = useRouter();
  const [link, setlink] = useState("");
  useEffect(() => {
    if (router.pathname) {
      setlink(router.pathname);
    }
  }, [router]);
  return (
    <Navigation>
      <div className="img-container">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <div className="texts">
        <h1>FOR THE DROPKICKS</h1>
      </div>

      <div className="links">
        <Navlink
          style={
            link == "/citate"
              ? { backgroundColor: "#62744c" }
              : { backgroundColor: "#a9d191" }
          }
        >
          <Link href="/citate">Citate</Link>
        </Navlink>

        <Navlink
          style={
            link == "/paraphrase"
              ? { backgroundColor: "#62744c" }
              : { backgroundColor: "#a9d191" }
          }
        >
          <Link href="/paraphrase">Paraphrase</Link>
        </Navlink>
        <Navlink
          style={
            link == "/grammar-check"
              ? { backgroundColor: "#62744c" }
              : { backgroundColor: "#a9d191" }
          }
        >
          <Link href="/grammar-check">Grammar</Link>
        </Navlink>
      </div>
    </Navigation>
  );
};

export default Nav;
