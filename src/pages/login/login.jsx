import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSelector } from "../../state/login/selector";
import { registerUser } from "../../state/login/reducer";
import { loginUser } from "../../state/login/reducer";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import { DefaultButton } from "../../components/DefaultButton";
import { FlexWrapper } from "../../components/FlexWrapper";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";

export default function Login() {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const [login, setLogin] = useState(true);

  const { userAccountInfo, userSetUp } = useSelector(loginSelector);
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
    ).then((userCredential) => {
      const user = userCredential.user;
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
    // dispatch(registerUser(emailAndPassword));
    await createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    );
    await sendEmailVerification(auth.currentUser).then(() => {});
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let userInfo = {};
      if (user) {
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
        flexDirection="column"
        justifyContent="center"
        margin="0 auto"
      >
        <StyledForm onSubmit={login ? handleLogin : handleFormSubmit}>
          <FlexWrapper flexDirection="column" gap="20px">
            <StyledInput id="email" type="email" placeholder="El.Paštas" />
            <StyledInput
              id="password"
              type="password"
              placeholder="Slaptažodis"
            />
            <DefaultButton>
              {login ? "Prisijungti" : "Registruotis"}
            </DefaultButton>
          </FlexWrapper>
        </StyledForm>
        {/* <DefaultButton onClick={handleGoogleLogin}>google login</DefaultButton> */}
        <FlexWrapper justifyContent="space-between" padding="20px 0">
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

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid ${COLORS.gray};
  padding: 10px;
  font-size: 16px;
  &:focus {
    border: none;
    border-bottom: 1px solid ${COLORS.gray};
  }
`;

const QuestionBlock = styled.div`
  font-size: 12px;
  color: ${COLORS.black};
`;

const StyledAction = styled.a`
  font-size: 12px;
  color: ${COLORS.blue};
`;
