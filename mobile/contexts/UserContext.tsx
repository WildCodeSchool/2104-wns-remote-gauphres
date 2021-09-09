import { gql, useLazyQuery } from '@apollo/client';
import React, { createContext, useState, Dispatch, useEffect, FC, SetStateAction } from 'react';

// La lib jsonwebtoken fait crasher l'app /!\ Idem pour expo-jwt
// import jwt from 'jsonwebtoken';

export type UserMood = {
  title: string;
  image: string;
};

export type User = {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  avatar: string;
  isConnected: boolean;
  email: string;
  birthDate: string;
  userMood?: UserMood;
};

export const UserContext = createContext<{
  user: User | undefined,
  setUser: Dispatch<SetStateAction<User | undefined>>
  token: string | undefined,
  setToken: Dispatch<SetStateAction<string | undefined>>
}>({
  user: undefined,
  setUser: () => {},
  token: undefined,
  setToken: () => {}
});


const FIND_USER = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      username
      firstname
      lastname
      password
      avatar
      isConnected
      email
      birthDate
      userMood {
        title
        image
      }
    }
  }
`;


export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const value = { user, setUser, token, setToken};
  const [getUser, { data }] = useLazyQuery(FIND_USER);
  const key = "moowdyJwtKey";

  // if(token) {
  //   const email = jwt.verify(token, key, {}, function(err, decoded) {
  //     console.log('toto')
  //   });
  // //   getUser({ variables: { email } })
  // }

  useEffect(() => {
    setUser(data && data.getUserByEmail)
  }, [data]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
