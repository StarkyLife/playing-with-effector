import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { GroupFormValues, permissions } from '../../types/group-model';

import { createNewGroup } from '../../stores/groups-store';

const fieldsDefaults: GroupFormValues = {
    name: '',
    READ: '',
    WRITE: '',
    DELETE: '',
    SHARE: '',
    UPLOAD_FILES: ''
};

const GroupForm: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<GroupFormValues>({ defaultValues: fieldsDefaults });

    const handleGroupCreation = useCallback((values: GroupFormValues) => {
        createNewGroup(values);
        reset();
    }, [reset]);

    return (
        <form onSubmit={ handleSubmit(handleGroupCreation) }>
            <input ref={ register } name='name' placeholder='name' />
            { permissions.map(p => (
                <div key={ p} >
                    <label>{ p }</label>
                    <input ref={ register } name={ p } type='checkbox' value='checked' />
                </div>
            )) }
            <button type='submit'>Create New Group</button>
        </form>
    );
};

export default GroupForm;
