/* eslint-disable react/jsx-props-no-spreading */
import { gql, useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Title, Container, Form, TextInput, Input } from './style';
import Button from '../../Button/Button';

const LOGIN_USER = gql`
    mutation Login($user: UserLoginInput!) {
        Login(currentUser: $user)
    }
`;

type FormValues = {
    email: string;
    password: string;
};

const LoginPage: FC<FormValues> = () => {
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' });
    const [loginUser] = useMutation(LOGIN_USER);

    const storeData = async (token: string) => {
        try {
            await localStorage.setItem('@storage_Key', token);
        } catch (e) {
            console.error(e);
        }
    };

    const onSubmitForm = async (datas: FormValues) => {
        const result = await loginUser({
            variables: {
                user: {
                    email: datas.email,
                    password: datas.password,
                },
            },
        });
        if (result.data.Login) {
            await storeData(result.data.Login);
            history.push('/dashboard');
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
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
            </Form>
        </Container>
    );
};

export default LoginPage;
