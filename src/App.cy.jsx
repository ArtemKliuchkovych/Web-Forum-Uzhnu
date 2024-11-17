import React from 'react';
import { AuthProvider } from './auth/AuthProvider';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App Component', () => {
    it('renders the main container and routes correctly', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify main container is rendered
        cy.get('[class*="mainContainer"]').should('exist');

        // Check header is present
        cy.get('[class*="forumHeaderFrame"]').should('exist');

        // Verify forums page is the default route
        cy.get('[class*="forum"]').should('exist');
    });

    it('navigates to the Rules page (/rules)', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/rules']}>
                <AuthProvider>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify Rules page renders correctly
        cy.get('h1').should('contain', 'Правила');
        cy.get('[class*="rulesContent"]').should('exist'); // Ensure rules content is loaded
    });

    it('navigates to the Login page (/login)', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/login']}>
                <AuthProvider>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify Login page renders correctly
        cy.get('h1').should('contain', 'Увійти/Зареєструватися');
        cy.get('[class*="loginForm"]').should('exist');
    });

    it('navigates to the Register page (/register)', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/register']}>
                <AuthProvider>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify Register page renders correctly
        cy.get('h1').should('contain', 'Реєстрація');
        cy.get('[class*="registerForm"]').should('exist');
    });

    it('navigates to the Forum page (/:forumName)', () => {
        const forumName = 'test-forum';
        cy.mount(
            <MemoryRouter initialEntries={[`/${forumName}`]}>
                <AuthProvider>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify Forum page renders correctly
        cy.get('[class*="forumInfo"]').should('exist');
        cy.get('h1').should('contain', `Forum: ${forumName}`);
    });

    it('navigates to the Post page (/:forumName/:postID)', () => {
        const forumName = 'test-forum';
        const postID = '1';
        cy.mount(
            <MemoryRouter initialEntries={[`/${forumName}/${postID}`]}>
                <AuthProvider>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify Post page renders correctly
        cy.get('[class*="post"]').should('exist');
        cy.get('h1').should('contain', `Post: ${postID}`);
    });

    it('renders Header with correct navigation links', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify Header links
        cy.get('[class*="main"]').should('have.attr', 'href', '/').and('contain', 'Головна');
        cy.get('[class*="rules"]').should('have.attr', 'href', '/rules').and('contain', 'Правила');
        cy.get('[class*="loginRegister"]')
            .should('have.attr', 'href', '/login')
            .and('contain', 'Увійти/Зареєструватися');
    });

    it('renders correct content based on authentication state (logged in)', () => {
        const authContextValueLoggedIn = { auth: { email: 'test@example.com' } };

        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider value={authContextValueLoggedIn}>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify content for logged-in users
        cy.get('.loginFrame').should('contain', 'Logged in as test@example.com'); // Adjust text as needed
        cy.get('button').contains('Вийти').should('exist'); // Logout button
    });

    it('renders correct content when user is not logged in', () => {
        const authContextValueLoggedOut = { auth: { email: '' } };

        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider value={authContextValueLoggedOut}>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify content for logged-out users
        cy.get('.loginFrame').should('contain', 'Ви не увійшли'); // Adjust text as needed
        cy.get('[href="/login"]').should('contain', 'Увійти');
        cy.get('[href="/register"]').should('contain', 'Зареєструватися');
    });

    it('displays a 404 page for invalid routes', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/invalid-route']}>
                <AuthProvider>
                    <App disableRouter={true} />
                </AuthProvider>
            </MemoryRouter>,
        );

        // Verify 404 page
        cy.get('h1').should('contain', '404');
        cy.get('p').should('contain', 'Сторінка не знайдена'); // Adjust error text as needed
    });
});
