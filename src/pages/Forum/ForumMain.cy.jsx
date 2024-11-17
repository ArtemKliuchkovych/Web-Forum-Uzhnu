import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Forum from './Forum';
import { AuthProvider } from '../../auth/AuthProvider';

describe('Forum Component', () => {
    beforeEach(() => {
        // Reset any previous intercepts
        cy.intercept('GET', '/api/forums/*', (req) => {
            req.reply({
                statusCode: 200,
                body: { forumName: 'test-forum' },
            }).as('getForumData');
        });

        cy.intercept('GET', '/api/posts', (req) => {
            req.reply({
                statusCode: 200,
                body: [
                    {
                        id: '1',
                        postTitle: 'Test Post 1',
                        postAuthor: 'user1@example.com',
                        creationDateTime: Date.now(),
                        commentsNumber: 2,
                    },
                    {
                        id: '2',
                        postTitle: 'Test Post 2',
                        postAuthor: 'user2@example.com',
                        creationDateTime: Date.now() - 1000,
                        commentsNumber: 1,
                    },
                ],
            }).as('getPostsData');
        });

        cy.intercept('GET', '/api/comments', (req) => {
            req.reply({
                statusCode: 200,
                body: [
                    { postId: '1', comment: 'First comment' },
                    { postId: '2', comment: 'Second comment' },
                ],
            }).as('getCommentsData');
        });
    });

    it('renders the forum header correctly', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/test-forum']}>
                <AuthProvider>
                    <Forum />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="forumHeader"]').should('contain', 'test-forum'); // Adjusted class name
    });

    it('renders the list of posts correctly after data is loaded', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/test-forum']}>
                <AuthProvider>
                    <Forum />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.wait('@getForumData');
        cy.wait('@getPostsData');
        cy.wait('@getCommentsData');

        cy.get('[class*="postInfoFrame"]').should('exist');
        cy.get('[class*="postInfo"]').should('have.length', 2); // Expect two posts to be displayed
        cy.get('[class*="postInfo"]').first().should('contain', 'Test Post 1');
        cy.get('[class*="postInfo"]').last().should('contain', 'Test Post 2');
    });

    it('handles loading state properly', () => {
        // Intercept and simulate empty response to test loading state
        cy.intercept('GET', '/api/forums', { statusCode: 200, body: [] }).as('getForumData');
        cy.intercept('GET', '/api/posts', { statusCode: 200, body: [] }).as('getPostsData');
        cy.intercept('GET', '/api/comments', { statusCode: 200, body: [] }).as('getCommentsData');

        cy.mount(
            <MemoryRouter initialEntries={['/test-forum']}>
                <AuthProvider>
                    <Forum />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="forumHeader"]').should('contain', 'test-forum');
        cy.get('[class*="postInfoFrame"]').should('not.exist'); // No posts should be displayed
    });

    it('displays no posts data if there are no posts', () => {
        // Mock empty post data to simulate no posts
        cy.intercept('GET', '/api/posts', { statusCode: 200, body: [] }).as('getPostsData');
        cy.intercept('GET', '/api/comments', { statusCode: 200, body: [] }).as('getCommentsData');

        cy.mount(
            <MemoryRouter initialEntries={['/test-forum']}>
                <AuthProvider>
                    <Forum />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.wait('@getPostsData');
        cy.wait('@getCommentsData');

        cy.get('[class*="postInfoFrame"]').should('exist');
        cy.get('[class*="postInfo"]').should('not.exist'); // No posts should be displayed
    });

    it('applies the correct CSS classes to elements', () => {
        // Intercept API responses for CSS test
        cy.intercept('GET', '/api/forums', { statusCode: 200, body: { forumName: 'test-forum' } }).as('getForumData');
        cy.intercept('GET', '/api/posts', { statusCode: 200, body: [] }).as('getPostsData');
        cy.intercept('GET', '/api/comments', { statusCode: 200, body: [] }).as('getCommentsData');

        cy.mount(
            <MemoryRouter initialEntries={['/test-forum']}>
                <AuthProvider>
                    <Forum />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="forumHeader"]').should('have.class', 'forumHeader');
        cy.get('[class*="postInfoFrame"]').should('have.class', 'postInfoFrame');
        cy.get('[class*="postInfo"]').should('have.class', 'postInfo');
    });

    it('displays login message when user is not logged in', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/test-forum']}>
                <AuthProvider value={{ auth: { email: '' } }}>
                    <Forum />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="newPostFrame"]').should('contain', 'Увійдіть щоб створювати пости.');
    });

    it('displays post creation form when user is logged in', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/test-forum']}>
                <AuthProvider value={{ auth: { email: 'test@example.com' } }}>
                    <Forum />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.get('[class*="newPostFrame"]').should('contain', 'Назва поста');
        cy.get('[class*="newPostName"]').should('be.visible');
        cy.get('[class*="button"]').should('contain', 'Створити');
    });

    it('navigates to the correct post page when a post is clicked', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/test-forum']}>
                <AuthProvider>
                    <Forum />
                </AuthProvider>
            </MemoryRouter>,
        );

        cy.wait('@getForumData');
        cy.wait('@getPostsData');
        cy.wait('@getCommentsData');

        // Simulate a click on the first post
        cy.get('[class*="postTitle"]').first().click();

        // Check that navigation happens correctly
        cy.url().should('include', '/test-forum/1');
    });
});
