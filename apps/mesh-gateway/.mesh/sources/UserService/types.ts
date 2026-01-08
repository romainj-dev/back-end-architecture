// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace UserServiceTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: { input: string; output: string; }
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** Represents a simple JSON object (no arrays). */
  JSONObject: { input: any; output: any; }
};

export type Mutation = {
  upsertUser: User;
};


export type MutationupsertUserArgs = {
  input: UpsertUserRequest;
};

export type Query = {
  currentUser?: Maybe<User>;
  health: Scalars['String']['output'];
  user: User;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
};

export type UpsertUserRequest = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  providerAccountId: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  tokenExpiresAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User = {
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  provider: Scalars['String']['output'];
  providerAccountId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

  export type QuerySdk = {
      /** undefined **/
  currentUser: InContextSdkMethod<Query['currentUser'], {}, MeshContext>,
  /** undefined **/
  health: InContextSdkMethod<Query['health'], {}, MeshContext>,
  /** undefined **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  upsertUser: InContextSdkMethod<Mutation['upsertUser'], MutationupsertUserArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["UserService"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
