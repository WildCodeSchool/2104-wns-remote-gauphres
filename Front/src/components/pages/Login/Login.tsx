import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Title, Container, Form, TextInput, Input, JoinText } from './style';
import Button from '../../Button/Button';
import useLogin from '../../../hooks/useLogin';

const LoginPage: FC = () => {
    const { login } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' });

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
