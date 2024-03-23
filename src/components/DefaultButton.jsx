import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../styles/colors";

export const DefaultButton = styled(Link)`
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  width:100%;
  text-align: center;
  color: ${(props) =>
    props.$reverse === 1 ? COLORS.saladGreen : COLORS.white};
  font-weight: 600;
  background-color: ${(props) =>
    props.reverse === 1 ? COLORS.white : COLORS.saladGreen};
  align-self: ${(props) => props.alignself || "center"};
  font-size: ${(props) => props.fs};
  margin: ${(props) => props.margin};
  transition: 0.3s; ease-out;
  &:hover {
    background-color: ${(props) =>
      props.reverse === 1 ? COLORS.brown : COLORS.saladGreen};
    color: ${(props) =>
      props.reverse === 1 ? COLORS.saladGreen : COLORS.white};
  }
`;
