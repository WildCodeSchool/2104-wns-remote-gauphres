/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ApiCard from '../../shared/Card/ApiCard';

const BoxStyle = styled.div`
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: black;
    width: 20vw;
    height: 250px;
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

// Ajout du content-loader pour l'attente du chargement des data

const RandomWord = ({ randomWord }: any) => {
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
