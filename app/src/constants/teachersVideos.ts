import { DropdownOption } from "@/types/Generic";

interface VideoOption extends DropdownOption {
  url: string;
}

export const teachersVideos: VideoOption[] = [
  {
    value: "createLesson",
    name: "Create lesson (to be re-recorded)",
    url: "https://drive.google.com/file/d/1MMnEJEsVcTIbQKTT3UVk5UX4pyNdV6br/preview", // to be recorded
  },
  {
    value: "createTest",
    name: "Create test",
    url: "https://www.youtube.com/embed/fUTnB9jwykU",
  },
  {
    value: "editLesson",
    name: "Edit lesson",
    url: "https://www.youtube.com/embed/NCsXABLG8C4",
  },
  {
    value: "editTest",
    name: "Edit test",
    url: "https://www.youtube.com/embed/QjnoaI8Ej_I",
  },
  {
    value: "deleteLesson",
    name: "Delete lesson",
    url: "https://www.youtube.com/embed/lSBE6jruCzU",
  },
  {
    value: "deleteTest",
    name: "Delete test",
    url: "https://www.youtube.com/embed/fUTnB9jwykU",
  },
];
