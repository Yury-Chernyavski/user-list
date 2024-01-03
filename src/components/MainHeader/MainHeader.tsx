import React, { useState } from "react";
import { MainHeaderStyles } from "./MainHeader.styles";
import { Button } from "../../theme/components";
import { AddUserForm } from "../AddUserForm/AddUserForm";

export const MainHeader = () => {
  const [addUserIsOpen, setAddUserIsOpen] = useState(false);

  return (
    <MainHeaderStyles>
      <h3 className="user">Users</h3>
      <h3 className="email">Email</h3>
      <Button
        onClick={() => setAddUserIsOpen(true)}
        className="primary"
      >Add user</Button>
      {addUserIsOpen && <AddUserForm setAddUserIsOpen={setAddUserIsOpen}/>}
    </MainHeaderStyles>
  );
};
