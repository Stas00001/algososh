import {
  circle,
  modifiedState,
  defaultState,
} from "../../src/constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
describe("stack page display correctly", () => {
  beforeEach(() => {
    cy.visit(`stack`);
    cy.get("button").contains("Добавить").as("buttonAdd");
    cy.get("button").contains("Удалить").as("buttonDel");
    cy.get("button").contains("Очистить").as("buttonClear");
  });

  it("should button disabled if input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("adding an element to the queue", () => {
    cy.get("input").type("1");
    cy.get("@buttonAdd").click();
    cy.get(circle).last().should("have.css", "border", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).last().should("have.css", "border", defaultState);
    cy.get("input").type("31");
    cy.get("@buttonAdd").click();
    cy.get(circle).last().should("have.css", "border", modifiedState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).last().should("have.css", "border", defaultState);
  });

  it("delete an element to the queue", () => {
    cy.get("input").type("1");
    cy.get("@buttonAdd").click();
    cy.get("input").type("31");
    cy.get("@buttonAdd").click();
    cy.get("@buttonDel").click();
    cy.get(circle).last().should("have.css", "border", modifiedState);
    cy.get("li").should("have.length", 2);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("li").should("have.length", 2);
    cy.get(circle).should("have.css", "border", defaultState);
  });

  it("clear an element to the queue", () => {
    cy.get("input").type("1");
    cy.get("@buttonAdd").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type("31");
    cy.get("@buttonAdd").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("li").should("have.length", 2);
    cy.get("@buttonClear").should("be.visible").click();
    cy.get("li").should("have.length", 0);
  });
});
