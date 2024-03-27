import styled from "styled-components";
import { COLORS } from "../styles/colors";

export const SubmitButton = ({ children, type, onClick }) => {
  return <StyledButton type={type} onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  background-color: ${COLORS.saladGreen};
  color: ${COLORS.white};
  padding: 14px 0;
  border: none;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: ${COLORS.hoverGreen};
  }
`;
