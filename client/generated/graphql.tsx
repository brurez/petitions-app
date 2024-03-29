import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  ModelID: any;
};

export type Comment = {
  __typename?: 'Comment';
  commentText?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ModelID'];
  petitionId: Scalars['Int'];
  updatedAt: Scalars['ISO8601DateTime'];
  user?: Maybe<User>;
  userId: Scalars['Int'];
};

/** Autogenerated input type of CommentCreate */
export type CommentCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  commentInput: CommentInput;
};

/** Autogenerated return type of CommentCreate */
export type CommentCreatePayload = {
  __typename?: 'CommentCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comment: Comment;
};

export type CommentInput = {
  commentText?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['ISO8601DateTime']>;
  id?: InputMaybe<Scalars['ModelID']>;
  petitionId?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['ISO8601DateTime']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type CredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MediaFile = {
  __typename?: 'MediaFile';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ModelID'];
  petitionId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['ISO8601DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new comment */
  commentCreate?: Maybe<CommentCreatePayload>;
  /** Creates a new petition */
  petitionCreate?: Maybe<PetitionCreatePayload>;
  /** Deletes a petition by ID */
  petitionDelete?: Maybe<PetitionDeletePayload>;
  /** Updates a petition by id */
  petitionUpdate?: Maybe<PetitionUpdatePayload>;
  /** Creates a new user */
  userCreate?: Maybe<UserToken>;
  /** Deletes a user by ID */
  userDelete?: Maybe<UserDeletePayload>;
  /** Login user */
  userLogin?: Maybe<UserToken>;
  /** Updates a user by id */
  userUpdate?: Maybe<UserUpdatePayload>;
  /** Creates a new vote */
  voteCreate?: Maybe<VoteCreatePayload>;
};


export type MutationCommentCreateArgs = {
  input: CommentCreateInput;
};


export type MutationPetitionCreateArgs = {
  input: PetitionCreateInput;
};


export type MutationPetitionDeleteArgs = {
  input: PetitionDeleteInput;
};


export type MutationPetitionUpdateArgs = {
  input: PetitionUpdateInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  input: UserDeleteInput;
};


export type MutationUserLoginArgs = {
  input: UserLoginInput;
};


export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
};


export type MutationVoteCreateArgs = {
  input: VoteCreateInput;
};

export type Petition = {
  __typename?: 'Petition';
  address?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  comments: Array<Comment>;
  country: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  description: Scalars['String'];
  id: Scalars['ModelID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mediaFileIds: Array<Scalars['ModelID']>;
  mediaFiles: Array<MediaFile>;
  numberOfVotes: Scalars['Int'];
  postalCode?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
  user?: Maybe<User>;
  userId: Scalars['Int'];
};

/** Autogenerated input type of PetitionCreate */
export type PetitionCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  petitionInput: PetitionInput;
};

/** Autogenerated return type of PetitionCreate */
export type PetitionCreatePayload = {
  __typename?: 'PetitionCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  petition: Petition;
};

/** Autogenerated input type of PetitionDelete */
export type PetitionDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of PetitionDelete */
export type PetitionDeletePayload = {
  __typename?: 'PetitionDeletePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  petition: Petition;
};

export type PetitionInput = {
  address?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ModelID']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mediaFileIds?: InputMaybe<Array<Scalars['ModelID']>>;
  postalCode?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  title: Scalars['String'];
};

/** Autogenerated input type of PetitionUpdate */
export type PetitionUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  petitionInput: PetitionInput;
};

/** Autogenerated return type of PetitionUpdate */
export type PetitionUpdatePayload = {
  __typename?: 'PetitionUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  petition: Petition;
};

export type Query = {
  __typename?: 'Query';
  /** Get petition */
  petition: Petition;
  /** Get petition media file */
  petitionMediaFile: MediaFile;
  /** Get petitions list */
  petitions: Array<Petition>;
  /** Get user */
  user: User;
};


export type QueryPetitionArgs = {
  id: Scalars['Int'];
};


export type QueryPetitionMediaFileArgs = {
  id: Scalars['Int'];
};


export type QueryPetitionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  region?: InputMaybe<RegionInput>;
  search?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ModelID']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type RegionInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  radius: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['ISO8601DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ModelID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated input type of UserCreate */
export type UserCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  userInput: UserInput;
};

/** Autogenerated input type of UserDelete */
export type UserDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UserDelete */
export type UserDeletePayload = {
  __typename?: 'UserDeletePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  user: User;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

/** Autogenerated input type of UserLogin */
export type UserLoginInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  userLoginInput: CredentialsInput;
};

export type UserToken = {
  __typename?: 'UserToken';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** Autogenerated input type of UserUpdate */
export type UserUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  userInput: UserInput;
};

/** Autogenerated return type of UserUpdate */
export type UserUpdatePayload = {
  __typename?: 'UserUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  user: User;
};

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ModelID'];
  petitionId: Scalars['Int'];
  updatedAt: Scalars['ISO8601DateTime'];
  userId: Scalars['Int'];
};

/** Autogenerated input type of VoteCreate */
export type VoteCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  voteInput: VoteInput;
};

/** Autogenerated return type of VoteCreate */
export type VoteCreatePayload = {
  __typename?: 'VoteCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  vote: Vote;
};

export type VoteInput = {
  createdAt?: InputMaybe<Scalars['ISO8601DateTime']>;
  id?: InputMaybe<Scalars['ModelID']>;
  petitionId: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['ISO8601DateTime']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type CommentCreateMutationVariables = Exact<{
  input: CommentCreateInput;
}>;


export type CommentCreateMutation = { __typename?: 'Mutation', commentCreate?: { __typename?: 'CommentCreatePayload', comment: { __typename?: 'Comment', id: any } } | null };

export type CurrentUserFragment = { __typename?: 'User', id: any, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any };

export type MediaFileFieldsFragment = { __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null };

export type PetitionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PetitionQuery = { __typename?: 'Query', petition: { __typename?: 'Petition', id: any, title: string, description: string, numberOfVotes: number, latitude: number, longitude: number, address?: string | null, city: string, state: string, country: string, postalCode?: string | null, createdAt: any, updatedAt: any, userId: number, mediaFileIds: Array<any>, mediaFiles: Array<{ __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null }> } };

export type PetitionCreateMutationVariables = Exact<{
  input: PetitionCreateInput;
}>;


export type PetitionCreateMutation = { __typename?: 'Mutation', petitionCreate?: { __typename?: 'PetitionCreatePayload', petition: { __typename?: 'Petition', id: any, title: string, description: string, numberOfVotes: number, latitude: number, longitude: number, address?: string | null, city: string, state: string, country: string, postalCode?: string | null, createdAt: any, updatedAt: any, userId: number, mediaFileIds: Array<any>, mediaFiles: Array<{ __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null }> } } | null };

export type PetitionDeleteMutationVariables = Exact<{
  input: PetitionDeleteInput;
}>;


export type PetitionDeleteMutation = { __typename?: 'Mutation', petitionDelete?: { __typename?: 'PetitionDeletePayload', petition: { __typename?: 'Petition', id: any } } | null };

export type PetitionDetailFieldsFragment = { __typename?: 'Petition', id: any, title: string, description: string, numberOfVotes: number, latitude: number, longitude: number, address?: string | null, city: string, state: string, country: string, postalCode?: string | null, createdAt: any, updatedAt: any, userId: number, mediaFileIds: Array<any>, mediaFiles: Array<{ __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null }>, user?: { __typename?: 'User', firstName: string, lastName: string } | null, comments: Array<{ __typename?: 'Comment', commentText?: string | null, createdAt: any, user?: { __typename?: 'User', firstName: string, lastName: string } | null }> };

export type PetitionDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PetitionDetailsQuery = { __typename?: 'Query', petition: { __typename?: 'Petition', id: any, title: string, description: string, numberOfVotes: number, latitude: number, longitude: number, address?: string | null, city: string, state: string, country: string, postalCode?: string | null, createdAt: any, updatedAt: any, userId: number, mediaFileIds: Array<any>, mediaFiles: Array<{ __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null }>, user?: { __typename?: 'User', firstName: string, lastName: string } | null, comments: Array<{ __typename?: 'Comment', commentText?: string | null, createdAt: any, user?: { __typename?: 'User', firstName: string, lastName: string } | null }> } };

export type PetitionFieldsFragment = { __typename?: 'Petition', id: any, title: string, description: string, numberOfVotes: number, latitude: number, longitude: number, address?: string | null, city: string, state: string, country: string, postalCode?: string | null, createdAt: any, updatedAt: any, userId: number, mediaFileIds: Array<any>, mediaFiles: Array<{ __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null }> };

export type PetitionMediaFileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PetitionMediaFileQuery = { __typename?: 'Query', petitionMediaFile: { __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null } };

export type PetitionUpdateMutationVariables = Exact<{
  input: PetitionUpdateInput;
}>;


export type PetitionUpdateMutation = { __typename?: 'Mutation', petitionUpdate?: { __typename?: 'PetitionUpdatePayload', petition: { __typename?: 'Petition', id: any, title: string, description: string, numberOfVotes: number, latitude: number, longitude: number, address?: string | null, city: string, state: string, country: string, postalCode?: string | null, createdAt: any, updatedAt: any, userId: number, mediaFileIds: Array<any>, mediaFiles: Array<{ __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null }> } } | null };

export type PetitionsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<RegionInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['ModelID']>;
}>;


export type PetitionsQuery = { __typename?: 'Query', petitions: Array<{ __typename?: 'Petition', id: any, title: string, description: string, numberOfVotes: number, latitude: number, longitude: number, address?: string | null, city: string, state: string, country: string, postalCode?: string | null, createdAt: any, updatedAt: any, userId: number, mediaFileIds: Array<any>, mediaFiles: Array<{ __typename?: 'MediaFile', createdAt: any, id: any, petitionId?: number | null, updatedAt: any, url?: string | null }> }> };

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: any, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any } };

export type UserCreateMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type UserCreateMutation = { __typename?: 'Mutation', userCreate?: { __typename?: 'UserToken', token?: string | null, user?: { __typename?: 'User', id: any, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any } | null } | null };

export type UserLoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin?: { __typename?: 'UserToken', token?: string | null, user?: { __typename?: 'User', id: any, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any } | null } | null };

export type VoteCreateMutationVariables = Exact<{
  input: VoteCreateInput;
}>;


export type VoteCreateMutation = { __typename?: 'Mutation', voteCreate?: { __typename?: 'VoteCreatePayload', vote: { __typename?: 'Vote', id: any } } | null };

export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on User {
  id
  firstName
  lastName
  email
  createdAt
  updatedAt
}
    `;
export const MediaFileFieldsFragmentDoc = gql`
    fragment MediaFileFields on MediaFile {
  createdAt
  id
  petitionId
  updatedAt
  url
}
    `;
export const PetitionDetailFieldsFragmentDoc = gql`
    fragment PetitionDetailFields on Petition {
  id
  title
  description
  numberOfVotes
  latitude
  longitude
  address
  city
  state
  country
  postalCode
  createdAt
  updatedAt
  userId
  mediaFiles {
    ...MediaFileFields
  }
  user {
    firstName
    lastName
  }
  mediaFileIds
  comments {
    commentText
    createdAt
    user {
      firstName
      lastName
    }
  }
}
    ${MediaFileFieldsFragmentDoc}`;
export const PetitionFieldsFragmentDoc = gql`
    fragment PetitionFields on Petition {
  id
  title
  description
  numberOfVotes
  latitude
  longitude
  address
  city
  state
  country
  postalCode
  createdAt
  updatedAt
  userId
  mediaFiles {
    ...MediaFileFields
  }
  mediaFileIds
}
    ${MediaFileFieldsFragmentDoc}`;
export const CommentCreateDocument = gql`
    mutation CommentCreate($input: CommentCreateInput!) {
  commentCreate(input: $input) {
    comment {
      id
    }
  }
}
    `;
export type CommentCreateMutationFn = Apollo.MutationFunction<CommentCreateMutation, CommentCreateMutationVariables>;

/**
 * __useCommentCreateMutation__
 *
 * To run a mutation, you first call `useCommentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentCreateMutation, { data, loading, error }] = useCommentCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommentCreateMutation(baseOptions?: Apollo.MutationHookOptions<CommentCreateMutation, CommentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentCreateMutation, CommentCreateMutationVariables>(CommentCreateDocument, options);
      }
export type CommentCreateMutationHookResult = ReturnType<typeof useCommentCreateMutation>;
export type CommentCreateMutationResult = Apollo.MutationResult<CommentCreateMutation>;
export type CommentCreateMutationOptions = Apollo.BaseMutationOptions<CommentCreateMutation, CommentCreateMutationVariables>;
export const PetitionDocument = gql`
    query Petition($id: Int!) {
  petition(id: $id) {
    ...PetitionFields
  }
}
    ${PetitionFieldsFragmentDoc}`;

/**
 * __usePetitionQuery__
 *
 * To run a query within a React component, call `usePetitionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePetitionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePetitionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePetitionQuery(baseOptions: Apollo.QueryHookOptions<PetitionQuery, PetitionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PetitionQuery, PetitionQueryVariables>(PetitionDocument, options);
      }
export function usePetitionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PetitionQuery, PetitionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PetitionQuery, PetitionQueryVariables>(PetitionDocument, options);
        }
export type PetitionQueryHookResult = ReturnType<typeof usePetitionQuery>;
export type PetitionLazyQueryHookResult = ReturnType<typeof usePetitionLazyQuery>;
export type PetitionQueryResult = Apollo.QueryResult<PetitionQuery, PetitionQueryVariables>;
export const PetitionCreateDocument = gql`
    mutation PetitionCreate($input: PetitionCreateInput!) {
  petitionCreate(input: $input) {
    petition {
      ...PetitionFields
    }
  }
}
    ${PetitionFieldsFragmentDoc}`;
export type PetitionCreateMutationFn = Apollo.MutationFunction<PetitionCreateMutation, PetitionCreateMutationVariables>;

/**
 * __usePetitionCreateMutation__
 *
 * To run a mutation, you first call `usePetitionCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePetitionCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [petitionCreateMutation, { data, loading, error }] = usePetitionCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePetitionCreateMutation(baseOptions?: Apollo.MutationHookOptions<PetitionCreateMutation, PetitionCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PetitionCreateMutation, PetitionCreateMutationVariables>(PetitionCreateDocument, options);
      }
export type PetitionCreateMutationHookResult = ReturnType<typeof usePetitionCreateMutation>;
export type PetitionCreateMutationResult = Apollo.MutationResult<PetitionCreateMutation>;
export type PetitionCreateMutationOptions = Apollo.BaseMutationOptions<PetitionCreateMutation, PetitionCreateMutationVariables>;
export const PetitionDeleteDocument = gql`
    mutation PetitionDelete($input: PetitionDeleteInput!) {
  petitionDelete(input: $input) {
    petition {
      id
    }
  }
}
    `;
export type PetitionDeleteMutationFn = Apollo.MutationFunction<PetitionDeleteMutation, PetitionDeleteMutationVariables>;

/**
 * __usePetitionDeleteMutation__
 *
 * To run a mutation, you first call `usePetitionDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePetitionDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [petitionDeleteMutation, { data, loading, error }] = usePetitionDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePetitionDeleteMutation(baseOptions?: Apollo.MutationHookOptions<PetitionDeleteMutation, PetitionDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PetitionDeleteMutation, PetitionDeleteMutationVariables>(PetitionDeleteDocument, options);
      }
export type PetitionDeleteMutationHookResult = ReturnType<typeof usePetitionDeleteMutation>;
export type PetitionDeleteMutationResult = Apollo.MutationResult<PetitionDeleteMutation>;
export type PetitionDeleteMutationOptions = Apollo.BaseMutationOptions<PetitionDeleteMutation, PetitionDeleteMutationVariables>;
export const PetitionDetailsDocument = gql`
    query PetitionDetails($id: Int!) {
  petition(id: $id) {
    ...PetitionDetailFields
  }
}
    ${PetitionDetailFieldsFragmentDoc}`;

/**
 * __usePetitionDetailsQuery__
 *
 * To run a query within a React component, call `usePetitionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePetitionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePetitionDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePetitionDetailsQuery(baseOptions: Apollo.QueryHookOptions<PetitionDetailsQuery, PetitionDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PetitionDetailsQuery, PetitionDetailsQueryVariables>(PetitionDetailsDocument, options);
      }
export function usePetitionDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PetitionDetailsQuery, PetitionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PetitionDetailsQuery, PetitionDetailsQueryVariables>(PetitionDetailsDocument, options);
        }
export type PetitionDetailsQueryHookResult = ReturnType<typeof usePetitionDetailsQuery>;
export type PetitionDetailsLazyQueryHookResult = ReturnType<typeof usePetitionDetailsLazyQuery>;
export type PetitionDetailsQueryResult = Apollo.QueryResult<PetitionDetailsQuery, PetitionDetailsQueryVariables>;
export const PetitionMediaFileDocument = gql`
    query PetitionMediaFile($id: Int!) {
  petitionMediaFile(id: $id) {
    ...MediaFileFields
  }
}
    ${MediaFileFieldsFragmentDoc}`;

/**
 * __usePetitionMediaFileQuery__
 *
 * To run a query within a React component, call `usePetitionMediaFileQuery` and pass it any options that fit your needs.
 * When your component renders, `usePetitionMediaFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePetitionMediaFileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePetitionMediaFileQuery(baseOptions: Apollo.QueryHookOptions<PetitionMediaFileQuery, PetitionMediaFileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PetitionMediaFileQuery, PetitionMediaFileQueryVariables>(PetitionMediaFileDocument, options);
      }
export function usePetitionMediaFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PetitionMediaFileQuery, PetitionMediaFileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PetitionMediaFileQuery, PetitionMediaFileQueryVariables>(PetitionMediaFileDocument, options);
        }
export type PetitionMediaFileQueryHookResult = ReturnType<typeof usePetitionMediaFileQuery>;
export type PetitionMediaFileLazyQueryHookResult = ReturnType<typeof usePetitionMediaFileLazyQuery>;
export type PetitionMediaFileQueryResult = Apollo.QueryResult<PetitionMediaFileQuery, PetitionMediaFileQueryVariables>;
export const PetitionUpdateDocument = gql`
    mutation PetitionUpdate($input: PetitionUpdateInput!) {
  petitionUpdate(input: $input) {
    petition {
      ...PetitionFields
    }
  }
}
    ${PetitionFieldsFragmentDoc}`;
export type PetitionUpdateMutationFn = Apollo.MutationFunction<PetitionUpdateMutation, PetitionUpdateMutationVariables>;

/**
 * __usePetitionUpdateMutation__
 *
 * To run a mutation, you first call `usePetitionUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePetitionUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [petitionUpdateMutation, { data, loading, error }] = usePetitionUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePetitionUpdateMutation(baseOptions?: Apollo.MutationHookOptions<PetitionUpdateMutation, PetitionUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PetitionUpdateMutation, PetitionUpdateMutationVariables>(PetitionUpdateDocument, options);
      }
export type PetitionUpdateMutationHookResult = ReturnType<typeof usePetitionUpdateMutation>;
export type PetitionUpdateMutationResult = Apollo.MutationResult<PetitionUpdateMutation>;
export type PetitionUpdateMutationOptions = Apollo.BaseMutationOptions<PetitionUpdateMutation, PetitionUpdateMutationVariables>;
export const PetitionsDocument = gql`
    query Petitions($search: String, $region: RegionInput, $limit: Int, $offset: Int, $userId: ModelID) {
  petitions(
    search: $search
    region: $region
    limit: $limit
    offset: $offset
    userId: $userId
  ) {
    ...PetitionFields
  }
}
    ${PetitionFieldsFragmentDoc}`;

/**
 * __usePetitionsQuery__
 *
 * To run a query within a React component, call `usePetitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePetitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePetitionsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      region: // value for 'region'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePetitionsQuery(baseOptions?: Apollo.QueryHookOptions<PetitionsQuery, PetitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PetitionsQuery, PetitionsQueryVariables>(PetitionsDocument, options);
      }
export function usePetitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PetitionsQuery, PetitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PetitionsQuery, PetitionsQueryVariables>(PetitionsDocument, options);
        }
export type PetitionsQueryHookResult = ReturnType<typeof usePetitionsQuery>;
export type PetitionsLazyQueryHookResult = ReturnType<typeof usePetitionsLazyQuery>;
export type PetitionsQueryResult = Apollo.QueryResult<PetitionsQuery, PetitionsQueryVariables>;
export const UserDocument = gql`
    query User($id: Int!) {
  user(id: $id) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserCreateDocument = gql`
    mutation UserCreate($input: UserCreateInput!) {
  userCreate(input: $input) {
    user {
      ...CurrentUser
    }
    token
  }
}
    ${CurrentUserFragmentDoc}`;
export type UserCreateMutationFn = Apollo.MutationFunction<UserCreateMutation, UserCreateMutationVariables>;

/**
 * __useUserCreateMutation__
 *
 * To run a mutation, you first call `useUserCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCreateMutation, { data, loading, error }] = useUserCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserCreateMutation(baseOptions?: Apollo.MutationHookOptions<UserCreateMutation, UserCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserCreateMutation, UserCreateMutationVariables>(UserCreateDocument, options);
      }
export type UserCreateMutationHookResult = ReturnType<typeof useUserCreateMutation>;
export type UserCreateMutationResult = Apollo.MutationResult<UserCreateMutation>;
export type UserCreateMutationOptions = Apollo.BaseMutationOptions<UserCreateMutation, UserCreateMutationVariables>;
export const UserLoginDocument = gql`
    mutation UserLogin($input: UserLoginInput!) {
  userLogin(input: $input) {
    user {
      ...CurrentUser
    }
    token
  }
}
    ${CurrentUserFragmentDoc}`;
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const VoteCreateDocument = gql`
    mutation VoteCreate($input: VoteCreateInput!) {
  voteCreate(input: $input) {
    vote {
      id
    }
  }
}
    `;
export type VoteCreateMutationFn = Apollo.MutationFunction<VoteCreateMutation, VoteCreateMutationVariables>;

/**
 * __useVoteCreateMutation__
 *
 * To run a mutation, you first call `useVoteCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCreateMutation, { data, loading, error }] = useVoteCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVoteCreateMutation(baseOptions?: Apollo.MutationHookOptions<VoteCreateMutation, VoteCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteCreateMutation, VoteCreateMutationVariables>(VoteCreateDocument, options);
      }
export type VoteCreateMutationHookResult = ReturnType<typeof useVoteCreateMutation>;
export type VoteCreateMutationResult = Apollo.MutationResult<VoteCreateMutation>;
export type VoteCreateMutationOptions = Apollo.BaseMutationOptions<VoteCreateMutation, VoteCreateMutationVariables>;