/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe('Pokedex', () => {
  let fetchPolyfill;
  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });

    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', 'fixture:listado-pagina-1')
      .as('obtenerPrimeraPagina');

    cy.visit('http://127.0.0.1:8080', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });
  it('Prueba la primer pagina', () => {
    const CANTIDAD_POKEMONES = 20;
    cy.get('#body-tabla').children().as('obtenerPokemones').should('have.length', CANTIDAD_POKEMONES);
    cy.get('#paginador .page-link:first').parent().should('have.class', 'disabled');
    cy.get('#paginador .page-link:last').parent().should('not.have.class', 'disabled');
  });
  it('Prueba mostrar pokemon', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/bulbasaur', 'fixture:bulbasaur');
    cy.get('#imagen-poke').should('not.have.descendants');
    cy.get('td:first').click();
    cy.get('#imagen-poke').should('have.descendants', 'img');
  });
});

// leer network request cypress
// cy.server();
//     cy.route('url', 'fixture:bulbasaur').as('obtieneBulbasaur')
// hacerlo en cada prueba y configurar las rutas que queremos mockear
// mockea ruta y devuelve fixture
// polyfill crea una funcion global
