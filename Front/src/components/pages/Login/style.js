import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { fonts, colors } from '../../style/theme';

export const TextInput = styled(TextField)`
    width: 70%;
    margin-bottom: 2rem !important;
`;

export const Container = styled.div`
    background-color: #dbe6ef;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;
export const Title = styled.h2`
    font-size: 32px;
    font-family: ${fonts.title};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    background-color: #fac748;
    height: 70%;
    width: 60%;
`;

export const Input = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 70%;
`;

export const JoinText = styled.div`
    font-family: ${fonts.text};
    a {
        text-decoration: none;
        color: ${colors.darkPurple};
    }
`;
