import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Dropdown from "@/components/Dropdown";
import Textarea from "@/components/Textarea";
import { DropdownOption } from "@/types/Generic";
import { getMockedResponse } from "./mocks";

const options: DropdownOption[] = [
  {
    value: "lesson",
    name: "GET /api/lesson/",
  },
  {
    value: "tests",
    name: "GET /api/tests/",
  },
  {
    value: "subject",
    name: "GET /api/subject/",
  },
  {
    value: "grade",
    name: "GET /api/grade/",
  },
];

const DevelopersPage = () => {
  const [endpoint, setEndpoint] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (endpoint) setCode(getMockedResponse(endpoint));
  }, [endpoint]);

  const handleBackClick = () => {
    router.push("/");
  };

  const handleEndpointChange = (option: DropdownOption) => {
    setEndpoint(option.value);
  };

  return (
    <div>
      <section className="px-2 mb-12">
        <Head>
          <title>API developers page</title>
        </Head>
        <Breadcrumbs handleBackClick={handleBackClick} options={["API developers"]} />
        <div className="mx-3 sm:mx-0">
          <Title className="my-8">Select your URL</Title>
          <Text className="font-roboto-mono my-8 text-xl">Something Something</Text>
        </div>
      </section>
      <hr className="my-12 block border border-gray-200 h-0 opacity-50" />
      <div className="mb-12">
        <div className="w-3/4 mx-auto">
          <Dropdown
            name="endpoint"
            label="Select URL"
            value={endpoint}
            options={options}
            handleChange={handleEndpointChange}
            placeholder="Select endpoint"
          />
        </div>
      </div>
      <div className="pt-12 pb-32 bg-red-cindirella">
        <div className="w-3/4 mx-auto">
          <Textarea label="Response" placeholder="Wait for it..." value={code} />
        </div>
      </div>
    </div>
  );
};

export default DevelopersPage;
