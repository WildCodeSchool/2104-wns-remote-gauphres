import React, { FC } from 'react';
import Link from './style';
import Button from '../../Button/Button';

const HomePage: FC = () => {
    return (
        <>
            <div>Home Page</div>
            <Button>
                <Link to="/login">Se connecter</Link>
            </Button>
            <Button>
                <Link to="/register">Créer un compte</Link>
            </Button>
        </>
    );
};

export default HomePage;
