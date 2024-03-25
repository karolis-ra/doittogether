import { FlexWrapper } from "./FlexWrapper";

export const CenterWrap = ({ children }) => {
  return (
    <FlexWrapper $height="100vh" width="100%">
      {children}
    </FlexWrapper>
  );
};
