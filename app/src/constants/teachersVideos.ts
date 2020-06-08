import { DropdownOption } from "@/types/Generic";

interface VideoOption extends DropdownOption {
  url: string;
}

export const teachersVideos: VideoOption[] = [
  {
    value: "createLesson",
    name: "Create lesson (to be recorded)",
    url: "https://drive.google.com/file/d/1MMnEJEsVcTIbQKTT3UVk5UX4pyNdV6br/preview", // todo
  },
  {
    value: "createTest",
    name: "Create test",
    url: "https://drive.google.com/file/d/1mEpN_ADJ_VgeeIEAVoU7BM7z9iFZeaHE/preview",
  },
  {
    value: "editLesson",
    name: "Edit lesson",
    url: "https://drive.google.com/file/d/1XZuUwt1ii6bCO7UUDqs2A78yNaCrc465/preview",
  },
  {
    value: "editTest",
    name: "Edit test",
    url: "https://drive.google.com/file/d/1aEUwe5-ZvZ0_XMQVADsKwkSwscndMkWJ/preview",
  },
  {
    value: "deleteLesson",
    name: "Delete lesson",
    url: "https://drive.google.com/file/d/1yhM9eQ8_9a_Jhm4MCIbTQVCydMZR-rch/preview",
  },
  {
    value: "deleteTest",
    name: "Delete test",
    url: "https://drive.google.com/file/d/14bxSuBFIMYZ3EqHGWirdC_Cixb4c5ELd/preview",
  },
];
