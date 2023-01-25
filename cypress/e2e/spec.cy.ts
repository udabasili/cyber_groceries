describe('Home Page', () => {
	describe('Slideshow ', () => {
		it('should show slide 1 when preview 1 is clicked', () => {
			cy.visit('http://localhost:3000');
			cy.get('[data-cy="slide-1"]').should('not.be.visible');
			cy.get('[data-cy="button-1"]').click();
			cy.get('[data-cy="slide-1"]').should('be.visible');
		});
	});
});

describe('Product Page', () => {
	it('Navigation', () => {
		cy.visit('http://localhost:3000');
		cy.get('a[data-cy="products"]').click();
		cy.url().should('include', '/products');
	});
});
