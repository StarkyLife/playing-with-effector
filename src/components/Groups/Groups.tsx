import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import { fetchGroups, $groupsProjection } from '../../stores/groups-store';

import GroupForm from '../GroupForm/GroupForm';

import styles from './Groups.module.css'

const Groups: React.FC = () => {
    const groups = useStore($groupsProjection);

    useEffect(() =>{
        fetchGroups({});
    }, []);

    return (
        <div className={ styles.container }>
            { groups.map((group) => (
                <div key={ group.id }>
                    { group.name } - { group.permissions }
                </div>
            )) }
            <hr />
            <GroupForm />
        </div>
    );
};

export default Groups;
