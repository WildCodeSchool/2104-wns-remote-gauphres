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

// eslint-disable-next-line consistent-return
const numberOfUsersToMet = (numberOfAllPeople: number | undefined) => {
    if (numberOfAllPeople) {
        return numberOfAllPeople - 1;
    }
};

const AllUsers: FC = () => {
    const { loading, error: queryError, data } = useQuery(GET_ALL_USERS);

    const [allUsers, setAllUsers] = useState<AllUsersType>();

    useEffect(() => {
        setAllUsers(data && data.getAllUsers);
    }, [data]);

    return (
        <div>
            <p>{numberOfUsersToMet(allUsers?.length)} personnes à rencontrer</p>
        </div>
    );
};

export default AllUsers;
