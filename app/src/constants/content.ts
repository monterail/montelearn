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

export const subjectsContent = [
  {
    name: "HR Tech",
    description:
      "HR technology solutions are revolutionizing the world of Human Resources. From recruiting the best talent and boosting employee engagement, to building personalized career paths — HR software can simplify each element of running a business.",
  },
  {
    name: "Remote work",
    description:
      "With remote work rising in popularity, many companies want to adapt to a new reality quickly and effectively. Read our tips, suggested tools, and practices that can help you make a shift into a remote-friendly company.",
  },
  {
    name: "Product Specification",
    description:
      "A good product specification gives enough specific information so that the vendor knows a project’s goals and priorities, but is flexible enough to leave some room for technical decisions and to test the vendor’s expertise. See how to prepare such a document.",
  },
  {
    name: "Project Management",
    description:
      "Project management is a crucial aspect of any successful project. It involves several aspects including: team leadership, client relationships, planning, predicting future hang-ups, and more. Take a look at some of the lessons we have learned first-hand over our ten years of experience in the field.",
  },
];

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
