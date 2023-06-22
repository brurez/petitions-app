import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import Message from "../components/Message";
import { StoreProvider } from "../components/StoreProvider";
import { Settings } from "luxon";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../lib/createEmoticonCache";

// Sets the default localization to display time
Settings.defaultLocale = "en";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppProps & { emotionCache?: any }) {
  // gets the Apollo GraphQL client and set it into React Context
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps);
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Message />
        </ApolloProvider>
      </StoreProvider>
    </CacheProvider>
  );
}

export default MyApp;
