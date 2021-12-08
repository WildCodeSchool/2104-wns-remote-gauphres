/* eslint-disable react/destructuring-assignment */
import React, { FC } from 'react';
import styled from 'styled-components';

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

const RandomWord: FC = ({ randomWord }: any) => {
    return (
        <BoxStyle>
            <Header>
                <h2>Daily Word Learning</h2>
            </Header>
            <Body>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Word :</span>{' '}
                    {randomWord?.word}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Pronunciation :</span>{' '}
                    {randomWord?.pronunciation}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Definition :</span>{' '}
                    {randomWord?.definition}
                </p>
            </Body>
        </BoxStyle>
    );
};

export default RandomWord;
