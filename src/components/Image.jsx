import styled from "styled-components";

export const Image = styled.img`
  align-self: ${(props) => props.$alignSelf};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "auto"};
  object-fit: ${(props) => props.$objectFit || "contain"};
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  margin-top: ${(props) => props.$marginTop};
  margin-bottom: ${(props) => props.$marginBottom};
  height: ${(props) => props.$height};
  max-height: ${(props) => props.$maxHeight};
  flex: ${(props) => props.$flex};
  position: ${(props) => props.$position};
  transform: ${(props) => props.$transform};
  z-index: ${(props) => props.$zIndex};
  cursor: ${(props) => props.$cursor};
`;
