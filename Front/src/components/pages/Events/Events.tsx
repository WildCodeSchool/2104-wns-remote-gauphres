import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';

const EventsPage: FC = () => {
    return (
        <SideMenuContainer>
            <SideMenu />
            <div>Events Page</div>
        </SideMenuContainer>
    );
};

export default EventsPage;
