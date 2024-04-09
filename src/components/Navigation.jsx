import styled from "styled-components";
import React from "react";
import { FlexWrapper } from "./FlexWrapper";
import { COLORS } from "../styles/colors";
import { navOptions } from "../assets/navOptions";
import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { useDispatch } from "react-redux";
import { openModal } from "../state/navigation/reducer";
import { navigationSelector } from "../state/navigation/selector";
import { useSelector } from "react-redux";
import { NavModal } from "./NavModal";
import { useQuery } from "../styles/breakpoints";
import { getAuth, signOut } from "firebase/auth";

export const Navigation = () => {
  const { isTablet, isSmDesktop } = useQuery();
  const dispatch = useDispatch();

  const openNavModal = () => {
    dispatch(openModal());
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const { showModal } = useSelector(navigationSelector);

  return (
    <>
      {isSmDesktop ? (
        <NavWrapper>
          <FlexWrapper
            $flexDirection={isTablet ? "row" : "column"}
            $justifyContent="center"
            $alignItems="center"
            $gap={isTablet ? "36px" : "8px"}
          >
            {navOptions.map((singleOption, index) => {
              return (
                <Link to={singleOption.link} key={`link-${index}`}>
                  <StyledOption>{singleOption.title}</StyledOption>
                </Link>
              );
            })}
            <StyledOption onClick={logout}>ATSIJUNGTI</StyledOption>
          </FlexWrapper>
        </NavWrapper>
      ) : (
        <>
          {!showModal && (
            <FlexWrapper
              $justifyContent="flex-end"
              $backgroundColor={COLORS.saladGreen}
            >
              <FlexWrapper $justifyContent="space-between" $padding="25px 15px">
                <FlexWrapper
                  $gap="6px"
                  $flexDirection="column"
                  $justifyContent="center"
                  onClick={openNavModal}
                >
                  <Bar />
                  <Bar />
                  <Bar />
                </FlexWrapper>
              </FlexWrapper>
            </FlexWrapper>
          )}
          {showModal && <NavModal visibility={showModal} />}
        </>
      )}
    </>
  );
};

const NavWrapper = styled(FlexWrapper)`
  width: 100%;
  justify-content: flex-end;
  gap: 80px;
  padding: 15px 20px 15px 0;
  background: ${COLORS.saladGreen};
`;

const Bar = styled.div`
  width: 27px;
  border: 3px solid ${COLORS.white};
  border-radius: 5px;
`;

const StyledOption = styled.div`
  color: ${COLORS.white};
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease-out;
  &:hover {
    text-decoration: underline;
    color: ${COLORS.forestGreen};
  }
`;
