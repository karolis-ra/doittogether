import styled from "styled-components";

export const FlexWrapper = styled.div`
  display: flex;
  flex: ${(props) => props.$flex};
  width: ${(props) => props.$width};
  max-width: ${(props) => props.$maxWidth};
  min-width: ${(props) => props.$minWidth};
  margin: ${(props) => props.$margin};
  margin-top: ${(props) => props.$marginTop};
  margin-bottom: ${(props) => props.$marginBottom};
  margin-bottom: ${(props) => props.$marginBottom};
  gap: ${(props) => props.$gap || "0"};
  flex-direction: ${(props) => props.$flexDirection || "row"};
  gap: ${(props) => props.gap};
  background-color: ${(props) => props.$backgroundColor};
  border: ${(props) => props.$border};
  justify-content: ${(props) => props.$justifyContent};
  padding: ${(props) => props.$padding};
  align-items: ${(props) => props.$alignItems};
  align-self: ${(props) => props.$alignSelf};
  text-align: ${(props) => props.$textAlign};
  border-radius: ${(props) => props.$borderRadius};
  border-bottom-left-radius: ${(props) => props.$borderBottomLeftRadius};
  border-bottom-right-radius: ${(props) => props.$borderBottomRightRadius};
  border-bottom: ${(props) => props.$borderBottom};
  border-top: ${(props) => props.$borderTop};
  border-left: ${(props) => props.$borderLeft};
  border-right: ${(props) => props.$borderRight};
  height: ${(props) => props.$height};
  min-height: ${(props) => props.$minHeight};
  flex-wrap: ${(props) => props.$flexWrap};
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.$bgColor};
  background: ${(props) => props.$background}
  z-index: ${(props) => props.$zIndex};
  cursor: ${(props) => props.$cursor};
  max-height: ${(props) => props.$maxHeight};
  overflow: ${(props) => props.$overflow};
  color: ${(props) => props.$color};
  word-break: ${(props) => props.$wordBreak}
`;
