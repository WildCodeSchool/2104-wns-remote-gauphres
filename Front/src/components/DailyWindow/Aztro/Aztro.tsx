/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { AuthContext } from '../../../contexts/AuthContext';
import ApiCard from '../../shared/Card/ApiCard';

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
        if (day < 20) astroSign = 'capricorn';
        else astroSign = 'aquarius';
    } else if (month === 'february') {
        if (day < 19) astroSign = 'aquarius';
        else astroSign = 'pisces';
    } else if (month === 'march') {
        if (day < 21) astroSign = 'pisces';
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

// COMPONENT
const Aztro: FC = () => {
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
        <ApiCard
            title="Your Daily Aztro sign !"
            subtitle={findZodiacSign(day, month)}
        >
            {!aztroSign?.current_date && (
                <Box
                    sx={{
                        display: 'flex',
                        my: 2,
                    }}
                >
                    Day:{' '}
                    <Skeleton
                        sx={{
                            width: '60%',
                            margin: 'auto',
                        }}
                    />
                </Box>
            )}
            {aztroSign?.current_date && (
                <p>
                    <span style={{ fontWeight: 'bold' }}>Day :</span>{' '}
                    {aztroSign?.current_date}
                </p>
            )}

            {!aztroSign?.description && (
                <Box
                    sx={{
                        display: 'flex',
                        my: 2,
                    }}
                >
                    Description:{' '}
                    <Skeleton
                        sx={{
                            width: '60%',
                            margin: 'auto',
                        }}
                    />
                </Box>
            )}
            {aztroSign?.description && (
                <p>
                    <span style={{ fontWeight: 'bold' }}>Description :</span>{' '}
                    {aztroSign?.description}
                </p>
            )}

            {!aztroSign?.mood && (
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    Mood:{' '}
                    <Skeleton
                        sx={{
                            width: '60%',
                            margin: 'auto',
                        }}
                    />
                </Box>
            )}
            {aztroSign?.description && (
                <p>
                    <span style={{ fontWeight: 'bold' }}>Mood:</span>{' '}
                    {aztroSign?.mood}
                </p>
            )}
        </ApiCard>
    );
};

export default Aztro;
