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
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** Represents a simple JSON object (no arrays). */
  JSONObject: { input: any; output: any; }
};

export type CreateUserRequest = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type Mutation = {
  createUser: User;
  deleteUser: Scalars['Boolean']['output'];
  updateUser: User;
};


export type MutationcreateUserArgs = {
  input: CreateUserRequest;
};


export type MutationdeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationupdateUserArgs = {
  input: UpdateUserRequest;
};

export type PlanModel = {
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  currentUser?: Maybe<User>;
  health: Scalars['String']['output'];
  plans: Array<PlanModel>;
  user: User;
  users: Array<User>;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryusersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserRequest = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type User = {
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

  export type QuerySdk = {
      /** undefined **/
  currentUser: InContextSdkMethod<Query['currentUser'], {}, MeshContext>,
  /** undefined **/
  health: InContextSdkMethod<Query['health'], {}, MeshContext>,
  /** undefined **/
  plans: InContextSdkMethod<Query['plans'], {}, MeshContext>,
  /** undefined **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** undefined **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  createUser: InContextSdkMethod<Mutation['createUser'], MutationcreateUserArgs, MeshContext>,
  /** undefined **/
  deleteUser: InContextSdkMethod<Mutation['deleteUser'], MutationdeleteUserArgs, MeshContext>,
  /** undefined **/
  updateUser: InContextSdkMethod<Mutation['updateUser'], MutationupdateUserArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["UserService"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
