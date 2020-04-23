import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Component from "../index";

describe("RevealButton", () => {
  it("renders", () => {
    render(<Component />);
    expect(screen.getByText("show/hide")).toBeInTheDocument();
  });

  it("should call onClick", () => {
    const onClick = jest.fn();
    render(<Component onClick={onClick} />);

    fireEvent.click(screen.getByTestId("RevealButton"));

    expect(onClick).toBeCalledTimes(1);
  });

  it("should call onClick with data", () => {
    const onClick = jest.fn();
    render(<Component onClick={onClick} onClickData={{ abc: 123 }} />);

    fireEvent.click(screen.getByTestId("RevealButton"));

    expect(onClick).toBeCalledWith({ abc: 123 });
  });

  it("should not submit form when clicked", () => {
    const onSubmit = jest.fn();
    render(
      <form onSubmit={onSubmit}>
        <Component onClick={jest.fn()} />
      </form>,
    );

    fireEvent.click(screen.getByTestId("RevealButton"));

    expect(onSubmit).not.toBeCalled();
  });
});
