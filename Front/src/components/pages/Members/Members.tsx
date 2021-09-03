import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';

const MembersPage: FC = () => {
    return (
        <SideMenuContainer>
            <SideMenu />
            <div>Members Page</div>
        </SideMenuContainer>
    );
};

export default MembersPage;
