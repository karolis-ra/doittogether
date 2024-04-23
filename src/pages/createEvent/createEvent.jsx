import { useSelector, useDispatch } from "react-redux";
import { profileFormSelector } from "../../state/profileForm/selector";
import styled from "styled-components";
import { FlexWrapper } from "../../components/FlexWrapper";
import { DefaultInput } from "../../components/DefaultInput";
import { fetchQuestions } from "../../state/profileForm/reducer";
import { useState } from "react";
import { SubmitButton } from "../../components/SubmitButton";
import { useEffect } from "react";
import { registerEvent } from "../../state/events/reducer";
import { COLORS } from "../../styles/colors";
import { useNavigate } from "react-router";
import { Image } from "../../components/Image";
import { auth } from "../../firebase/clientApp";

export default function CreateEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [extraQuestions, setExtraQuestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState(true);

  const { questions, userInfo } = useSelector(profileFormSelector);

  useEffect(() => {
    dispatch(fetchQuestions())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  const handleExtraQ = () => {
    setExtraQuestions(true);
  };

  const handleCancelQ = () => {
    const updatedEvent = event;
    if (updatedEvent.questionList) {
      updatedEvent.questionList = null;
      setQuestion("");
      setEvent(updatedEvent);
      setExtraQuestions(false);
    } else {
      setQuestion("");
      setExtraQuestions(false);
    }
  };

  const handleSaveQuestions = () => {
    setExtraQuestions(false);
  };

  const handleInputChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    const updatedEvent = event;

    updatedEvent[key] = value;
    setEvent(updatedEvent);
  };

  const handleQuestionInput = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const target = e.target.question;

    const updatedEvent = event;
    const key = "questionList";
    if (updatedEvent[key] && question.length > 0) {
      updatedEvent.questionList.push(question);
    } else {
      if (question.length > 0) {
        updatedEvent[key] = [];
        updatedEvent.questionList.push(question);
      }
    }

    setEvent(updatedEvent);
    setQuestion("");
    target.value = "";
    target.placeholder = "Įrašykite klausimą";
  };

  const handleEventSubmit = () => {
    const requiredFields = [
      "location",
      "date",
      "time_from",
      "discipline",
      "price",
      "physical_level",
      "info",
    ];
    const isValid = requiredFields.every((field) => event[field]);

    if (isValid) {
      setAnswered(true);
      const updatedEvent = { ...event, id: auth.currentUser.uid };
      setEvent(updatedEvent);
      dispatch(registerEvent(updatedEvent));
      navigate("/home");
    } else {
      setAnswered(false);
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <StyledWrap>
      <FlexWrapper
        $justifyContent="flex-start"
        $alignItems="center"
        $gap="5px"
        $padding="10px 0 0 20px"
        $cursor="pointer"
        onClick={handleBack}
      >
        <Image
          src="./images/arrow-back.png"
          $width="20px"
          $margin="-5px 0 0 0"
        />
        <StyledSubtitle>atgal</StyledSubtitle>
      </FlexWrapper>
      <FlexWrapper
        $flexDirection="column"
        $width="280px"
        $justifyContent="center"
        $margin="0 auto"
        $gap="20px"
        $padding="20px 0"
      >
        <StyledSubtitle>Naujas įvykis</StyledSubtitle>
        <FlexWrapper
          $flexDirection="column"
          $gap="20px"
          $maxHeight={extraQuestions && "0px"}
          $overflow={extraQuestions && "hidden"}
        >
          <DefaultInput
            id="location"
            type="text"
            placeholder="Miestas"
            onChange={handleInputChange}
            required
          />
          <DefaultInput
            id="date"
            type="date"
            placeholder="Data"
            onChange={handleInputChange}
            required
          />
          <DefaultInput
            id="time_from"
            type="time"
            placeholder="Nuo"
            onChange={handleInputChange}
            required
          />

          <StyledSelect
            id="discipline"
            defaultValue="" // Set the defaultValue to an empty string or the default value you prefer
            onChange={handleInputChange}
            required
          >
            <option value="" disabled hidden>
              Sporto šaka
            </option>
            {!loading &&
              questions[0].variants.map((singleVariant) => {
                return (
                  <option key={singleVariant} value={singleVariant}>
                    {singleVariant}
                  </option>
                );
              })}
          </StyledSelect>
          <DefaultInput
            id="price"
            type="text"
            placeholder="Kaina"
            onChange={handleInputChange}
            required
          />
          {/* <DefaultInput
            id="max_members"
            type="text"
            placeholder="Dalyvių skaičius"
            onChange={handleInputChange}
            required
          /> */}
          <StyledSelect
            id="physical_level"
            defaultValue="" // Set the defaultValue to an empty string or the default value you prefer
            onChange={handleInputChange}
            required
          >
            <option value="" disabled hidden>
              Fizinis parengtumas
            </option>
            {!loading &&
              questions[1].variants.map((singleVariant) => {
                return (
                  <option key={singleVariant} value={singleVariant}>
                    {singleVariant}
                  </option>
                );
              })}
          </StyledSelect>
          <StyledTextArea
            id="info"
            placeholder="Papildoma informacija"
            onChange={handleInputChange}
          ></StyledTextArea>
        </FlexWrapper>
        {!answered && <StyledDiv>Užpildykite visus laukelius</StyledDiv>}
        {!extraQuestions && (
          <SubmitButton type="button" onClick={handleExtraQ}>
            {event.questionList ? "Papildyti " : "Pridėti "} klausimyną
          </SubmitButton>
        )}
        {extraQuestions && (
          <form onSubmit={handleSubmitQuestion}>
            <FlexWrapper $flexDirection="column" $gap="20px">
              {event.questionList && (
                <StyledSubtitle>Jūsų klausimai:</StyledSubtitle>
              )}
              {event.questionList &&
                event.questionList.map((singleQ, index) => {
                  return <div key={index}>{`${index + 1}. ${singleQ}`}</div>;
                })}
              <DefaultInput
                id="question"
                placeholder="Įrašykite klausimą"
                onChange={handleQuestionInput}
              ></DefaultInput>
              <SubmitButton color={COLORS.darkCreme} hover={COLORS.brown}>
                Pridėti klausimą
              </SubmitButton>
              <SubmitButton
                onClick={handleSaveQuestions}
                color={COLORS.saladGreen}
              >
                Saugoti
              </SubmitButton>
              <SubmitButton
                onClick={handleCancelQ}
                color={COLORS.red}
                hover={COLORS.redHover}
              >
                Trinti
              </SubmitButton>
            </FlexWrapper>
          </form>
        )}
        {!extraQuestions && (
          <SubmitButton type="submit" onClick={handleEventSubmit}>
            Sukurti įvykį
          </SubmitButton>
        )}
      </FlexWrapper>
    </StyledWrap>
  );
}

const StyledSubtitle = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  text-align: center;
`;

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  border: none;
  border-bottom: 1px solid ${COLORS.gray};
  padding: 10px;
  font-size: 16px;
  color: ${COLORS.gray};
  &:focus {
    border: none;
    border-bottom: 1px solid ${COLORS.gray};
  }
`;

const StyledTextArea = styled.textarea`
  max-width: 280px;
  min-width: 280px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid ${COLORS.gray}
  &:placeholder {
    font-size: 16px;
  }
`;

const StyledDiv = styled.div`
  color: ${COLORS.red};
  font-size: 12px;
`;
