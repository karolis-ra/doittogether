import { CenterWrap } from "../../components/CenterWrap";
import { FlexWrapper } from "../../components/FlexWrapper";
import { COLORS } from "../../styles/colors";
import styled from "styled-components";
import { DefaultButton } from "../../components/DefaultButton";
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

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector(profileSelector);
  const [userFound, setUserFound] = useState(false);
  const [eventsFetched, setEventsFetched] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
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

      const filteredPendingEvents = events.filter((event) => {
        if (event.pending_users && Array.isArray(event.pending_users)) {
          return event.pending_users.some(
            (user) => user.id === auth.currentUser.uid
          );
        }
        return false;
      });

      setPendingEvents(filteredPendingEvents);
      setMyEvents(filteredEvents);
    }
  }, [auth.currentUser, events]);

  return (
    <FlexWrapper $flexDirection="column" $backgroundColor={COLORS.bgGray}>
      <Navigation />
      <FlexWrapper
        $width="100%"
        $borderBottom={`1px solid ${COLORS.gray}`}
        $margin="20px 0"
        $padding="0 0 20px 20px"
      >
        <div>{user.name}</div>
      </FlexWrapper>
      <ProfileInfo user={user} />
      <FlexWrapper
        $flexDirection="row"
        $flexWrap="wrap"
        $width={isTablet ? "50%" : "380px"}
        $margin="0 auto"
      >
        <FlexWrapper
          $flex="1"
          $flexDirection="column"
          $alignItems="center"
          $margin="25px 0 0 0"
        >
          <StyledText>MANO ĮVYKIAI</StyledText>
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
        >
          <StyledText>ĮVYKIAI, KURIUOSE AŠ DALYVIS</StyledText>
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
              : myEvents.map(
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
`;
