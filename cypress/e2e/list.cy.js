import {
  testUrl,
  buttonAddHead,
  buttonAddIndex,
  buttonDelHead,
  buttonDelIndex,
  buttonAddTail,
  buttonDelTail,
  circle,
  indexCircle,
  defaultState,
  head,
  tail,
  smallCircle,
  changeState,
  modifiedState,
  modifiedCircle,
  inputVal,
  inputValIndex,
} from "../../src/constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("list page display correctly", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/list`);
  });

  it("should button disabled if input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get(buttonAddHead).should("be.disabled");
    cy.get(buttonAddTail).should("be.disabled");
    cy.get(buttonAddIndex).should("be.disabled");
    cy.get(buttonDelIndex).should("be.disabled");
  });

  it("correctness of rendering of the default list", () => {
    cy.get(circle).its("length").should("be.gte", 3).and("be.lte", 7);
    cy.get(circle).first().siblings(head).should("have.text", "head");
    cy.get(circle).last().siblings(tail).should("have.text", "tail");
    cy.get(circle).each(($el, index) => {
      cy.wrap($el)
        .should("have.css", "border", defaultState)
        .and("not.to.be.empty")
        .siblings(indexCircle)
        .should("have.text", index);
    });
  });
  it("correctness of adding an element to head", () => {
    cy.get(inputVal).type("1");
    cy.get(buttonAddHead).click();
    cy.get(smallCircle)
      .first()
      .should("have.text", "1")
      .should("have.css", "border", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle)
      .eq(0)
      .should("have.text", "1")
      .should("have.css", "border", changeState)
      .siblings(head)
      .should("have.text", "head")
      .siblings(tail)
      .should("not.have.text")
      .siblings(indexCircle)
      .should("have.text", 0);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).eq(0).should("have.css", "border", defaultState);
  });
  it("correctness of adding an element to tail", () => {
    cy.get(inputVal).type("1");
    cy.get(buttonAddTail).click();
    cy.get(smallCircle)
      .last()
      .should("have.text", "1")
      .should("have.css", "border", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(modifiedCircle);
    cy.get(circle)
      .last()
      .should("have.text", "1")
      .should("have.css", "border", changeState)
      .siblings(head)
      .should("not.have.text")
      .siblings(tail)
      .should("have.text", "tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).should("have.css", "border", defaultState);
  });
  it("correctness of adding an element by index", () => {
    cy.get(inputVal).type("32");
    cy.get(inputValIndex).type(2);
    cy.get(buttonAddIndex).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(smallCircle)
      .should("have.text", "32")
      .should("have.css", "border", modifiedState);
    cy.get(circle).eq(0).should("have.css", "border", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      if ([0, 2].includes(index)) {
        cy.wrap($el).should("have.css", "border", modifiedState);
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      if ([2].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", changeState)
          .and("have.text", "32");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      cy.wrap($el).should("have.css", "border", defaultState);
    });
  });

  it("removing an element from head", () => {
    cy.get(circle).each(($el, index) => {
      if ([0].includes(index)) {
        cy.get(buttonDelHead).click();
        cy.get(smallCircle)
          .should("have.text", $el[0].textContent)
          .should("have.css", "border", modifiedState);
        cy.wrap($el).should("not.have.text");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(smallCircle).should("not.exist");
    cy.get(circle).each(($el, index) => {
      cy.wrap($el).should("not.to.be.empty");
    });
  });
  it("removing an element from tail", () => {
    cy.get(inputVal).type("32");
    cy.get(buttonAddTail).click();
    cy.get(buttonDelTail).click();
    cy.get(circle).last().prev().should("have.text", "");
    cy.get(smallCircle)
      .should("have.text", "32")
      .should("have.css", "border", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(smallCircle).should("not.exist");
    cy.get(circle).each(($el, index) => {
      cy.wrap($el).should("not.to.be.empty");
    });
  });
  it("removing an element by index", () => {
    cy.get(inputValIndex).type(2);
    cy.get(buttonDelIndex).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).first().should("have.css", "border", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      if ([1, 2].includes(index)) {
        cy.wrap($el).should("have.css", "border", modifiedState);
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(smallCircle).should("have.css", "border", modifiedState);
    cy.get(circle).each(($el, index) => {
      if ([2].includes(index)) {
        cy.wrap($el).should("not.have.text");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(smallCircle).should("not.exist");
    cy.get(circle).each(($el, index) => {
      cy.wrap($el).should("not.to.be.empty");
    });
  });
});
