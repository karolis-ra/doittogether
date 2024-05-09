import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../state/home/reducer";
import { Navigation } from "../../components/Navigation";
import { useEffect } from "react";
import { FlexWrapper } from "../../components/FlexWrapper";
import { homeSelector } from "../../state/home/selector";
import { Event } from "../../components/Event";
import { useQuery } from "../../styles/breakpoints";
import { auth } from "../../firebase/clientApp";
import { fetchUser } from "../../state/profileForm/reducer";
import { profileFormSelector } from "../../state/profileForm/selector";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";
import { fetchCurrentUser } from "../../state/profile/reducer";

export default function Home() {
  const { isTablet } = useQuery();
  const { userInfo } = useSelector(profileFormSelector);
  const { events } = useSelector(homeSelector);
  const [userFetched, setUserFetched] = useState(false);
  const [eventsToShow, setEventsToShow] = useState([]);
  const [userFound, setUserFound] = useState(false);
  const [physicalFilter, setPhysicalFilter] = useState("all");
  const [disciplineFilter, setDisciplineFilter] = useState("all");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const physicalLevels = ["Pradedantysis", "Pažengęs", "Ekspertas"];
  const sport_disciplines = [
    "Bėgimas",
    "Fitnesas",
    "Mtb dviračiai",
    "Gravel dviračiai",
    "Plento dviračiai",
  ];

  useEffect(() => {
    dispatch(fetchEvents());
    if (auth.currentUser) {
      dispatch(fetchCurrentUser(auth.currentUser.uid));
    }

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

    const filteredEvents = events.filter((event) => {
      const passPhysicalFilter =
        physicalFilter === "all" || event.physical_level === physicalFilter;
      const passDisciplineFilter =
        disciplineFilter === "all" || event.discipline === disciplineFilter;
      const notConfirmedUser = !event.confirmed_users;
      const notCurrentUserEvent = event.id !== auth.currentUser.uid;

      return (
        passPhysicalFilter &&
        passDisciplineFilter &&
        notConfirmedUser &&
        notCurrentUserEvent
      );
    });

    setEventsToShow(filteredEvents);
  }, [auth.currentUser]);

  const handlePhysicalFilter = (e) => {
    const physicalLevel = e.target.value;
    setPhysicalFilter(physicalLevel);
  };

  const handleDisciplineFilter = (e) => {
    const sport_disc = e.target.value;
    setDisciplineFilter(sport_disc);
  };

  return (
    <>
      <Navigation />
      <FlexWrapper $justifyContent="center">
        <StyledSelect onChange={handlePhysicalFilter}>
          <option value="all">FIZINIS PASIRUOŠIMAS</option>
          {physicalLevels.map((singleLevel, index) => {
            return (
              <option key={`${index} + 1`} value={singleLevel}>
                {singleLevel}
              </option>
            );
          })}
          <option value="all">Rodyti visus</option>
        </StyledSelect>
      </FlexWrapper>
      <FlexWrapper $justifyContent="center">
        <StyledSelect onChange={handleDisciplineFilter}>
          <option value="all">SPORTO ŠAKA</option>
          {sport_disciplines.map((singleDisc, index) => {
            return (
              <option key={`${index} + 1`} value={singleDisc}>
                {singleDisc}
              </option>
            );
          })}
          <option value="all">Rodyti visus</option>
        </StyledSelect>
      </FlexWrapper>
      <FlexWrapper
        $alignItems="stretch"
        $gap="30px"
        $margin="50px auto"
        $maxWidth="710px"
        $flexWrap="wrap"
        $justifyContent={!isTablet && "center"}
      >
        {eventsToShow.map(
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
    </>
  );
}

const StyledSelect = styled.select`
  border: 2px solid ${COLORS.saladGreen};
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  width: 180px;
  margin: 10px 0 0 0;
`;
