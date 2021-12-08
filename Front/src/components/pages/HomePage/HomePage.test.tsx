import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';

test('loads and displays HomePage', async () => {
    render(
        <Router>
            <HomePage />
        </Router>
    );
    await waitFor(() => screen.getByTestId('homepage-title'));
    expect(screen.getByTestId('homepage-title')).toHaveTextContent('MOOWDY!');
});
