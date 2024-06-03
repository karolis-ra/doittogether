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
          $bgImage="/images/run.jpg"
          $justifyContent="center"
          $alignItems="center"
        >
          <StyledTitle>BĖGIMAS</StyledTitle>
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
              Bėgiojimas – viena populiariausių treniruočių formų. Bėgiojimui
              nereikia specialios įrangos, bėgioti galima bet kur ir bet kada.
              Be to, bėgimas yra sveika. Kokia bėgimo nauda sveikatai?
              <br /> <br />
              1. Geresnė širdies ir kraujagyslių sistemos būklė. Bėgimas yra
              viena geriausių kardio treniruočių. Bėgiojimas bent 10 minučių per
              dieną gali reikšmingai sumažinti kardiovaskulinių ligų riziką.
              Bėgimas taip pat sumažina širdies susitraukimų dažnį ramybės
              būsenoje. Šis rodiklis yra svarbus bendros sveikatos būklės ir
              fizinio pasirengimo rodmuo. Kuo jis mažesnis, tuo širdies raumuo
              stipresnis, fizinis pasirengimas geresnis.
              <br /> <br />
              2. Normalaus kūno svorio palaikymas. Bėgimas yra efektyvus būdas
              deginti kalorijas ir išlaikyti normalų kūno svorį. <br /> <br />
              3. Stipresni raumenys, geresnė kaulų būklė. Bėgimo metu dirba
              įvairios raumenų grupės – kojos, juosmuo, viršutinė kūno dalis.
              Tvirtėja raumenys, didėja ištvermė, didėja kaulų tankis, mažėja
              osteoporozės rizika. <br /> <br />
              4. Geresnis miegas. Kokybiškas miegas yra labai svarbus sveikatai.
              Miego metu organizme vyksta atkuriamieji procesai. Visgi
              rekomenduojama nebėgioti labai vėlai vakare, nes aerobiniai
              pratimai paskatina endorfinų išsiskyrimą. Tai suaktyvina smegenis
              ir gali būti sunkiau užmigti. <br /> <br />
              5. Geresnė nuotaika ir daugiau energijos. Daug žmonių bėgioja, nes
              tiesiog nori pasijusti geriau. Bėgiojimas padeda pagerinti
              nuotaiką, koncentraciją, bendrą gyvenimo kokybę. Reiškiniui, kai
              bėgimo metu išsiskiria endorfinai, yra specialus terminas –
              „bėgiko euforija“.
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
              <JoinText>prie bėgikų!</JoinText>
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
