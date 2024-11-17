import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'cypress/react18';
import AuthContext from '../../auth/AuthProvider'; // Auth Context
import Login from './Login'; // Login component

// Mock the useAuth hook for different scenarios
const mockUseAuth = (response, error = '') => ({
    error,
    response,
    login: cy.stub().resolves(response),
    logout: cy.stub(),
});

describe('Login Component', () => {
    it('renders login form if user is not logged in', () => {
        const authContextValue = { auth: { email: '' } };

        mount(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={authContextValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Check that the login form is visible
        cy.get('form').should('exist');
        cy.get('input[placeholder="Введіть Email"]').should('exist');
        cy.get('input[placeholder="Введіть пароль"]').should('exist');
        cy.get('button').contains('Ввійти').should('exist');
        cy.get('Link').contains('Зареєструватися').should('exist');
    });

    it('shows success message if already logged in', () => {
        const authContextValue = { auth: { email: 'test@example.com' } };

        mount(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={authContextValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Check that the success message is displayed and login form is not visible
        cy.get('.loginFrame').should('exist');
        cy.get('.text').contains('You are logged in').should('exist');
        cy.get('button').contains('Вийти').should('exist');
    });

    it('performs login on valid inputs', () => {
        const authContextValue = { auth: { email: '' } };
        const loginResponse = true;
        const mockAuth = mockUseAuth(loginResponse);

        mount(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={authContextValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Simulate entering valid login details
        cy.get('input[placeholder="Введіть Email"]').type('test@student.uzhnu.edu.ua');
        cy.get('input[placeholder="Введіть пароль"]').type('password123');
        cy.get('button').contains('Ввійти').click();

        // Check that login was called with correct arguments
        cy.wrap(mockAuth.login).should('have.been.calledWith', 'test@student.uzhnu.edu.ua', 'password123');
        cy.url().should('eq', `${Cypress.config().baseUrl}/`); // After login, should navigate to home
    });

    it('shows error message for invalid email or password', () => {
        const authContextValue = { auth: { email: '' } };
        const errorMessage = 'Invalid credentials';

        mount(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={authContextValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Simulate entering invalid login credentials
        cy.get('input[placeholder="Введіть Email"]').type('test@wrongemail.com');
        cy.get('input[placeholder="Введіть пароль"]').type('wrongpassword');
        cy.get('button').contains('Ввійти').click();

        // Check that the error message is displayed
        cy.get('.forgotpassword').should('contain', errorMessage);
    });

    it('performs logout', () => {
        const authContextValue = { auth: { email: 'test@example.com' } };
        const mockAuth = mockUseAuth(true);

        mount(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={authContextValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Simulate logout
        cy.get('button').contains('Вийти').click();

        // Check that the logout function is called
        cy.wrap(mockAuth.logout).should('have.been.calledOnce');
    });
});
