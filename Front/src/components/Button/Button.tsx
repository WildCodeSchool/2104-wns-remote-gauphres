/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { ReactNode } from 'react';
import CustomButton from './style';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
    children: ReactNode;
    type?: ButtonType;
    onClick?: (arg?: any) => void;
    disabled?: any;
}

const Button = ({ children, type, onClick, disabled }: ButtonProps) => {
    return (
        <CustomButton
            variant="contained"
            color="primary"
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
};

export default Button;
