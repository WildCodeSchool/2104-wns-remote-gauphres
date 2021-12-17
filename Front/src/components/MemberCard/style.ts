import {
    Card as CardBase,
    CardHeader as CardHeaderBase,
    CardContent as CardContentBase,
    IconButton as IconButtonBase,
} from '@material-ui/core';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fonts, colors } from '../style/theme';

export const Card = styled(CardBase)`
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${fonts.text};
    margin: auto;
    margin-top: 2em;
    padding: 2em;
    border-radius: 1em !important;
`;

export const CardHeader = styled(CardHeaderBase)`
    width: 100%;
    & .MuiCardHeader-content {
        & .MuiCardHeader-title {
            font-size: 2em;
            font-family: ${fonts.title};
        }
    }
`;

export const CardContent = styled(CardContentBase)`
    width: 100%;
`;

export const IconButton = styled(IconButtonBase)`
    border-radius: 30px !important;
    font-size: 1rem !important;
    height: 2rem;
`;

export const ExpandIcon = styled(ExpandMoreIcon)`
    transform: ${(props) => (props.rotate ? `rotate(180deg)` : `rotate(0deg)`)};
    margin-left: 'auto';
`;

export const HobbyCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Hobby = styled.li`
    list-style-type: none;
`;

export const Avatar = styled.div`
    display: flex;
    align-items: flex-end;
    position: relative;
`;

export const Img = styled.img`
    border-radius: 7px 7px 0 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: auto;
`;

export const Online = styled.div`
    margin-left: 4rem;
    position: absolute;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: ${colors.online};
`;

export const Offline = styled.div`
    margin-left: 4rem;
    position: absolute;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: ${colors.offline};
`;

export const Mood = styled.img`
    border-radius: 7px 7px 0 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 1.5em;
`;

export const Birthday = styled.div`
    font-size: 1.2em;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const BirthdayCake = styled.img`
    width: 30px;
    display: block;
`;
