import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../state/login/reducer";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import { FlexWrapper } from "../../components/FlexWrapper";
import { DefaultInput } from "../../components/DefaultInput";
import { SubmitButton } from "../../components/SubmitButton";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";

export default function Login() {
  const googleProvider = new GoogleAuthProvider();

  const [login, setLogin] = useState(true);
  const [success, setSuccess] = useState(true);
  const [wrongPass, setWrongPass] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  const dispatch = useDispatch();

  const setSignUp = () => {
    setLogin(false);
  };

  const setLogIn = () => {
    setLogin(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error) {
          setSuccess(false);
        }
      });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (e.target.password.value === e.target.password_copy.value) {
      setWrongPass(false);
      await createUserWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value
      )
        .then(() => {})
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setEmailUsed(true);
          }
        });
      await sendEmailVerification(auth.currentUser)
        .then(() => {})
        .catch((error) => {
          console.log(error.code);
        });
    } else {
      setWrongPass(true);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let userInfo = {};
      if (user) {
        userInfo.ID = user.uid;
        userInfo.name = user.name;
        userInfo.email = user.email;
        userInfo.emailVerified = user.emailVerified;
      }
      dispatch(loginUser(userInfo));
    });
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <StyledWrap>
      <FlexWrapper
        $flexDirection="column"
        $justifyContent="center"
        $margin="0 auto"
      >
        <StyledForm onSubmit={login ? handleLogin : handleFormSubmit}>
          <FlexWrapper $flexDirection="column" $gap="20px">
            <DefaultInput id="email" type="email" placeholder="El.Paštas" />
            <DefaultInput
              id="password"
              type="password"
              placeholder="Slaptažodis"
            />
            {!login && (
              <DefaultInput
                id="password_copy"
                type="password"
                placeholder="Pakartokite slaptažodį"
              />
            )}
            {!success && <ErrorMsg>Neteisingi prisijungimo duomenis</ErrorMsg>}
            {wrongPass && <ErrorMsg>Slaptažodžiai nesutampa</ErrorMsg>}
            {emailUsed && <ErrorMsg>El.pašto adresas yra užimtas</ErrorMsg>}
            <SubmitButton type="submit">
              {login ? "Prisijungti" : "Registruotis"}
            </SubmitButton>
            {login && (
              <FlexWrapper
                $cursor="pointer"
                $gap="20px"
                onClick={handleGoogleLogin}
                $justifyContent="center"
                $padding="10px"
                $border="1px solid gray"
                $borderRadius="5px"
              >
                <GoogleImg src="/images/login/ggl_icon.png" />
                <StyledLoginText>Prisijunk su Google</StyledLoginText>
              </FlexWrapper>
            )}
          </FlexWrapper>
        </StyledForm>
        {/* <DefaultButton onClick={handleGoogleLogin}>google login</DefaultButton> */}
        <FlexWrapper $justifyContent="space-between" $padding="20px 0">
          <QuestionBlock>
            {login ? "Dar neturi paskyros?" : "Turi paskyrą?"}
          </QuestionBlock>
          <StyledAction onClick={login ? setSignUp : setLogIn}>
            {login ? "Sukurti paskyrą" : "Prisijunk"}
          </StyledAction>
        </FlexWrapper>
      </FlexWrapper>
    </StyledWrap>
  );
}

const StyledForm = styled.form`
  min-width: 280px;
`;

const StyledWrap = styled.div`
  display: flex;
  height: 100vh;
`;

const QuestionBlock = styled.div`
  font-size: 12px;
  color: ${COLORS.black};
`;

const StyledAction = styled.a`
  cursor: pointer;
  font-size: 12px;
  color: ${COLORS.blue};
  transition: 0.3s ease-in-out;
  &:hover {
    color: ${COLORS.hoverBlue};
  }
`;

const ErrorMsg = styled.div`
  font-size: 12px;
  color: ${COLORS.red};
`;

const GoogleImg = styled.img`
  width: 25px;
`;

const StyledLoginText = styled.div`
  color: ${COLORS.black};
`;
