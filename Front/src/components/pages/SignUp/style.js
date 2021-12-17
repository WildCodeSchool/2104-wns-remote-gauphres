import styled from 'styled-components';
import {
    TextField,
    Stepper as StepperBase,
    Select as SelectBase,
    Chip as ChipBase,
} from '@material-ui/core';
import DatePicker from 'react-date-picker';
import { fonts, colors } from '../../style/theme';

export const Stepper = styled(StepperBase)`
    background-color: ${colors.yellow} !important;
    width: 70%;
    min-width: 16rem !important;
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

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    background-color: #fac748;
    min-height: 75vh;
    width: 45vw;
    min-width: 20rem;
`;

export const InputDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 70%;
    min-height: 33vh;
    justify-content: space-evenly;
`;

export const TextInput = styled(TextField)`
    min-width: 16rem !important;
    width: 70%;
    margin-bottom: 0.7rem !important;
    background-color: ${colors.yellow};
`;

export const Select = styled(SelectBase)`
    width: 100%;
    margin-bottom: 10rem;
    & .MuiSelect-selectMenu {
        white-space: normal;
    }
`;

export const Chip = styled(ChipBase)`
    color: #fff !important;
    background-color: #303f9f !important;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
`;

export const BirthdateContainer = styled.div`
    min-width: 16rem !important;
    width: 70%;
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BirthdateLabel = styled.p`
    color: rgba(0, 0, 0, 0.55);
    margin: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

export const CustomDatePicker = styled(DatePicker)`
    width: 100%;
    min-height: 56px;
    border-radius: 4px;
    border: solid 1px rgba(0, 0, 0, 0.23);
    margin-bottom: 2rem !important;
    :hover {
        border: solid 1px #000;
    }
    & .react-date-picker__wrapper {
        border: none;
        & .react-date-picker__inputGroup {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            & .span {
                text-align: center;
            }
        }
        & .react-date-picker__inputGroup__input {
            width: 1rem !important;
        }
        & .react-date-picker__inputGroup__input:invalid {
            background: none;
        }
        & .react-date-picker__inputGroup :last-child {
            width: 2rem !important;
        }
    }
`;
