import styled from "styled-components";
import { COLORS } from "../styles/colors";

export const SubmitButton = ({
  children,
  type,
  onClick,
  disabled,
  hover,
  color,
  width,
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      color={color}
      hover={hover}
      width={width}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
width: ${(props) => props.width || "100%"};
  background-color: ${(props) => props.color || COLORS.saladGreen};
  color: ${COLORS.white};
  padding: 14px 0;
  border: none;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) => props.hover || COLORS.hoverGreen}};
  }
  &:disabled {
    background-color: ${COLORS.gray};
  }
`;
