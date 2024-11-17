import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'cypress/react18';
import AuthContext from '../../auth/AuthProvider'; // Auth Context
import Register from './Register'; // Register component

// Mock the useAuth hook for different scenarios
const mockUseAuth = (response, error = '') => ({
    error,
    response,
    register: cy.stub().resolves(response),
    logout: cy.stub(),
});

describe('Register Component', () => {
    it('renders registration form if user is not logged in', () => {
        const authContextValue = { auth: { email: '' } };

        mount(
            <MemoryRouter initialEntries={['/register']}>
                <AuthContext.Provider value={authContextValue}>
                    <Register />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Check that the registration form is visible
        cy.get('form').should('exist');
        cy.get('input[placeholder="Введіть Email"]').should('exist');
        cy.get('input[placeholder="Введіть пароль"]').should('exist');
        cy.get('input[placeholder="Повторіть пароль"]').should('exist');
        cy.get('button').contains('Зареєструватися').should('exist');
        cy.get('Link').contains('Ввійти').should('exist');
    });

    it('shows success message if already logged in', () => {
        const authContextValue = { auth: { email: 'test@example.com' } };

        mount(
            <MemoryRouter initialEntries={['/register']}>
                <AuthContext.Provider value={authContextValue}>
                    <Register />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Check that the success message is displayed and registration form is not visible
        cy.get('.loginFrame').should('exist');
        cy.get('.text').contains('You are logged in').should('exist');
        cy.get('button').contains('Вийти').should('exist');
    });

    it('performs registration on valid inputs', () => {
        const authContextValue = { auth: { email: '' } };
        const registerResponse = true;
        const mockAuth = mockUseAuth(registerResponse);

        mount(
            <MemoryRouter initialEntries={['/register']}>
                <AuthContext.Provider value={authContextValue}>
                    <Register />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Simulate entering valid registration details
        cy.get('input[placeholder="Введіть Email"]').type('test@student.uzhnu.edu.ua');
        cy.get('input[placeholder="Введіть пароль"]').type('password123');
        cy.get('input[placeholder="Повторіть пароль"]').type('password123');
        cy.get('button').contains('Зареєструватися').click();

        // Check that register was called with correct arguments
        cy.wrap(mockAuth.register).should('have.been.calledWith', 'test@student.uzhnu.edu.ua', 'password123');
        cy.url().should('eq', `${Cypress.config().baseUrl}/`); // After registration, should navigate to home
    });

    it('shows error message for invalid email', () => {
        const authContextValue = { auth: { email: '' } };
        const errorMessage = 'email not valid';

        mount(
            <MemoryRouter initialEntries={['/register']}>
                <AuthContext.Provider value={authContextValue}>
                    <Register />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Simulate entering an invalid email
        cy.get('input[placeholder="Введіть Email"]').type('test@wrongemail.com');
        cy.get('input[placeholder="Введіть пароль"]').type('password123');
        cy.get('input[placeholder="Повторіть пароль"]').type('password123');
        cy.get('button').contains('Зареєструватися').click();

        // Check that the error message for invalid email is displayed
        cy.get('.forgotpassword').should('contain', errorMessage);
    });

    it('shows error message for short password', () => {
        const authContextValue = { auth: { email: '' } };
        const errorMessage = 'password too short';

        mount(
            <MemoryRouter initialEntries={['/register']}>
                <AuthContext.Provider value={authContextValue}>
                    <Register />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Simulate entering a short password
        cy.get('input[placeholder="Введіть Email"]').type('test@student.uzhnu.edu.ua');
        cy.get('input[placeholder="Введіть пароль"]').type('short');
        cy.get('input[placeholder="Повторіть пароль"]').type('short');
        cy.get('button').contains('Зареєструватися').click();

        // Check that the error message for short password is displayed
        cy.get('.forgotpassword').should('contain', errorMessage);
    });

    it('shows error message when passwords do not match', () => {
        const authContextValue = { auth: { email: '' } };
        const errorMessage = 'passwords dont match';

        mount(
            <MemoryRouter initialEntries={['/register']}>
                <AuthContext.Provider value={authContextValue}>
                    <Register />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Simulate entering mismatched passwords
        cy.get('input[placeholder="Введіть Email"]').type('test@student.uzhnu.edu.ua');
        cy.get('input[placeholder="Введіть пароль"]').type('password123');
        cy.get('input[placeholder="Повторіть пароль"]').type('password456');
        cy.get('button').contains('Зареєструватися').click();

        // Check that the error message for password mismatch is displayed
        cy.get('.forgotpassword').should('contain', errorMessage);
    });

    it('performs logout', () => {
        const authContextValue = { auth: { email: 'test@example.com' } };
        const mockAuth = mockUseAuth(true);

        mount(
            <MemoryRouter initialEntries={['/register']}>
                <AuthContext.Provider value={authContextValue}>
                    <Register />
                </AuthContext.Provider>
            </MemoryRouter>,
        );

        // Simulate logout
        cy.get('button').contains('Вийти').click();

        // Check that the logout function is called
        cy.wrap(mockAuth.logout).should('have.been.calledOnce');
    });
});
