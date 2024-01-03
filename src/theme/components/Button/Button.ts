import styled from "styled-components";
import { theme } from "../../theme";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";


interface IButton
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: "primary";
}

export const Button = styled.button<IButton>`
  width: 100px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
  border-radius: 10px;
  background-color: transparent;
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.text};
  transition: background-color 0.5s ease-out;

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
  }

  &.primary {
    background-color: ${theme.colors.primary};
    border: none;
    color: white;
  }

  &.primary:hover {
    background-color: ${theme.colors.secondary};
  }
`;
