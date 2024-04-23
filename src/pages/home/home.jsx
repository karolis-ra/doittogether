import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../state/home/reducer";
import { Navigation } from "../../components/Navigation";
import { useEffect } from "react";
import { FlexWrapper } from "../../components/FlexWrapper";
import { homeSelector } from "../../state/home/selector";
import { Event } from "../../components/Event";
import { useQuery } from "../../styles/breakpoints";
import { CenterWrap } from "../../components/CenterWrap";
import { auth } from "../../firebase/clientApp";
import { fetchUser } from "../../state/profileForm/reducer";
import { profileFormSelector } from "../../state/profileForm/selector";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Home() {
  const { isTablet } = useQuery();
  const { userInfo } = useSelector(profileFormSelector);
  const { events } = useSelector(homeSelector);
  const [userFetched, setUserFetched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEvents());

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserFetched(true);
        dispatch(fetchUser(auth.currentUser.uid));
        if (!userFetched) {
          console.log(userFetched);
        }
      } else {
        console.log("user not found");
      }
    });

    if (!userInfo.quizDone) {
      navigate("/profileQuiz");
    }
  }, []);

  const filteredEvents = events.filter(
    (event) => !event.confirmed_users && !event.pending_users
  );

  return (
    <>
      <Navigation />
      <CenterWrap>
        <FlexWrapper
          $alignItems="stretch"
          $gap="30px"
          $margin="50px auto"
          $maxWidth="710px"
          $flexWrap="wrap"
          $justifyContent={!isTablet && "center"}
        >
          {filteredEvents.map(
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
                confirmed_users,
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
                  confirmed_users={confirmed_users}
                  joinEvent={true}
                  pending_users={pending_users}
                />
              );
            }
          )}
        </FlexWrapper>
      </CenterWrap>
    </>
  );
}
