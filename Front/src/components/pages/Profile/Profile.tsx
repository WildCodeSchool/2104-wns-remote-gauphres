import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';

const ProfilePage: FC = () => {
    return (
        <SideMenuContainer>
            <SideMenu />
            <div>ProfilePage</div>
        </SideMenuContainer>
    );
};

export default ProfilePage;
