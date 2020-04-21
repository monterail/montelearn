import { render, screen, fireEvent } from "@testing-library/react";

import RecursiveReveal from "../index";

describe("RecursiveReveal", () => {
  it("should render without errors", () => {
    expect(() => render(<RecursiveReveal value={null} />)).not.toThrow();
  });

  it("should render undefined", () => {
    render(<RecursiveReveal value={undefined} />);

    const element = screen.getByTestId("RecursiveReveal_Undefined");

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });

  it("should render null", () => {
    render(<RecursiveReveal value={null} />);

    const element = screen.getByTestId("RecursiveReveal_Null");

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });

  it("should render Date", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    render(<RecursiveReveal value={date} />);

    const element = screen.getByTestId("RecursiveReveal_Date");

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
    expect(element.textContent).toBe(`Date (${date.toISOString()})`);
  });

  it("should render simple value", () => {
    render(<RecursiveReveal value={123} />);

    const element = screen.getByTestId("RecursiveReveal_Primitive");

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });

  it("should render empty array", () => {
    render(<RecursiveReveal value={[]} />);

    const element = screen.getByTestId("RecursiveReveal_Array");

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();

    expect(element.textContent).toMatch(/^Array \(empty\)/);
  });

  it("should render empty object", () => {
    render(<RecursiveReveal value={{}} />);

    const element = screen.getByTestId("RecursiveReveal_Object");

    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();

    expect(element.textContent).toMatch(/^Object \(empty\)/);
  });

  describe("complex value", () => {
    const obj = {
      a: 1,
      b: [2, { c: 3 }],
    };

    it("should not render nested properties by default", () => {
      render(<RecursiveReveal value={obj} />);
      expect(screen.queryByTestId("RecursiveReveal_ObjectProperties")).not.toBeInTheDocument();
    });

    it("should reveal nested properties on click", () => {
      render(<RecursiveReveal value={obj} />);
      fireEvent.click(screen.getByTestId("RecursiveReveal_ObjectReveal"));
      expect(screen.queryByTestId("RecursiveReveal_ObjectProperties")).toBeInTheDocument();
    });

    it("should reveal and hide nested properties on clicks", () => {
      render(<RecursiveReveal value={obj} />);

      const element = screen.getByTestId("RecursiveReveal_ObjectReveal");

      fireEvent.click(element);
      expect(screen.queryByTestId("RecursiveReveal_ObjectProperties")).toBeInTheDocument();

      fireEvent.click(element);
      expect(screen.queryByTestId("RecursiveReveal_ObjectProperties")).not.toBeInTheDocument();
    });
  });
});
