describe('Tests over TV Show API', () => {
  before(() => {
    cy.fixture('show').then((show) => this.show = show);
  });

  it('should save a show', () => {
    const requestOptions: Partial<Cypress.RequestOptions> = {
      method: 'POST',
      url: '/shows',
      body: <Cypress.RequestBody>this.show,
      failOnStatusCode: false
    };

    cy.request(requestOptions)
      .then(({ body, status }) => {
        const { id } = body;
        expect(status).to.equal(201);
        expect(id).to.not.null;
      });
  });

  it('it show retrieve the saved show', () => {
    const query = 'ORDER';
    
    const requestOptions: Partial<Cypress.RequestOptions> = {
      method: 'GET',
      url: `/shows/${query}`,
      body: <Cypress.RequestBody>this.show,
      failOnStatusCode: false
    };

    cy.request(requestOptions)
      .then(({ body, status }) => {
        const { shows } = body;
        expect(status).to.equal(200);
        expect(shows.at(0).title).to.equal('Alice in Borderland');
      });
  });
});