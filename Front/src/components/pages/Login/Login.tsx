/* eslint-disable react/jsx-props-no-spreading */
import { gql, useMutation } from '@apollo/client';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Title, Container, Form, TextInput, Input } from './style';
import Button from '../../Button/Button';
import { UserContext } from '../../../contexts/UserContext';

type FormValues = {
    email: string;
    password: string;
};

const LoginPage: FC<FormValues> = () => {
    const { login } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' });

    const onSubmitForm = async (datas: FormValues) => {
        login(datas);
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
