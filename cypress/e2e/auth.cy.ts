describe('Auth Form', () => {
	describe('Login', () => {
		it('should return error with empty password input', () => {
			cy.visit('http://localhost:3000/auth');
			cy.contains('No password').should('not.exist');
			cy.get('button[data-cy="submit"]').click();
			cy.contains('No password');
		});
		it('should return toast error with wrong password', () => {
			cy.visit('http://localhost:3000/auth');
			cy.intercept('/api/auth/login').as('login');
			cy.get("input[name='email']").type('james@yahoo.com');
			cy.get("input[name='password']").type('123456');
			cy.get('button[data-cy="submit"]').click();
			cy.wait('@login').its('request.body.email').should('equal', 'james@yahoo.com');
			cy.contains("Email / Password don't match");
		});
		it('should return status 401  with wrong password', () => {
			cy.visit('http://localhost:3000/auth');
			cy.intercept('/api/auth/login').as('login');
			cy.get("input[name='email']").type('james@yahoo.com');
			cy.get("input[name='password']").type('123456');
			cy.get('button[data-cy="submit"]').click();
			cy.wait('@login')
				.its('response')
				.should((response) => expect(response.statusCode).to.eq(401))
				.should((response) => expect(response.body).keys(['success', 'message']))
				.should((response) => expect(response.body.message).to.eq("Email / Password don't match"));
		});
		it('should return 200 on correct password and redirect to homepage', () => {
			cy.visit('http://localhost:3000/auth');
			cy.intercept('/api/auth/login').as('login');
			cy.get("input[name='email']").type('james@yahoo.com');
			cy.get("input[name='password']").type('a1234567');
			cy.get('button[data-cy="submit"]').click();
			cy.wait('@login')
				.its('response')
				.should((response) => expect(response.statusCode).to.equal(201));
			cy.title().should('contain', 'Home');
		});
	});
});
