import { useSelector, useDispatch } from "react-redux";
import { profileFormSelector } from "../../state/profileForm/selector";
import styled from "styled-components";
import { FlexWrapper } from "../../components/FlexWrapper";
import { DefaultInput } from "../../components/DefaultInput";
import { fetchQuestions } from "../../state/profileForm/reducer";
import { useState } from "react";
import { SubmitButton } from "../../components/SubmitButton";
import { useEffect } from "react";

export default function CreateEvent() {
  const dispatch = useDispatch();
  const [extraQuestions, setExtraQuestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [question, setQuestion] = useState("");
  const { questions } = useSelector(profileFormSelector);

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
    setQuestion(e.target.value);
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
    target.placeholder = "Pridekite kitą klausimą";
  };

  return (
    <FlexWrapper $flexDirection="column">
      <StyledSubtitle>Naujas įvykis</StyledSubtitle>
      <DefaultInput
        id="location"
        type="text"
        placeholder="Lokacija"
        onChange={handleInputChange}
      />
      <DefaultInput
        id="date"
        type="date"
        placeholder="Data"
        onChange={handleInputChange}
      />
      <DefaultInput
        id="time_from"
        type="text"
        placeholder="Nuo"
        onChange={handleInputChange}
      />
      <DefaultInput
        id="time_to"
        type="text"
        placeholder="Iki"
        onChange={handleInputChange}
      />
      <select
        id="discipline"
        type="text"
        placeholder="Sporto šaka"
        onChange={handleInputChange}
      >
        {!loading &&
          questions[0].variants.map((singleVariant) => {
            return <option value={singleVariant}>{singleVariant}</option>;
          })}
      </select>
      <DefaultInput
        id="price"
        type="text"
        placeholder="Kaina"
        onChange={handleInputChange}
      />
      <DefaultInput
        id="max_members"
        type="text"
        placeholder="Dalyvių skaičius"
        onChange={handleInputChange}
      />
      <select
        id="physical_level"
        type="text"
        placeholder="Fizinis pasiruošimas"
        onChange={handleInputChange}
      >
        {!loading &&
          questions[1].variants.map((singleVariant) => {
            return <option value={singleVariant}>{singleVariant}</option>;
          })}
      </select>
      <textarea
        id="info"
        placeholder="Papildoma informacija"
        onChange={handleInputChange}
      ></textarea>
      {!extraQuestions && (
        <button onClick={handleExtraQ}>Pridėti klausimyną</button>
      )}
      {extraQuestions && (
        <form onSubmit={handleSubmitQuestion}>
          <FlexWrapper $flexDirection="column">
            <DefaultInput
              id="question"
              placeholder="Įrašykite klausimą"
              onChange={handleQuestionInput}
            ></DefaultInput>
            <button>Pridėti klausimą</button>
            <button onClick={handleCancelQ}>Ištrinti klausimyną</button>
          </FlexWrapper>
        </form>
      )}
      <SubmitButton>Sukurti įvykį</SubmitButton>
    </FlexWrapper>
  );
}

const StyledSubtitle = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
`;
