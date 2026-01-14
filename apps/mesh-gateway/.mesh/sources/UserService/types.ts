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

export type User = {
  id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  avatarUrl?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  provider: Scalars['String']['output'];
  providerAccountId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceRoleProjectModel = {
  id: Scalars['ID']['output'];
  roleId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  period?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  achievements: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceRoleModel = {
  id: Scalars['ID']['output'];
  profileId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  company: Scalars['String']['output'];
  employmentType?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  isCurrent?: Maybe<Scalars['Boolean']['output']>;
  periodLabel?: Maybe<Scalars['String']['output']>;
  durationLabel?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  summary?: Maybe<Scalars['String']['output']>;
  techStack: Array<Scalars['String']['output']>;
  methodologies: Array<Scalars['String']['output']>;
  teamStructure?: Maybe<Scalars['String']['output']>;
  keyAchievements: Array<Scalars['String']['output']>;
  missingDetails?: Maybe<Scalars['String']['output']>;
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  projects: Array<ExperienceRoleProjectModel>;
};

export type ExperienceLearningModel = {
  id: Scalars['ID']['output'];
  profileId: Scalars['String']['output'];
  entryType: Scalars['String']['output'];
  institution: Scalars['String']['output'];
  program?: Maybe<Scalars['String']['output']>;
  fieldOfStudy?: Maybe<Scalars['String']['output']>;
  credentialUrl?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceProfileModel = {
  id: Scalars['ID']['output'];
  userId: Scalars['String']['output'];
  headline?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  yearsOfExperience?: Maybe<Scalars['Int']['output']>;
  skills: Array<Scalars['String']['output']>;
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  ingestionMetadata?: Maybe<Scalars['JSONObject']['output']>;
  rawPayload?: Maybe<Scalars['JSONObject']['output']>;
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceProfileAggregateModel = {
  profile: ExperienceProfileModel;
  roles: Array<ExperienceRoleModel>;
  learning: Array<ExperienceLearningModel>;
};

export type ExperienceMutationResult = {
  profileId: Scalars['ID']['output'];
  rolesCount: Scalars['Float']['output'];
  learningCount: Scalars['Float']['output'];
};

export type Query = {
  health: Scalars['String']['output'];
  user: User;
  currentUser?: Maybe<User>;
  experienceProfile?: Maybe<ExperienceProfileAggregateModel>;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  upsertUser: User;
  saveExperience: ExperienceMutationResult;
};


export type MutationupsertUserArgs = {
  input: UpsertUserRequest;
};


export type MutationsaveExperienceArgs = {
  input: SaveExperienceInput;
};

export type UpsertUserRequest = {
  provider: Scalars['String']['input'];
  providerAccountId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  accessToken?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  tokenExpiresAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SaveExperienceInput = {
  profile: ExperienceProfileInput;
  roles?: InputMaybe<Array<ExperienceRoleInput>>;
  learning?: InputMaybe<Array<ExperienceLearningInput>>;
  rawPayload?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type ExperienceProfileInput = {
  headline?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  yearsOfExperience?: InputMaybe<Scalars['Int']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type ExperienceRoleInput = {
  title: Scalars['String']['input'];
  company: Scalars['String']['input'];
  employmentType?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  periodLabel?: InputMaybe<Scalars['String']['input']>;
  durationLabel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  techStack?: InputMaybe<Array<Scalars['String']['input']>>;
  methodologies?: InputMaybe<Array<Scalars['String']['input']>>;
  teamStructure?: InputMaybe<Scalars['String']['input']>;
  keyAchievements?: InputMaybe<Array<Scalars['String']['input']>>;
  missingDetails?: InputMaybe<Scalars['String']['input']>;
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type ExperienceLearningInput = {
  entryType: Scalars['String']['input'];
  institution: Scalars['String']['input'];
  program?: InputMaybe<Scalars['String']['input']>;
  fieldOfStudy?: InputMaybe<Scalars['String']['input']>;
  credentialUrl?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
};

  export type QuerySdk = {
      /** undefined **/
  health: InContextSdkMethod<Query['health'], {}, MeshContext>,
  /** undefined **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** undefined **/
  currentUser: InContextSdkMethod<Query['currentUser'], {}, MeshContext>,
  /** undefined **/
  experienceProfile: InContextSdkMethod<Query['experienceProfile'], {}, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  upsertUser: InContextSdkMethod<Mutation['upsertUser'], MutationupsertUserArgs, MeshContext>,
  /** undefined **/
  saveExperience: InContextSdkMethod<Mutation['saveExperience'], MutationsaveExperienceArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["UserService"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
