/* eslint-disable prettier/prettier */
import React, { FC, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { NavLink, useHistory } from 'react-router-dom';
import { IoPersonAddSharp } from 'react-icons/io5';
import { AiOutlineWechat } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiCoffeeTogo } from 'react-icons/bi';
import { LogoutButtonContainer, MainDivSideMenu, MenuContainer, UsersConnectedContainer, LogoutButton, Avatar} from './style';
import  UserConnected from './UserConnected';
import  AllUsers from './AllUsers';
import Button from '../Button/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { ActionKind } from '../../types/authContextTypes';

const LOGOUT = gql`
  mutation logout($id: String!) {
    logout(userId: $id) {
        isConnected
    }
  }
`
const SideMenu: FC = () => {
    const { user, dispatch } = useContext(AuthContext);
    const history = useHistory();
    const [logout] = useMutation(LOGOUT);

    const handleDisconnect = async () => {
      if (user) {
        await logout({
            variables: {
              id: user._id,
            }
          });
        localStorage.removeItem('jwtToken');
        dispatch({ type: ActionKind.Logout, payload: user });
        history.push('/login');
      }
    }

    const redirectToProfil = () => {
      history.push('/profile');
    }
    
    return (
      <MainDivSideMenu>
        <Avatar
            src={`/images/avatars/${
                user && user.avatar !== null
                    ? user.avatar
                    : 'default.png'
            }`}
            alt={user?.avatar}
            onClick={() => redirectToProfil()}
        />
        <MenuContainer>  
            <NavLink to="/dashboard" activeStyle={{color: "purple"}}><BiCoffeeTogo /> Dashboard</NavLink>            
            <NavLink to="/random-chat" activeStyle={{color: "purple"}}><AiOutlineWechat /> Chat match</NavLink>
            <NavLink to="/members" activeStyle={{color: "purple"}}><IoPersonAddSharp /> Membres</NavLink>
            <NavLink to="/profile" activeStyle={{color: "purple"}}><BsFillPersonFill /> Profil</NavLink>
        </MenuContainer>
        <UsersConnectedContainer>
            <AllUsers />
            <UserConnected />
        </UsersConnectedContainer>
        <LogoutButtonContainer>
          <LogoutButton onClick={handleDisconnect}>Déconnexion</LogoutButton>
        </LogoutButtonContainer>
      </MainDivSideMenu>
    );
};

export default SideMenu;
