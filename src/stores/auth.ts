import { createStore, createEffect } from 'effector';

/* Effects */

export const login = createEffect({
    async handler() {
        const url = 'http://localhost:8080/login';
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: 'starky', password: 'pass' })
        });

        return request.json();
    }
});

/* Store */

export const $token = createStore('');
$token.on(login.doneData, (_, { token }) => token);

/* Projections */

export const $isAuthorized = $token.map((token) => !!token);
