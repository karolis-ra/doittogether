import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../state/events/reducer";
import { registerUser } from "../state/events/reducer";
import { DefaultInput } from "./DefaultInput";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
import { profileFormSelector } from "../state/profileForm/selector";
import { auth } from "../firebase/clientApp";
import { useNavigate } from "react-router";
import { profileSelector } from "../state/profile/selector";

export const QuestionModal = ({ questions, doc_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const { userInfo } = useSelector(profileFormSelector);
  const { user } = useSelector(profileSelector);
  const event_id = doc_id;

  const handleAnswerInput = (e) => {
    const question = e.target.id;
    const answer = e.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSubmitForm = async () => {
    const participant = {};
    participant.event_id = event_id;
    participant.answers = answers;
    participant.id = auth.currentUser.uid;
    participant.email = auth.currentUser.email;
    participant.name = user.name;

    const allQuestionsAnswered = questions.every(
      (question) => answers[question]
    );

    if (allQuestionsAnswered) {
      await dispatch(registerUser(participant));
      dispatch(hideModal());
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      alert("Please answer all questions.");
    }
  };

  const handleBack = () => {
    dispatch(hideModal());
  };

  return (
    <StyledWrapper $flexDirection="column">
      <FlexWrapper $flexDirection="column" $gap="30px">
        {questions.map((singleQ, index) => {
          return (
            <FlexWrapper $flexDirection="column" key={`question-${index}`}>
              <div>{singleQ}</div>
              <DefaultInput id={singleQ} onChange={handleAnswerInput} />
            </FlexWrapper>
          );
        })}
        <FlexWrapper $flexDirection="column">
          <FlexWrapper $flexDirection="column">
            <div>Kontaktai</div>
          </FlexWrapper>

          <DefaultInput id="Kontaktai" onChange={handleAnswerInput} />
          <StyledText>
            *kontaktai bus rodomi tik gavus patvirtinimą prisijungti
            <br /> **kontaktai bus rodomi tik įvykio nariams
          </StyledText>
        </FlexWrapper>
      </FlexWrapper>
      <FlexWrapper $margin="20px 0 0 0 " $gap="20px">
        <SubmitButton color={COLORS.black} width="120px" onClick={handleBack}>
          ATGAL
        </SubmitButton>
        <SubmitButton onClick={handleSubmitForm}>PRISIJUNGTI</SubmitButton>
      </FlexWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(FlexWrapper)`
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: ${COLORS.bgGray};
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

const StyledText = styled.div`
  font-size: 12px;
`;
