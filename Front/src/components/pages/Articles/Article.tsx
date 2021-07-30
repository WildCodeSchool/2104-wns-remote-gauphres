import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';

const ArticlesPage: FC = () => {
    return (
        <SideMenuContainer>
            <SideMenu />
            <div>ArticlePage</div>
        </SideMenuContainer>
    );
};

export default ArticlesPage;
