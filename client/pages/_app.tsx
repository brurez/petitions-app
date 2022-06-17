import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/Layout";
import gqlClient from "../lib/gqlClient";
import {ApolloProvider} from "@apollo/client";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ApolloProvider client={gqlClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
}

export default MyApp
