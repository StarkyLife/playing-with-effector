export interface UserModel {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type UserFormValues = Pick<UserModel, 'login' | 'password'> & { age: string };
