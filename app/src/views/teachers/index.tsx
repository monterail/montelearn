import { useRouter } from "next/router";
import Head from "next/head";

import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Text from "@/components/Text";

import { teachersContent } from "@/constants/content";

const TeachersPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
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
        <div className="w-3/4 mx-auto">wiecej kontenciku</div>
      </div>
      <div className="pt-12 pb-32 bg-red-cindirella">
        <div className="w-3/4 mx-auto">tu bedzie filmik</div>
      </div>
    </div>
  );
};

export default TeachersPage;
