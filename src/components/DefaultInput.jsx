import styled from "styled-components";
import { COLORS } from "../styles/colors";

export const DefaultInput = ({ id, type, placeholder, onChange }) => {
  return (
    <StyledInput
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid ${COLORS.gray};
  padding: 10px;
  font-size: 16px;
  &:focus {
    border: none;
    border-bottom: 1px solid ${COLORS.gray};
  }
`;
