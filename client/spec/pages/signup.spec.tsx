import { render, fireEvent, screen, act, waitFor } from "../test-utils";
import SignUpPage from "../../pages/signup";
import Message from "../../components/Message";
import React from "react";

const mockedUserCreate = jest.fn(() =>
  Promise.resolve({
    data: { userCreate: {} },
  })
);

jest.mock("../../generated/graphql", () => ({
  useUserCreateMutation: () => [mockedUserCreate, { data: {} }],
}));

describe("SignupPage", () => {
  beforeEach(async () => {
    render(<><SignUpPage /><Message /></>);
    await act(async () => {
      const firstName = screen
        .getByTestId("firstName")
        .querySelector("input") as HTMLElement;
      fireEvent.change(firstName, {
        target: { value: "John" },
      });
      const lastName = screen
        .getByTestId("lastName")
        .querySelector("input") as HTMLElement;
      fireEvent.change(lastName, {
        target: { value: "Doe" },
      });
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
      fireEvent.click(screen.getByText("Sign Up"));
    });
  });

  it("calls userCreate mutation", () => {
    expect(mockedUserCreate).toBeCalledWith({
      variables: {
        input: {
          userInput: {
            email: "johndoe@email.com",
            firstName: "John",
            lastName: "Doe",
            password: "weakpassword",
          },
        },
      },
    });
  });
});
