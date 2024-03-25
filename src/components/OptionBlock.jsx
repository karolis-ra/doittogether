import { FlexWrapper } from "./FlexWrapper";
import { useState } from "react";

export const OptionBlock = ({
  index,
  key,
  type,
  id,
  value,
  children,
  selected,
  handleChange,
}) => {
  return (
    <FlexWrapper>
      <label>
        <input
          type="radio"
          value={value}
          id={id}
          checked={value === selected}
          onChange={handleChange}
        />
        {children}
      </label>
    </FlexWrapper>
  );
};
