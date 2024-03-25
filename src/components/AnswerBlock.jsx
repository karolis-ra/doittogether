import { OptionBlock } from "./OptionBlock";
import { FlexWrapper } from "./FlexWrapper";
import styled from "styled-components";
import { useState } from "react";
export const AnswerBlock = ({ singleQuestion, disciplines }) => {
  const [selected, setSelected] = useState();
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <FlexWrapper $flexDirection="column">
      <StyledTitle>{singleQuestion.title}</StyledTitle>
      {disciplines.map((singleDisc) => {
        return (
          <FlexWrapper $flexDirection="column">
            <StyledSubtitle>{singleDisc}</StyledSubtitle>
            <FlexWrapper $flexDirection="column">
              {singleQuestion.variants.map((singleVariant, index) => {
                return (
                  <OptionBlock
                    selected={selected}
                    handleChange={handleChange}
                    key={index}
                    type="radio"
                    id={singleVariant}
                    value={singleVariant}
                  >
                    {singleVariant}
                  </OptionBlock>
                );
              })}
            </FlexWrapper>
          </FlexWrapper>
        );
      })}
    </FlexWrapper>
  );
};

const StyledTitle = styled.div`
  padding-bottom: 20px;
  font-weight: 600;
  color: #000;
  font-size: 24px;
`;

const StyledSubtitle = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
`;
