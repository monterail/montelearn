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

  describe("with interactions", () => {
    const val = {
      url: "http://url.com",
      array: [0, { nested: "object" }],
    };

    it("should not render nested properties by default", () => {
      render(<RecursiveReveal value={val} />);
      expect(screen.queryByTestId("RecursiveReveal_ObjectProperties")).not.toBeInTheDocument();
    });

    it("should reveal nested properties on click", () => {
      render(<RecursiveReveal value={val} />);
      fireEvent.click(screen.getByTestId("RecursiveReveal_ObjectReveal"));
      expect(screen.queryByTestId("RecursiveReveal_ObjectProperties")).toBeInTheDocument();
    });

    it("should reveal and hide nested properties on clicks", () => {
      render(<RecursiveReveal value={val} />);

      const element = screen.getByTestId("RecursiveReveal_ObjectReveal");

      fireEvent.click(element);
      expect(screen.queryByTestId("RecursiveReveal_ObjectProperties")).toBeInTheDocument();

      fireEvent.click(element);
      expect(screen.queryByTestId("RecursiveReveal_ObjectProperties")).not.toBeInTheDocument();
    });

    it("should reveal whole tree", () => {
      render(<RecursiveReveal value={val} />);

      // Unfold the root object.
      fireEvent.click(screen.getByTestId("RecursiveReveal_ObjectReveal"));

      // Reval obj["b"] array
      fireEvent.click(screen.getByTestId("RecursiveReveal_ArrayReveal"));

      const nestedObjectReveal = screen.getAllByTestId("RecursiveReveal_ObjectReveal")[1];
      fireEvent.click(nestedObjectReveal);

      expect(screen.getAllByTestId("RecursiveReveal_ObjectProperties").length).toBe(2);
      expect(screen.getAllByTestId("RecursiveReveal_ObjectProperty").length).toBe(3);

      expect(screen.getAllByTestId("RecursiveReveal_ArrayProperties").length).toBe(1);
      expect(screen.getAllByTestId("RecursiveReveal_ArrayProperty").length).toBe(2);
    });
  });
});
