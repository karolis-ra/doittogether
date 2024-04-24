import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { Image } from "./Image";
import styled from "styled-components";
import { SubmitButton } from "./SubmitButton";
import { QuestionModal } from "./QuestionModal";
import { useSelector, useDispatch } from "react-redux";
import { eventsSelector } from "../state/events/selector";
import { openModal } from "../state/events/reducer";
import { InvitationModal } from "./InviteUserModal";
import { profileSelector } from "../state/profile/selector";
import { openInvitationModal } from "../state/profile/reducer";
import { deleteEvent } from "../state/events/reducer";
import { leaveCurrentEvent } from "../state/events/reducer";
import { fetchEvents } from "../state/home/reducer";
import { straightConfirmUser } from "../state/events/reducer";
import { auth } from "../firebase/clientApp";
import { useNavigate } from "react-router";

export const Event = ({
  date,
  discipline,
  physical_level,
  location,
  max_members,
  from,
  info,
  price,
  questionList,
  document_id,
  pending_users,
  confirmed_users,
  myEvent,
  leaveEvent,
  joinEvent,
}) => {
  const { showModal, doc_id } = useSelector(eventsSelector);
  const { showInvitationModal, modal_id } = useSelector(profileSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openInvitationWin = () => {
    dispatch(openInvitationModal(document_id));
  };

  const handleJoinEvent = () => {
    if (questionList) {
      dispatch(openModal(document_id));
    } else {
      const participant = {};
      participant.event_id = document_id;
      participant.confirmed_user = auth.currentUser.uid;
      participant.email = auth.currentUser.email;
      dispatch(straightConfirmUser(participant));
      dispatch(fetchEvents());
      navigate("/profile");
    }
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(document_id));
    dispatch(fetchEvents());
  };

  const handleLeaveEvent = () => {
    console.log("leave");
    dispatch(leaveCurrentEvent(document_id));
    dispatch(fetchEvents());
  };

  return (
    <FlexWrapper
      $maxWidth="340px"
      $flexDirection="column"
      $border={`1px solid ${COLORS.saladGreen}`}
      $padding="5px 15px 15px 15px"
      $borderRadius="4px"
      $justifyContent="space-around"
      $backgroundColor={COLORS.white}
    >
      <FlexWrapper $flexDirection="column">
        <FlexWrapper $justifyContent="space-between">
          <StyledDisc>{discipline}</StyledDisc>
          <Text $textAlign="right">{physical_level}</Text>
        </FlexWrapper>
        <FlexWrapper>
          <FlexWrapper $gap="10px" $width="240px">
            <Image src="./images/events/pin.png" $width="20px" />
            <Text>{location}</Text>
          </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper>
          <FlexWrapper $gap="10px" $width="240px">
            <Image src="./images/events/calendar.png" $width="20px" />
            <Text>{date}</Text>
          </FlexWrapper>
          <FlexWrapper $gap="10px" $width="100px">
            <Image
              $margin="0 0 0 -6px"
              src="./images/events/eur.png"
              $width="30px"
            />
            <Text>{price}</Text>
          </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper>
          <FlexWrapper $gap="10px" $width="240px">
            <Image
              $margin="0 0 0 -4px"
              src="./images/events/clock.png"
              $width="26px"
            />
            <Text>{from}</Text>
          </FlexWrapper>
          <FlexWrapper $gap="10px" $width="100px">
            <Image src="./images/events/users.png" $width="25px" />
            <Text>{`${
              confirmed_users ? confirmed_users.length + 1 : 0 + 1
            }/${max_members}`}</Text>
          </FlexWrapper>
        </FlexWrapper>
        {info && (
          <FlexWrapper
            $flexDirection="column"
            $borderBottom={`1px solid ${COLORS.saladGreen}`}
            $margin="0 0 15px 0"
            $padding="0 0 5px 0"
          >
            <StyledDisc>Papildoma informacija</StyledDisc>
            <FlexWrapper>{info}</FlexWrapper>
          </FlexWrapper>
        )}

        {!pending_users ? null : (
          <>
            {" "}
            {myEvent && (
              <FlexWrapper
                $alignItems="center"
                $justifyContent="space-between"
                $margin="0 0 15px 0"
              >
                <div>{`Laukia patvirtinimo: ${pending_users.length}`}</div>
                <SubmitButton width="100px" onClick={openInvitationWin}>
                  Perziurėti
                </SubmitButton>
                {showInvitationModal && modal_id === document_id && (
                  <InvitationModal
                    pending_users={pending_users}
                    event_id={document_id}
                  />
                )}
              </FlexWrapper>
            )}
          </>
        )}
      </FlexWrapper>
      {myEvent && (
        <SubmitButton
          onClick={handleDeleteEvent}
          color={COLORS.red}
          hover={COLORS.redHover}
        >
          TRINTI ĮVYKĮ
        </SubmitButton>
      )}
      {leaveEvent && (
        <SubmitButton
          onClick={handleLeaveEvent}
          color={COLORS.red}
          hover={COLORS.redHover}
        >
          PALIKTI ĮVYKĮ
        </SubmitButton>
      )}
      {joinEvent && (
        <SubmitButton
          onClick={pending_users ? null : handleJoinEvent}
          color={pending_users ? COLORS.black : COLORS.saladGreen}
          hover={pending_users ? COLORS.black : COLORS.hoverGreen}
        >
          {pending_users ? "LAUKIAMA ATSAKYMO" : "PRISIJUNGTI"}
        </SubmitButton>
      )}

      {showModal && doc_id === document_id && (
        <QuestionModal questions={questionList} doc_id={doc_id} />
      )}
    </FlexWrapper>
  );
};

const StyledDisc = styled.div`
  padding: 10px 0 15px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  text-align: center;
`;

const Text = styled.div`
  flex: 0.75;
  padding: 10px 0 15px 0;
  font-weight: 500;
  color: #000;
  font-size: 14px;
  text-align: ${(props) => props.$textAlign};
  margin: ${(props) => props.$margin};
`;
