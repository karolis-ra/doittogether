import { FlexWrapper } from "./FlexWrapper";
import { Navigation } from "./Navigation";
export const CenterWrap = ({ children }) => {
  return (
    <FlexWrapper $height="100vh" width="100%">
      {children}
    </FlexWrapper>
  );
};
