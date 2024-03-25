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

export const ProfileForm = () => {
  const [disciplines, setDisciplines] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
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
          // PASIRINKIMAI PRIKLAUSOMI NUO PRIMOJO KLAUSIMO
          {
            if (index === 1 && disciplines.length > 0) {
              return (
                <AnswerBlock
                  singleQuestion={singleQuestion}
                  disciplines={disciplines}
                />
              );
            }
          }
          {
            if (index === 2 && disciplines.length > 0) {
              return (
                <AnswerBlock
                  singleQuestion={singleQuestion}
                  disciplines={disciplines}
                />
              );
            }
          }
          {
            if (index === 3 && disciplines.length > 0) {
              return (
                <AnswerBlock
                  singleQuestion={singleQuestion}
                  disciplines={disciplines}
                />
              );
            }
          }
        })}
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
