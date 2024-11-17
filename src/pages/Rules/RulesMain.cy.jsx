// rules.spec.js
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Rules from './Rules';

describe('Rules Component', () => {
    it('renders the rules page with correct text', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/rules']}>
                <Rules />
            </MemoryRouter>,
        );

        // Check that the rules header text is correct
        cy.get('[class*="rulesTextHeader"]').should('contain', 'Правила:');

        // Check that the content of the rules text is rendered
        cy.get('[class*="rulesText"]').should('contain', 'Lorem ipsum dolor sit amet');
        cy.get('[class*="rulesText"]').should('contain', 'Excepteur sint occaecat cupidatat non proident');
        cy.get('[class*="rulesText"]').should('contain', 'laboris nisi ut aliquip ex ea commodo consequat');

        // Check that the overall layout is present
        cy.get('[class*="textFrame"]').should('exist');
        cy.get('[class*="textPositioning"]').should('exist');
    });

    it('has the correct styling for the rules section', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/rules']}>
                <Rules />
            </MemoryRouter>,
        );

        // Check that the rules section has the expected classes for styling
        cy.get('[class*="textFrame"]').should('have.class', 'textFrame');
        cy.get('[class*="textPositioning"]').should('have.class', 'textPositioning');
        cy.get('[class*="rulesTextHeader"]').should('have.class', 'rulesTextHeader');
        cy.get('[class*="rulesText"]').should('have.class', 'rulesText');
    });
});
