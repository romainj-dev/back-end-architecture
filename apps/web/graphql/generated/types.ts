export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
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

export type CreateUserRequest = {
  avatarUrl: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  jobTitle: InputMaybe<Scalars['String']['input']>;
  metadata: InputMaybe<Scalars['JSONObject']['input']>;
};

export type Mutation = {
  createUser: User;
  deleteUser: Scalars['Boolean']['output'];
  updateUser: User;
  upload_v1_UploadService_StartUpload: Maybe<Upload__V1__UploadResult>;
  upload_v1_UploadService_WatchUpload: Maybe<Array<Maybe<Upload__V1__UploadStatus>>>;
};


export type MutationCreateUserArgs = {
  input: CreateUserRequest;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserRequest;
};


export type MutationUpload_V1_UploadService_StartUploadArgs = {
  input: InputMaybe<Scalars['File']['input']>;
};


export type MutationUpload_V1_UploadService_WatchUploadArgs = {
  input: InputMaybe<Upload__V1__UploadStatusRequest_Input>;
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
  health: Scalars['String']['output'];
  plans: Array<PlanModel>;
  upload_v1_UploadService_connectivityState: Maybe<ConnectivityState>;
  user: User;
  users: Array<User>;
};


export type QueryUpload_V1_UploadService_ConnectivityStateArgs = {
  tryToConnect: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateUserRequest = {
  avatarUrl: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  fullName: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  jobTitle: InputMaybe<Scalars['String']['input']>;
  metadata: InputMaybe<Scalars['JSONObject']['input']>;
};

export type UploadStatus = {
  message: Maybe<Scalars['String']['output']>;
  progress: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  uploadId: Scalars['ID']['output'];
};

export type User = {
  avatarUrl: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobTitle: Maybe<Scalars['String']['output']>;
  metadata: Maybe<Scalars['JSONObject']['output']>;
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
  upload_id: InputMaybe<Scalars['String']['input']>;
};

export type GetPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlansQuery = { plans: Array<{ id: string, code: string, price: number, createdAt: any, updatedAt: any }> };
