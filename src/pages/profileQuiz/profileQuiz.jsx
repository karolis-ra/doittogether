import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileFormSelector } from "../../state/profileForm/selector";
import { loginSelector } from "../../state/login/selector";
import { fetchQuestions } from "../../state/profileForm/reducer";
import { CenterWrap } from "../../components/CenterWrap";
import { FlexWrapper } from "../../components/FlexWrapper";
import { AnswerBlock } from "../../components/AnswerBlock";
import { Navigate } from "react-router";
import {
  setUserGender,
  setUserAgeCity,
  setCqIndex,
  setQuizDone,
  setUserPersonalInfo,
} from "../../state/profileForm/reducer";
import styled from "styled-components";
import { AnswerBtn } from "../../components/AnswerBtn";
import { COLORS } from "../../styles/colors";
import { SubmitButton } from "../../components/SubmitButton";
import { StyledRadio } from "../../components/StyledRadio";

export const ProfileQuiz = () => {
  const [answered, setAnswered] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [cont, setCont] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const { questions, cqIndex, userInfo } = useSelector(profileFormSelector);

  const { loggedInUser } = useSelector(loginSelector);

  const handleAnswer = () => {
    setAnswered([...answered, cqIndex]);
    if (cont) {
      dispatch(setCqIndex(1));
      setCont(false);
    }

    if (cqIndex + 1 === questions.length) {
      dispatch(setUserPersonalInfo(loggedInUser));
    }
  };

  const handleBack = () => {
    setAnswered([...answered, cqIndex]);
    dispatch(setCqIndex(-1));
    setCont(true);
  };

  const handleInputOption = (e) => {
    const value = e.target.value;
    const discIndex = disciplines.indexOf(value);
    if (value) {
      if (discIndex !== -1) {
        const updatedDisciplines = [...disciplines];
        updatedDisciplines.splice(discIndex, 1);
        setDisciplines(updatedDisciplines);
        if (updatedDisciplines.length === 0) {
          setCont(false);
        }
      } else {
        let updatedDisciplines = [...disciplines];
        updatedDisciplines.push(value);
        setDisciplines(updatedDisciplines);
        setCont(true);
      }
    }
  };

  const handleGenderChange = (value) => {
    setCont(true);
    setSelectedGender(value);
    dispatch(setUserGender(value));
  };

  const handleCityAge = (e, title) => {
    const user_answer = {};
    user_answer.value = e.target.value;
    user_answer.title = title;
    dispatch(setUserAgeCity(user_answer));
    setCont(true);
  };

  if (userInfo.quizDone) {
    return <Navigate to="/home" />;
  }

  return (
    <CenterWrap>
      <FlexWrapper
        $flexDirection="column"
        $margin="0 auto"
        $alignItems="center"
        $maxWidth="480px"
        $gap="30px"
      >
        {cqIndex < questions.length && (
          <>
            <FlexWrapper
              key={cqIndex}
              $width="100%"
              $alignItems="center"
              $flexDirection="column"
              $gap="15px"
            >
              {cqIndex === 0 && (
                <>
                  <StyledTitle>{questions[cqIndex].title}</StyledTitle>
                  {questions[cqIndex].variants.map((variant, index) => {
                    return (
                      <FlexWrapper
                        $border="1px solid gray"
                        $width="220px"
                        $padding="14px 8px"
                        $borderRadius="5px"
                        $gap="10px"
                      >
                        <StyledInput
                          key={variant}
                          type="checkbox"
                          id={variant}
                          value={variant}
                          onClick={handleInputOption}
                          defaultChecked={disciplines.includes(variant)}
                        />
                        <label key={index}>{variant}</label>
                      </FlexWrapper>
                    );
                  })}
                </>
              )}
              {cqIndex >= 1 && cqIndex <= 3 && (
                <>
                  {
                    <AnswerBlock
                      singleQuestion={questions[cqIndex]}
                      disciplines={disciplines}
                    />
                  }
                </>
              )}
              {cqIndex === 4 && (
                <>
                  {
                    <FlexWrapper
                      $flexDirection="column"
                      $alignSelf="flex-start"
                      $gap="20px"
                    >
                      <StyledSubtitle>
                        {questions[cqIndex].title}
                      </StyledSubtitle>
                      {questions[cqIndex].variants.map(
                        (singleVariant, index) => {
                          return (
                            <FlexWrapper
                              $border="1px solid gray"
                              $width="220px"
                              $padding="14px 8px"
                              $borderRadius="5px"
                              gap="10px"
                            >
                              <StyledRadioInput
                                type="radio"
                                name="gender"
                                value={singleVariant}
                                onChange={(e) =>
                                  handleGenderChange(e.target.value)
                                }
                              />
                              <label key={index}>{singleVariant}</label>
                            </FlexWrapper>
                          );
                        }
                      )}
                    </FlexWrapper>
                  }
                </>
              )}
              {cqIndex >= 5 && cqIndex <= 6 && (
                <>
                  {
                    <FlexWrapper $flexDirection="column">
                      <StyledSubtitle>
                        {questions[cqIndex].title}
                      </StyledSubtitle>
                      <StyledAgeCityInput
                        onChange={(e) =>
                          handleCityAge(e, questions[cqIndex].title)
                        }
                        key={questions[cqIndex].title}
                        id={questions[cqIndex].title}
                        type={
                          questions[cqIndex].title === "Amžius"
                            ? "number"
                            : "text"
                        }
                        maxLength={
                          questions[cqIndex].title === "Amžius" ? "2" : "15"
                        }
                      />
                    </FlexWrapper>
                  }
                </>
              )}
            </FlexWrapper>
            <FlexWrapper $width="220px" $flexDirection="column" $gap="20px">
              {[0, 4, 5, 6].includes(cqIndex) && (
                <SubmitButton onClick={handleAnswer} disabled={!cont}>
                  PATEIKTI
                </SubmitButton>
              )}
              <SubmitButton onClick={handleBack} disabled={cqIndex === 0}>
                ATGAL
              </SubmitButton>
            </FlexWrapper>
          </>
        )}
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

const StyledInput = styled.input`
  appearance: none;
  width: 15px;
  border: 1px solid ${COLORS.gray};
  border-radius: 5px;
  &:checked {
    background-color: ${COLORS.saladGreen};
    border: none;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }
`;

const StyledRadioInput = styled.input`
  appearance: none;
  background-color: #fff;
  font: inherit;
  color: currentColor;
  border: 1px solid ${COLORS.gray};
  width: 15px;
  height: 15px;
  border-radius: 50%;
  &:checked {
    background-color: ${COLORS.saladGreen};
    outline: max(2px, 2px) solid ${COLORS.gray};
    outline-offset: max(2px, 2px);
  }
`;

const StyledAgeCityInput = styled.input`
  border: none;
  border-bottom: 1px solid ${COLORS.gray};
  padding: 10px;
  font-size: 16px;
  &:focus {
    border: none;
    border-bottom: 1px solid ${COLORS.gray};
  }
`;
