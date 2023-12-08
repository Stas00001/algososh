import { testUrl, circle } from "../../src/constants/constants";

const resultFibonacci = [1,1,1,2,5]
describe('fibonacci page display correctly', () => {
    beforeEach(() => {
        cy.visit(`${testUrl}/fibonacci`);
      });
      it('should button disabled if input is empty', () => {
        cy.get("input").should("be.empty");
        cy.get("button").should("be.disabled");
      })
      it('numbers are generated correctly', () => {
        cy.get('input').type('4');
        cy.get("button[type='submit']").click();
        cy.get('li').each(($el, index) => {
            cy.wrap($el).find(circle).should('have.text', resultFibonacci[index])
        })
      })
      afterEach(() => {
        cy.get("input").should("have.value", "");
      });
})