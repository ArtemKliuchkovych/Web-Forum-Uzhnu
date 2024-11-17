describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000/');
    });

    it('opens rules', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__rules__m_wHv').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */

        cy.get('.Rules-module__rulesText__NEFkq').should(
            'have.text',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        );

        /* ==== End Cypress Studio ==== */
    });

    it('opens rules and then main', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__rules__m_wHv').click();
        cy.get('.Header-module__main__tLZgm').click();
        /* ==== End Cypress Studio ==== */
    });

    it('opens login', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__loginRegister__rSolA').click();
        /* ==== End Cypress Studio ==== */
    });

    it('opens register', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__loginRegister__rSolA').click();
        cy.get('.Login-module__register__FiOIx').click();
        /* ==== End Cypress Studio ==== */
    });

    it('opens forum', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > .ForumInfo-module__forumColumn__ZwfpZ > .ForumInfo-module__forumName__YGTRQ').click();
        cy.get('.Forum-module__facultyforum__IcRj6').should('have.text', 'Біологічний факультет');
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('http://localhost:3000/biology');
        /* ==== End Cypress Studio ==== */
    });

    it('opens post', () => {
        cy.visit('http://localhost:3000/');

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .ForumInfo-module__forumColumn__ZwfpZ > .ForumInfo-module__forumName__YGTRQ').click();
        cy.get(
            ':nth-child(1) > .PostInfo-module__frameInner__nkFma > .PostInfo-module__leftColumn__iStFW > .PostInfo-module__postTitle__pvnvF',
        ).click();
        cy.get('.Post-module__postAuthor___kNLe').should('have.text', 'Автор посту: kliuchkovych.artem');
        /* ==== End Cypress Studio ==== */
    });

    it('inputs in register', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__loginRegister__rSolA').click();
        cy.get('.Login-module__register__FiOIx').click();
        cy.get('[placeholder="Введіть Email"]').clear('w');
        cy.get('[placeholder="Введіть Email"]').type('wrong.email@gmail.com');
        cy.get('[placeholder="Введіть пароль"]').clear('w');
        cy.get('[placeholder="Введіть пароль"]').type('wrong');
        cy.get('[placeholder="Повторіть пароль"]').clear('w');
        cy.get('[placeholder="Повторіть пароль"]').type('wrong');
        /* ==== End Cypress Studio ==== */
    });

    it('registers wrongly and properly', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__loginRegister__rSolA').click();
        cy.get('.Login-module__register__FiOIx').click();
        cy.get('[placeholder="Введіть Email"]').clear('a');
        cy.get('[placeholder="Введіть Email"]').type('afasf');
        cy.get('.Register-module__buttonframe__kdf9J').click();
        cy.get('.Register-module__forgotpassword__jA88A').should('have.text', 'email not valid');
        cy.get('.Register-module__loginFrame__YnWz1').click();
        cy.get('[placeholder="Введіть Email"]').clear();
        cy.get('[placeholder="Введіть Email"]').type('valid.email@uzhnu.edu.ua');
        cy.get('.Register-module__buttonframe__kdf9J').click();
        cy.get('.Register-module__forgotpassword__jA88A').should('have.text', 'password too short');
        cy.get('[placeholder="Введіть пароль"]').clear('1');
        cy.get('[placeholder="Введіть пароль"]').type('123456');
        cy.get('.Register-module__buttonframe__kdf9J').click();
        cy.get('.Register-module__forgotpassword__jA88A').should('have.text', 'passwords dont match');
        cy.get('[placeholder="Повторіть пароль"]').clear('1');
        cy.get('[placeholder="Повторіть пароль"]').type('123456');
        cy.get('.Register-module__buttonframe__kdf9J').click();
        /* ==== End Cypress Studio ==== */
    });

    it('logins wrongly and properly', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__loginRegister__rSolA').click();
        cy.get('[placeholder="Введіть Email"]').clear('e');
        cy.get('[placeholder="Введіть Email"]').type('email');
        cy.get('.Login-module__buttonframe__Zd6XV').click();
        cy.get('.Login-module__forgotpassword__Z42Yl').should('have.text', 'invalid mail or password');
        cy.get('.Login-module__loginFrame__uOZ3j').click();
        cy.get('[placeholder="Введіть Email"]').clear();
        cy.get('[placeholder="Введіть Email"]').type('valid.email@uzhnu.edu.ua');
        cy.get('.Login-module__buttonframe__Zd6XV').click();
        cy.get('.Login-module__forgotpassword__Z42Yl').should('have.text', 'invalid mail or password');
        cy.get('[placeholder="Введіть пароль"]').clear('1');
        cy.get('[placeholder="Введіть пароль"]').type('12345');
        cy.get('.Login-module__buttonframe__Zd6XV').click();
        cy.get('.Login-module__forgotpassword__Z42Yl').should('have.text', 'invalid mail or password');
        cy.get('[placeholder="Введіть пароль"]').clear('123456');
        cy.get('[placeholder="Введіть пароль"]').type('123456');
        cy.get('.Login-module__buttonframe__Zd6XV').click();
        cy.get('.Forums-module__forums__f1Wqm').should('have.text', 'Форуми');
        /* ==== End Cypress Studio ==== */
    });

    it('creates a comment after login', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__loginRegister__rSolA').click();
        cy.get('[placeholder="Введіть Email"]').clear('v');
        cy.get('[placeholder="Введіть Email"]').type('valid.email@uzhnu.edu.ua');
        cy.get('[placeholder="Введіть пароль"]').clear('1');
        cy.get('[placeholder="Введіть пароль"]').type('123456');
        cy.get('.Login-module__buttonframe__Zd6XV').click();
        cy.get(':nth-child(13) > .ForumInfo-module__forumColumn__ZwfpZ > .ForumInfo-module__forumName__YGTRQ').click();
        cy.get(
            ':nth-child(1) > .PostInfo-module__frameInner__nkFma > .PostInfo-module__leftColumn__iStFW > .PostInfo-module__postTitle__pvnvF',
        ).click();
        cy.get('.Post-module__comment__Ovzzd').clear('c');
        cy.get('.Post-module__comment__Ovzzd').type('cypress e2e test comment');
        cy.get('.Post-module__frame414__fUrRT').click();
        /* ==== End Cypress Studio ==== */
    });

    it('creates post after login', () => {
        cy.visit('http://localhost:3000/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Header-module__loginRegister__rSolA').click();
        cy.get('[placeholder="Введіть Email"]').clear('v');
        cy.get('[placeholder="Введіть Email"]').type('valid.email@uzhnu.edu.ua');
        cy.get('[placeholder="Введіть пароль"]').clear('1');
        cy.get('[placeholder="Введіть пароль"]').type('123456');
        cy.get('.Login-module__buttonframe__Zd6XV').click();
        cy.get(':nth-child(10) > .ForumInfo-module__forumColumn__ZwfpZ > .ForumInfo-module__forumName__YGTRQ').click();
        cy.get('.Forum-module__newPostName__MBs3J').clear('cypress e2e test');
        cy.get('.Forum-module__newPostName__MBs3J').type('cypress e2e test');
        cy.get('.Forum-module__button__SihE4').click();
        cy.get('.Forum-module__newPostName__MBs3J').should('have.value', 'Input here first');
        cy.get('.Forum-module__input__rarBp').should('have.value', 'Input here first');
        cy.get('.Forum-module__newPostName__MBs3J').clear('Input here first ');
        cy.get('.Forum-module__button__SihE4').click();
        cy.get('.Forum-module__newPostName__MBs3J').should('have.value', 'Input here first');
        cy.get('.Forum-module__input__rarBp').should('have.value', 'Input here first');
        cy.get('.Forum-module__newPostFrame__MWVwS').click();
        cy.get('.Forum-module__newPostName__MBs3J').clear();
        cy.get('.Forum-module__newPostName__MBs3J').type('cypress e2e test post');
        cy.get('.Forum-module__newPostFrame__MWVwS').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Forum-module__input__rarBp').click();
        cy.get('.Forum-module__input__rarBp').clear();
        cy.get('.Forum-module__input__rarBp').type('cypress e2e post comment test');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.Forum-module__button__SihE4').click();
        cy.get('.Post-module__postAuthor___kNLe').should('have.text', 'Автор посту: valid.email');
        cy.get('.Post-module__postTitle__uDWRR').should('have.text', 'Назва посту: cypress e2e test post');
        cy.get('.Comment-module__commentText__ocdgL').should('have.text', 'cypress e2e post comment test');
        cy.get('.Comment-module__commentNumber__x1dt5').should('have.text', 'N коментаря: 1');
        cy.get('.Comment-module__commentAuthor__FAMNm').should('have.text', 'Автор коментаря: valid.email');
        /* ==== End Cypress Studio ==== */
    });
});
