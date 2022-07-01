import { render, fireEvent, screen, act, waitFor } from "../test-utils";
import Message from "../../components/Message";
import React from "react";
import LogInPage from "../../pages/login";

const mockedUserLogin = jest.fn(() =>
  Promise.resolve({
    data: { userLogin: {} },
  })
);

jest.mock("../../generated/graphql", () => ({
  useUserLoginMutation: () => [mockedUserLogin, { data: {} }],
}));

describe("LoginPage", () => {
  describe("when filling the form and submitting", () => {
    beforeEach(async () => {
      render(
        <>
          <LogInPage />
          <Message />
        </>
      );
      await act(async () => {
        const email = screen
          .getByTestId("email")
          .querySelector("input") as HTMLElement;
        fireEvent.change(email, {
          target: { value: "johndoe@email.com" },
        });
        const password = screen
          .getByTestId("password")
          .querySelector("input") as HTMLElement;
        fireEvent.change(password, {
          target: { value: "weakpassword" },
        });
        fireEvent.click(screen.getByText("Log In"));
      });
    });

    it("calls userLogin mutation", () => {
      expect(mockedUserLogin).toBeCalledWith({
        variables: {
          input: {
            userLoginInput: {
              email: "johndoe@email.com",
              password: "weakpassword",
            },
          },
        },
      });
    });
  });
});
