import styled from "styled-components";
import { COLORS } from "../styles/colors";

export const DefaultInput = ({ id, type, placeholder, onChange, required }) => {
  return (
    <StyledInput
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
};

const StyledInput = styled.input`
  background-color: #f2f2f2;
  border: none;
  border-bottom: 1px solid ${COLORS.gray};
  padding: 10px;
  font-size: 16px;
  &:focus {
    border: none;
    border-bottom: 1px solid ${COLORS.gray};
  }
`;
