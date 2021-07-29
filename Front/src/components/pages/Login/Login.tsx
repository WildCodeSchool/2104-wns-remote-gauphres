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

const LoginPage: FC<FormValues> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const [loginUser] = useMutation(LOGIN_USER);

    const onSubmitForm = (datas: FormValues) => {
        loginUser({
            variables: {
                email: datas.email,
                password: datas.password,
            },
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
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
                                value: 3,
                                message:
                                    'Votre mot de passe doit faire au moins 3 caractères',
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
