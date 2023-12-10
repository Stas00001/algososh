import renderer from "react-test-renderer";
import { ElementStates } from "../../../../types/element-states";
import { Circle } from "../circle";

describe("text Circle component", () => {
  it("render Circle without letter", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("render Circle letter", () => {
    const tree = renderer.create(<Circle letter="0" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle head", () => {
    const tree = renderer.create(<Circle head={"head"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle react component in head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle react tail", () => {
    const tree = renderer.create(<Circle tail="0" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle react component in head", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle index", () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle with props 'isSmall ===  true'", () => {
    const tree = renderer.create(<Circle isSmall = {true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle with default", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle with changing", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render Circle with modified", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
