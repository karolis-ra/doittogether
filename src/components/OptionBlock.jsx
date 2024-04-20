import { FlexWrapper } from "./FlexWrapper";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { StyledRadio } from "./StyledRadio";
export const OptionBlock = ({
  index,
  type,
  id,
  value,
  children,
  selected,
  handleChange,
}) => {
  return (
    <FlexWrapper
      $border="1px solid gray"
      $width="220px"
      $padding="14px 8px"
      $borderRadius="5px"
      $gap="10px"
    >
      <StyledRadio
        type="radio"
        value={value}
        id={id}
        checked={value === selected}
        onChange={handleChange}
      />
      <label>{children}</label>
    </FlexWrapper>
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
