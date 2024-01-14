import styled from "styled-components";
import { theme } from "../../theme";
import { Text } from "../Text/Text";

export const ErrorMessage = styled(Text)`
  color: ${theme.colors.primary};
  margin: 5px 0 15px;
  text-align: center;
`
