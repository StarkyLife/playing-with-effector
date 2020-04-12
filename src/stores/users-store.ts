import { createStore, createEffect } from 'effector';

import { UserModel, UserFormValues } from '../types/user-model';

/* Effects */

export const fetchUsers = createEffect<{ loginTerm: string, authToken: string }, UserModel[]>({
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
});

// new user

const sendNewUser = createEffect<{ user: Partial<UserModel>, authToken: string }, UserModel>({
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
});

export const createNewUser = sendNewUser.prepend<UserFormValues & { authToken: string }>(
    ({ login, password, age, authToken }) => ({
        user: {
            login,
            password,
            age,
            isDeleted: false
        },
        authToken
    })
);


/* Store */

export const $users = createStore<UserModel[]>([]);
$users.on(fetchUsers.doneData, (_, users) => users);
$users.on(sendNewUser.doneData, (_, user) => [user])

/* Projections */

export const $usersProjection = $users.map(
    (users) => users
        .filter((user) => !user.isDeleted)
        .map(({ id, login, age }) => ({ id, login, age }))
);
