/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PropTypes } from '@material-ui/core';
import React, { CSSProperties, ReactNode } from 'react';
import CustomButton from './style';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
    children: ReactNode;
    type?: ButtonType;
    onClick?: (arg1: unknown) => void;
    disabled?: boolean;
    color?: PropTypes.Color | undefined;
    style?: CSSProperties;
}

const Button = ({
    children,
    type,
    onClick,
    disabled,
    color,
    style,
}: ButtonProps) => {
    return (
        <CustomButton
            style={style}
            variant="contained"
            color={color}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </CustomButton>
    );
};

Button.defaultProps = {
    type: 'button',
    onClick: () => undefined,
    disabled: false,
    color: 'primary',
    style: undefined,
};

export default Button;
