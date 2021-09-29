import styled from "styled-components";

const Div = styled.div`
  width: 300px;
  background-color: #ffffff;
  box-shadow: 0px 11px 41px 4px rgba(142, 142, 142, 0.75);
  text-align: center;
  padding: 2rem !important;
  border-radius: 0.5rem;
`;

let Success = (props) => {
  return (
    <Div>
      <p>{props.text ? props.text : "Success!"}</p>
    </Div>
  );
};

export default Success;
