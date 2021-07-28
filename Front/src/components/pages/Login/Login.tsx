import React, { FC } from 'react';
import { Title, Container, Form, TextInput, Input } from './style';
import Button from '../../Button/Button';

const LoginPage: FC = () => {
    return (
        <Container>
            <Form>
                <Title>Connecte toi !</Title>
                <Input>
                    <TextInput label="Email" variant="outlined" />
                    <TextInput label="Mot de passe" variant="outlined" />
                </Input>
                <Button>Se connecter</Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
