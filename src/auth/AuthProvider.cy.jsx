// authProvider.spec.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import AuthContext from './AuthProvider';

describe('AuthProvider Component', () => {
    it('provides the correct auth context value', () => {
        cy.mount(
            <BrowserRouter>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value) => {
                            expect(value.auth).to.deep.equal({ email: '' });
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            </BrowserRouter>,
        );
    });

    it('loads user from localStorage if available', () => {
        const mockUser = { email: 'test@example.com' };
        localStorage.setItem('user', JSON.stringify(mockUser));

        cy.mount(
            <BrowserRouter>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value) => {
                            expect(value.auth.email).to.equal(mockUser.email);
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            </BrowserRouter>,
        );
    });

    it('sets empty email if no user in localStorage', () => {
        localStorage.removeItem('user');

        cy.mount(
            <BrowserRouter>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value) => {
                            expect(value.auth.email).to.equal('');
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            </BrowserRouter>,
        );
    });

    it('renders CSS modules classes correctly', () => {
        cy.mount(
            <BrowserRouter>
                <AuthProvider>
                    <div>Test</div>
                </AuthProvider>
            </BrowserRouter>,
        );

        // Check if the CSS module classes are applied (if there are any in AuthProvider)
        cy.get('[class*="authProvider"]').should('exist');
    });
});
