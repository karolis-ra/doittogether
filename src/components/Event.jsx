import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { Image } from "./Image";
import styled from "styled-components";
export const Event = ({
  date,
  discipline,
  physical_level,
  location,
  max_members,
  from,
  info,
  id,
  price,
  questionList,
}) => {
  return (
    <FlexWrapper
      $width="340px"
      $flexDirection="column"
      $border={`1px solid ${COLORS.saladGreen}`}
      $padding="5px 15px"
      $borderRadius="4px"
    >
      <FlexWrapper $justifyContent="space-between">
        <StyledDisc>{discipline}</StyledDisc>
        <Text $textAlign="right">{physical_level}</Text>
      </FlexWrapper>
      <FlexWrapper>
        <FlexWrapper $gap="10px" $width="240px">
          <Image src="./images/events/pin.png" $width="20px" />
          <Text>{location}</Text>
        </FlexWrapper>
      </FlexWrapper>
      <FlexWrapper>
        <FlexWrapper $gap="10px" $width="240px">
          <Image src="./images/events/calendar.png" $width="20px" />
          <Text>{date}</Text>
        </FlexWrapper>
        <FlexWrapper $gap="10px" $width="100px">
          <Image
            $margin="0 0 0 -6px"
            src="./images/events/eur.png"
            $width="30px"
          />
          <Text>{price}</Text>
        </FlexWrapper>
      </FlexWrapper>
      <FlexWrapper>
        <FlexWrapper $gap="10px" $width="240px">
          <Image
            $margin="0 0 0 -4px"
            src="./images/events/clock.png"
            $width="26px"
          />
          <Text>{from}</Text>
        </FlexWrapper>
        <FlexWrapper $gap="10px" $width="100px">
          <Image src="./images/events/users.png" $width="25px" />
          <Text>{max_members}</Text>
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};

const StyledDisc = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  text-align: center;
`;

const Text = styled.div`
  flex: 0.75;
  padding: 10px 0 15px 0;
  font-weight: 500;
  color: #000;
  font-size: 14px;
  text-align: ${(props) => props.$textAlign};
  margin: ${(props) => props.$margin};
`;
