import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import {useRouter} from "next/router";
import {StoreProvider} from "../components/StoreProvider";
import {createApolloClient} from "../lib/apolloClient";

jest.mock('next/router');

let eventName;
let routeChangeHandler;

// @ts-ignore
useRouter.mockImplementation(() => {
    return {
        events: {
            on: jest.fn((event, callback) => {
                eventName = event;
                routeChangeHandler = callback;
            }),
            off: jest.fn((event, callback) => {
                eventName = event;
                routeChangeHandler = callback;
            }),
        },
        push: jest.fn()
    };
});

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoreProvider>
      <ApolloProvider client={createApolloClient()}>
        {children}
      </ApolloProvider>
    </StoreProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
