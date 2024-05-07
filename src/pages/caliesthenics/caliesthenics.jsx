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
          $bgImage="/images/cali.jpg"
          $justifyContent="center"
          $alignItems="center"
        >
          <StyledTitle>GATVĖS GIMNASTIKA</StyledTitle>
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
              Kalistenika (ang. Calisthenics) arba gatvės gimnastika (ang.
              Street workout) – tai natūralaus treniravimosi forma, kurios
              pagrindas susideda iš įvairaus sunkumo pratimų, pasipriešinimui
              naudojant savo kūno svorį. Visgi nuo šios sporto šakos neatsiejami
              sudėtiniai pratimų elementai iš kovos menų, gimnastikos,
              atletikos, taip pat yra daug bėgiojimo pratimų. Šis sportas
              nukreiptas į jėgos lavinimą, tačiau neatsiejamai susijęs ir su
              ištverme, lankstumu, staigumu, sprogstama jėga, sąnarių mobilumu.
              Kadangi kalistenikoje itin įvairiapusiškai lavinama asmeninė
              sportinė forma, o norint galima akcentuoti norimas raumenų grupes
              ar judesius ir visai nereikia specialaus inventoriaus, nes
              naudojamas inventorius labai paprastas (t.y. skersinis,
              lygiagretės, Every work out is victoryminkštas kilimėlis ir t.t.),
              todėl tai yra neatsiejama treniruočių dalis bet kokia sporto šaka
              užsiimančių sportininkų programoje
              <br /> <br />
              Gatvės gimnastikos pavadinimą paaiškinti nėra sunku. Visi pratimai
              yra pritaikyti gatvės/lauko aplinkai. Šiuo sportu galima užsiimti
              lauke, specialiuose sporto aikštelėse, miesto parkuose, gatvėje,
              namie, miškuose ar net poilsiaujant prie jūros.
              <br /> <br />
            </StyledText>
            <FlexWrapper $gap="10px" $alignItems="center" $padding="0 0 40px 0">
              <DefaultButton to="/login">Prisijunk</DefaultButton>
              <JoinText>gatvės gimnastų!</JoinText>
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
