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
          $bgImage="/images/gravel.jpg"
          $justifyContent="center"
          $alignItems="center"
          alt="gravel"
        >
          <StyledTitle>GRAVEL DVIRAČIAI</StyledTitle>
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
              Turi išskirtines savybes – plento dviračio greitį ir kalnų
              dviračio pravažumą. Šių tipų dviračių rėmai labiau sustiprinti,
              turi platesnes šakes, kurios iš dalies slopina vibraciją
              važiuojant nelygiu reljefu. Dviračiuose būna sumontuotos platesnės
              padangos, skirtos tokiam reljefui. Su šiais dviračiais patogu
              važiuoti tiek miško keliu, žvyrkeliu ar greita trasa, kuri
              driekiasi asfaltu ar šaligatviu. <br /> <br />
              Gravel dviračių padangų protektorius specialiai skirtas bekelei,
              pasižymi platesnėmis (nei plentinio dviračio) padangomis, kurių
              plotis bus didesnis nei 38mm. Platesnės padangos užtikrina didesnį
              komfortą važiuojant ilgesnį laiką. Gravel tipo dviračiai tipai
              komplektuojami su diskiniais stabdžiais, mechaniniais arba
              hidrauliniais. Tam kad sumažinti dviračių svorį, priekinėje
              žvaigždžių pavarų sistemoje, vis dažniau montuojama viena
              žvaigždė, rečiau dvi. Galinėje pavarų sistemoje dažniausiai
              montuojama plataus diapazono galinė žvaigždžių kasetė. Galima
              trumpai reziumuoti, kad Gravel tipo dviračiai labiau mėgstami
              keliautojų, ir mėgėjų važiuoti įvairiomis sąlygomis.
              <FlexWrapper $justifyContent="flex-end">
                <StyledSource
                  href="https://bikko.lt/pagalba/dviraciu-tipai"
                  target="blank"
                >
                  ŠALTINIO NUORODA
                </StyledSource>
              </FlexWrapper>
            </StyledText>
            <FlexWrapper $gap="10px" $alignItems="center">
              <DefaultButton to="/login">Prisijunk</DefaultButton>
              <JoinText>prie gravel dviratininkų!</JoinText>
            </FlexWrapper>
            <FlexWrapper
              $gap="5px"
              $justifyContent="flex-end"
              $padding="0 20px 20px 0"
            ></FlexWrapper>
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

const StyledSource = styled.a`
  font-size: 10px;
  font-style: italic;
  margin-top: 10px;
`;
