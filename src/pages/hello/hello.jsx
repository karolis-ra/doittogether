import { FlexWrapper } from "../../components/FlexWrapper";
import { CenterWrap } from "../../components/CenterWrap";
import styled from "styled-components";
import { SubmitButton } from "../../components/SubmitButton";
import { Image } from "../../components/Image";
import { useNavigate } from "react-router";

export default function Hello() {
  const navigate = useNavigate();
  const handleJoinBtn = () => {
    navigate("/login");
  };
  return (
    <>
      <CenterWrap>
        <FlexWrapper
          $margin="0 auto"
          $maxWidth="1440px"
          $width="100%"
          $height="100vh"
          $bgImage="/images/cyclers.png"
          $justifyContent="flex-end"
        >
          <BlueFadeDiv></BlueFadeDiv>
          <FlexWrapper
            $flexDirection="column"
            $alignItems="center"
            $gap="50px"
            $alignSelf="center"
          >
            <Image src="/images/logo.png" $width="250px" $zIndex="2" />
            <StyledText $zIndex="2">
              doittogether - vieta, kuri sujungia tiek patyrusius sportininkus,
              tiek norinčius pradėti sportuoti. <br />
              <br /> Nori pasidalinti ilgamete patirtimi, susirasti lygiavertį
              partnerį, o gal tik pradėti sportuoti? <br />
              <br />
              Prisijunk!
            </StyledText>
            <SubmitButton width="280px" zIndex="99" onClick={handleJoinBtn}>
              PRISIJUNGTI
            </SubmitButton>
          </FlexWrapper>
        </FlexWrapper>
      </CenterWrap>
    </>
  );
}

const BlueFadeDiv = styled.div`
  position: absolute;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(to left, #3498db, rgba(0, 0, 255, 0));
`;

const StyledText = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 360px;
  color: white;
  font-weight: 600;
  z-index: 2;
`;

// const StyledButton = styled.div`
//   position: relative;
//   z-index: 99;
//   background-color: red;
// `;
