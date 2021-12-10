import styled from 'styled-components';
import { colors, fonts } from '../style/theme';

// eslint-disable-next-line import/prefer-default-export
export const MainDivSideMenu = styled.div`
    padding: 0 10px 0 10px;
`;

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.light};
    font-family: ${fonts.title};
    font-size: 2em;
    padding: 3em 0em 2em 1em;
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
    margin-top: 100%;
    width: 5%;
    color: black;
`;
