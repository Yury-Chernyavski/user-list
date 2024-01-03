import React from "react";
import { MainHeaderStyles } from "./MainHeader.styles";

export const MainHeader = () => {
  return (
    <MainHeaderStyles>
      <h3 className="user">Users</h3>
      <h3 className="email">Email</h3>
    </MainHeaderStyles>
  );
};
