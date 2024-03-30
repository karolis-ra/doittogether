import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileFormSelector } from "../../state/profileForm/selector";
import { fetchQuestions } from "../../state/profileForm/reducer";
import { CenterWrap } from "../../components/CenterWrap";
import { FlexWrapper } from "../../components/FlexWrapper";
import { AnswerBlock } from "../../components/AnswerBlock";
import { setUserGender, setUserAgeCity } from "../../state/profileForm/reducer";
import styled from "styled-components";

export const ProfileQuiz = () => {
  const [answered, setAnswered] = useState([]);
  const [cqIndex, setCurrentQuestionIndex] = useState(0);
  const [disciplines, setDisciplines] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const { questions, userInfo } = useSelector(profileFormSelector);

  const handleAnswer = () => {
    setAnswered([...answered, cqIndex]);
    setCurrentQuestionIndex(cqIndex + 1);
  };

  const handleBack = () => {
    setAnswered([...answered, cqIndex]);
    setCurrentQuestionIndex(cqIndex - 1);
  };

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

  const handleGenderChange = (value) => {
    setSelectedGender(value);
    dispatch(setUserGender(value));
  };

  const handleCityAge = (e, title) => {
    const user_answer = {};
    user_answer.value = e.target.value;
    user_answer.title = title;
    dispatch(setUserAgeCity(user_answer));
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
        {cqIndex < questions.length && (
          <FlexWrapper
            key={cqIndex}
            $width="100%"
            $alignItems="center"
            $flexDirection="column"
          >
            {cqIndex === 0 && (
              <>
                <StyledTitle>{questions[cqIndex].title}</StyledTitle>
                {questions[cqIndex].variants.map((variant, index) => {
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
                  <FlexWrapper>
                    <StyledSubtitle>{questions[cqIndex].title}</StyledSubtitle>
                    {questions[cqIndex].variants.map((singleVariant, index) => {
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="gender"
                            value={singleVariant}
                            onChange={(e) => handleGenderChange(e.target.value)}
                          />
                          {singleVariant}
                        </label>
                      );
                    })}
                  </FlexWrapper>
                }
              </>
            )}

            {cqIndex >= 5 && cqIndex <= 6 && (
              <>
                {
                  <FlexWrapper>
                    <StyledSubtitle>{questions[cqIndex].title}</StyledSubtitle>
                    <input
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

            <button onClick={handleAnswer}>Submit Answer</button>
            <button onClick={handleBack}>back</button>
          </FlexWrapper>
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
