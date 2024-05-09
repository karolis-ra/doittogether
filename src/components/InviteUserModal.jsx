import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "./SubmitButton";
import { hideInvitationModal } from "../state/profile/reducer";
import { useState } from "react";
import { confirmUser } from "../state/events/reducer";
import { fetchEvents } from "../state/home/reducer";

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
    info_object["member_contacts"] =
      pending_users[userNum].answers["Kontaktai"];
    info_object["name"] = pending_users[userNum].name;
    console.log(info_object);
    dispatch(confirmUser(info_object));
    dispatch(hideInvitationModal());
    dispatch(fetchEvents());
  };

  return (
    <StyledWrapper $flexDirection="column">
      <FlexWrapper
        $flexDirection="column"
        $gap="15px"
        $width="340px"
        $alignItems="center"
        $backgroundColor="white"
        $borderRadius="5px"
        $padding="0 0 30px 0"
      >
        <FlexWrapper
          $flexDirection="column"
          $alignItems=""
          $width="340px"
          $padding="15px"
        >
          <FlexWrapper
            $alignItems=" center"
            $justifyContent="flex-start"
            $gap="15px"
          >
            <StyledSubtitle>Dalyvis:</StyledSubtitle>
            <StyledSubtitle>{pending_users[userNum].name}</StyledSubtitle>
          </FlexWrapper>
          <FlexWrapper gap="15px" $flexDirection="column">
            {Object.entries(pending_users[userNum].answers).map(
              ([key, value]) => {
                if (key === "Kontaktai") {
                  return null;
                }
                return (
                  <FlexWrapper $flexDirection="column" key={key} $gap="5px">
                    <StyledQuestionTitle>{key}</StyledQuestionTitle>
                    <StyledAnswer>{value}</StyledAnswer>
                  </FlexWrapper>
                );
              }
            )}
          </FlexWrapper>
        </FlexWrapper>
        {pending_users.length > 1 && (
          <SubmitButton
            onClick={handleUserNumber}
            color={COLORS.creme}
            hover={COLORS.brown}
            width="240px"
          >
            KITAS DALYVIS
          </SubmitButton>
        )}

        <FlexWrapper $margin="0 0 0 0 " $gap="20px">
          <SubmitButton
            color={COLORS.black}
            width="120px"
            onClick={handleBack}
            hover={COLORS.gray}
          >
            GRĮŽTI
          </SubmitButton>
          <SubmitButton onClick={handleConfirmUser}>PATVIRTINTI</SubmitButton>
        </FlexWrapper>
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

const StyledQuestionTitle = styled.div`
  color: ${COLORS.saladGreen};
  font-size: 16px;
  font-weight: 600;
`;

const StyledAnswer = styled.div`
  font-size: 14px;
`;
