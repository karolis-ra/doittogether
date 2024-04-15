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

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector(profileSelector);
  const [userFound, setUserFound] = useState(false);
  const [eventsFetched, setEventsFetched] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const { events } = useSelector(homeSelector);

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
      console.log(myEvents);
    }
  }, [auth.currentUser, events]);

  return (
    <>
      <Navigation />
      <ProfileInfo user={user} />
      <FlexWrapper>
        <StyledText>SUKURTI IVYKIAI:</StyledText>
        <FlexWrapper $flexDirection="column">
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
                    />
                  );
                }
              )}
        </FlexWrapper>
      </FlexWrapper>
    </>
  );
}

const StyledText = styled.div`
  color: ${COLORS.black};
  text-align: center;
`;
