// PageNumberNavigation.spec.js
import React from 'react';
import { mount } from 'cypress/react';
import PageNumberNavigation from './PageNumberNavigation'; // Import your PageNumberNavigation component
import styles from './PageNumberNavigation.module.css'; // Import styles

describe('PageNumberNavigation Component', () => {
    it('renders page numbers correctly', () => {
        const pageChange = cy.stub();
        const currentPage = 3;
        const maxPages = 5;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Check that the correct page numbers are rendered
        cy.get(`.${styles.frame}`).should('exist');
        cy.get(`.${styles.frame1}`).should('have.length', 9); // Two arrow buttons and five page numbers

        // Check that the page numbers are 1, 2, 3, 4, 5
        cy.get(`.${styles.frame1}`).each((button, index) => {
            if (index === 0) {
                cy.wrap(button).should('contain', '<<'); // First button is <<
            } else if (index === 1) {
                cy.wrap(button).should('contain', '<'); // Second button is <
            } else if (index === 6) {
                cy.wrap(button).should('contain', '>>'); // Last button is >>
            } else {
                cy.wrap(button).should('contain', index); // Page numbers 1 to 5
            }
        });
    });

    it('navigates to the correct page when a page number is clicked', () => {
        const pageChange = cy.stub();
        const currentPage = 3;
        const maxPages = 5;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Click on page number 4
        cy.get(`.${styles.frame1}`).contains('4').click();

        // Check that pageChange is called with the correct page number
        cy.wrap(pageChange).should('have.been.calledWith', 4);
    });

    it('navigates to the first page when << is clicked', () => {
        const pageChange = cy.stub();
        const currentPage = 3;
        const maxPages = 5;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Click on << to go to the first page
        cy.get(`.${styles.frame1}`).contains('<<').click();

        // Check that pageChange is called with 1
        cy.wrap(pageChange).should('have.been.calledWith', 1);
    });

    it('navigates to the last page when >> is clicked', () => {
        const pageChange = cy.stub();
        const currentPage = 3;
        const maxPages = 5;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Click on >> to go to the last page
        cy.get(`.${styles.frame1}`).contains('>>').click();

        // Check that pageChange is called with the last page number (5)
        cy.wrap(pageChange).should('have.been.calledWith', 5);
    });

    it('navigates one page backward when < is clicked', () => {
        const pageChange = cy.stub();
        const currentPage = 3;
        const maxPages = 5;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Click on < to go one page backward (from page 3 to page 2)
        cy.get(`.${styles.frame1}`).contains('<').click();

        // Check that pageChange is called with 2
        cy.wrap(pageChange).should('have.been.calledWith', 2);
    });

    it('navigates one page forward when > is clicked', () => {
        const pageChange = cy.stub();
        const currentPage = 3;
        const maxPages = 5;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Click on > to go one page forward (from page 3 to page 4)
        cy.get(`.${styles.frame1}`).contains('>').click();

        // Check that pageChange is called with 4
        cy.wrap(pageChange).should('have.been.calledWith', 4);
    });

    it('highlights the current page correctly', () => {
        const pageChange = cy.stub();
        const currentPage = 3;
        const maxPages = 5;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Check if page 3 is highlighted
        cy.get(`.${styles.frame1}`).contains('3').should('have.css', 'background', 'rgb(186, 186, 186)'); // Highlighted color for current page
    });

    it('displays the correct page numbers for a max of 5 pages', () => {
        const pageChange = cy.stub();
        const currentPage = 1;
        const maxPages = 5;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Check that the page range is 1 to 5
        cy.get(`.${styles.frame1}`).contains('1');
        cy.get(`.${styles.frame1}`).contains('2');
        cy.get(`.${styles.frame1}`).contains('3');
        cy.get(`.${styles.frame1}`).contains('4');
        cy.get(`.${styles.frame1}`).contains('5');
    });

    it('displays the correct page numbers for a max of 10 pages and currentPage near the middle', () => {
        const pageChange = cy.stub();
        const currentPage = 5;
        const maxPages = 10;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Check that the page numbers are correctly calculated and displayed, e.g., 3, 4, 5, 6, 7
        cy.get(`.${styles.frame1}`).contains('3');
        cy.get(`.${styles.frame1}`).contains('4');
        cy.get(`.${styles.frame1}`).contains('5');
        cy.get(`.${styles.frame1}`).contains('6');
        cy.get(`.${styles.frame1}`).contains('7');
    });

    it('displays the correct page numbers for a max of 10 pages and currentPage near the end', () => {
        const pageChange = cy.stub();
        const currentPage = 9;
        const maxPages = 10;

        mount(<PageNumberNavigation pageChange={pageChange} currentPage={currentPage} maxPages={maxPages} />);

        // Check that the page numbers are correctly calculated and displayed, e.g., 6, 7, 8, 9, 10
        cy.get(`.${styles.frame1}`).contains('6');
        cy.get(`.${styles.frame1}`).contains('7');
        cy.get(`.${styles.frame1}`).contains('8');
        cy.get(`.${styles.frame1}`).contains('9');
        cy.get(`.${styles.frame1}`).contains('10');
    });
});
