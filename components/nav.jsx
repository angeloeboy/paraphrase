import Link from "next/link";
import styled from "styled-components";
import logo from "../components/images/inktoollogo.png";
import Image from "next/image";

let Navigation = styled.nav`
  padding: 20px 10% !important;
  align-items: center;
  display: flex;
  justify-content: space-between;

  a {
    color: black;
    margin-right: 1rem;
    text-decoration: none;
    background-color: #90ff90;
    padding: 5px 10px;

    transition: all 0.3 ease-in-out;

    &:hover {
      background-color: #5bfd5b;
    }
  }

  .img-container {
    width: 50px;
  }

  @media (max-width: 550px) {
    flex-direction: column;

    .links {
      margin-top: 1rem;
      display: flex;
      align-items: center;
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

      <div className="links">
        <Link href="/citate">Citate</Link>
        <Link href="/paraphrase">Paraphrase</Link>
        <Link href="/grammar-check">Grammar Checking</Link>
      </div>
    </Navigation>
  );
};

export default Nav;
