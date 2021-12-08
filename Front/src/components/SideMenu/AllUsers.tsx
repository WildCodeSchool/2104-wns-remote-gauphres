import { gql, useQuery } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';

const GET_ALL_USERS = gql`
    query getAllUsers {
        getAllUsers {
            username
        }
    }
`;

type AllUsersType = {
    username: string;
    length: number;
};

const AllUsers: FC = () => {
    const { data } = useQuery(GET_ALL_USERS);

    const [allUsers, setAllUsers] = useState<AllUsersType>();

    useEffect(() => {
        setAllUsers(data && data.getAllUsers);
    }, [data]);

    return (
        <div>
            <p>{allUsers?.length} personnes à rencontrer</p>
        </div>
    );
};

export default AllUsers;
