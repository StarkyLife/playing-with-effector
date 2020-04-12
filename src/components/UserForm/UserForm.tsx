import React, { useCallback, useState } from 'react';
import { useStore } from 'effector-react';

import { $token } from '../../stores/auth';
import { createNewUser } from '../../stores/users-store';

const UserForm: React.FC = () => {
    const authToken = useStore($token);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);

    const getChangeHandler = useCallback(
        (fn: Function) => (e: React.ChangeEvent<HTMLInputElement>) => fn(e.currentTarget.value),
        []
    );

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        createNewUser({ login, password, age, authToken });

        setLogin('');
        setPassword('');
        setAge(0);
    }, [login, password, age, authToken]);

    return (
        <form onSubmit={ handleSubmit }>
            <input
                placeholder='login'
                value={ login }
                onChange={ getChangeHandler(setLogin) }
            />
            <input
                placeholder='password'
                type='password'
                value={ password }
                onChange={ getChangeHandler(setPassword) }
            />
            <input
                placeholder='age'
                type='number'
                value={ age }
                onChange={ getChangeHandler(setAge) }
            />
            <button type='submit'>Create new user</button>
        </form>
    );
};

export default UserForm;
