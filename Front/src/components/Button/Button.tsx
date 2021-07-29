import React, { FunctionComponent, ReactNode } from 'react';
import CustomButton from './style';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
    children: ReactNode;
    type?: ButtonType;
    onClick?: () => void;
}

const Button = ({ children, type, onClick }: ButtonProps) => {
    return (
        <CustomButton
            variant="contained"
            color="primary"
            type={type}
            onClick={onClick}
        >
            {children}
        </CustomButton>
    );
};

Button.defaultProps = {
    type: 'button',
    onClick: () => undefined,
};

export default Button;
