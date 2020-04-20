import { createStore, createEffect, attach, createEvent } from 'effector';

import { GroupModel, GroupFormValues, permissions } from '../types/group-model';

import { $token } from './auth';

/* Events */

export const hideGroup = createEvent<string>('hideGroup');

/* Effects */

// get groups

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

// create group

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

// delete group

export const deleteGroup = attach({
    effect: createEffect<{ id: string, token: string }, void>({
        async handler(data) {
            const url = `http://localhost:8080/groups/${data.id}`;

            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'x-access-token': data.token
                }
            });
        }
    }),
    source: $token,
    mapParams: (id: string, token) => ({
        token,
        id
    })
});

deleteGroup.doneData.watch(() => fetchGroups({}));

/* Store */

export const $groups = createStore<GroupModel[]>([])
    .on(fetchGroups.doneData, (_, groups) => groups)
    .on(hideGroup, (groups, groupId) => groups.filter(g => g.id !== groupId));

export const $groupsError = createStore<string>('')
    .on(deleteGroup.failData, (_, error) => error.message);

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
