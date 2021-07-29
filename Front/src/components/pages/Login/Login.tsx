/* eslint-disable react/jsx-props-no-spreading */
import { gql, useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Title, Container, Form, TextInput, Input } from './style';
import Button from '../../Button/Button';

const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        Login(email: $email, password: $password) {
            email
        }
    }
`;

type FormValues = {
    email: string;
    password: string;
};

const LoginPage: FC<FormValues> = ({ datas }: FormValues) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const [loginUser, { datas }] = useMutation(LOGIN_USER);

    return (
        <Container>
            <Form onSubmit={handleSubmit((datas) => {
                loginUser({
                    variables: {
                        email: datas.email,
                        password: datas.password,
                    },
                }),
            })}>
                <Title>Connecte toi !</Title>
                <Input>
                    <TextInput
                        {...register('email', {
                            required: 'Ce champ est obligatoire',
                        })}
                        label="Email"
                        variant="outlined"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    <TextInput
                        {...register('password', {
                            required: 'Ce champ est obligatoire',
                            minLength: {
                                value: 5,
                                message:
                                    'Votre mot de passe doit faire au moins 5 caractères',
                            },
                        })}
                        label="Mot de passe"
                        variant="outlined"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </Input>
                <Button type="submit">Se connecter</Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
