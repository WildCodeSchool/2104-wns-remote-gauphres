import { gql, useQuery } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';

const GET_ALL_USERS = gql`
    query getAllUsers {
        getAllUsers {
            username
        }
    }
`;

type User = {
    username: string;
};

const AllUsers: FC = () => {
    const { loading, data } = useQuery(GET_ALL_USERS);

    const [allUsers, setAllUsers] = useState<User[]>();

    useEffect(() => {
        setAllUsers(data && data.getAllUsers);
    }, [data]);

    if (!allUsers || loading) return null;

    return (
        <div>
            <p>{allUsers.length - 1} personnes à rencontrer</p>
        </div>
    );
};

export default AllUsers;
