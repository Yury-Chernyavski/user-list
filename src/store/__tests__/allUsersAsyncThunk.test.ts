import { fetchUsers } from "../reducers/allUsersSlice";

describe("usersThunk", () => {
  it("should fetch users with resolved response", async () => {
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

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUsers)
    });

    const dispatch = jest.fn();
    const thunk = fetchUsers();
    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe("users/fetch/pending");
    // expect(end[0].type).toBe("users/fetch/resolve");
    // expect(end[0].payload).toBe(mockUsers);
  });

  // it.todo("should fetch users with rejected response");
});

