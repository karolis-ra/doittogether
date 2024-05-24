import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { DefaultButton } from "./DefaultButton";
import { useDispatch } from "react-redux";
import { setQuizNotDone } from "../state/profileForm/reducer";

export const ProfileInfo = ({ user }) => {
  const activities = { ...user.activities };
  const dispatch = useDispatch();

  const orderedKeys = ["Koks Tavo lygis?", "Koks tavo tikslas?", "Ko ieškai?"];

  const handleChangeProfileInfo = () => {
    dispatch(setQuizNotDone(false));
  };

  const sortedActivityKeys = Object.keys(activities).sort();

  return (
    <>
      <FlexWrapper
        $flexDirection="column"
        $backgroundColor={COLORS.white}
        $width="340px"
        $margin="0 auto"
        $padding="20px 10px"
        $borderRadius="5px"
      >
        <StyledText>Asmenine informacija</StyledText>
        <FlexWrapper $flexDirection="column" $gap="10px">
          <FlexWrapper $justifyContent="space-between" $width="300px">
            <FlexWrapper $flex="1">Amžius</FlexWrapper>
            <FlexWrapper $flex="1">{user.age}</FlexWrapper>
          </FlexWrapper>
          <FlexWrapper
            $justifyContent="space-between"
            $width="300px"
            $textAlign="left"
          >
            <FlexWrapper $flex="1">Lytis</FlexWrapper>
            <FlexWrapper $flex="1">{user.gender}</FlexWrapper>
          </FlexWrapper>
          <FlexWrapper $justifyContent="space-between" $width="300px">
            <FlexWrapper $flex="1">Miestas</FlexWrapper>
            <FlexWrapper $flex="1">{user.city}</FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper $flexDirection="column" $padding="0 0 20px 0">
          <StyledText>Sportas</StyledText>
          {sortedActivityKeys.map((activity) => (
            <FlexWrapper key={activity} $flexDirection="column" $gap="8px">
              <StyledDisc>{activity}</StyledDisc>
              {orderedKeys.map((key) => (
                <FlexWrapper
                  key={key}
                  $justifyContent="space-between"
                  $textAlign="left"
                  $borderBottom={`2px solid ${COLORS.gray}`}
                >
                  <FlexWrapper $flex="1">{key}</FlexWrapper>
                  <FlexWrapper $flex="1">{activities[activity][key]}</FlexWrapper>
                </FlexWrapper>
              ))}
            </FlexWrapper>
          ))}
        </FlexWrapper>
        <DefaultButton onClick={handleChangeProfileInfo} to="/profileQuiz">
          KEISTI
        </DefaultButton>
      </FlexWrapper>
    </>
  );
};

const StyledText = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 24px;
  text-align: center;
`;

const StyledDisc = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  text-align: center;
`;
