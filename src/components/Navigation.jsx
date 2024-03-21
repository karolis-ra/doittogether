import styled from "styled-components";
import React from "react";
import { FlexWrapper } from "./Wrappers/FlexWrapper";
import { COLORS } from "../styles/colors";
import { useQuery } from "../styles/breakpoints";
import { navOptions } from "../assets/navOptions";
import { Text } from "./Text";
import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { useDispatch } from "react-redux";
import { openModal } from "../state/navigation/reducer";
import { navigationSelector } from "../state/navigation/selector";
import { useSelector } from "react-redux";
import { NavModal } from "./NavModal";

export const Navigation = () => {
  const { isTablet, isSmDesktop } = useQuery();
  const dispatch = useDispatch();

  const openNavModal = () => {
    dispatch(openModal());
  };

  const { showModal } = useSelector(navigationSelector);

  return (
    <>
      {isSmDesktop ? (
        <NavWrapper>
          <Logo src="./images/gervinelis_logo.png" />
          <StyledWrapper
            flexDirection={isTablet ? "row" : "column"}
            justifyContent="center"
            alignItems="center"
            gap={isTablet ? "36px" : "8px"}
          >
            {navOptions.map((singleOption, index) => {
              return (
                <Link to={singleOption.link} key={`link-${index}`}>
                  <StyledText
                    align="center"
                    fs="18px"
                    color={COLORS.gray}
                    fw="600"
                  >
                    {singleOption.title}
                  </StyledText>
                </Link>
              );
            })}
          </StyledWrapper>
          <DefaultButton to="/rezervacija">REZERVUOKITE</DefaultButton>
        </NavWrapper>
      ) : (
        <>
          {!showModal && (
            <FlexWrapper justifyContent="space-between" padding="25px 15px">
              <Link to="/">
                <Logo src="./images/gervinelis_logo.png" />
              </Link>

              <FlexWrapper
                gap="6px"
                flexDirection="column"
                justifyContent="center"
                onClick={openNavModal}
              >
                <Bar />
                <Bar />
                <Bar />
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
  justify-content: center;
  gap: 80px;
  padding: 15px 0;
  background: rgba(253, 248, 245, 0.8);
`;

const StyledWrapper = styled(FlexWrapper)`
  a:first-child div {
    font-weight: 700;
    color: ${COLORS.forestGreen};
    &:hover {
      text-decoration: underline;
      color: ${COLORS.creme};
    }
  }
`;

const Bar = styled.div`
  width: 27px;
  border: 3px solid ${COLORS.creme};
  border-radius: 5px;
`;

const Logo = styled.img`
  width: 80px;
  margin-right: 20px;
`;

const StyledText = styled(Text)`
  transition: 0.3s ease-out;
  &:hover {
    text-decoration: underline;
    color: ${COLORS.forestGreen};
  }
`;