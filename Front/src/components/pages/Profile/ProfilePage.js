import styled from 'styled-components';
import { fonts } from '../../style/theme';

export const ProfilContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const ProfileCard = styled.div`
    display: flex;
    font-family: ${fonts.text};
    margin-bottom: 30px;
    font-size: 25px;
`;

export const ProfileTitle = styled.div`
    font-family: ${fonts.title};
    font-size: 2.5em;
    margin: 0;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
`;

export const MyAvatar = styled.img`
    display: flex;
    max-height: 30vh;
    margin-bottom: 100px;
`;

export const Avatars = styled.div`
    display: flex;
`;

export const MiniAvatar = styled.img`
    display: felx;
    width: 30%;
    max-height: 50px;
    margin: 10px;
`;
