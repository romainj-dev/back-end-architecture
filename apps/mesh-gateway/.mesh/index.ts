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
import type { UploadServiceTypes } from './sources/UploadService/types';
import type { PlanServiceTypes } from './sources/PlanService/types';
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
  currentUser?: Maybe<User>;
  health: Scalars['String']['output'];
  plans: Array<PlanModel>;
  user: User;
  users: Array<User>;
  upload_v1_UploadService_connectivityState?: Maybe<ConnectivityState>;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryusersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type Queryupload_v1_UploadService_connectivityStateArgs = {
  tryToConnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  createUser: User;
  deleteUser: Scalars['Boolean']['output'];
  updateUser: User;
  upload_v1_UploadService_StartUpload?: Maybe<upload__v1__UploadResult>;
  upload_v1_UploadService_WatchUpload?: Maybe<Array<Maybe<upload__v1__UploadStatus>>>;
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


export type Mutationupload_v1_UploadService_StartUploadArgs = {
  input?: InputMaybe<Scalars['File']['input']>;
};


export type Mutationupload_v1_UploadService_WatchUploadArgs = {
  input?: InputMaybe<upload__v1__UploadStatusRequest_Input>;
};

export type CreateUserRequest = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type PlanModel = {
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  CreateUserRequest: CreateUserRequest;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  PlanModel: ResolverTypeWrapper<PlanModel>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  UpdateUserRequest: UpdateUserRequest;
  User: ResolverTypeWrapper<User>;
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
  CreateUserRequest: CreateUserRequest;
  String: Scalars['String']['output'];
  DateTime: Scalars['DateTime']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  PlanModel: PlanModel;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  UpdateUserRequest: UpdateUserRequest;
  User: User;
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
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  health?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plans?: Resolver<Array<ResolversTypes['PlanModel']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryusersArgs>>;
  upload_v1_UploadService_connectivityState?: Resolver<Maybe<ResolversTypes['ConnectivityState']>, ParentType, ContextType, Partial<Queryupload_v1_UploadService_connectivityStateArgs>>;
}>;

export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteUserArgs, 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'input'>>;
  upload_v1_UploadService_StartUpload?: Resolver<Maybe<ResolversTypes['upload__v1__UploadResult']>, ParentType, ContextType, Partial<Mutationupload_v1_UploadService_StartUploadArgs>>;
  upload_v1_UploadService_WatchUpload?: Resolver<Maybe<Array<Maybe<ResolversTypes['upload__v1__UploadStatus']>>>, ParentType, ContextType, Partial<Mutationupload_v1_UploadService_WatchUploadArgs>>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JSONObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type PlanModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PlanModel'] = ResolversParentTypes['PlanModel']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
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
  DateTime?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  PlanModel?: PlanModelResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
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
    
    case ".mesh/sources/PlanService/introspectionSchema":
      return import("./sources/PlanService/introspectionSchema") as T;
    
    case ".mesh/sources/UserService/introspectionSchema":
      return import("./sources/UserService/introspectionSchema") as T;
    
    case ".mesh/sources/UploadService/schemaWithAnnotations":
      return import("./sources/UploadService/schemaWithAnnotations") as T;
    
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
              config: {"source":"/Users/romainjulien/development/apply-mate/packages/shared/graphql/user-schema.graphql","endpoint":"http://localhost:4102/graphql"},
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
              config: {"source":"/Users/romainjulien/development/apply-mate/packages/shared/graphql/plan-schema.graphql","endpoint":"http://localhost:4103/graphql"},
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