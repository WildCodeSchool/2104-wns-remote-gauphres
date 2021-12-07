/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import React, { FC, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { SideMenuContainer } from '../../../style';
import Aztro from '../../DailyWindow/Aztro/Aztro';
import MyMood from '../../DailyWindow/MyMood/MyMood';
import RandomWord from '../../DailyWindow/RandomWord/RandomWord';
import SideMenu from '../../SideMenu/SideMenu';
import { MainWrapper, RightWrapper, Wrapper } from './style';
// import MyMatch from '../../DailyWindow/MyMatch';

const Dashboard: FC = () => {
    const { user } = useContext(UserContext);
    const [randomWord, setRandomWord] = useState();

    const fetchData = async () => {
        const response = await fetch(
            'https://random-words-api.vercel.app/word'
        );
        const data = await response.json();
        setRandomWord(data[0]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SideMenuContainer>
            <SideMenu />
            <Wrapper>
                <MainWrapper>
                    <h1>Dashboard</h1>
                    <RandomWord randomWord={randomWord} />
                    <Aztro userDate={user?.birthDate} />
                </MainWrapper>
                <RightWrapper>
                    <MyMood user={user} />
                    {/* <MyMatch /> */}
                </RightWrapper>
            </Wrapper>
        </SideMenuContainer>
    );
};

export default Dashboard;
