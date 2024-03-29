import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileFormSelector } from "../../state/profileForm/selector";
import { fetchQuestions } from "../../state/profileForm/reducer";
import { CenterWrap } from "../../components/CenterWrap";
import { FlexWrapper } from "../../components/FlexWrapper";
import { AnswerBlock } from "../../components/AnswerBlock";
import styled from "styled-components";

export const ProfileQuiz = () => {
  const [answered, setAnswered] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [disciplines, setDisciplines] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const { questions } = useSelector(profileFormSelector);

  const handleAnswer = () => {
    setAnswered([...answered, currentQuestionIndex]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBack = () => {
    setAnswered([...answered, currentQuestionIndex]);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
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
    console.log(disciplines);
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
        {currentQuestionIndex < questions.length && (
          <FlexWrapper
            key={currentQuestionIndex}
            $width="100%"
            $alignItems="center"
            $flexDirection="column"
          >
            {currentQuestionIndex === 0 && (
              <>
                <StyledTitle>
                  {questions[currentQuestionIndex].title}
                </StyledTitle>
                {questions[currentQuestionIndex].variants.map(
                  (variant, index) => {
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
                  }
                )}
              </>
            )}
            {currentQuestionIndex >= 1 && currentQuestionIndex <= 3 && (
              <>
                {
                  <AnswerBlock
                    singleQuestion={questions[currentQuestionIndex]}
                    disciplines={disciplines}
                  />
                }
              </>
            )}

            {currentQuestionIndex === 4 && (
              <>
                {
                  <FlexWrapper>
                    <StyledSubtitle>
                      {questions[currentQuestionIndex].title}
                    </StyledSubtitle>
                    {questions[currentQuestionIndex].variants.map(
                      (singleVariant) => {
                        return (
                          <label>
                            <input type="radio" value={singleVariant} />
                            {singleVariant}
                          </label>
                        );
                      }
                    )}
                  </FlexWrapper>
                }
              </>
            )}

            {currentQuestionIndex >= 5 && currentQuestionIndex <= 6 && (
              <>
                {
                  <FlexWrapper>
                    <StyledSubtitle>
                      {questions[currentQuestionIndex].title}
                    </StyledSubtitle>
                    <input
                      key={questions[currentQuestionIndex].title}
                      id={questions[currentQuestionIndex].title}
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
