/* eslint-disable prettier/prettier */
import React, { FC, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { NavLink, useHistory } from 'react-router-dom';
import { IoBeer, IoPersonAddSharp } from 'react-icons/io5';
import { AiOutlineWechat } from 'react-icons/ai';
import { RiArticleLine } from 'react-icons/ri';
import { BiCoffeeTogo } from 'react-icons/bi';
import { MenuContainer, UsersConnectedContainer } from './style';
import  UserConnected from './UserConnected';
import  AllUsers from './AllUsers';
import Button from '../Button/Button';
import { UserContext } from '../../contexts/UserContext';

const LOGOUT = gql`
  mutation logout($id: String!) {
    logout(userId: $id) {
        isConnected
    }
  }
`

const SideMenu: FC = () => {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [logout] = useMutation(LOGOUT);

    const handleDisconnect = async () => {
        await logout({
            variables: {
              id: user?._id,
            }
          });
        localStorage.clear();
        history.push('/login');
    }
    
    return (
        <div>
        <MenuContainer>  
            <NavLink to="/dashboard" activeStyle={{color: "purple"}}><BiCoffeeTogo /> Dashboard</NavLink>            
            <NavLink to="/articles" activeStyle={{color: "purple"}}><RiArticleLine /> Articles</NavLink>
            <NavLink to="/random-chat" activeStyle={{color: "purple"}}><AiOutlineWechat /> Chat match</NavLink>
            <NavLink to="/members" activeStyle={{color: "purple"}}><IoPersonAddSharp /> Membres</NavLink>
            <NavLink to="/events" activeStyle={{color: "purple"}}><IoBeer /> Evenements</NavLink>
        </MenuContainer>
        <Button color='secondary' onClick={handleDisconnect}>Déconnexion</Button>
        <UsersConnectedContainer>
            <AllUsers />
            <UserConnected />
        </UsersConnectedContainer>
    </div>
    );
};

export default SideMenu;
