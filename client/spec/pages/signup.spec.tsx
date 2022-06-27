import { render, fireEvent, screen } from "../test-utils";
import SignUpPage from "../../pages/signup";
import { MockedProvider } from "@apollo/client/testing";
import { useUserCreateMutation } from "../../generated/graphql";

const mockedUserCreate = jest.fn(() => Promise.resolve());

jest.mock("../../generated/graphql", () => ({
  useUserCreateMutation: () => [mockedUserCreate, { data: {}}],
}));

describe("SignupPage", () => {
  it("calls userCreate mutation", () => {
    render(
      <MockedProvider>
        <SignUpPage />
      </MockedProvider>
    );
    fireEvent.click(screen.getByText("Sign Up"));
    expect(mockedUserCreate).toBeCalled();
  });
});
