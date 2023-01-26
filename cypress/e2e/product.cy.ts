describe('Product Page', () => {
	it('Navigation', () => {
		cy.visit('http://localhost:3000');
		cy.get('a[data-cy="products"]').click();
		cy.url().should('include', '/products');
	});
});
