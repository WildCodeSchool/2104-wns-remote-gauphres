import styled from 'styled-components';
import { colors, fonts } from '../../style/theme';

export const Container = styled.div`
    flex-direction: column;
    background-color: ${colors.white};
    margin-top: 1em;
    border-radius: 1em;
    width: 80%;
`;

export const Form = styled.form`
    border: none;
    display: flex;
    flex-direction: row;
`;

export const FormInput = styled.input`
    border: none;
    width: 80%;
    padding: 1em;
    font-family: ${fonts.text};
    font-size: larger;
    &:focus {
        outline: none;
    }
`;

export const FormButton = styled.button`
    background-color: ${colors.purple};
    color: ${colors.white};
    border-radius: 1em;
    border: none;
    padding: 0.5em;
    font-family: ${fonts.text};
    font-weight: bold;
    font-size: 1em;
    margin: 1em;
    width: 20%;
    min-width: 5em;
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: ${colors.darkPurple};
    }
`;
