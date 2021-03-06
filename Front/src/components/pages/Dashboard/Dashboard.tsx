import React, { FC } from 'react';
import { SideMenuContainer } from '../../../style';
import Aztro from '../../DailyWindow/Aztro/Aztro';
import Caturday from '../../DailyWindow/Caturday/Caturday';
import FromTheSky from '../../DailyWindow/FromTheSky/FromTheSky';
import MyMood from '../../DailyWindow/MyMood/MyMood';
import RandomWord from '../../DailyWindow/RandomWord/RandomWord';
import SideMenu from '../../SideMenu/SideMenu';
import { ApiCardsContainer, MainWrapper, RightWrapper, Wrapper } from './style';

const Dashboard: FC = () => {
    return (
        <SideMenuContainer>
            <SideMenu />
            <Wrapper>
                <MainWrapper>
                    <ApiCardsContainer>
                        <Caturday />
                        <Aztro />
                    </ApiCardsContainer>
                    <ApiCardsContainer>
                        <RandomWord />
                        <FromTheSky />
                    </ApiCardsContainer>
                </MainWrapper>
                <RightWrapper>
                    <MyMood />
                </RightWrapper>
            </Wrapper>
        </SideMenuContainer>
    );
};

export default Dashboard;
