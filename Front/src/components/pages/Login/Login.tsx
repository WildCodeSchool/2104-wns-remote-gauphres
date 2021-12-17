import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Title, Container, Form, TextInput, Input, JoinText } from './style';
import Button from '../../Button/Button';
import useLogin from '../../../hooks/useLogin';
import { EyeIconProps } from '../SignUp/SignUp';

const EyeIcon = ({ show, ...props }: EyeIconProps) => {
    if (show) {
        return <VisibilityOffIcon {...props} />;
    }
    return <VisibilityIcon {...props} />;
};

const LoginPage: FC = () => {
    const { login } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Container>
            <Form onSubmit={handleSubmit(login)}>
                <Title>Login !</Title>
                <Input>
                    <TextInput
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'This field is mandatory',
                            },
                        })}
                        label="Email"
                        variant="outlined"
                        error={errors.email}
                        helperText={errors.email && errors.email.message}
                    />
                    <TextInput
                        {...register('password', {
                            required: 'This field is mandatory',
                            minLength: {
                                value: 8,
                                message: 'Please enter your password',
                            },
                        })}
                        label="Password"
                        variant="outlined"
                        error={errors.password}
                        helperText={errors.password && errors.password.message}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <EyeIcon
                                        show={showPassword}
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={{ cursor: 'pointer' }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Input>
                <Button type="submit">Login</Button>
                <JoinText>
                    Want to join us ? <a href="/register">Create an account</a>
                </JoinText>
            </Form>
        </Container>
    );
};

export default LoginPage;
