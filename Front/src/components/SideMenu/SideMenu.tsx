/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IoBeer, IoPersonAddSharp } from 'react-icons/io5';
import { AiOutlineWechat } from 'react-icons/ai';
import { RiArticleLine } from 'react-icons/ri';
import { BiCoffeeTogo } from 'react-icons/bi';
import { MenuContainer, UsersConnectedContainer } from './style';
import  UserConnected from './UserConnected';
import  AllUsers from './AllUsers';



const SideMenu: FC = () => {
    return (
        <div>
        <MenuContainer>  
            <NavLink to="/dashboard" activeStyle={{color: "purple"}}><BiCoffeeTogo /> Dashboard</NavLink>            
            <NavLink to="/articles" activeStyle={{color: "purple"}}><RiArticleLine /> Articles</NavLink>
            <NavLink to="/random-chat" activeStyle={{color: "purple"}}><AiOutlineWechat /> Chat match</NavLink>
            <NavLink to="/members" activeStyle={{color: "purple"}}><IoPersonAddSharp /> Membres</NavLink>
            <NavLink to="/events" activeStyle={{color: "purple"}}><IoBeer /> Evenements</NavLink>
        </MenuContainer>
        <UsersConnectedContainer>
            <AllUsers />
            <UserConnected />
        </UsersConnectedContainer>
    </div>
    );
};

export default SideMenu;
