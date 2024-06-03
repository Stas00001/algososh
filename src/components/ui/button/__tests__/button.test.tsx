import React from "react";
import renderer from "react-test-renderer";
import { Button } from "../button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("test Button component", () => {
  it("render button text", () => {
    const tree = renderer.create(<Button text="button" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render  button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render button disabled", () => {
    const tree = renderer.create(<Button text="disabled" disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render button is loader", () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("checking whether the callback is called correctly when the button is clicked", () => {
    window.alert = jest.fn();
    render(
      <Button
        text="Callback"
        onClick={() =>
          alert("Correctly calling a callback when a button is clicked")
        }
      />
    );
    const button = screen.getByText("Callback");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith(
      "Correctly calling a callback when a button is clicked"
    );
  });
});
