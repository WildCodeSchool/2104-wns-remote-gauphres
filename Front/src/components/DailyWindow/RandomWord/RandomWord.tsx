import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ApiCard from '../../shared/Card/ApiCard';

type RandomWordType = {
    word: string;
    definition: string;
    pronunciation: string;
};

const RandomWord: FC = () => {
    const [randomWord, setRandomWord] = useState<RandomWordType>();

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
        <ApiCard title="Daily Word Learning">
            {!randomWord?.word && (
                <Box
                    sx={{
                        display: 'flex',
                        my: 2,
                    }}
                >
                    Word :{' '}
                    <Skeleton
                        sx={{
                            width: '60%',
                            margin: 'auto',
                        }}
                    />
                </Box>
            )}
            {randomWord?.word && (
                <p>
                    <span style={{ fontWeight: 'bold' }}>Word :</span>{' '}
                    {randomWord?.word}
                </p>
            )}

            {!randomWord?.pronunciation && (
                <Box
                    sx={{
                        display: 'flex',
                        my: 2,
                    }}
                >
                    Pronunciation :{' '}
                    <Skeleton
                        sx={{
                            width: '60%',
                            margin: 'auto',
                        }}
                    />
                </Box>
            )}
            {randomWord?.pronunciation && (
                <p>
                    <span style={{ fontWeight: 'bold' }}>Pronunciation :</span>{' '}
                    {randomWord?.pronunciation}
                </p>
            )}

            {!randomWord?.definition && (
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    Definition :{' '}
                    <Skeleton
                        sx={{
                            width: '60%',
                            margin: 'auto',
                        }}
                    />
                </Box>
            )}
            {randomWord?.definition && (
                <p>
                    <span style={{ fontWeight: 'bold' }}>Definition :</span>{' '}
                    {randomWord?.definition}
                </p>
            )}
        </ApiCard>
    );
};

export default RandomWord;
