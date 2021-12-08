/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../contexts/AuthContext';

// STYLES
const BoxStyle = styled.div`
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: black;
    width: 20vw;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 2px;
    margin-top: 100px;
    padding: 0.5em;
`;

const Header = styled.div`
    text-align: center;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

// TYPES
type Sign = {
    mood: string;
    description: string;
    current_date: string;
};

// LOGIC
const findZodiacSign = (day: number, month: string) => {
    let astroSign = '';

    if (month === 'december') {
        if (day < 22) astroSign = 'sagittarius';
        else astroSign = 'capricorn';
    } else if (month === 'january') {
        if (day < 20) astroSign = 'sapricorn';
        else astroSign = 'aquarius';
    } else if (month === 'february') {
        if (day < 19) astroSign = 'squarius';
        else astroSign = 'pisces';
    } else if (month === 'march') {
        if (day < 21) astroSign = 'sisces';
        else astroSign = 'aries';
    } else if (month === 'april') {
        if (day < 20) astroSign = 'aries';
        else astroSign = 'taurus';
    } else if (month === 'may') {
        if (day < 21) astroSign = 'taurus';
        else astroSign = 'gemini';
    } else if (month === 'june') {
        if (day < 21) astroSign = 'gemini';
        else astroSign = 'cancer';
    } else if (month === 'july') {
        if (day < 23) astroSign = 'cancer';
        else astroSign = 'leo';
    } else if (month === 'august') {
        if (day < 23) astroSign = 'leo';
        else astroSign = 'virgo';
    } else if (month === 'september') {
        if (day < 23) astroSign = 'virgo';
        else astroSign = 'libra';
    } else if (month === 'october') {
        if (day < 23) astroSign = 'libra';
        else astroSign = 'scorpio';
    } else if (month === 'november') {
        if (day < 22) astroSign = 'scorpio';
        else astroSign = 'sagittarius';
    }

    return astroSign;
};

const getDayOfBirthFromString = (date: string | undefined) => {
    const day = date?.substring(8, 10);
    if (day) {
        return parseInt(day, 10);
    }
    return 0;
};

const getMonthOfBirthFromString = (date: string | undefined) => {
    const month = date?.substring(5, 7);
    switch (month) {
        case '01':
            return 'january';
        case '02':
            return 'february';
        case '03':
            return 'march';
        case '04':
            return 'april';
        case '05':
            return 'may';
        case '06':
            return 'june';
        case '07':
            return 'july';
        case '08':
            return 'august';
        case '09':
            return 'september';
        case '10':
            return 'october';
        case '11':
            return 'november';
        case '12':
            return 'december';
        default:
            return 'january';
    }
};

// TODO: Ajout du content-loader pour l'attente du chargement des data

// COMPONENT
const Aztro = () => {
    const { user, refetch } = useContext(AuthContext);
    const [aztroSign, setAztroSign] = useState<Sign>();
    const day = getDayOfBirthFromString(user?.birthDate);
    const month = getMonthOfBirthFromString(user?.birthDate);

    const fetchAztro = async () => {
        const response = await fetch(
            `https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${findZodiacSign(
                day,
                month
            )}&day=today`,
            {
                method: 'POST',
                headers: {
                    'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
                    'x-rapidapi-key':
                        'a09fceb0d4msh6d0819babf7125ap1fda70jsn76afc11c0eb1',
                },
            }
        );
        const data = await response.json();
        setAztroSign(data);
    };

    useEffect(() => {
        fetchAztro();
        refetch();
    }, [user]);

    return (
        <BoxStyle>
            <Header>
                <h2>Your Daily Aztro sign !</h2>
            </Header>
            <Body>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Day :</span>{' '}
                    {aztroSign?.current_date}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Description :</span>{' '}
                    {aztroSign?.description}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Mood :</span>{' '}
                    {aztroSign?.mood}
                </p>
            </Body>
        </BoxStyle>
    );
};

export default Aztro;
