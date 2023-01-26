describe('Home Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	describe('Slideshow ', () => {
		it('should show slide 1 when preview 1 is clicked', () => {
			cy.get('[data-cy="slide-1"]').should('not.be.visible');
			cy.get('[data-cy="button-1"]').click();
			cy.get('[data-cy="slide-1"]').should('be.visible');
		});
		it('should navigate to products page when See More Button is clicked', () => {
			cy.get('[data-cy="see-more-button"]').first().click();
			cy.url().should('include', '/products');
		});
		it('should navigate to fruit category page when View Button for Fruit Category is clicked', () => {
			cy.get('[data-cy="categories-section"]').scrollIntoView();
			cy.fixture('categories')
				.then((category) => category.categories)
				.each((category, index, $list) => {
					cy.get(`[data-cy="${category}--view-button"]`).click();
					cy.url({
						timeout: 20000,
					}).should('include', category);
					cy.go('back');
				});
		});
	});
});
