import allUsersReducer, {fetchUsers} from "../reducers/allUsersSlice"

const initialState = {
  usersListData: null,
  loading: false,
  error: null
};

const mockUsers = {
  page: 1,
  per_page: 10,
  total: 20,
  total_pages: 4,
  data: [{
    id: 1,
    first_name: "Peter",
    last_name: "Peterson",
    email: "peter@test.com",
    display_picture: "path/to/image.jpg"
  }]
};



describe("allUsersSlice", () => {
  it("should add all users to store", () => {
    const store = allUsersReducer(initialState, fetchUsers.fulfilled(mockUsers, "", undefined));
    expect(store).toEqual({
      usersListData: mockUsers,
      loading: false,
      error: null
    })
  });
});
