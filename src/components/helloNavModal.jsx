import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideModal } from "../state/navigation/reducer";
import { Image } from "./Image";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { helloNavOptions } from "../assets/helloNavOptions";

export const HelloNavModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeNavModal = () => {
    dispatch(hideModal());
  };

  const logout = () => {
    navigate("/login");
    dispatch(hideModal());
  };
  return (
    <StyledWrapper $flexDirection="column">
      <FlexWrapper
        $alignSelf="flex-end"
        $padding="0 15px"
        $flex="2"
        onClick={closeNavModal}
      >
        <Image src="./images/x_icon.png" $width="35px" $margin="-35px 0 0 0" />
      </FlexWrapper>
      <FlexWrapper
        $textAlign="center"
        $width="100%"
        $flexDirection="column"
        $justifyContent="flex-start"
        $gap="20px"
        $flex="10"
        $padding="150px 0 0 0"
      >
        {helloNavOptions.map((singleOption, index) => {
          return (
            <Link
              key={`footerOption-${index}`}
              to={singleOption.link}
              onClick={closeNavModal}
            >
              <StyledOption>{singleOption.title}</StyledOption>
            </Link>
          );
        })}
        <StyledOption onClick={logout}>PRISIJUNGTI</StyledOption>
      </FlexWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(FlexWrapper)`
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: ${COLORS.saladGreen};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  overflow: scroll;
  justify-content: center;
  align-items: center;
`;

const StyledOption = styled.div`
  padding: 0 0 15px 0;
  color: ${COLORS.white};
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease-out;
  border-bottom: 1px solid white;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${COLORS.white};
    color: ${COLORS.white};
  }
`;
