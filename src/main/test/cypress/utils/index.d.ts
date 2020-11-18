declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
  }
}
