import { OptionBlock } from "./OptionBlock";
import { FlexWrapper } from "./FlexWrapper";
import styled from "styled-components";
import { useState } from "react";
import { setUserActivities } from "../state/profileForm/reducer";
import { useDispatch, useSelector } from "react-redux";
import { profileFormSelector } from "../state/profileForm/selector";

export const AnswerBlock = ({ singleQuestion, disciplines }) => {
  const [options, setOption] = useState({});
  const dispatch = useDispatch();

  const { userInfo } = useSelector(profileFormSelector);

  const handleChange = (e, singleQuestion, discipline) => {
    let user_answer = {};
    user_answer.title = singleQuestion.title;
    user_answer.discipline = discipline;
    user_answer.value = e.target.value;
    dispatch(setUserActivities(user_answer));

    console.log("this is user info", userInfo);
    //option uniqueness function
    setOption((prevAnswers) => ({
      ...prevAnswers,
      [singleQuestion.title]: {
        ...prevAnswers[singleQuestion.title],
        [discipline]: e.target.value,
      },
    }));
  };

  return (
    <FlexWrapper $flexDirection="column" $width="100%">
      <StyledTitle>{singleQuestion.title}</StyledTitle>
      {disciplines.map((singleDisc, index) => {
        const selected = options[singleQuestion.title]?.[singleDisc];
        return (
          <FlexWrapper $flexDirection="column" key={index}>
            <StyledSubtitle>{singleDisc}</StyledSubtitle>
            <FlexWrapper $flexDirection="column">
              {singleQuestion.variants.map((singleVariant, variantIndex) => (
                <OptionBlock
                  key={variantIndex}
                  selected={selected}
                  handleChange={(e) =>
                    handleChange(e, singleQuestion, singleDisc)
                  }
                  type="radio"
                  id={`${singleDisc}-${variantIndex}`}
                  value={singleVariant}
                >
                  {singleVariant}
                </OptionBlock>
              ))}
            </FlexWrapper>
          </FlexWrapper>
        );
      })}
    </FlexWrapper>
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
