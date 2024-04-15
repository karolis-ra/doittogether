import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";

export const ProfileInfo = ({ user }) => {
  const activities = { ...user.activities };
  console.log(user);
  return (
    <>
      <FlexWrapper
        $width="100%"
        $borderBottom={`1px solid ${COLORS.gray}`}
        $margin="20px 0"
        $padding="0 0 20px 20px"
      >
        <div>{user.name}</div>
      </FlexWrapper>
      <FlexWrapper $flexDirection="column">
        <div>Mano anketa</div>
        <FlexWrapper>
          <div>amzius</div>
          <div>{user.age}</div>
        </FlexWrapper>
        <FlexWrapper>
          <div>lytis</div>
          <div>{user.gender}</div>
        </FlexWrapper>
        <FlexWrapper>
          <div>miestas</div>
          <div>{user.city}</div>
        </FlexWrapper>
        {Object.entries(activities).map(([activity, values]) => (
          <FlexWrapper key={activity} $flexDirection="column">
            <div>{activity}</div>
            {Object.entries(values).map(([key, value]) => (
              <div key={key}>{`${key}: ${value}`}</div>
            ))}
          </FlexWrapper>
        ))}
      </FlexWrapper>
    </>
  );
};

const StyledInput = styled.input`
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
