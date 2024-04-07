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

export default function CreateEvent() {
  const dispatch = useDispatch();
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
      updatedEvent.questionList = [];
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
    console.log(event);
  };

  const handleQuestionInput = (e) => {
    if (e.target.value.length > 0) {
      setQuestion(e.target.value);
    }
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const target = e.target.question;

    const updatedEvent = event;
    const key = "questionList";
    if (updatedEvent[key]) {
      updatedEvent.questionList.push(question);
    } else {
      updatedEvent[key] = [];
      updatedEvent.questionList.push(question);
    }

    setEvent(updatedEvent);
    setQuestion("");
    target.value = "";
    target.placeholder = "Įrašykite kitą klausimą";
  };

  const handleEventSubmit = () => {
    const requiredFields = [
      "location",
      "date",
      "time_from",
      "time_to",
      "discipline",
      "price",
      "max_members",
      "physical_level",
    ];
    const isValid = requiredFields.every((field) => event[field]);

    if (isValid) {
      setAnswered(true);
      const updatedEvent = { ...event, id: userInfo.id };
      setEvent(updatedEvent);
      dispatch(registerEvent(updatedEvent));
    } else {
      setAnswered(false);
    }
  };

  return (
    <StyledWrap>
      <FlexWrapper
        $flexDirection="column"
        $width="280px"
        $justifyContent="center"
        $margin="0 auto"
        $gap="20px"
        $padding="50px 0"
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
            placeholder="Lokacija"
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
            type="text"
            placeholder="Nuo"
            onChange={handleInputChange}
            required
          />
          <DefaultInput
            id="time_to"
            type="text"
            placeholder="Iki"
            onChange={handleInputChange}
            required
          />
          <StyledSelect
            id="discipline"
            type="text"
            placeholder="Sporto šaka"
            onChange={handleInputChange}
            required
          >
            <option value="" disabled selected hidden>
              Sporto šaka
            </option>
            {!loading &&
              questions[0].variants.map((singleVariant) => {
                return <option value={singleVariant}>{singleVariant}</option>;
              })}
          </StyledSelect>
          <DefaultInput
            id="price"
            type="text"
            placeholder="Kaina"
            onChange={handleInputChange}
            required
          />
          <DefaultInput
            id="max_members"
            type="text"
            placeholder="Dalyvių skaičius"
            onChange={handleInputChange}
            required
          />
          <StyledSelect
            id="physical_level"
            type="text"
            placeholder="Fizinis pasiruošimas"
            onChange={handleInputChange}
            required
          >
            <option value="" disabled selected hidden>
              Fizinis pajėgumas
            </option>
            {!loading &&
              questions[1].variants.map((singleVariant) => {
                return <option value={singleVariant}>{singleVariant}</option>;
              })}
          </StyledSelect>
          {!answered && <StyledDiv>Užpildykite visus laukelius</StyledDiv>}
          <StyledTextArea
            id="info"
            placeholder="Papildoma informacija"
            onChange={handleInputChange}
          ></StyledTextArea>
        </FlexWrapper>

        {!extraQuestions && (
          <SubmitButton type="button" onClick={handleExtraQ}>
            Pridėti klausimyną
          </SubmitButton>
        )}
        {extraQuestions && (
          <form onSubmit={handleSubmitQuestion}>
            <FlexWrapper $flexDirection="column" $gap="20px">
              {event.questionList.length > 0 && (
                <StyledSubtitle>Jūsų klausimai:</StyledSubtitle>
              )}
              {event.questionList &&
                event.questionList.map((singleQ, index) => {
                  return <div>{`${index + 1}. ${singleQ}`}</div>;
                })}
              <DefaultInput
                id="question"
                placeholder="Įrašykite klausimą"
                onChange={handleQuestionInput}
              ></DefaultInput>
              <SubmitButton color={COLORS.darkCreme}>
                Pridėti klausimą
              </SubmitButton>
              <SubmitButton
                onClick={handleSaveQuestions}
                color={COLORS.saladGreen}
              >
                Saugoti
              </SubmitButton>
              <SubmitButton onClick={handleCancelQ} color={COLORS.red}>
                Atšaukti
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
