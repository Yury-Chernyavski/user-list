import React, { FC, FormEvent, useState } from "react";
import { Button, FormWrapper, Input, Title } from "../../theme/components";
import { addUser } from "../../store/reducers/allUsersSlice";
import { useAppDispatch } from "../../store/hoocks";
import { TAddUser } from "../../models";
import { addUserFormData } from "../../helpers/FormFields.helper";
import { AddUserFromStyles } from "./AddUserFrom.styles.";
import { MdOutlineClose } from "react-icons/md";

const initialState: TAddUser = {
  first_name: "",
  last_name: "",
  email: ""
};

interface IAddUserForm {
  setAddUserIsOpen: (isOpen: boolean) => void;
}

export const AddUserForm: FC<IAddUserForm> = ({ setAddUserIsOpen }) => {
  const dispatch = useAppDispatch();

  const [newUsersData, setNewUsersData] = useState<TAddUser>(initialState);

  const addUserHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newUsersData.first_name.length && newUsersData.last_name.length &&
      newUsersData.email.length) {
      dispatch(addUser(newUsersData));
      setNewUsersData(initialState);
      setAddUserIsOpen(false);
    }
  };


  return (
    <AddUserFromStyles>
      <FormWrapper>
        <Title>Add user</Title>
        <form onSubmit={addUserHandle}>
          {addUserFormData.map(i => (
            <Input
              key={i.id}
              type={i.type}
              value={newUsersData?.[i.value]}
              onChange={(e) => setNewUsersData({
                ...newUsersData,
                [i.value]: e.target.value
              })}
              placeholder={i.title}
            />
          ))}
          <Button
            className="primary"
            type="submit"
          >Submit</Button>
        </form>
      </FormWrapper>
      <MdOutlineClose
        size="25"
        onClick={() => setAddUserIsOpen(false)}
      />
    </AddUserFromStyles>
  );
};
