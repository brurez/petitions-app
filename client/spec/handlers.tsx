import {graphql} from "msw";

export const handlers = [
    graphql.query("User", (_req, res, ctx) => {
        return res(
            ctx.data({
                user: {
                    id: "2",
                    firstName: "Bruno",
                    lastName: "de Rezende",
                    email: "brurez@hotmail.com",
                    createdAt: "2022-07-04T19:45:22Z",
                    updatedAt: "2022-07-04T19:45:22Z",
                    __typename: "User",
                },
            })
        );
    }),
    graphql.mutation("userLogin", (_req, res, ctx) => {
        return res(
            ctx.data({
                userLogin: {
                    user: {
                        id: "2",
                        firstName: "Bruno",
                        lastName: "de Rezende",
                        email: "brurez@hotmail.com",
                        createdAt: "2022-07-04T19:45:22Z",
                        updatedAt: "2022-07-04T19:45:22Z",
                        __typename: "User",
                    },
                    token:
                        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTY1NzA1MzYxNX0.XAlGu5mG3adaBQ3hUkosMcqSUA-Nu_C3pBjbufIlc3k",
                    __typename: "UserToken",
                },
            })
        );
    })
]
