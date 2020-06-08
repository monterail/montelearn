import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Dropdown from "@/components/Dropdown";

import { DropdownOption } from "@/types/Generic";

import { teachersContent } from "@/constants/content";
import { teachersVideos } from "@/constants/teachersVideos";

const TeachersPage = () => {
  const [selectedOption, setSelectedOption] = useState({
    value: teachersContent.defaultVideo.value,
    name: teachersContent.defaultVideo.name,
  });
  const [selectedVideo, setSelectedVideo] = useState(teachersContent.defaultVideo.url);

  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  const handleVideoChange = ({ value, name }: DropdownOption) => {
    setSelectedOption({ value, name });
    const selectedVideoOption = teachersVideos.find((video) => video.name === name);
    setSelectedVideo(selectedVideoOption!.url);
  };

  return (
    <div>
      <section className="px-2 mb-12">
        <Head>
          <title>Teachers Page</title>
        </Head>
        <Breadcrumbs handleBackClick={handleBackClick} options={["Teachers"]} />
        <div className="mx-3 sm:mx-0">
          <Title className="my-8">{teachersContent.title}</Title>
          <Text className="font-roboto-mono my-8 text-xl">{teachersContent.subtitle}</Text>
        </div>
      </section>
      <hr className="my-12 block border border-gray-200 h-0 opacity-50" />
      <div className="mb-12">
        <div className="w-3/4 mx-auto">
          <Dropdown
            name="video"
            label="Select video from the dropdown"
            value={selectedOption.value}
            options={teachersVideos}
            handleChange={handleVideoChange}
            placeholder="Select video"
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center px-4 py-4 md:py-16 md:py-16 lg:px-32 lg:py-32 bg-red-cindirella">
        <h2 className="font-eczar text-center w-full text-4xl font-semibold mb-8">
          {selectedOption.name}
        </h2>
        <div className="container-iframe-16-9">
          <iframe
            title={selectedOption.name}
            className="iframe sm:rounded-sm"
            src={selectedVideo}
          />
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
