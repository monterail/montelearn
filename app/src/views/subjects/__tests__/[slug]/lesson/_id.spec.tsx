import { render, cleanup } from "@testing-library/react";

import "../../../../../tests/mocks/authMock";
import { lesson, question, testList } from "../../../../../tests/mocks/data";
import "../../../../../tests/mocks/routerMock";

import LessonPage from "../../../[slug]/lesson/_id";

import useRequest from "../../../../../utils/hooks/useRequest";

jest.mock("@/utils/hooks/useRequest");

describe("LessonPage", () => {
  beforeAll(() => {
    (useRequest as any).mockImplementation(({ url }) => {
      return {
        data: url.includes("/lesson/") ? lesson : undefined,
      };
    });
  });
  afterEach(() => cleanup);

  it("renders lesson name", async () => {
    const { findAllByText } = render(<LessonPage />);

    const label = await findAllByText(lesson.name);

    expect(label[0]).toBeInTheDocument();
  });

  it("renders lesson grade", async () => {
    const { findByText } = render(<LessonPage />);

    const label = await findByText(lesson.grade);

    expect(label).toBeInTheDocument();
  });

  it("renders lesson description", async () => {
    const { findByText } = render(<LessonPage />);

    const label = await findByText(lesson.description);

    expect(label).toBeInTheDocument();
  });

  it("renders open lesson link", async () => {
    const { findByText } = render(<LessonPage />);

    const link = await findByText(/Open lesson/i);

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(/Open lesson/i);
  });

  it("renders text header", async () => {
    const { findByText } = render(<LessonPage />);

    const header = await findByText(/Time to test your knowledge/i);

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/Time to test your knowledge/i);
  });

  describe("when there is no tests", () => {
    it("renders no tests paragraph", async () => {
      const { findByText } = render(<LessonPage />);

      const paragraph = await findByText(/There are no tests in this lesson./i);

      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent(/There are no tests in this lesson./i);
    });
  });

  describe("when there is tests", () => {
    beforeAll(() => {
      (useRequest as any).mockImplementation(({ url }) => {
        return {
          data: url.includes("/lesson/") ? lesson : testList,
        };
      });
    });

    it("renders question header", async () => {
      const { findByText } = render(<LessonPage />);

      const header = await findByText(/Question 1/i);

      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent(/Question 1/i);
    });

    it("renders question content", async () => {
      const { findByText } = render(<LessonPage />);

      const content = await findByText(question.content);

      expect(content).toBeInTheDocument();
    });

    it("renders test now button", async () => {
      const { findByText } = render(<LessonPage />);

      const button = await findByText(/Test now/i);

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/Test now/i);
    });
  });
});
