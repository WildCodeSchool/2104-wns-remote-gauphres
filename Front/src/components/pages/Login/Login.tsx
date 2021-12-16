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
                <Title>Connecte toi !</Title>
                <Input>
                    <TextInput
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Ce champ est obligatoire',
                            },
                        })}
                        label="Email"
                        variant="outlined"
                        error={errors.email}
                        helperText={errors.email && errors.email.message}
                    />
                    <TextInput
                        {...register('password', {
                            required: 'Ce champ est obligatoire',
                            minLength: {
                                value: 3,
                                message:
                                    'Votre mot de passe doit faire au moins 3 caractères',
                            },
                        })}
                        label="Mot de passe"
                        variant="outlined"
                        error={errors.password}
                        helperText={errors.password && errors.password.message}
                    />
                </Input>
                <Button type="submit">Se connecter</Button>
                <JoinText>
                    Want to join us ? <a href="/register">Create an account</a>
                </JoinText>
            </Form>
        </Container>
    );
};

export default LoginPage;
