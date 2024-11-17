import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Post from './Post';
import { AuthProvider } from '../../auth/AuthProvider'; // Adjust import if needed

describe('Post Component', () => {
    beforeEach(() => {
        // Mock API responses
        cy.intercept('GET', '/api/posts', {
            statusCode: 200,
            body: {
                postID: {
                    id: 'postID',
                    creationDateTime: Date.now() - 86400000,
                    postTitle: 'Test Post Title',
                    postAuthor: 'testuser@example.com',
                },
            },
        }).as('getPostsData');

        cy.intercept('GET', '/api/comments', {
            statusCode: 200,
            body: [
                {
                    postId: 'postID',
                    commentAuthor: 'user1@example.com',
                    commentContent: 'Comment One',
                    creationDateTime: Date.now() - 100000,
                },
                {
                    postId: 'postID',
                    commentAuthor: 'user2@example.com',
                    commentContent: 'Comment Two',
                    creationDateTime: Date.now() - 50000,
                },
            ],
        }).as('getCommentsData');
    });

    it('renders the post header correctly', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/post/postID']}>
                <AuthProvider>
                    <Post />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.wait('@getPostsData');
        cy.wait('@getCommentsData');

        cy.get('[class*="postTitle"]').should('contain', 'Назва посту: Test Post Title');
        cy.get('[class*="postAuthor"]').should('contain', 'Автор посту: testuser');
        cy.get('[class*="postDate"]').should('exist'); // Ensure date renders, actual date logic can vary
    });

    it('renders the comments correctly', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/post/postID']}>
                <AuthProvider>
                    <Post />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.wait('@getPostsData');
        cy.wait('@getCommentsData');

        cy.get('[class*="comentsFrame"]').should('exist');
        cy.get('[class*="comment"]').should('have.length', 2);
        cy.get('[class*="comment"]').first().should('contain', 'Comment One');
        cy.get('[class*="comment"]').last().should('contain', 'Comment Two');
    });

    it('displays a login prompt when the user is not logged in', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/post/postID']}>
                <AuthProvider value={{ auth: { email: '' } }}>
                    <Post />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="postCommentFrame"]').should('contain', 'Увійдіть щоб створювати пости.');
    });

    it('shows comment input box when the user is logged in', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/post/postID']}>
                <AuthProvider value={{ auth: { email: 'loggedinuser@example.com' } }}>
                    <Post />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="postCommentFrame"]').should('contain', 'Коментар');
        cy.get('[class*="comment"]').should('be.visible');
    });

    it('handles comment creation correctly', () => {
        const newComment = 'This is a new comment';

        cy.intercept('POST', '/api/comments', {
            statusCode: 201,
            body: {
                postId: 'postID',
                commentAuthor: 'loggedinuser@example.com',
                commentContent: newComment,
                creationDateTime: Date.now(),
            },
        }).as('createComment');

        cy.mount(
            <MemoryRouter initialEntries={['/post/postID']}>
                <AuthProvider value={{ auth: { email: 'loggedinuser@example.com' } }}>
                    <Post />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="comment"]').type(newComment);
        cy.get('[class*="frame414"]').click();

        cy.wait('@createComment');

        cy.get('[class*="comentsFrame"]').should('contain', newComment);
    });

    it('applies the correct CSS classes to elements', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/post/postID']}>
                <AuthProvider>
                    <Post />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="postInfo"]').should('have.class', 'postInfo');
        cy.get('[class*="postCommentFrame"]').should('have.class', 'postCommentFrame');
        cy.get('[class*="comment"]').should('have.class', 'comment');
    });

    it('handles pagination correctly', () => {
        const comments = Array.from({ length: 15 }, (_, i) => ({
            postId: 'postID',
            commentAuthor: `user${i + 1}@example.com`,
            commentContent: `Comment ${i + 1}`,
            creationDateTime: Date.now() - i * 1000,
        }));

        cy.intercept('GET', '/api/comments', {
            statusCode: 200,
            body: comments,
        }).as('getCommentsDataPaginated');

        cy.mount(
            <MemoryRouter initialEntries={['/post/postID']}>
                <AuthProvider>
                    <Post />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.wait('@getCommentsDataPaginated');

        cy.get('[class*="pageNumberNavigation"]').should('exist');
        cy.get('[class*="comment"]').should('have.length', 10); // First page should show 10 comments
        cy.get('[class*="pageNumber"]').contains('2').click();
        cy.get('[class*="comment"]').should('have.length', 5); // Second page should show remaining 5 comments
    });
});
