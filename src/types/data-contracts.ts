export type Response<T, K extends string = 'results'> = {
    [key in K]: T[];
} & {
    total: number;
    skip: number;
    limit: number;
};

// Post Types
export interface Reactions {
    likes: number;
    dislikes: number;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: Reactions;
    views: number;
    userId: number;
}
export type GetPostsByUserIDResponse = Response<Post, "posts">;
export type GetPostBySlugResponse = Post;
export type CreatePostResponse = Post;
export type UpdatePostByIDResponse = Post;
export type DeletePostByIDResponse = Post & {
    isDeleted: boolean;
    deletedOn: string;
};

// User Types
export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    maidenName: string;
    age: number;
    phone: string;
    password: string;
    birthDate: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    ip: string;
    address: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country: string;
    };
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company: {
        department: string;
        name: string;
        title: string;
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            country: string;
        };
    };
    ein: string;
    ssn: string;
}

export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}
export interface LoginUserRequestBody{
    username: string;
    password: string;
    expiresInMins?: number;
}
export interface CreateUserRequestBody extends Partial<User>{};
export interface RefreshAuthResponse {
    accessToken: string;
    refreshToken: string;
}
export type GetUsersResponse = Response<User, "users">;
export type RegisterUserResponse = User;
export type UpdateUserByIDResponse = User;
export type DeleteUserByIDResponse = User & {
    isDeleted: boolean;
    deletedOn: string;
};
export type GetAuthUserResponse = User;
