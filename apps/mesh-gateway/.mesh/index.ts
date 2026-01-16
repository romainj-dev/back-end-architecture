// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { defaultImportFn, handleImport } from '@graphql-mesh/utils';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import type { MeshResolvedSource } from '@graphql-mesh/runtime';
import type { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import { parse } from 'graphql';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, type ExecuteMeshFn, type SubscribeMeshFn, type MeshContext as BaseMeshContext, type MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import type { ImportFn } from '@graphql-mesh/types';
import type { UserServiceTypes } from './sources/UserService/types';
import type { PlanServiceTypes } from './sources/PlanService/types';
import type { UploadServiceTypes } from './sources/UploadService/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  File: { input: any; output: any; }
  TransportOptions: { input: any; output: any; }
};

export type Query = {
  health: Scalars['String']['output'];
  user: User;
  currentUser?: Maybe<User>;
  experienceProfile?: Maybe<ExperienceProfileAggregateModel>;
  plans: Array<PlanModel>;
  upload_v1_UploadService_connectivityState?: Maybe<ConnectivityState>;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
};


export type Queryupload_v1_UploadService_connectivityStateArgs = {
  tryToConnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  upsertUser: User;
  saveExperience: ExperienceMutationResult;
  upload_v1_UploadService_StartUpload?: Maybe<upload__v1__UploadResult>;
  upload_v1_UploadService_WatchUpload?: Maybe<Array<Maybe<upload__v1__UploadStatus>>>;
};


export type MutationupsertUserArgs = {
  input: UpsertUserRequest;
};


export type MutationsaveExperienceArgs = {
  input: SaveExperienceInput;
};


export type Mutationupload_v1_UploadService_StartUploadArgs = {
  input?: InputMaybe<Scalars['File']['input']>;
};


export type Mutationupload_v1_UploadService_WatchUploadArgs = {
  input?: InputMaybe<upload__v1__UploadStatusRequest_Input>;
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

export type PlanModel = {
  id: Scalars['String']['output'];
  code: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Subscription = {
  upload_v1_UploadService_WatchUpload?: Maybe<upload__v1__UploadStatus>;
  uploadStatus: UploadStatus;
};


export type Subscriptionupload_v1_UploadService_WatchUploadArgs = {
  input?: InputMaybe<upload__v1__UploadStatusRequest_Input>;
};


export type SubscriptionuploadStatusArgs = {
  uploadId: Scalars['ID']['input'];
};

export type ConnectivityState =
  | 'IDLE'
  | 'CONNECTING'
  | 'READY'
  | 'TRANSIENT_FAILURE'
  | 'SHUTDOWN';

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

export type UploadStatus = {
  uploadId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  progress?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ExperienceRoleProjectModel: ResolverTypeWrapper<ExperienceRoleProjectModel>;
  ExperienceRoleModel: ResolverTypeWrapper<ExperienceRoleModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ExperienceLearningModel: ResolverTypeWrapper<ExperienceLearningModel>;
  ExperienceProfileModel: ResolverTypeWrapper<ExperienceProfileModel>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ExperienceProfileAggregateModel: ResolverTypeWrapper<ExperienceProfileAggregateModel>;
  ExperienceMutationResult: ResolverTypeWrapper<ExperienceMutationResult>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  UpsertUserRequest: UpsertUserRequest;
  SaveExperienceInput: SaveExperienceInput;
  ExperienceProfileInput: ExperienceProfileInput;
  ExperienceRoleInput: ExperienceRoleInput;
  ExperienceLearningInput: ExperienceLearningInput;
  PlanModel: ResolverTypeWrapper<PlanModel>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
  ConnectivityState: ConnectivityState;
  upload__v1__UploadResult: ResolverTypeWrapper<upload__v1__UploadResult>;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  upload__v1__UploadStatus: ResolverTypeWrapper<upload__v1__UploadStatus>;
  upload__v1__UploadStatusRequest_Input: upload__v1__UploadStatusRequest_Input;
  TransportOptions: ResolverTypeWrapper<Scalars['TransportOptions']['output']>;
  UploadStatus: ResolverTypeWrapper<UploadStatus>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: Record<PropertyKey, never>;
  Mutation: Record<PropertyKey, never>;
  User: User;
  ID: Scalars['ID']['output'];
  String: Scalars['String']['output'];
  DateTime: Scalars['DateTime']['output'];
  ExperienceRoleProjectModel: ExperienceRoleProjectModel;
  ExperienceRoleModel: ExperienceRoleModel;
  Boolean: Scalars['Boolean']['output'];
  ExperienceLearningModel: ExperienceLearningModel;
  ExperienceProfileModel: ExperienceProfileModel;
  Int: Scalars['Int']['output'];
  ExperienceProfileAggregateModel: ExperienceProfileAggregateModel;
  ExperienceMutationResult: ExperienceMutationResult;
  Float: Scalars['Float']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  UpsertUserRequest: UpsertUserRequest;
  SaveExperienceInput: SaveExperienceInput;
  ExperienceProfileInput: ExperienceProfileInput;
  ExperienceRoleInput: ExperienceRoleInput;
  ExperienceLearningInput: ExperienceLearningInput;
  PlanModel: PlanModel;
  Subscription: Record<PropertyKey, never>;
  upload__v1__UploadResult: upload__v1__UploadResult;
  File: Scalars['File']['output'];
  upload__v1__UploadStatus: upload__v1__UploadStatus;
  upload__v1__UploadStatusRequest_Input: upload__v1__UploadStatusRequest_Input;
  TransportOptions: Scalars['TransportOptions']['output'];
  UploadStatus: UploadStatus;
}>;

export type grpcMethodDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  rootJsonName?: Maybe<Scalars['String']['input']>;
  objPath?: Maybe<Scalars['String']['input']>;
  methodName?: Maybe<Scalars['String']['input']>;
  responseStream?: Maybe<Scalars['Boolean']['input']>;
};

export type grpcMethodDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = grpcMethodDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type grpcConnectivityStateDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  rootJsonName?: Maybe<Scalars['String']['input']>;
  objPath?: Maybe<Scalars['String']['input']>;
};

export type grpcConnectivityStateDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = grpcConnectivityStateDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type streamDirectiveArgs = {
  if?: Scalars['Boolean']['input'];
  label?: Maybe<Scalars['String']['input']>;
  initialCount?: Maybe<Scalars['Int']['input']>;
};

export type streamDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = streamDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type transportDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  kind?: Maybe<Scalars['String']['input']>;
  location?: Maybe<Scalars['String']['input']>;
  options?: Maybe<Scalars['TransportOptions']['input']>;
};

export type transportDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = transportDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  health?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  experienceProfile?: Resolver<Maybe<ResolversTypes['ExperienceProfileAggregateModel']>, ParentType, ContextType>;
  plans?: Resolver<Array<ResolversTypes['PlanModel']>, ParentType, ContextType>;
  upload_v1_UploadService_connectivityState?: Resolver<Maybe<ResolversTypes['ConnectivityState']>, ParentType, ContextType, Partial<Queryupload_v1_UploadService_connectivityStateArgs>>;
}>;

export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  upsertUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupsertUserArgs, 'input'>>;
  saveExperience?: Resolver<ResolversTypes['ExperienceMutationResult'], ParentType, ContextType, RequireFields<MutationsaveExperienceArgs, 'input'>>;
  upload_v1_UploadService_StartUpload?: Resolver<Maybe<ResolversTypes['upload__v1__UploadResult']>, ParentType, ContextType, Partial<Mutationupload_v1_UploadService_StartUploadArgs>>;
  upload_v1_UploadService_WatchUpload?: Resolver<Maybe<Array<Maybe<ResolversTypes['upload__v1__UploadStatus']>>>, ParentType, ContextType, Partial<Mutationupload_v1_UploadService_WatchUploadArgs>>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  providerAccountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ExperienceRoleProjectModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExperienceRoleProjectModel'] = ResolversParentTypes['ExperienceRoleProjectModel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  roleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  period?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  achievements?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type ExperienceRoleModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExperienceRoleModel'] = ResolversParentTypes['ExperienceRoleModel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employmentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCurrent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  periodLabel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  durationLabel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  techStack?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  methodologies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  teamStructure?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keyAchievements?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  missingDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['ExperienceRoleProjectModel']>, ParentType, ContextType>;
}>;

export type ExperienceLearningModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExperienceLearningModel'] = ResolversParentTypes['ExperienceLearningModel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entryType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  institution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  program?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fieldOfStudy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credentialUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type ExperienceProfileModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExperienceProfileModel'] = ResolversParentTypes['ExperienceProfileModel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  headline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  yearsOfExperience?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  ingestionMetadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  rawPayload?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type ExperienceProfileAggregateModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExperienceProfileAggregateModel'] = ResolversParentTypes['ExperienceProfileAggregateModel']> = ResolversObject<{
  profile?: Resolver<ResolversTypes['ExperienceProfileModel'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['ExperienceRoleModel']>, ParentType, ContextType>;
  learning?: Resolver<Array<ResolversTypes['ExperienceLearningModel']>, ParentType, ContextType>;
}>;

export type ExperienceMutationResultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExperienceMutationResult'] = ResolversParentTypes['ExperienceMutationResult']> = ResolversObject<{
  profileId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rolesCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  learningCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
}>;

export interface JSONObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type PlanModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PlanModel'] = ResolversParentTypes['PlanModel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  upload_v1_UploadService_WatchUpload?: SubscriptionResolver<Maybe<ResolversTypes['upload__v1__UploadStatus']>, "upload_v1_UploadService_WatchUpload", ParentType, ContextType, Partial<Subscriptionupload_v1_UploadService_WatchUploadArgs>>;
  uploadStatus?: SubscriptionResolver<ResolversTypes['UploadStatus'], "uploadStatus", ParentType, ContextType, RequireFields<SubscriptionuploadStatusArgs, 'uploadId'>>;
}>;

export type upload__v1__UploadResultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['upload__v1__UploadResult'] = ResolversParentTypes['upload__v1__UploadResult']> = ResolversObject<{
  upload_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export type upload__v1__UploadStatusResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['upload__v1__UploadStatus'] = ResolversParentTypes['upload__v1__UploadStatus']> = ResolversObject<{
  upload_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export interface TransportOptionsScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TransportOptions'], any> {
  name: 'TransportOptions';
}

export type UploadStatusResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UploadStatus'] = ResolversParentTypes['UploadStatus']> = ResolversObject<{
  uploadId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  ExperienceRoleProjectModel?: ExperienceRoleProjectModelResolvers<ContextType>;
  ExperienceRoleModel?: ExperienceRoleModelResolvers<ContextType>;
  ExperienceLearningModel?: ExperienceLearningModelResolvers<ContextType>;
  ExperienceProfileModel?: ExperienceProfileModelResolvers<ContextType>;
  ExperienceProfileAggregateModel?: ExperienceProfileAggregateModelResolvers<ContextType>;
  ExperienceMutationResult?: ExperienceMutationResultResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  PlanModel?: PlanModelResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  upload__v1__UploadResult?: upload__v1__UploadResultResolvers<ContextType>;
  File?: GraphQLScalarType;
  upload__v1__UploadStatus?: upload__v1__UploadStatusResolvers<ContextType>;
  TransportOptions?: GraphQLScalarType;
  UploadStatus?: UploadStatusResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  grpcMethod?: grpcMethodDirectiveResolver<any, any, ContextType>;
  grpcConnectivityState?: grpcConnectivityStateDirectiveResolver<any, any, ContextType>;
  stream?: streamDirectiveResolver<any, any, ContextType>;
  transport?: transportDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = UserServiceTypes.Context & PlanServiceTypes.Context & UploadServiceTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".meshrc.ts":
      return import("./../.meshrc.js") as T;
    
    case ".mesh/sources/UserService/introspectionSchema":
      return import("./sources/UserService/introspectionSchema") as T;
    
    case ".mesh/sources/UploadService/schemaWithAnnotations":
      return import("./sources/UploadService/schemaWithAnnotations") as T;
    
    case ".mesh/sources/PlanService/introspectionSchema":
      return import("./sources/PlanService/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("");
const MeshCache = await import("@graphql-mesh/cache-localforage").then(handleImport);
  const cache = new MeshCache({
      ...{},
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    })
const fetchFn = await import('@whatwg-node/fetch').then(m => m?.fetch || m);
const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const userServiceTransforms = [];
const planServiceTransforms = [];
const uploadServiceTransforms = [];
const UserServiceHandler = await import("@graphql-mesh/graphql").then(handleImport);
const userServiceHandler = new UserServiceHandler({
              name: "UserService",
              config: {"source":"/Users/romainjulien/development/apply-mate/packages/shared/graphql/user-schema.graphql","endpoint":"http://localhost:4102/graphql","operationHeaders":{"x-user-id":"{context.headers[\"x-user-id\"]}","x-user-email":"{context.headers[\"x-user-email\"]}","x-user-name":"{context.headers[\"x-user-name\"]}"}},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("UserService"),
              logger: logger.child({ source: "UserService" }),
              importFn,
            });
const PlanServiceHandler = await import("@graphql-mesh/graphql").then(handleImport);
const planServiceHandler = new PlanServiceHandler({
              name: "PlanService",
              config: {"source":"/Users/romainjulien/development/apply-mate/packages/shared/graphql/plan-schema.graphql","endpoint":"http://localhost:4103/graphql","operationHeaders":{"x-user-id":"{context.headers[\"x-user-id\"]}","x-user-email":"{context.headers[\"x-user-email\"]}","x-user-name":"{context.headers[\"x-user-name\"]}"}},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("PlanService"),
              logger: logger.child({ source: "PlanService" }),
              importFn,
            });
const UploadServiceHandler = await import("@graphql-mesh/grpc").then(handleImport);
const uploadServiceHandler = new UploadServiceHandler({
              name: "UploadService",
              config: {"source":"/Users/romainjulien/development/apply-mate/packages/shared/proto/upload/v1/upload.proto","endpoint":"localhost:4200","useHTTPS":false},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("UploadService"),
              logger: logger.child({ source: "UploadService" }),
              importFn,
            });
sources[0] = {
          name: 'UserService',
          handler: userServiceHandler,
          transforms: userServiceTransforms
        }
sources[1] = {
          name: 'PlanService',
          handler: planServiceHandler,
          transforms: planServiceTransforms
        }
sources[2] = {
          name: 'UploadService',
          handler: uploadServiceHandler,
          transforms: uploadServiceTransforms
        }
const additionalTypeDefs = [parse("type UploadStatus {\n  uploadId: ID!\n  status: String!\n  progress: Int\n  message: String\n}\n\ntype Subscription {\n  uploadStatus(uploadId: ID!): UploadStatus!\n}"),] as any[];
const additionalResolvers = await Promise.all([
        import("../Users/romainjulien/development/apply-mate/apps/mesh-gateway/mesh.resolvers.ts")
            .then(m => m.resolvers || m.default || m)
      ]);
const Merger = await import("@graphql-mesh/merger-stitching").then(handleImport);
const merger = new Merger({
        cache,
        pubsub,
        logger: logger.child({ merger: "stitching" }),
        store: rootStore.child("stitching")
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltMesh,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltMesh(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltMesh().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltMesh().then(({ subscribe }) => subscribe(...args));