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
export interface Article {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: Reactions;
    views: number;
    userId: number;
}
export interface GetArticlesByUserIDResponse extends Response<Article, "posts"> {}
export interface GetArticleBySlugResponse extends Article {}
export interface CreateArticleResponse extends Article {}
export interface CreateArticleRequestBody extends Partial<Article> {
    title: string;
    description: string;
    body: string;
    tags: string[];
    userId: number;
}
export interface UpdateArticleByIDRequestBody extends Partial<CreateArticleRequestBody> {}
export interface UpdateArticleByIDResponse extends Article {}
export interface DeleteArticleByIDResponse extends Article {
    isDeleted: boolean;
    deletedOn: string;
};
export interface Tag{
    slug: string;
    name: string;
    url: string;
}
export type GetArticleTagsResponse = Tag[];
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
export interface GetUsersResponse extends Response<User, "users"> {}
export interface RegisterUserResponse extends User {}
export interface UpdateUserByIDResponse extends User {}
export interface DeleteUserByIDResponse extends User {
    isDeleted: boolean;
    deletedOn: string;
}
export interface GetAuthUserResponse extends User {}
