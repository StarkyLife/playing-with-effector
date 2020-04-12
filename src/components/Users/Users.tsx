import React, { useState, useCallback } from 'react';
import { useStore } from 'effector-react';

import { $usersProjection, fetchUsers } from '../../stores/users-store';
import { $token } from '../../stores/auth';

import UserForm from '../UserForm/UserForm';

import styles from './Users.module.css';

const Users: React.FC = () => {
    const authToken = useStore($token);
    const users = useStore($usersProjection);

    const [searchValue, changeSearchValue] = useState('');

    const handleSearch = useCallback(() => {
        fetchUsers({ loginTerm: searchValue , authToken });
    }, [searchValue, authToken]);

    return (
        <>
            <div className={ styles.searchContainer }>
                <input value={ searchValue } onChange={ (e) => changeSearchValue(e.currentTarget.value)} />
                <button onClick={ handleSearch }>Search</button>
            </div>
            { users.map(({ id, login, age}) => (
                <div key={id}>{ login } at age {age}</div>
            )) }
            <UserForm />
        </>
    );
}

export default Users;
