/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PropTypes } from '@material-ui/core';
import React, { ReactNode } from 'react';
import CustomHomePageButton from './homePageButtonStyle';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface HomePageButtonProps {
    children: ReactNode;
    type?: ButtonType;
    onClick?: (arg1: any) => void;
    disabled?: boolean;
    color?: PropTypes.Color | undefined;
}

const HomePageButton = ({
    children,
    type,
    onClick,
    disabled,
    color,
}: HomePageButtonProps) => (
    <CustomHomePageButton
        variant="contained"
        color={color}
        type={type}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </CustomHomePageButton>
);

HomePageButton.defaultProps = {
    type: 'button',
    onClick: () => undefined,
    disabled: false,
    color: 'secondary',
};

export default HomePageButton;
