import { teachersVideos } from "./teachersVideos";

export const landingContent = {
  title: "Build your own learning experience",
  subtitle:
    "Montelearn is a backend API that developers can use to build a custom e-learning platform. Its main focus is on creating interactive lessons and tests, suitable for every education level, science, or topic.",
  students: {
    name: "Students",
    content: "Discover what lessons look like in our application.",
  },
  teachers: {
    name: "Teachers",
    content:
      "See how you can share lessons with your students and create tests that check their knowledge.",
  },
  developers: {
    name: "API Developers",
    content:
      "Check how you can create a custom e-learning platform tailored to your needs. Take a look on example endpoints that our backend provides.",
  },
};

export const developersContent = {
  title: "Select example endpoint",
  subtitle:
    "Take a look at example endpoints that our backend provides. The responses are mocked, to get more features set the app locally.",
};

export const teachersContent = {
  title: "Instructional videos",
  subtitle:
    "To quickly understand how teachers' admin panel works, watch the instructional videos listed below.",
  content: "More content",
  defaultVideo: teachersVideos[0],
};
