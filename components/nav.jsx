import Link from "next/link";
import styled from "styled-components";
import logo from "../components/images/inktoollogo.png";
import Image from "next/image";

let Navigation = styled.nav`
  padding: 20px 10% !important;
  align-items: center;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;

  .links {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    width: 100%;
    background-color: #333333;
    a {
      color: black;
      text-decoration: none;
      width: 180px;
      text-align: center;
      padding: 5px 10px;
      transition: all 0.3s ease-in-out;
      border-bottom: 1px solid green;
      border-color: transparent;
      margin: 1rem;
      color: #b9b9b9;
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

let Nav = () => {
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
        <Link href="/citate">Citate</Link>
        <Link href="/paraphrase">Paraphrase</Link>
        <Link href="/grammar-check">Grammar</Link>
      </div>
    </Navigation>
  );
};

export default Nav;
