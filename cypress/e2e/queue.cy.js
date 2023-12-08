import {
  testUrl,
  circle,
  modifiedState,
  defaultState,
  tail,
  head,
  indexCircle,
} from "../../src/constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
describe("stack page display correctly", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/queue`);
    cy.get("button").contains("Добавить").as("buttonAdd");
    cy.get("button").contains("Удалить").as("buttonDel");
    cy.get("button").contains("Очистить").as("buttonClear");
  });

  it("should button disabled if input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("correctness of adding an element to the queue", () => {
    cy.get("input").type("23");
    cy.get("@buttonAdd").click();
    cy.get(circle)
      .first()
      .should("have.text", "23")
      .should("have.css", "border", modifiedState)
      .siblings(indexCircle)
      .should("have.text", "0")
      .siblings(tail)
      .should("have.text", "tail")
      .siblings(head)
      .should("have.text", "head");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).should("have.css", "border", defaultState);
    cy.get("input").type("32");
    cy.get("@buttonAdd").click();
    cy.get(circle).each(($el, index) => {
      if ([0].includes(index)) {
        cy.wrap($el)
          .should("have.text", "23")
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("have.text", "head")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([1].includes(index)) {
        cy.wrap($el)
          .should("have.text", "32")
          .should("have.css", "border", modifiedState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("have.text", "tail")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([2, 7].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).should("have.css", "border", defaultState);
  });
  it("correct removal of an element from the queue", () => {
    cy.get("input").type("23");
    cy.get("@buttonAdd").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type("32");
    cy.get("@buttonAdd").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type("3");
    cy.get("@buttonAdd").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@buttonDel").click();
    cy.get(circle).each(($el, index) => {
      if ([0].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", modifiedState)
          .siblings(head)
          .should("have.text", "head")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([2].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("have.text", "tail")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([3, 7].includes(index) && [1].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      if ([1].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .and("have.value", "")
          .siblings(head)
          .should("have.text", "head")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([2].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("have.text", "tail")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([3, 7].includes(index) && [0].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      }
    });
  });
  it("Correct behavior of the “Clear” button", () => {
    cy.get("input").type("23");
    cy.get("@buttonAdd").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type("32");
    cy.get("@buttonAdd").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type("3");
    cy.get("@buttonAdd").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@buttonClear").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el) => {
      cy.wrap($el).should("have.text", "");
    });
  });
});
