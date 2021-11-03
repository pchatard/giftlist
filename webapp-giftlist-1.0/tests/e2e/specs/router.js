// https://docs.cypress.io/api/introduction/api.html

describe('Router Tests', () => {
	it('Visits the app root url', () => {
		cy.visit('/');
		cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App');
	});
	it('Visits the login url', () => {
		cy.visit('/login');
		cy.contains('h1', 'Connexion');
	});
	it('Visits the register url', () => {
		cy.visit('/register');
		cy.contains('h1', 'Inscription');
	});
	it('Visits the dashboard url', () => {
		cy.visit('/app');
		cy.contains('h1', 'Bienvenue');
	});
	it('Visits the profile url', () => {
		cy.visit('/app/profile');
		cy.contains('h1', 'Mon compte');
	});
	it('Visits the list url', () => {
		cy.visit('/app/lists/1');
		cy.contains('h1', 'Ma liste');
	});
	it('Visits the shared list url', () => {
		cy.visit('/app/lists/shared/1');
		cy.contains('h1', 'La liste de mon copain');
	});
});
