import { FlexWrapper } from "../../components/FlexWrapper";
import { CenterWrap } from "../../components/CenterWrap";
import styled from "styled-components";
import { SubmitButton } from "../../components/SubmitButton";
import { Image } from "../../components/Image";
import { useNavigate } from "react-router";
import { HelloNav } from "../../components/helloNavigation";
import { COLORS } from "../../styles/colors";
import { DefaultButton } from "../../components/DefaultButton";

export default function MTB() {
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
          $bgImage="/images/road.jpg"
          $justifyContent="center"
          $alignItems="center"
        >
          <StyledTitle>PLENTO DVIRAČIAI</StyledTitle>
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
              Kitaip vadinami „lenktyniai“, ar „plentiniai“. Pagrindinė
              paskirtis – greitas važiavimas lygia danga. Pagrindinės plento
              dviračių savybės yra kieta važiuoklė ir mažas svoris. Siekiant
              išgauti mažesnį svorį plento dviračiai gaminami anglies pluošto
              rėmu, kuris iš dalies slopina dviračio vibracijas. Rėmai būna
              klasikinės formos, todėl važiavimo pozicijoje sėdynė būna aukščiau
              vairo, o tokia dviratininko sėdėsena sumažina pasipriešinimą ir
              leidžia palaikyti didesnį važiavimo greitį. Plento dviračiai turi
              išskirtinės formos vairą – jis yra užriestas į apačią.
              Šiuolaikinių šio tipo dviračių perjungimo rankenėlės taip pat yra
              nestandartinės – jos integruotos į stabdžių rankenas, o pavarų
              perjungimas vyksta lankstant rankenėlę į vieną ar kitą pusę.
              Sportinių dviračių priekinis žvaigždžių blokas dažniausiai turi
              dvi žvaigždes, o galinį žvaigždžių bloką sudaro 8-12 žvaigždučių.{" "}
              <br />
              <br />
              Dauguma plento dviračių konstruojami laikantis techninių
              Tarptautinės Dviračių Sporto Federacijos (UCI) reikalavimų. Tai,
              deja, riboja naujų techninių sprendimų ir netradicinių dviračių
              konstrukcijų taikymą. Dauguma tokių modelių sveria mažiau nei 10
              Kg. Plentinių dviračių padangos būna 18-25 mm pločio.
            </StyledText>
            <FlexWrapper $gap="10px" $alignItems="center" $padding="0 0 40px 0">
              <DefaultButton to="/login">Prisijunk</DefaultButton>
              <JoinText>prie plento dviratininkų!</JoinText>
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
