import { COLORS } from "../styles/colors";
import { FlexWrapper } from "./FlexWrapper";
import { Navigation } from "./Navigation";
export const CenterWrap = ({ children, flexDirection }) => {
  return (
    <FlexWrapper
      width="100%"
      $backgroundColor={COLORS.bgGray}
      $flexDirection={flexDirection}
    >
      {children}
    </FlexWrapper>
  );
};
