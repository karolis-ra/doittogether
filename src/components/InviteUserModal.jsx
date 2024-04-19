import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "./SubmitButton";
import { hideInvitationModal } from "../state/profile/reducer";
import { useState } from "react";
import { confirmUser } from "../state/events/reducer";

export const InvitationModal = ({ pending_users, event_id }) => {
  const [userNum, setUsernNum] = useState(0);
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(hideInvitationModal());
  };

  const handleUserNumber = () => {
    if (userNum + 1 === pending_users.length) {
      setUsernNum(0);
    } else {
      setUsernNum(userNum + 1);
    }
  };

  const handleConfirmUser = () => {
    const info_object = {};
    info_object["event_id"] = event_id;
    info_object["confirmed_user"] = pending_users[userNum].id;

    dispatch(confirmUser(info_object));
  };

  return (
    <StyledWrapper $flexDirection="column">
      <FlexWrapper
        $flexDirection="column"
        $gap="30px"
        $width="340px"
        $alignItems="center"
      >
        <FlexWrapper $flexDirection="column" $alignItems="" $width="340px">
          <div>{pending_users[userNum].name}</div>
          {Object.entries(pending_users[userNum].answers).map(
            ([key, value]) => {
              return (
                <FlexWrapper $flexDirection="column" key={key}>
                  <div>{key}</div>
                  <div>{value}</div>
                </FlexWrapper>
              );
            }
          )}
        </FlexWrapper>
        <SubmitButton
          onClick={handleUserNumber}
          color={COLORS.creme}
          hover={COLORS.brown}
          width="240px"
        >
          KITAS
        </SubmitButton>
      </FlexWrapper>
      <FlexWrapper $margin="20px 0 0 0 " $gap="20px">
        <SubmitButton
          color={COLORS.black}
          width="120px"
          onClick={handleBack}
          hover={COLORS.gray}
        >
          ATGAL
        </SubmitButton>
        <SubmitButton onClick={handleConfirmUser}>PATVIRTINTI</SubmitButton>
      </FlexWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(FlexWrapper)`
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: ${COLORS.bgGray};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  overflow: scroll;
  justify-content: center;
  align-items: center;
`;

const StyledSubtitle = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  text-align: center;
`;
