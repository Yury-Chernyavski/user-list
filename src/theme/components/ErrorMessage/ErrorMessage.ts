import styled from "styled-components";
import { theme } from "../../theme";
import { Text } from "../Text/Text";

export const ErrorMessage = styled(Text)`
  color: ${theme.colors.primary};
  font-size: 14px;
  margin: 2px 0 5px;
  text-align: center;
`
