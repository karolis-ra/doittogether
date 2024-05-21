import { FlexWrapper } from "../../components/FlexWrapper";
import { CenterWrap } from "../../components/CenterWrap";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { HelloNav } from "../../components/helloNavigation";
import { COLORS } from "../../styles/colors";
import { DefaultButton } from "../../components/DefaultButton";

export default function Project() {
  const navigate = useNavigate();
  const handleJoinBtn = () => {
    navigate("/login");
  };
  return (
    <>
      <CenterWrap flexDirection="column">
        <FlexWrapper>
          <HelloNav />
        </FlexWrapper>
        <FlexWrapper
          $height="340px"
          $bgImage="/images/doittogether.jpg"
          $justifyContent="center"
          $alignItems="center"
        >
          <StyledTitle>doittogether</StyledTitle>
        </FlexWrapper>
        <FlexWrapper>
          <FlexWrapper
            $flexDirection="column"
            $alignItems="center"
            $gap="50px"
            $alignSelf="center"
            $width="100%"
            $minHeight="60vh"
          >
            <StyledText $zIndex="2">
              doittogether - vieta kurioje norintys pradėti sportuoti, gali
              susipažinti su dviračių sporto šakomis, bėgimu, fitnesu ar gatvės
              gimnastika. Šių šakų sportininkai, dažnu atveju, treniruojasi
              vieni, todėl doittogether turi kelias užduotis:
              <br />
              <br />
              1. Padėti naujokams susirasti bendraminčių ar mentorių ir drasiau
              žengti į sportą. <br />
              2. Pažengusiems sportininkams padėti susirasti panašaus fizinio
              pajėgumo partnerį arba pasidalinti patirtimi su pradedančiu
              sportininku. <br />
              <br />
              <br />
            </StyledText>
            <FlexWrapper $gap="10px" $alignItems="center" $padding="0 0 40px 0">
              <DefaultButton to="/login">PRISIJUNK</DefaultButton>
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>
      </CenterWrap>
    </>
  );
}

const StyledText = styled.div`
  max-width: 1080px;
  padding: 40px 40px 0 40px;
  position: relative;
  color: black;
  font-weight: 600;
  z-index: 2;
  text-align: justify;
`;

const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 35px;
  color: ${COLORS.saladGreen};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;

const JoinText = styled.div`
  color: ${COLORS.saladGreen};
  font-weight: 600;
`;
