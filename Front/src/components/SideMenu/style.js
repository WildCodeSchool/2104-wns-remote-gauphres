import styled from 'styled-components';
import { colors, fonts } from '../style/theme';
import { MyAvatar } from '../pages/Profile/style';

export const MainDivSideMenu = styled.div`
    padding: 0 10px 0 10px;
    min-width: 15rem;
`;

export const Avatar = styled(MyAvatar)`
    max-height: 15vh;
    margin: auto;
    margin-top: 10%;
`;

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.light};
    font-family: ${fonts.title};
    font-size: 2em;
    padding: 2em 0em 2em 1em;
    a {
        text-decoration: none;
        color: #131212;
        &:hover {
            opacity: 0.8;
        }
    }
`;
export const UsersConnectedContainer = styled.div`
    background-color: ${colors.white};
    font-family: ${fonts.title};
    bottom: 3em;
    left: 2em;
    padding: 1em;
    text-align: center;
`;

export const LogoutButtonContainer = styled.div`
    margin-top: 60%;
    text-align: center;
`;

export const LogoutButton = styled.button`
    font-family: ${fonts.title};
    background-color: #eb3d34;
    width: 60%;
    padding: 15px;
    border-radius: 20px;
    border: none;
    font-size: 15px;
    color: white;
    bottom: 0;
`;
