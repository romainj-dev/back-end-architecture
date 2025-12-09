// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace UploadServiceTypes {
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
  File: { input: any; output: any; }
  TransportOptions: { input: any; output: any; }
};

export type Query = {
  upload_v1_UploadService_connectivityState?: Maybe<ConnectivityState>;
};


export type Queryupload_v1_UploadService_connectivityStateArgs = {
  tryToConnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ConnectivityState =
  | 'IDLE'
  | 'CONNECTING'
  | 'READY'
  | 'TRANSIENT_FAILURE'
  | 'SHUTDOWN';

export type Mutation = {
  upload_v1_UploadService_StartUpload?: Maybe<upload__v1__UploadResult>;
  upload_v1_UploadService_WatchUpload?: Maybe<Array<Maybe<upload__v1__UploadStatus>>>;
};


export type Mutationupload_v1_UploadService_StartUploadArgs = {
  input?: InputMaybe<Scalars['File']['input']>;
};


export type Mutationupload_v1_UploadService_WatchUploadArgs = {
  input?: InputMaybe<upload__v1__UploadStatusRequest_Input>;
};

export type upload__v1__UploadResult = {
  upload_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type upload__v1__UploadStatus = {
  upload_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type upload__v1__UploadStatusRequest_Input = {
  upload_id?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  upload_v1_UploadService_WatchUpload?: Maybe<upload__v1__UploadStatus>;
};


export type Subscriptionupload_v1_UploadService_WatchUploadArgs = {
  input?: InputMaybe<upload__v1__UploadStatusRequest_Input>;
};

  export type QuerySdk = {
      /** undefined **/
  upload_v1_UploadService_connectivityState: InContextSdkMethod<Query['upload_v1_UploadService_connectivityState'], Queryupload_v1_UploadService_connectivityStateArgs, MeshContext>
  };

  export type MutationSdk = {
      /** null **/
  upload_v1_UploadService_StartUpload: InContextSdkMethod<Mutation['upload_v1_UploadService_StartUpload'], Mutationupload_v1_UploadService_StartUploadArgs, MeshContext>,
  /** null **/
  upload_v1_UploadService_WatchUpload: InContextSdkMethod<Mutation['upload_v1_UploadService_WatchUpload'], Mutationupload_v1_UploadService_WatchUploadArgs, MeshContext>
  };

  export type SubscriptionSdk = {
      /** null **/
  upload_v1_UploadService_WatchUpload: InContextSdkMethod<Subscription['upload_v1_UploadService_WatchUpload'], Subscriptionupload_v1_UploadService_WatchUploadArgs, MeshContext>
  };

  export type Context = {
      ["UploadService"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
