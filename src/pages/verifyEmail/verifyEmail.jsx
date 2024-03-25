import { Link } from "react-router-dom";
import { auth } from "../../firebase/clientApp";
import { CenterWrap } from "../../components/CenterWrap";
import { FlexWrapper } from "../../components/FlexWrapper";
import { COLORS } from "../../styles/colors";
import styled from "styled-components";
import { DefaultButton } from "../../components/DefaultButton";

export default function VerifyEmail() {
  const logout = async () => {
    await auth.signOut();
  };

  return (
    <CenterWrap>
      <FlexWrapper
        $flexDirection="column"
        $justifyContent="center"
        $alignItems="center"
        $gap="20px"
        $padding="50px"
        $width="100%"
      >
        <StyledText>
          Prašome patvirtinti savo el.pašto adresą, kad galėtumėte prisijungti
          prie savo paskyros
        </StyledText>
        <DefaultButton onClick={logout} to="/login">
          Atgal
        </DefaultButton>
      </FlexWrapper>
    </CenterWrap>
  );
}

const StyledText = styled.div`
  color: ${COLORS.black};
  text-align: center;
`;
