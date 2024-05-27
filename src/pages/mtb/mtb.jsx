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
          $bgImage="/images/mtb.jpg"
          $justifyContent="center"
          $alignItems="center"
          alt="mtb cycler"
        >
          <StyledTitle>MTB DVIRAČIAI</StyledTitle>
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
              Dažnas tokius dviračius vadina tiesiog „MTB“ (angl. Mountain
              Terrain Bike). Pagal savo paskirtį ir konstrukciją kalnų dviračiai
              skirti važinėti kalnuotomis ir nelygiomis vietovėmis. Tai vienas
              populiariausių dviračio tipų jaunimo ir dviračiais sportuojančių
              asmenų tarpe. <br />
              <br />
              Kalnų dviračiai dažniausiai būna sustiprintu rėmu, myniklio
              velenas yra aukščiau nuo žemės nei kito tipo dviračiuose, tai
              padidina dviračio pravažumą, tiesus ir platus vairas, galingi
              stabdžiai – dažniausiai naudojami diskiniai. Šio tipo dviračiai
              komplektuojami su priekine amortizuojančia šake, o pilnos
              amortizatoriaus kalnų dviračiai turi ir galinį amortizatorių.
              Standartiškai ratai būna 26“ dydžio. Nors pastaraisiais metais
              populiarėja kalnų dviračiai turintys 27,5″ arba net 29″ ratus.
              Padangos plačios, su grubiu protektoriumi dėl to dviratis lengviau
              valdomas ir manevringesnis važiuojant bekelėje. MTB dviračiai
              dažnai turi didelį pavarų skaičių (24-30) ir komplektuojami su
              priekiniu ir galinių pavarų perjungikliais. Šiuo metu
              brangesniuose dviračiuose tapo madinga naudoti vieną priekinę
              žvaigždę. Kai nėra priekinio pavarų perjungėjo, pavarų rankenėlės,
              taip santykinai galima sutaupyti dviračio svorį. Šiuolaikinis
              kalnų dviratis sveria nuo 9 iki 14 kg. <br /> <br />
              Pagal dviračio amortizaciją MTB dviračiai dar skirstomi į: <br />{" "}
              <br />
              1. Kalnų dviračiai kieta važiuokle, be amortizatorių (angl.
              Rigid);
              <br />
              2. Standžios galinės pakabos kalnų dviratis, su priekiniu
              amortizatoriumi (angl. Hardtail); <br />
              3. Pilnos amortizacijos kalnų dviratis (angl. Full suspension).
            </StyledText>
            <FlexWrapper $gap="10px" $alignItems="center" $padding="0 0 0 0">
              <DefaultButton to="/login">Prisijunk</DefaultButton>
              <JoinText>prie MTB dviratininkų!</JoinText>
            </FlexWrapper>
            <FlexWrapper
              $gap="5px"
              $justifyContent="flex-end"
              $padding="0 20px 20px 0"
              
            >
              <FlexWrapper>
                <a
                  href="https://bikko.lt/pagalba/dviraciu-tipai"
                  target="blank"
                >
                  ŠALTINIO NUORODA
                </a>
              </FlexWrapper>
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
