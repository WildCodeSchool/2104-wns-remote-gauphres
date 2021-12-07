import styled from 'styled-components';
import { colors, fonts } from '../style/theme';

export const SmallCard = styled.div`
    background-color: ${colors.darkPurple};
    color: ${colors.yellow};
    font-weight: 700;
    width: 50%;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-item: center;
    font-family: ${fonts.text};
    margin: 2em;
    padding: 0em 2em 2em 2em;
    text-align: center;
`;

export const MoodImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const MiniImages = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const MiniImage = styled.input`
    width: 30%;
    max-height: 50px;
`;
