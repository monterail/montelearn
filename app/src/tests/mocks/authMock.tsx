jest.mock("../../utils/helpers/auth", () => {
  return {
    getAccessToken: () => "access-token-test",
    isAuthenticated: () => true,
  };
});

export {};
