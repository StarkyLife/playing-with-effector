import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { UserFormValues } from '../../types/user-model';

import { createNewUser } from '../../stores/users-store';

const fieldsDefaults: UserFormValues = {
    login: '',
    password: '',
    age: ''
};

const UserForm: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<UserFormValues>({ defaultValues: fieldsDefaults });

    const handleUserCreation = useCallback((values: UserFormValues) => {
        createNewUser(values);
        reset();
    }, [reset]);

    return (
        <form onSubmit={ handleSubmit(handleUserCreation) }>
            <input
                ref={ register }
                name='login'
                placeholder='login'
            />
            <input
                ref={ register }
                name='password'
                placeholder='password'
                type='password'
            />
            <input
                ref={ register }
                name='age'
                placeholder='age'
                type='number'
            />
            <button type='submit'>Create new user</button>
        </form>
    );
};

export default UserForm;
