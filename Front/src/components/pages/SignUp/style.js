import styled from 'styled-components';
import {
    TextField,
    Stepper as StepperBase,
    Select as SelectBase,
} from '@material-ui/core';
import { fonts } from '../../style/theme';

export const Stepper = styled(StepperBase)`
    background-color: #fac748 !important;
    width: 70%;
    min-width: 16rem !important;
`;

export const TextInput = styled(TextField)`
    min-width: 16rem !important;
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
    text-align-last: center;
    font-size: 32px;
    font-family: ${fonts.title};
`;

export const SubTitle = styled.h3`
    font-size: 22px;
    font-style: italic;
    font-weight: lighter;
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

export const InputDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 70%;
`;

export const Select = styled(SelectBase)`
    width: 70%;
`;
