describe('Product Page', () => {
	beforeEach(() => {
		cy.intercept('/api/auth/me').as('me');

		cy.visit('http://localhost:3000');
		cy.get('[data-cy="loading"]', { timeout: 10_000 }).should('not.be.visible');
	});

	it('Navigation', () => {
		cy.get('a[data-cy="products"]').click();
		cy.url().should('include', '/products');
	});

	describe('Cart', () => {
		it('should show when cart button is clicked ', () => {
			cy.get('[data-cy="cart-button"]').click();
			cy.get('[data-cy="cart"]', { timeout: 10_000 }).should('be.visible');
		});
		it('count should increase by 1 when item is added to cart', () => {
			const count = 0;
			cy.visit('http://localhost:3000/products');
			cy.get('span[data-cy="cart-count"]').contains(count);
			cy.get('[data-cy="product-card-button"]').first().click();
			cy.get('span[data-cy="cart-count"]').contains(count + 1);
		});
		it('count should not increase further when same item is added to cart', () => {
			const count = 0;
			cy.visit('http://localhost:3000/products');
			cy.get('span[data-cy="cart-count"]').contains(count);
			cy.get('[data-cy="product-card-button"]').first().click();
			cy.get('span[data-cy="cart-count"]').contains(1);
			cy.get('[data-cy="product-card-button"]').first().click();
			cy.get('span[data-cy="cart-count"]').contains(1);
		});
		it('count reduce by 1 when item is removed from cart', () => {
			let count = 0;
			cy.visit('http://localhost:3000/products');
			cy.get('span[data-cy="cart-count"]').contains(count);
			cy.get('[data-cy="product-card-button"]').eq(3).click();
			count += 1;
			cy.get('[data-cy="product-card-button"]').first().click();
			count += 1;
			cy.get('[data-cy="cart-button"]').click();
			cy.get('[data-cy="cart"]', { timeout: 10_000 }).should('be.visible');
			cy.get('[data-cy="remove-button"]', { timeout: 30_000 }).first().click();
			count -= 1;
			cy.get('span[data-cy="cart-count"]').contains(count);
		});
		it('close cart when close button is clicked', () => {
			cy.get('[data-cy="cart-button"]').click();
			cy.get('[data-cy="cart"]', { timeout: 10_000 }).should('be.visible');
			cy.get('[data-cy="close-cart-button"]').click();
			cy.get('[data-cy="cart"]', { timeout: 10_000 }).should('not.exist');
		});
	});
});
