import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ForumInfo from './ForumInfo';

describe('ForumInfo Component', () => {
    const mockData = {
        name: 'Біологічний факультет',
        postsNumber: 5,
        lastUpdate: new Date('2023-10-01T12:00:00').getTime(), // Example timestamp for testing
        linkName: 'biology',
    };

    it('renders the forum name correctly', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <ForumInfo {...mockData} />
            </MemoryRouter>,
        );

        // Check that the forum name is displayed and correctly linked
        cy.get('[class*="forumName"]').should('contain', mockData.name);
        cy.get('[class*="forumName"]').should('have.attr', 'href', `/${mockData.linkName}`);
    });

    it('displays the correct number of posts', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <ForumInfo {...mockData} />
            </MemoryRouter>,
        );

        // Check that the number of posts is displayed correctly
        cy.get('[class*="forumPostNumber"]').should('contain', `${mockData.postsNumber} Постів`);
    });

    it('displays the correctly formatted last update date', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <ForumInfo {...mockData} />
            </MemoryRouter>,
        );

        // Check that the formatted last update timestamp is correct
        const expectedTime = '1 10 2023 12:00:00'; // Based on the mock timestamp
        cy.get('[class*="forumLastUpdate"]').should('contain', 'Останнє оновлення:').should('contain', expectedTime);
    });

    it('applies the correct CSS classes to elements', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/']}>
                <ForumInfo {...mockData} />
            </MemoryRouter>,
        );

        // Check that the components are using the correct CSS classes
        cy.get('[class*="forumFrame"]').should('exist');
        cy.get('[class*="forumColumn"]').should('exist');
        cy.get('[class*="forumName"]').should('exist');
        cy.get('[class*="forumPostNumber"]').should('exist');
        cy.get('[class*="forumLastUpdate"]').should('exist');
    });
});
