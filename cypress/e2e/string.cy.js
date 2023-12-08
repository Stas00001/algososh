import { testUrl, circle } from "../../src/constants/constants";
import { DELAY_IN_MS } from "../../src/constants/delays";
const state = [
  [
    "4px solid rgb(210, 82, 225)",
    "4px solid rgb(0, 50, 255)",
    "4px solid rgb(0, 50, 255)",
    "4px solid rgb(210, 82, 225)",
  ],
  [
    "4px solid rgb(127, 224, 81)",
    "4px solid rgb(210, 82, 225)",
    "4px solid rgb(210, 82, 225)",
    "4px solid rgb(127, 224, 81)",
  ],
  [
    "4px solid rgb(127, 224, 81)",
    "4px solid rgb(127, 224, 81)",
    "4px solid rgb(127, 224, 81)",
    "4px solid rgb(127, 224, 81)",
  ],
];

const str = [
  [1, 2, 3, 4],
  [4, 2, 3, 1],
  [4, 3, 2, 1],
];
describe("string page display correctly", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/recursion`);
  });
  it("should button disabled if input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });
  it("string should reverse correctly", () => {
    cy.get("input").type("1234").should("have.value", "1234");
    cy.get("button[type='submit']").click();
    cy.get(circle).each(($el, index) => {
      cy.wrap($el)
        .should("have.text", str[0][index])
        .and("have.css", "border", state[0][index]);
    });
    cy.wait(DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      cy.wrap($el)
        .should("have.text", str[1][index])
        .and("have.css", "border", state[1][index]);
    });
    cy.wait(DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      cy.wrap($el)
        .should("have.text", str[2][index])
        .and("have.css", "border", state[2][index]);
    });
  });
  afterEach(() => {
    cy.get("input").should("have.value", "");
  });
});
