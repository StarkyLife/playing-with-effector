import { createStore, createEffect } from 'effector';

import { UserModel } from '../types/user-model';

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

/* Store */

export const $users = createStore<UserModel[]>([]);
$users.on(fetchUsers.doneData, (_, users) => users);

/* Projections */

export const $usersProjection = $users.map(
    (users) => users
        .filter((user) => !user.isDeleted)
        .map(({ id, login, age }) => ({ id, login, age }))
);
