type Theme = {
  textClass: string;
  containerClass: string;
  circleClass: string;
};

type Themes = {
  [key: string]: Theme;
};

export const themes: Themes = {
  selectedCorrect: {
    textClass: "text-white",
    containerClass: "bg-green-200",
    circleClass: "bg-white border-green-200",
  },
  nonSelectedCorrect: {
    textClass: "text-green-200",
    containerClass: "bg-green-100",
    circleClass: "bg-green-100 border-green-200",
  },
  selected: {
    textClass: "text-white",
    containerClass: "bg-red-monterail",
    circleClass: "bg-white border-red-monterail",
  },
  nonSelected: {
    textClass: "text-black",
    containerClass: "bg-red-100",
    circleClass: "bg-red-100 border-red-200",
  },
};
