import React, { useEffect, useCallback } from 'react';
import { useStore } from 'effector-react';

import { fetchGroups, $groupsProjection, hideGroup, $groupsError, deleteGroup } from '../../stores/groups-store';

import GroupForm from '../GroupForm/GroupForm';

import styles from './Groups.module.css'

const Groups: React.FC = () => {
    const groups = useStore($groupsProjection);
    const error = useStore($groupsError);

    useEffect(() =>{
        fetchGroups({});
    }, []);

    const getHideHandler = useCallback((id: string) => (e: React.SyntheticEvent) => {
        e.preventDefault();
        hideGroup(id);
    }, []);

    const getRemoveHandler = useCallback((id: string) => (e: React.SyntheticEvent) => {
        e.preventDefault();
        deleteGroup(id);
    }, []);

    return (
        <div className={ styles.container }>
            { groups.map((group) => (
                <div key={ group.id }>
                    <span className={ styles.group }>
                        { group.name } - { group.permissions }
                    </span>
                    <button
                        className={ styles.hide }
                        onClick={ getHideHandler(group.id) }
                    >
                        <span
                            role='img'
                            aria-label='hide'
                        >
                            🙈
                        </span>
                    </button>
                    <button
                        className={ styles.remove }
                        onClick={ getRemoveHandler(group.id) }
                    >
                        X
                    </button>
                </div>
            )) }
            <p className={ styles.errorMessage }>{ error }</p>
            <hr />
            <GroupForm />
        </div>
    );
};

export default Groups;
