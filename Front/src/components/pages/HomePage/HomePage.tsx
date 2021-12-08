import React, { FC } from 'react';
import HomePageButton from '../../shared/ButtonHomePage/HomePageButton';

import {
    Link,
    HomePageBlock,
    HomePageBlockLineContainer,
    HomepageButtonsContainer,
    HomePageContainer,
    PictureContent,
    HomePageTitle,
} from './homePageStyle';

const HomePage: FC = () => {
    return (
        <HomePageContainer>
            <PictureContent>
                <HomePageTitle>
                    <h1 data-testid="homepage-title">MOOWDY!</h1>
                    <h2>Se rencontrer</h2>
                </HomePageTitle>
                <HomepageButtonsContainer>
                    <HomePageButton>
                        <Link to="/login">Se connecter</Link>
                    </HomePageButton>
                    <HomePageButton>
                        <Link to="/register">Créer un compte</Link>
                    </HomePageButton>
                </HomepageButtonsContainer>
            </PictureContent>
        </HomePageContainer>
    );
};

export default HomePage;
