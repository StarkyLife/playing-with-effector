import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import { $usersProjection, fetchUsers } from '../../stores/users-store';
import { $token } from '../../stores/auth';

const Users: React.FC = () => {
    const authToken = useStore($token);
    const users = useStore($usersProjection);

    useEffect(() => {
        // TODO: почему-то fetch возвращает пустой массив всегда
        fetchUsers({ loginTerm: 'starky' , authToken });
    }, [authToken]);

    return (
        <>
            { users.map((user) => (
                <div>{ user.login } at age {user.age}</div>
            )) }
        </>
    );
}

export default Users;
