import styled from "styled-components";
import { COLORS } from "../styles/colors";

export const StyledRadio = ({ type, value, id, checked, onChange }) => {
  return (
    <StyledInput
      type={type}
      value={value}
      id={id}
      checked={checked}
      onChange={onChange}
    />
  );
};

const StyledInput = styled.input`
  appearance: none;
  background-color: #fff;
  font: inherit;
  color: currentColor;
  border: 1px solid ${COLORS.gray};
  width: 15px;
  height: 15px;
  border-radius: 50%;
  &:checked {
    background-color: ${COLORS.saladGreen};
    outline: max(2px, 2px) solid ${COLORS.gray};
    outline-offset: max(2px, 2px);
  }
`;
