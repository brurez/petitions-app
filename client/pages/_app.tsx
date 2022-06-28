import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import gqlClient from "../lib/gqlClient";
import { ApolloProvider } from "@apollo/client";
import { StoreProvider } from "../lib/StoreContext";
import Message from "../components/Message";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ApolloProvider client={gqlClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Message />
      </ApolloProvider>
    </StoreProvider>
  );
}

export default MyApp;
