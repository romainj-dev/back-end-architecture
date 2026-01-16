import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '@/lib/graphql/fetcher';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  File: { input: any; output: any; }
  /** Represents a simple JSON object (no arrays). */
  JSONObject: { input: any; output: any; }
  TransportOptions: { input: any; output: any; }
};

export enum ConnectivityState {
  Connecting = 'CONNECTING',
  Idle = 'IDLE',
  Ready = 'READY',
  Shutdown = 'SHUTDOWN',
  TransientFailure = 'TRANSIENT_FAILURE'
}

export type ExperienceLearningInput = {
  credentialUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  entryType: Scalars['String']['input'];
  fieldOfStudy?: InputMaybe<Scalars['String']['input']>;
  institution: Scalars['String']['input'];
  program?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type ExperienceLearningModel = {
  createdAt: Scalars['DateTime']['output'];
  credentialUrl: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['String']['output']>;
  entryType: Scalars['String']['output'];
  fieldOfStudy: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  institution: Scalars['String']['output'];
  profileId: Scalars['String']['output'];
  program: Maybe<Scalars['String']['output']>;
  startDate: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceMutationResult = {
  learningCount: Scalars['Float']['output'];
  profileId: Scalars['ID']['output'];
  rolesCount: Scalars['Float']['output'];
};

export type ExperienceProfileAggregateModel = {
  learning: Array<ExperienceLearningModel>;
  profile: ExperienceProfileModel;
  roles: Array<ExperienceRoleModel>;
};

export type ExperienceProfileInput = {
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  headline?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  summary?: InputMaybe<Scalars['String']['input']>;
  yearsOfExperience?: InputMaybe<Scalars['Int']['input']>;
};

export type ExperienceProfileModel = {
  createdAt: Scalars['DateTime']['output'];
  customFields: Maybe<Scalars['JSONObject']['output']>;
  headline: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ingestionMetadata: Maybe<Scalars['JSONObject']['output']>;
  location: Maybe<Scalars['String']['output']>;
  rawPayload: Maybe<Scalars['JSONObject']['output']>;
  skills: Array<Scalars['String']['output']>;
  summary: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  yearsOfExperience: Maybe<Scalars['Int']['output']>;
};

export type ExperienceRoleInput = {
  company: Scalars['String']['input'];
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  durationLabel?: InputMaybe<Scalars['String']['input']>;
  employmentType?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  keyAchievements?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  methodologies?: InputMaybe<Array<Scalars['String']['input']>>;
  missingDetails?: InputMaybe<Scalars['String']['input']>;
  periodLabel?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  teamStructure?: InputMaybe<Scalars['String']['input']>;
  techStack?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type ExperienceRoleModel = {
  company: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields: Maybe<Scalars['JSONObject']['output']>;
  durationLabel: Maybe<Scalars['String']['output']>;
  employmentType: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCurrent: Maybe<Scalars['Boolean']['output']>;
  keyAchievements: Array<Scalars['String']['output']>;
  location: Maybe<Scalars['String']['output']>;
  methodologies: Array<Scalars['String']['output']>;
  missingDetails: Maybe<Scalars['String']['output']>;
  periodLabel: Maybe<Scalars['String']['output']>;
  profileId: Scalars['String']['output'];
  projects: Array<ExperienceRoleProjectModel>;
  startDate: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  summary: Maybe<Scalars['String']['output']>;
  teamStructure: Maybe<Scalars['String']['output']>;
  techStack: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceRoleProjectModel = {
  achievements: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  period: Maybe<Scalars['String']['output']>;
  roleId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  saveExperience: ExperienceMutationResult;
  upload_v1_UploadService_StartUpload: Maybe<Upload__V1__UploadResult>;
  upload_v1_UploadService_WatchUpload: Maybe<Array<Maybe<Upload__V1__UploadStatus>>>;
  upsertUser: User;
};


export type MutationSaveExperienceArgs = {
  input: SaveExperienceInput;
};


export type MutationUpload_V1_UploadService_StartUploadArgs = {
  input: InputMaybe<Scalars['File']['input']>;
};


export type MutationUpload_V1_UploadService_WatchUploadArgs = {
  input: InputMaybe<Upload__V1__UploadStatusRequest_Input>;
};


export type MutationUpsertUserArgs = {
  input: UpsertUserRequest;
};

export type PlanModel = {
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  currentUser: Maybe<User>;
  experienceProfile: Maybe<ExperienceProfileAggregateModel>;
  health: Scalars['String']['output'];
  plans: Array<PlanModel>;
  upload_v1_UploadService_connectivityState: Maybe<ConnectivityState>;
  user: User;
};


export type QueryUpload_V1_UploadService_ConnectivityStateArgs = {
  tryToConnect: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type SaveExperienceInput = {
  learning?: InputMaybe<Array<ExperienceLearningInput>>;
  profile: ExperienceProfileInput;
  rawPayload?: InputMaybe<Scalars['JSONObject']['input']>;
  roles?: InputMaybe<Array<ExperienceRoleInput>>;
};

export type Subscription = {
  uploadStatus: UploadStatus;
  upload_v1_UploadService_WatchUpload: Maybe<Upload__V1__UploadStatus>;
};


export type SubscriptionUploadStatusArgs = {
  uploadId: Scalars['ID']['input'];
};


export type SubscriptionUpload_V1_UploadService_WatchUploadArgs = {
  input: InputMaybe<Upload__V1__UploadStatusRequest_Input>;
};

export type UploadStatus = {
  message: Maybe<Scalars['String']['output']>;
  progress: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  uploadId: Scalars['ID']['output'];
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
  avatarUrl: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: Maybe<Scalars['JSONObject']['output']>;
  provider: Scalars['String']['output'];
  providerAccountId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Upload__V1__UploadResult = {
  message: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['String']['output']>;
  upload_id: Maybe<Scalars['String']['output']>;
};

export type Upload__V1__UploadStatus = {
  message: Maybe<Scalars['String']['output']>;
  progress: Maybe<Scalars['Int']['output']>;
  status: Maybe<Scalars['String']['output']>;
  upload_id: Maybe<Scalars['String']['output']>;
};

export type Upload__V1__UploadStatusRequest_Input = {
  upload_id?: InputMaybe<Scalars['String']['input']>;
};

export type GetExperienceProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExperienceProfileQuery = { experienceProfile: { profile: { id: string, userId: string, headline: string | null | undefined, summary: string | null | undefined, location: string | null | undefined, yearsOfExperience: number | null | undefined, skills: Array<string>, customFields: any | null | undefined, createdAt: any, updatedAt: any } } | null | undefined };

export type SaveExperienceMutationVariables = Exact<{
  input: SaveExperienceInput;
}>;


export type SaveExperienceMutation = { saveExperience: { profileId: string, rolesCount: number, learningCount: number } };

export type GetPlanPricingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlanPricingQuery = { plans: Array<{ id: string, code: string, price: number }> };

export type GetPlanDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlanDetailsQuery = { plans: Array<{ id: string, code: string, price: number, createdAt: any, updatedAt: any }> };



export const GetExperienceProfileDocument = `
    query GetExperienceProfile {
  experienceProfile {
    profile {
      id
      userId
      headline
      summary
      location
      yearsOfExperience
      skills
      customFields
      createdAt
      updatedAt
    }
  }
}
    `;

export const useGetExperienceProfileQuery = <
      TData = GetExperienceProfileQuery,
      TError = unknown
    >(
      variables?: GetExperienceProfileQueryVariables,
      options?: Omit<UseQueryOptions<GetExperienceProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetExperienceProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetExperienceProfileQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetExperienceProfile'] : ['GetExperienceProfile', variables],
    queryFn: graphqlFetcher<GetExperienceProfileQuery, GetExperienceProfileQueryVariables>(GetExperienceProfileDocument, variables),
    ...options
  }
    )};

useGetExperienceProfileQuery.getKey = (variables?: GetExperienceProfileQueryVariables) => variables === undefined ? ['GetExperienceProfile'] : ['GetExperienceProfile', variables];


useGetExperienceProfileQuery.fetcher = (variables?: GetExperienceProfileQueryVariables, options?: RequestInit['headers']) => graphqlFetcher<GetExperienceProfileQuery, GetExperienceProfileQueryVariables>(GetExperienceProfileDocument, variables, options);

export const SaveExperienceDocument = `
    mutation SaveExperience($input: SaveExperienceInput!) {
  saveExperience(input: $input) {
    profileId
    rolesCount
    learningCount
  }
}
    `;

export const useSaveExperienceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveExperienceMutation, TError, SaveExperienceMutationVariables, TContext>) => {
    
    return useMutation<SaveExperienceMutation, TError, SaveExperienceMutationVariables, TContext>(
      {
    mutationKey: ['SaveExperience'],
    mutationFn: (variables?: SaveExperienceMutationVariables) => graphqlFetcher<SaveExperienceMutation, SaveExperienceMutationVariables>(SaveExperienceDocument, variables)(),
    ...options
  }
    )};


useSaveExperienceMutation.fetcher = (variables: SaveExperienceMutationVariables, options?: RequestInit['headers']) => graphqlFetcher<SaveExperienceMutation, SaveExperienceMutationVariables>(SaveExperienceDocument, variables, options);

export const GetPlanPricingDocument = `
    query GetPlanPricing {
  plans {
    id
    code
    price
  }
}
    `;

export const useGetPlanPricingQuery = <
      TData = GetPlanPricingQuery,
      TError = unknown
    >(
      variables?: GetPlanPricingQueryVariables,
      options?: Omit<UseQueryOptions<GetPlanPricingQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPlanPricingQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPlanPricingQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPlanPricing'] : ['GetPlanPricing', variables],
    queryFn: graphqlFetcher<GetPlanPricingQuery, GetPlanPricingQueryVariables>(GetPlanPricingDocument, variables),
    ...options
  }
    )};

useGetPlanPricingQuery.getKey = (variables?: GetPlanPricingQueryVariables) => variables === undefined ? ['GetPlanPricing'] : ['GetPlanPricing', variables];


useGetPlanPricingQuery.fetcher = (variables?: GetPlanPricingQueryVariables, options?: RequestInit['headers']) => graphqlFetcher<GetPlanPricingQuery, GetPlanPricingQueryVariables>(GetPlanPricingDocument, variables, options);

export const GetPlanDetailsDocument = `
    query GetPlanDetails {
  plans {
    id
    code
    price
    createdAt
    updatedAt
  }
}
    `;

export const useGetPlanDetailsQuery = <
      TData = GetPlanDetailsQuery,
      TError = unknown
    >(
      variables?: GetPlanDetailsQueryVariables,
      options?: Omit<UseQueryOptions<GetPlanDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPlanDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPlanDetailsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPlanDetails'] : ['GetPlanDetails', variables],
    queryFn: graphqlFetcher<GetPlanDetailsQuery, GetPlanDetailsQueryVariables>(GetPlanDetailsDocument, variables),
    ...options
  }
    )};

useGetPlanDetailsQuery.getKey = (variables?: GetPlanDetailsQueryVariables) => variables === undefined ? ['GetPlanDetails'] : ['GetPlanDetails', variables];


useGetPlanDetailsQuery.fetcher = (variables?: GetPlanDetailsQueryVariables, options?: RequestInit['headers']) => graphqlFetcher<GetPlanDetailsQuery, GetPlanDetailsQueryVariables>(GetPlanDetailsDocument, variables, options);
