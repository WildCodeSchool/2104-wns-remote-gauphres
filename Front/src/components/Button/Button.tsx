import React, { FunctionComponent } from 'react';
import CustomButton from './style';

const Button: FunctionComponent = ({ children }) => {
    return (
        <CustomButton variant="contained" color="primary" type="button">
            {children}
        </CustomButton>
    );
};

export default Button;
