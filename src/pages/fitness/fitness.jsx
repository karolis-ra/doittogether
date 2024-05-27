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
          $bgImage="/images/fitness.jpg"
          $justifyContent="center"
          $alignItems="center"
          alt="fitness"
        >
          <StyledTitle>FITNESAS</StyledTitle>
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
              Pati sąvoka “fitnesas” apima ne tik pratimų, skirtų raumenų
              tonusui palaikyti ar svoriui numesti, rinkinį. Pirmiausia tai yra
              tinkamo gyvenimo būdo filosofija. Tai apima subalansuotą mitybą,
              reguliarias ir tinkamas treniruočių programas, žalingų įpročių
              vengimą ir pan. Laikantis naujo gyvenimo būdo, žmogus pagerina
              sveikatą, įgyja patrauklesnę išvaizdą, tampa aktyvus, ištvermingas
              ir atsparus stresui, sulėtėja senėjimo procesas. Programų
              pasirinkimas toks įvairus, kad kiekvienas gali rasti treniruotę
              būtent sau, atsižvelgdamas į savo tikslus ir bendrą fizinę būklę,
              amžių ir lytį. Fitneso privalumai:
              <br /> <br />
              1. Bendros fizinės būklės gerinimas (koreguojama judesių
              koordinacija, lavinamas lankstumas, išlyginama laikysena).
              <br /> <br />
              2. Atsikratoma viršsvorio (reguliariai sportuojant kartu su
              tinkama mityba deginami riebalai, į jų vietą “ateina” raumenys).{" "}
              <br /> <br />
              3. Pagerėja medžiagų apykaita (pagreitėja medžiagų apykaita ir
              maisto virškinimas, žmogus viduje jaučiasi lengvas). <br /> <br />
              4. Stiprėja imunitetas (peršalimo ligos užklups rečiau ir
              organizmas jas lengviau pakels).
              <br /> <br />
              5. Pagerėjusi nuotaika (fiziniai pratimai gamina endorfinus, kurie
              padeda greičiau susidoroti su stresu). <br /> <br />
              6. Pagerėja širdies ir kraujagyslių sistema (ypač atliekant kardio
              pratimus).
            </StyledText>
            <FlexWrapper $gap="10px" $alignItems="center">
              <DefaultButton to="/login">Prisijunk</DefaultButton>
              <JoinText>prie sportininkų!</JoinText>
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
