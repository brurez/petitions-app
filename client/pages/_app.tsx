import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import gqlClient from "../lib/gqlClient";
import { ApolloProvider } from "@apollo/client";
import Message from "../components/Message";
import { StoreProvider } from "../components/StoreProvider";
import { LoadScript } from "@react-google-maps/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ApolloProvider client={gqlClient}>
        <LoadScript
          googleMapsApiKey={String(process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY)}
          libraries={["places"]}
          language={"en"}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Message />
        </LoadScript>
      </ApolloProvider>
    </StoreProvider>
  );
}

export default MyApp;
