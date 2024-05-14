import { FlexWrapper } from "../../components/FlexWrapper";
import { COLORS } from "../../styles/colors";
import styled from "styled-components";
import { Navigation } from "../../components/Navigation";
import { useSelector } from "react-redux";
import { homeSelector } from "../../state/home/selector";
import { auth } from "../../firebase/clientApp";
import { useEffect } from "react";
import { useState } from "react";
import { Event } from "../../components/Event";
import { fetchEvents } from "../../state/home/reducer";
import { fetchCurrentUser } from "../../state/profile/reducer";
import { useDispatch } from "react-redux";
import { profileSelector } from "../../state/profile/selector";
import { ProfileInfo } from "../../components/ProfileInfo";
import { useQuery } from "../../styles/breakpoints";
import { Image } from "../../components/Image";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, confirmed } = useSelector(profileSelector);
  const [userFound, setUserFound] = useState(false);
  const [eventsFetched, setEventsFetched] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const [guestEvents, setGuestEvents] = useState([]);
  const { events } = useSelector(homeSelector);
  const { isTablet } = useQuery();
  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
      setEventsFetched(true);
    }

    if (auth.currentUser) {
      if (!userFound) {
        dispatch(fetchCurrentUser(auth.currentUser.uid));
      }
      setUserFound(true);
      let filteredEvents = events.filter((event) => {
        return event.id === auth.currentUser.uid;
      });

      let filteredGuestEvents = events.filter((event) => {
        if (event.confirmed_users && Array.isArray(event.confirmed_users)) {
          return event.confirmed_users.some(
            (user) => user.user_id === auth.currentUser.uid
          );
        }
        return false;
      });

      setGuestEvents(filteredGuestEvents);
      setMyEvents(filteredEvents);
    }
  }, [auth.currentUser, events]);

  return (
    <FlexWrapper
      $flexDirection="column"
      $backgroundColor={COLORS.bgGray}
      $height="100%"
    >
      <Navigation />
      <FlexWrapper
        $width="100%"
        $borderBottom={`1px solid ${COLORS.gray}`}
        $margin="20px 0"
        $padding="0 20px 20px 20px"
        $justifyContent="flex-end"
      >
        <FlexWrapper $gap="15px" $alignItems="center">
          <Image
            src={
              user.gender === "Vyras"
                ? "/images/profile/male.png"
                : "/images/profile/female.png"
            }
            $width="30px"
          />
          {user.name}
        </FlexWrapper>
      </FlexWrapper>
      <ProfileInfo user={user} />
      <FlexWrapper
        $flexDirection="row"
        $flexWrap="wrap"
        $width={isTablet ? "50%" : "380px"}
        $margin="25px auto"
        gap="25px"
      >
        <FlexWrapper
          $flex="1"
          $flexDirection="column"
          $alignItems="center"
          $margin="25px 0 0 0"
          $backgroundColor={COLORS.white}
          $borderRadius="5px"
          $minWidth="360px"
        >
          <StyledText>MANO SUKURTI ĮVYKIAI</StyledText>
          {myEvents.length === 0 && <StyledNote>Įvykių nėra</StyledNote>}
          <FlexWrapper
            $alignItems="stretch"
            $gap="30px"
            $margin="25px auto"
            $flexWrap="wrap"
            $justifyContent="center"
            $maxWidth="360px"
          >
            {!userFound
              ? "loading"
              : myEvents.map(
                  (
                    {
                      date,
                      discipline,
                      physical_level,
                      location,
                      info,
                      id,
                      price,
                      questionList,
                      time_from,
                      participants,
                      document_id,
                      pending_users,
                      confirmed_users,
                      contacts,
                      name,
                    },
                    index
                  ) => {
                    return (
                      <Event
                        date={date}
                        discipline={discipline}
                        physical_level={physical_level}
                        location={location}
                        max_members="2"
                        info={info}
                        id={id}
                        price={price}
                        questionList={questionList}
                        from={time_from}
                        participants={participants}
                        document_id={document_id}
                        key={`event-${index}`}
                        pending_users={pending_users}
                        confirmed_users={confirmed_users}
                        contacts={contacts}
                        name={name}
                        myEvent={true}
                      />
                    );
                  }
                )}
          </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper
          $flex="1"
          $flexDirection="column"
          $alignItems="center"
          $margin={isTablet && "25px 0 0 0"}
          $backgroundColor={COLORS.white}
          $borderRadius="5px"
          $minWidth="360px"
        >
          <StyledText>ĮVYKIAI, KURIUOSE AŠ DALYVIS</StyledText>
          {guestEvents.length === 0 && <StyledNote>Įvykių nėra</StyledNote>}
          <FlexWrapper
            $alignItems="stretch"
            $gap="30px"
            $margin="25px auto"
            $maxWidth="380px"
            $flexWrap="wrap"
            $justifyContent="center"
          >
            {!userFound
              ? "loading"
              : guestEvents.map(
                  (
                    {
                      date,
                      discipline,
                      physical_level,
                      location,
                      max_members,
                      info,
                      id,
                      price,
                      questionList,
                      time_from,
                      participants,
                      document_id,
                      pending_users,
                      confirmed_users,
                      contacts,
                      name,
                    },
                    index
                  ) => {
                    return (
                      <Event
                        date={date}
                        discipline={discipline}
                        physical_level={physical_level}
                        location={location}
                        max_members="2"
                        info={info}
                        id={id}
                        price={price}
                        questionList={questionList}
                        from={time_from}
                        participants={participants}
                        document_id={document_id}
                        key={`event-${index}`}
                        pending_users={pending_users}
                        confirmed_users={confirmed_users}
                        contacts={contacts}
                        name={name}
                        leaveEvent={true}
                      />
                    );
                  }
                )}
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
}

const StyledText = styled.div`
  color: ${COLORS.black};
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  padding: 10px 0;
  border-bottom: 2px solid ${COLORS.saladGreen};
`;

const StyledNote = styled.div`
  padding: 25px 0;
  color: ${COLORS.hoverGreen};
  font-weight: 600;
`;
