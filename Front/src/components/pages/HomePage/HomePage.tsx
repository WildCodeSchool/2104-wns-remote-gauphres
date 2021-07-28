import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
    return (
        <>
            <div>Home Page</div>
            <button type="button">
                <Link to="/login">Se connecter</Link>
            </button>
            <button type="button">
                <Link to="/register">Créer un compte</Link>
            </button>
        </>
    );
};

export default HomePage;
