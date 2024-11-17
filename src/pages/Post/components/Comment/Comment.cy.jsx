import React from 'react';
import Comment from './Comment';
import styles from './Comment.module.css';

describe('Comment Component', () => {
    it('renders the comment correctly with given props', () => {
        const mockProps = {
            authorName: 'testuser',
            commentText: 'This is a test comment.',
            commentTime: new Date('2023-11-17T14:45:00').getTime(), // Mock timestamp
            commentNumber: 1,
        };

        cy.mount(<Comment {...mockProps} />);

        // Check the author name
        cy.get(`.${styles.commentAuthor}`).should('contain', 'Автор коментаря: testuser');

        // Check the comment text
        cy.get(`.${styles.commentText}`).should('contain', 'This is a test comment.');

        // Check the comment date
        cy.get(`.${styles.commentDate}`).should('contain', 'Дата коментаря: 17 11 2023 14:45:00');

        // Check the comment number
        cy.get(`.${styles.commentNumber}`).should('contain', 'N коментаря: 1');
    });

    it('applies the correct CSS classes', () => {
        const mockProps = {
            authorName: 'testuser',
            commentText: 'This is a test comment.',
            commentTime: Date.now(),
            commentNumber: 1,
        };

        cy.mount(<Comment {...mockProps} />);

        // Verify the CSS classes
        cy.get(`.${styles.commentFrame}`).should('exist');
        cy.get(`.${styles.innerFrame}`).should('exist');
        cy.get(`.${styles.infoFrame}`).should('exist');
        cy.get(`.${styles.commentAuthor}`).should('exist');
        cy.get(`.${styles.commentDate}`).should('exist');
        cy.get(`.${styles.commentText}`).should('exist');
        cy.get(`.${styles.commentNumber}`).should('exist');
    });

    it('handles zero-padded times correctly', () => {
        const mockProps = {
            authorName: 'testuser',
            commentText: 'This is a test comment.',
            commentTime: new Date('2023-11-17T08:05:07').getTime(), // Mock timestamp with zero-padded minutes and seconds
            commentNumber: 1,
        };

        cy.mount(<Comment {...mockProps} />);

        cy.get(`.${styles.commentDate}`).should('contain', 'Дата коментаря: 17 11 2023 8:05:07');
    });
});
