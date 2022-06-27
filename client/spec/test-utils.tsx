import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import gqlClient from "../lib/gqlClient";
import { ApolloProvider } from "@apollo/client";
import { StoreProvider } from "../lib/StoreContext";

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoreProvider>
      <ApolloProvider client={gqlClient}>{children}</ApolloProvider>
    </StoreProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
