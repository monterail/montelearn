import { DropdownOption } from "@/types/Generic";

interface VideoOption extends DropdownOption {
  url: string;
}

export const teachersVideos: VideoOption[] = [
  {
    value: "createLesson",
    name: "Create lesson (to be recorded)",
    url: "https://drive.google.com/file/d/1MMnEJEsVcTIbQKTT3UVk5UX4pyNdV6br/preview",
  },
  {
    value: "createTest",
    name: "Create test",
    url: "https://drive.google.com/file/d/1MMnEJEsVcTIbQKTT3UVk5UX4pyNdV6br/preview",
  },
  {
    value: "editLesson",
    name: "Edit lesson",
    url: "https://drive.google.com/file/d/1MMnEJEsVcTIbQKTT3UVk5UX4pyNdV6br/preview",
  },
  {
    value: "editTest",
    name: "Edit test",
    url: "https://drive.google.com/file/d/1MMnEJEsVcTIbQKTT3UVk5UX4pyNdV6br/preview",
  },
  {
    value: "deleteLesson",
    name: "Delete lesson",
    url: "https://drive.google.com/file/d/1MMnEJEsVcTIbQKTT3UVk5UX4pyNdV6br/preview",
  },
  {
    value: "deleteTest",
    name: "Delete test",
    url: "https://drive.google.com/file/d/1MMnEJEsVcTIbQKTT3UVk5UX4pyNdV6br/preview",
  },
];
