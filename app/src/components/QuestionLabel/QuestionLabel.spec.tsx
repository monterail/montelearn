import React from "react";
import { render, cleanup } from "@testing-library/react";

import QuestionLabel from "./QuestionLabel";

describe("QuestionLabel", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<QuestionLabel isCorrect />);
    expect(await findByTestId("question-label")).toBeInTheDocument();
  });

  describe("isCorrect", () => {
    it(`"isCorrect" is true`, async () => {
      const { findByTestId } = render(<QuestionLabel isCorrect />);
      const label = await findByTestId("question-label");
      expect(label).toHaveTextContent("Correct");
      expect(label).toHaveClass("bg-green-100 text-green-200");
    });
    it(`"isCorrect" is false`, async () => {
      const { findByTestId } = render(<QuestionLabel isCorrect={false} />);
      const label = await findByTestId("question-label");
      expect(label).toHaveTextContent("Wrong");
      expect(label).toHaveClass("text-black bg-gray-200");
    });
  });

  describe("class", () => {
    it(`has additional class`, async () => {
      const { findByTestId } = render(<QuestionLabel isCorrect className="someClass" />);
      expect(await findByTestId("question-label")).toHaveClass("someClass");
    });
  });

  describe("children", () => {
    it(`has child element`, () => {
      const childElement = <p data-testid="childElement">Child element</p>;
      const { queryByTestId } = render(<QuestionLabel isCorrect>{childElement}</QuestionLabel>);
      expect(queryByTestId("childElement")).toBeInTheDocument();
    });
  });
});
