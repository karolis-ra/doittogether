import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../state/home/reducer";
import { Navigation } from "../../components/Navigation";
import { useEffect } from "react";
import { FlexWrapper } from "../../components/FlexWrapper";
import { homeSelector } from "../../state/home/selector";
import { Event } from "../../components/Event";

export default function Home() {
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
          $flexDirection="column"
          $alignItems="center"
          $gap="30px"
          $margin="30px 0"
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
              },
              index
            ) => {
              return (
                <Event
                  date={date}
                  discipline={discipline}
                  physical_level={physical_level}
                  location={location}
                  max_members={max_members}
                  info={info}
                  id={id}
                  price={price}
                  questionList={questionList}
                  from={time_from}
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
