import { ApolloClient, InMemoryCache } from "@apollo/client";

const gqlClient = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});

export default gqlClient;
