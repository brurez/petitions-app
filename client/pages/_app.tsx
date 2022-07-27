import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import Message from "../components/Message";
import { StoreProvider } from "../components/StoreProvider";
import { Settings } from "luxon";

// Sets the default localization to display time
Settings.defaultLocale = "en";

function MyApp({ Component, pageProps }: AppProps) {
  // gets the Apollo GraphQL client and set it into React Context
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <StoreProvider>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Message />
        </ApolloProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
