import React, { createContext, useState, Dispatch, FC, SetStateAction } from 'react';

export type UserMood = {
  title: string;
  image: string;
};

export type User = {
  _id: string;
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
}>({
  user: undefined,
  setUser: () => {},
});


// const FIND_USER_BY_EMAIL = gql`
//   query getUserByEmail($email: String!) {
//     getUserByEmail(email: $email) {
//       _id
//       username
//       firstname
//       lastname
//       password
//       avatar
//       isConnected
//       email
//       birthDate
//       userMood {
//         title
//         image
//       }
//     }
//   }
// `;

// const FIND_USER_BY_ID = gql`
//   query getUserById($id: String!) {
//     getUserById(_id: $id) {
//       _id
//       username
//       firstname
//       lastname
//       password
//       avatar
//       isConnected
//       email
//       birthDate
//       userMood {
//         title
//         image
//       }
//     }
//   }
// `;


export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
