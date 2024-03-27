import { OptionBlock } from "./OptionBlock";
import { FlexWrapper } from "./FlexWrapper";
import styled from "styled-components";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

export const AnswerBlock = ({ singleQuestion, disciplines }) => {
  const [options, setOption] = useState({});
  const [answers, setAnswers] = useState([]);

  const handleChange = (e, singleQuestion, singleDisc) => {
    const newValue = e.target.value;
    //option uniqueness function
    setOption((prevAnswers) => ({
      ...prevAnswers,
      [singleQuestion.title]: {
        ...prevAnswers[singleQuestion.title],
        [singleDisc]: e.target.value,
      },
    }));

    setAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (answer) =>
          answer.title === singleQuestion.title &&
          answer.discipline === singleDisc
      );

      if (existingIndex !== -1) {
        // If the answer exists, update only that object
        const updatedAnswers = prevAnswers.map((answer, index) => {
          if (index === existingIndex) {
            return {
              ...answer,
              answer: newValue,
            };
          }
          return answer;
        });
        return updatedAnswers;
      } else {
        // If the answer doesn't exist, add a new object to the array
        return [
          ...prevAnswers,
          {
            title: singleQuestion.title,
            discipline: singleDisc,
            answer: newValue,
          },
        ];
      }
    });
    console.log(answers);
    // const updatedAnswers = {};
    // updatedAnswers.title = singleQuestion.title;
    // updatedAnswers.discipline = singleDisc;
    // updatedAnswer.answer = e.target.value;
  };

  return (
    <FlexWrapper $flexDirection="column" $width="100%">
      <StyledTitle>{singleQuestion.title}</StyledTitle>
      {disciplines.map((singleDisc, index) => {
        const selected = options[singleQuestion.title]?.[singleDisc];
        return (
          <FlexWrapper $flexDirection="column" key={index}>
            <StyledSubtitle>{singleDisc}</StyledSubtitle>
            <FlexWrapper $flexDirection="column">
              {singleQuestion.variants.map((singleVariant, variantIndex) => (
                <OptionBlock
                  key={variantIndex}
                  selected={selected}
                  handleChange={(e) =>
                    handleChange(e, singleQuestion, singleDisc)
                  }
                  type="radio"
                  id={`${singleDisc}-${variantIndex}`}
                  value={singleVariant}
                >
                  {singleVariant}
                </OptionBlock>
              ))}
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
