import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../state/home/reducer";
import { Navigation } from "../../components/Navigation";
import { useEffect } from "react";
import { FlexWrapper } from "../../components/FlexWrapper";
import { homeSelector } from "../../state/home/selector";
import { Event } from "../../components/Event";
import { useQuery } from "../../styles/breakpoints";

export default function Home() {
  const { isTablet } = useQuery();
  const dispatch = useDispatch();
  const { events } = useSelector(homeSelector);
  useEffect(() => {
    dispatch(fetchEvents());
  }, []);
  return (
    <>
      <Navigation />
      {
        <FlexWrapper
          // $flexDirection="column"
          $alignItems="stretch"
          $gap="30px"
          $margin="50px auto"
          $maxWidth="710px"
          $flexWrap="wrap"
          $justifyContent={!isTablet && "center"}
        >
          {events.map(
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
                />
              );
            }
          )}
        </FlexWrapper>
      }
    </>
  );
}
