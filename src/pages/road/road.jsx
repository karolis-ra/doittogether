import { FlexWrapper } from "../../components/FlexWrapper";
import { CenterWrap } from "../../components/CenterWrap";
import styled from "styled-components";
import { SubmitButton } from "../../components/SubmitButton";
import { Image } from "../../components/Image";
import { useNavigate } from "react-router";
import { HelloNav } from "../../components/helloNavigation";

export default function Road() {
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
        <FlexWrapper>
          <FlexWrapper
            $flexDirection="column"
            $alignItems="center"
            $gap="50px"
            $alignSelf="center"
          >
            <StyledText $zIndex="2">
              cia bus info apie plento dviracius
            </StyledText>
          </FlexWrapper>
        </FlexWrapper>
      </CenterWrap>
    </>
  );
}

const StyledText = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 360px;
  color: white;
  font-weight: 600;
  z-index: 2;
`;
