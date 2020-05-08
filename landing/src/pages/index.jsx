import React from "react";
import Banner from "@/components/MainPageBanner/Banner";
import Content from "@/components/MainContent/Content";
import Layout from "@/components/Layout";

const MainPage = () => {
  return (
    <Layout>
      <Banner />
      <Content />
    </Layout>
  );
};

export default MainPage;
