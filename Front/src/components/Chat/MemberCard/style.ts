import styled from 'styled-components';
import { colors, fonts } from '../../style/theme';

export const Article = styled.div`
    background-color: ${colors.white};
    width: 250px;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
    font-family: ${fonts.title};
    margin: auto;
    padding: 2em;
    text-align: center;
    box-shadow: 2px 3px 3px gray;
`;

export const UserName = styled.div`
    margin-top: 0.5em;
    margin-bottom: 1em;
    font-size: 2em;
`;

export const Avatar = styled.div`
    display: flex;
    align-items: center;
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
    position: absolute;
    bottom: 0;
    left: 150px;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: #aed581;
`;

export const Offline = styled.div`
    position: absolute;
    bottom: 0;
    left: 150px;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: #f4511e;
`;

export const Mood = styled.img`
    border-radius: 7px 7px 0 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: #f4511e;
`;

export const Mood = styled.img`
    border-radius: 7px 7px 0 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: auto;
    margin-top: 1.5em;
`;

export const Birthday = styled.div`
    font-size: 1.2em;
`;

export const Hobby = styled.div`
    font-size: 1.5em;
    margin-top: 1em;
`;

export const BirthdayCake = styled.img`
    width: 30px;
    display: block;
    margin: auto;
    margin-top: 1.5em;
`;

export const Birthday = styled.div`
    font-size: 1.2em;
`;

export const Hobby = styled.div`
    font-size: 1.5em;
    margin-top: 1em;
`;

export const BirthdayCake = styled.img`
    width: 30px;
    display: block;
    margin: auto;
`;

export default {};
