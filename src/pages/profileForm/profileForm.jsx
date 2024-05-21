import styled from "styled-components";
import { CenterWrap } from "../../components/CenterWrap";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../state/profileForm/reducer";
import { profileFormSelector } from "../../state/profileForm/selector";
import { FlexWrapper } from "../../components/FlexWrapper";
import { useState } from "react";
import { OptionBlock } from "../../components/OptionBlock";
import { AnswerBlock } from "../../components/AnswerBlock";
import { DefaultInput } from "../../components/DefaultInput";
import { SubmitButton } from "../../components/SubmitButton";

export const ProfileForm = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [gender, setGender] = useState("vyras");

  const handleGenderSelection = (e) => {
    setGender(e.target.value);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
    dispatch(fetchQuestions());
  }, []);

  const { questions } = useSelector(profileFormSelector);

  const handleInputOption = (e) => {
    const value = e.target.value;
    const discIndex = disciplines.indexOf(value);
    if (discIndex !== -1) {
      const updatedDisciplines = [...disciplines];
      updatedDisciplines.splice(discIndex, 1);
      setDisciplines(updatedDisciplines);
    } else {
      let updatedDisciplines = [...disciplines];
      updatedDisciplines.push(value);
      setDisciplines(updatedDisciplines);
    }
  };

  return (
    <CenterWrap>
      <FlexWrapper
        $flexDirection="column"
        $margin="0 auto"
        $alignItems="center"
        $maxWidth="480px"
        $gap="30px"
      >
        {questions.map((singleQuestion, index) => {
          if (index === 0) {
            return (
              <FlexWrapper
                key={index}
                $width="100%"
                $alignItems="center"
                $flexDirection="column"
              >
                <StyledTitle>{singleQuestion.title}</StyledTitle>
                {singleQuestion.variants.map((variant, index) => {
                  return (
                    <label key={index}>
                      <input
                        key={variant}
                        type="checkbox"
                        id={variant}
                        value={variant}
                        onClick={handleInputOption}
                      />
                      {variant}
                    </label>
                  );
                })}
              </FlexWrapper>
            );
          }
          {
            if (
              (index === 1 || index === 2 || index === 3) &&
              disciplines.length > 0
            ) {
              return (
                <AnswerBlock
                  key={index}
                  singleQuestion={singleQuestion}
                  disciplines={disciplines}
                />
              );
            }
          }
        })}
        <FlexWrapper $flexDirection="column" $width="100%">
          <StyledTitle>Asmeninė informacija</StyledTitle>
          <StyledSubtitle>Lytis</StyledSubtitle>
          <FlexWrapper>
            <label>
              <input
                type="radio"
                value="vyras"
                checked={gender === "vyras"}
                onClick={handleGenderSelection}
                readOnly
              />
              Vyras
            </label>
            <label>
              <input
                type="radio"
                value="moteris"
                checked={gender === "moteris"}
                onClick={handleGenderSelection}
                readOnly
              />
              Moteris
            </label>
          </FlexWrapper>
          <FlexWrapper $flexDirection="column">
            <StyledSubtitle>Amžius</StyledSubtitle>
            <DefaultInput type="number" id="age" placeholder="Amžius" />
          </FlexWrapper>
          <FlexWrapper $flexDirection="column">
            <StyledSubtitle>Miestas</StyledSubtitle>
            <DefaultInput type="string" id="city" placeholder="Miestas" />
          </FlexWrapper>
          <SubmitButton>Pateikti</SubmitButton>
        </FlexWrapper>
      </FlexWrapper>
    </CenterWrap>
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
