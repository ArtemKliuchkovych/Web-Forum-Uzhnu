// header.spec.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
    it('renders the header with forum name', () => {
        cy.mount(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
        );

        // Assert the forum name is correctly rendered
        cy.get('[class*="forumUzhnu"]')
            .should('contain', 'Форум')
            .and('contain', 'Ужгородського')
            .and('contain', 'Національного')
            .and('contain', 'Університету');
    });

    it('renders the navigation links', () => {
        cy.mount(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
        );

        // Assert the navigation links are present
        cy.get('[class*="main"]').should('have.attr', 'href', '/').and('contain', 'Головна');
        cy.get('[class*="rules"]').should('have.attr', 'href', '/rules').and('contain', 'Правила');
        cy.get('[class*="loginRegister"]')
            .should('have.attr', 'href', '/login')
            .and('contain', 'Увійти/Зареєструватися');
    });

    it('applies CSS module styles correctly', () => {
        cy.mount(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
        );

        // Assert that the CSS module classes are applied (checking for specific classes)
        cy.get('[class*="forumHeaderFrame"]').should('exist');
        cy.get('[class*="forumUzhnu"]').should('exist');
        cy.get('[class*="icon"]').should('exist');
        cy.get('[class*="forumHeaderNavigation"]').should('exist');
        cy.get('[class*="mainAndRules"]').should('exist');
        cy.get('[class*="loginRegister"]').should('exist');
    });
});
