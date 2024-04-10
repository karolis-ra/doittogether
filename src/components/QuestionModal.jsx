import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { useDispatch } from "react-redux";
import { hideModal } from "../state/events/reducer";
import { Image } from "./Image";
import { DefaultInput } from "./DefaultInput";

export const QuestionModal = ({ questions }) => {
  const dispatch = useDispatch();
  console.log(questions);
  const answers = {};
  const handleAnswerInput = (e) => {
    const question = e.target.id;
    const answer = e.target.value;
    answers[question] = answer;
  };

  const handleBack = () => {
    dispatch(hideModal());
  };

  return (
    <StyledWrapper $flexDirection="column">
      <FlexWrapper
        $justifyContent="flex-start"
        $alignItems="center"
        $gap="5px"
        $padding="10px 0 0 20px"
        $cursor="pointer"
        onClick={handleBack}
      >
        <Image
          src="./images/arrow-back.PNG"
          $width="20px"
          $margin="-5px 0 0 0"
        />
        <StyledSubtitle>atgal</StyledSubtitle>
      </FlexWrapper>
      <FlexWrapper $flexDirection="column" $gap="30px">
        {questions.map((singleQ, index) => {
          return (
            <FlexWrapper $flexDirection="column" key={`question-${index}`}>
              <div>{singleQ}</div>
              <DefaultInput id={singleQ} onChange={handleAnswerInput} />
            </FlexWrapper>
          );
        })}
      </FlexWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(FlexWrapper)`
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: ${COLORS.saladGreen};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  overflow: scroll;
  justify-content: center;
  align-items: center;
`;

const StyledSubtitle = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  text-align: center;
`;
