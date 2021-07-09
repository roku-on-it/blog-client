export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type CategoryPostsArgs = {
  filter?: Maybe<ListPost>;
};

export type CreateCategory = {
  name: Scalars['String'];
};

export type CreatePost = {
  category: RefInput;
  content: Scalars['String'];
  sources?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type CreateUser = {
  confirmPassword: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type DeleteCategory = {
  id: Scalars['ID'];
};

export type DeletePost = {
  id: Scalars['ID'];
};

export type DeleteUser = {
  id: Scalars['ID'];
};

export type ListCategory = {
  query?: Maybe<Scalars['String']>;
};

export type ListPost = {
  pageIndex?: Maybe<Scalars['Float']>;
  pageSize?: Maybe<Scalars['Float']>;
  query?: Maybe<Scalars['String']>;
};

export type ListUser = {
  query?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createPost: Post;
  deleteCategory: Category;
  deleteMe: User;
  deletePost: Post;
  deleteUser: User;
  login: User;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
  updateCategory: Category;
  updateMe: User;
  updateMyPassword: User;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreateCategoryArgs = {
  payload: CreateCategory;
};


export type MutationCreatePostArgs = {
  payload: CreatePost;
};


export type MutationDeleteCategoryArgs = {
  payload: DeleteCategory;
};


export type MutationDeletePostArgs = {
  payload: DeletePost;
};


export type MutationDeleteUserArgs = {
  payload: DeleteUser;
};


export type MutationLoginArgs = {
  payload: LoginInput;
};


export type MutationRegisterArgs = {
  payload: CreateUser;
};


export type MutationUpdateCategoryArgs = {
  payload: UpdateCategory;
};


export type MutationUpdateMeArgs = {
  payload: UpdateMe;
};


export type MutationUpdateMyPasswordArgs = {
  payload: UpdateUserPassword;
};


export type MutationUpdatePostArgs = {
  payload: UpdatePost;
};


export type MutationUpdateUserArgs = {
  payload: UpdateUser;
};

export type Post = {
  __typename?: 'Post';
  category: Category;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  slug: Scalars['String'];
  sources?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  me: User;
  post: Post;
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};


export type QueryCategoriesArgs = {
  filter?: Maybe<ListCategory>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  filter?: Maybe<ListPost>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  filter?: Maybe<ListUser>;
};

export type RefInput = {
  id: Scalars['ID'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  success: Scalars['Boolean'];
};

export type UpdateCategory = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateMe = {
  fullName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UpdatePost = {
  category?: Maybe<RefInput>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  sources?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateUser = {
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UserRole>;
  username?: Maybe<Scalars['String']>;
};

export type UpdateUserPassword = {
  confirmNewPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fullName: Scalars['String'];
  id: Scalars['ID'];
  posts?: Maybe<Array<Post>>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export enum UserRole {
  Admin = 'Admin',
  Mod = 'Mod',
  Root = 'Root',
  User = 'User'
}
