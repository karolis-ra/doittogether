import { FlexWrapper } from "../../components/FlexWrapper";
import { CenterWrap } from "../../components/CenterWrap";
import styled from "styled-components";
import { SubmitButton } from "../../components/SubmitButton";
import { Image } from "../../components/Image";
import { useNavigate } from "react-router";
import { HelloNav } from "../../components/helloNavigation";
import { COLORS } from "../../styles/colors";
import { DefaultButton } from "../../components/DefaultButton";

export default function Admin() {
  const navigate = useNavigate();
  const handleJoinBtn = () => {
    navigate("/login");
  };
  return (
    <>
      <CenterWrap flexDirection="column">
        <div>this is admin page</div>
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
