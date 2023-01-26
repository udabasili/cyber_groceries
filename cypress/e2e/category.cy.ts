describe('Category', () => {
	it('Navigation', () => {
		cy.visit('http://localhost:3000');
		cy.get('a[data-cy="categories"]').click();
		cy.url({
			timeout: 10000,
		}).should('include', '/categories');
	});
});
export {};
