import { createStore, createEffect, attach } from 'effector';

import { GroupModel, GroupFormValues, permissions } from '../types/group-model';

import { $token } from './auth';

/* Effects */

export const fetchGroups = attach({
    effect: createEffect<{ authToken: string }, GroupModel[]>({
        handler: async (data) => {
            const url = 'http://localhost:8080/groups';
            const request = await fetch(url, {
                headers: {
                    'x-access-token': data.authToken
                }
            });

            return request.json();
        }
    }),
    source: $token,
    mapParams: (_, token) => ({
        authToken: token
    })
});

export const createNewGroup = attach({
    effect: createEffect<{ groupModel: Partial<GroupModel>, token: string }, GroupModel>({
        async handler(data) {
            const url = 'http://localhost:8080/groups';

            const request = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data.groupModel),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': data.token
                }
            });

            return request.json();
        }
    }),
    source: $token,
    mapParams: (group: GroupFormValues, token) => ({
        token,
        groupModel: {
            name: group.name,
            permissions: permissions.filter(p => group[p])
        }
    })
});

createNewGroup.done.watch(() => fetchGroups({}));

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
