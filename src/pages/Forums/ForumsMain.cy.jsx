import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Forums from './Forums';

describe('Forums Component', () => {
    beforeEach(() => {
        // Reset any previous intercepts
        cy.intercept('GET', '/api/forums/*', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    biology: {
                        postId: 'post1',
                    },
                    geography: {
                        postId: 'post2',
                    },
                },
            });
        }).as('getForums');

        cy.intercept('GET', '/api/posts', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    post1: {
                        id: 'post1',
                        creationDateTime: 1631811956,
                        postTitle: 'Post Title 1',
                        postAuthor: 'user1@example.com',
                    },
                    post2: {
                        id: 'post2',
                        creationDateTime: 1631812000,
                        postTitle: 'Post Title 2',
                        postAuthor: 'user2@example.com',
                    },
                },
            });
        }).as('getPosts');
    });

    it('renders the forums header correctly', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <Forums />
            </MemoryRouter>,
        );

        cy.get('[class*="forumsDisplayHeaderText"]').should('contain', 'Форуми Факультетів');
    });

    it('renders the list of forums correctly after data is loaded', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <Forums />
            </MemoryRouter>,
        );

        cy.wait('@getPosts');
        cy.wait('@getForums');

        cy.get('[class*="forumsDisplay"]').should('exist');
        cy.get('[class*="forumInfo"]').should('have.length', 2); // Expect two forums to be displayed
        cy.get('[class*="forumInfo"]').first().should('contain', 'Біологічний факультет');
        cy.get('[class*="forumInfo"]').last().should('contain', 'Географічний факультет');
    });

    it('handles loading state properly', () => {
        // Intercept and simulate an empty response to test loading state
        cy.intercept('GET', '/api/forums', { statusCode: 200, body: [] }).as('getForums');
        cy.intercept('GET', '/api/posts', { statusCode: 200, body: [] }).as('getPosts');

        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <Forums />
            </MemoryRouter>,
        );

        cy.get('[class*="forums"]').should('contain', 'Форуми');
        cy.get('[class*="forumsDisplayHeaderText"]').should('contain', 'Форуми Факультетів');
    });

    it('displays no forum data if there is no forum data', () => {
        // Mock empty data to simulate no forum data
        cy.intercept('GET', '/api/forums', { statusCode: 200, body: [] }).as('getForums');
        cy.intercept('GET', '/api/posts', { statusCode: 200, body: [] }).as('getPosts');

        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <Forums />
            </MemoryRouter>,
        );

        cy.wait('@getPosts');
        cy.wait('@getForums');

        cy.get('[class*="forumsDisplay"]').should('exist');
        cy.get('[class*="forumInfo"]').should('not.exist'); // No forums should be displayed
    });

    it('applies the correct CSS classes to elements', () => {
        // Intercept API response for CSS test
        cy.intercept('GET', '/api/forums', { statusCode: 200, body: [] }).as('getForums');
        cy.intercept('GET', '/api/posts', { statusCode: 200, body: [] }).as('getPosts');

        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <Forums />
            </MemoryRouter>,
        );

        cy.get('[class*="forums"]').should('have.class', 'forums');
        cy.get('[class*="forumsDisplay"]').should('have.class', 'forumsDisplay');
        cy.get('[class*="forumsDisplayHeader"]').should('have.class', 'forumsDisplayHeader');
        cy.get('[class*="forumsDisplayHeaderText"]').should('have.class', 'forumsDisplayHeaderText');
    });
});
