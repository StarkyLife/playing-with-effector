import { createStore, createEffect } from 'effector';

import { GroupModel } from '../types/group-model';

/* Effects */

export const fetchGroups = createEffect<{ authToken: string }, GroupModel[]>({
    handler: async (data) => {
        const url = 'http://localhost:8080/groups';
        const request = await fetch(url, {
            headers: {
                'x-access-token': data.authToken
            }
        });

        return request.json();
    }
});

/* Store */

export const $groups = createStore<GroupModel[]>([]);
$groups.on(fetchGroups.doneData, (_, groups) => groups);

/* Projections */

export const $groupsProjection = $groups.map(
    (groups) => groups
        .map(({
            id,
            name,
            permissions
        }) => ({
            id,
            name,
            permissions: permissions.join(', ')
        }))
);
