import { render, cleanup } from "@testing-library/react";

import ResetPassword from "../reset-password";

describe("ResetPassword", () => {
  afterEach(cleanup);
  const testId = "fake_id";
  const testToken = "fake_token";

  describe("props", () => {
    it("renders props co=ause why nt", () => {
      render(<ResetPassword uid={testId} token={testToken} />);
    });
  });
  describe("behaviour", () => {
    it("renders password reset form form", async () => {
      const { findByText, findByLabelText } = render(
        <ResetPassword uid={testId} token={testToken} />,
      );
      const buttonElement = await findByText(/submit/i);

      expect(await findByLabelText(/new password/i)).toBeInTheDocument();
      expect(await findByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent(/submit/i);
    });
  });
});
