import { gql, useQuery } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const GET_CONNECTED = gql`
    query getUsersConnected {
        getUsersConnected {
            isConnected
        }
    }
`;

type UsersConnectedType = {
    isConnected: boolean;
    length: number;
};

const UserConnected: FC = () => {
    const { data, loading } = useQuery(GET_CONNECTED);
    const [userConnected, setUserConnected] = useState<UsersConnectedType>();

    useEffect(() => {
        setUserConnected(data && data.getUsersConnected);
    }, [data]);

    if (loading) {
        return (
            <div>
                <Box
                    sx={{
                        display: 'flex',
                        my: 2,
                    }}
                >
                    <Skeleton
                        sx={{
                            width: '80%',
                            margin: 'auto',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        my: 2,
                    }}
                >
                    <Skeleton
                        sx={{
                            width: '60%',
                            margin: 'auto',
                        }}
                    />
                </Box>
            </div>
        );
    }
    return (
        <div>
            <p>- {userConnected?.length} connectées -</p>
        </div>
    );
};

export default UserConnected;
