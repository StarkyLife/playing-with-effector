import { createStore, createEffect, attach } from 'effector';

import { UserModel, UserFormValues } from '../types/user-model';

import { $token } from './auth';

/* Effects */

export const getUsers = attach({
    effect: createEffect<{ loginTerm: string, authToken: string }, UserModel[]>({
        handler: async (data) => {
            const searchLimit = 5;
            const url = `http://localhost:8080/users?login=${data.loginTerm}&limit=${searchLimit}`;
            const request = await fetch(url, {
                headers: {
                    'x-access-token': data.authToken
                }
            });

            return request.json();
        }
    }),
    source: $token,
    mapParams: (
        params: { loginTerm: string },
        token
    ) => ({ loginTerm: params.loginTerm, authToken: token })
});

// new user

export const createNewUser = attach({
    effect: createEffect<{ user: Partial<UserModel>, authToken: string }, UserModel>({
        handler: async (data) => {
            const url = 'http://localhost:8080/users';
            const request = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data.user),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': data.authToken
                }
            });

            return request.json();
        }
    }),
    source: $token,
    mapParams: ({ login, password, age }: UserFormValues, token) => ({
        user: {
            login,
            password,
            age: +age,
            isDeleted: false
        },
        authToken: token
    })
});

/* Store */

export const $users = createStore<UserModel[]>([]);
$users.on(getUsers.doneData, (_, users) => users);
$users.on(createNewUser.doneData, (_, user) => [user])

/* Projections */

export const $usersProjection = $users.map(
    (users) => users
        .filter((user) => !user.isDeleted)
        .map(({ id, login, age }) => ({ id, login, age }))
);
