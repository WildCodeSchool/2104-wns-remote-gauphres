import React, { FC, useContext } from 'react';
import { User, UserContext } from '../../../contexts/UserContext';
import { SideMenuContainer } from '../../../style';
import MyMood from '../../DailyWindow/MyMood/MyMood';
import SideMenu from '../../SideMenu/SideMenu';
import { MainWrapper, RightWrapper, Wrapper } from './style';
// import MyMatch from '../../DailyWindow/MyMatch';

const Dashboard: FC = () => {
    const { user } = useContext(UserContext);

    // TODO : for test, mood id => to delete
    // const id = '6096bf9fab2e797b569f4183';

    return (
        <SideMenuContainer>
            <SideMenu />
            <Wrapper>
                <MainWrapper>
                    <h1>Dashboard</h1>
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
