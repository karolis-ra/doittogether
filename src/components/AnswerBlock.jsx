import { OptionBlock } from "./OptionBlock";
import { FlexWrapper } from "./FlexWrapper";
import styled from "styled-components";
import { useState } from "react";
import { setUserActivities, setCqIndex } from "../state/profileForm/reducer";
import { useDispatch, useSelector } from "react-redux";
import { AnswerBtn } from "./AnswerBtn";
import { SubmitButton } from "./SubmitButton";

export const AnswerBlock = ({ singleQuestion, disciplines }) => {
  const [options, setOption] = useState({});
  const [cont, setCont] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e, singleQuestion, discipline) => {
    let user_answer = {};
    user_answer.title = singleQuestion.title;
    user_answer.discipline = discipline;
    user_answer.value = e.target.value;
    dispatch(setUserActivities(user_answer));

    //option uniqueness function
    setOption((prevAnswers) => ({
      ...prevAnswers,
      [singleQuestion.title]: {
        ...prevAnswers[singleQuestion.title],
        [discipline]: e.target.value,
      },
    }));
    const selectedDisciplines = Object.keys(
      options[singleQuestion.title] || {}
    );

    setCont(
      selectedDisciplines.length + 1 === disciplines.length ||
        selectedDisciplines.length === disciplines.length
    );
  };

  const handleAnswer = () => {
    dispatch(setCqIndex(1));
  };

  return (
    <FlexWrapper $flexDirection="column" $width="100%" $margin="0 0 -10px 0">
      <StyledTitle>{singleQuestion.title}</StyledTitle>
      {disciplines.map((singleDisc, index) => {
        const selected = options[singleQuestion.title]?.[singleDisc];
        return (
          <FlexWrapper $flexDirection="column" key={index} $margin="0 0 25px 0">
            <StyledSubtitle>{singleDisc}</StyledSubtitle>
            <FlexWrapper $flexDirection="column" $gap="15px">
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
      <SubmitButton
        disabled={!cont}
        onClick={handleAnswer}
        $margin="30px 0 0 0"
      >
        PATEIKTI
      </SubmitButton>
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
