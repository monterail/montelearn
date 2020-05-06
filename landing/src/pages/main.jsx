import React from "react";
import PageHeader from "@/components/PageHeader/PageHeader";
import Banner from "@/components/MainPageBanner/Banner";
import Content from "@/components/MainContent/Content";
import { rem } from "@/theming/utils";
import StyledContainer from "@/components/Container/StyledContainer";

const MainPage = () => {
  return (
    <div>
      <StyledContainer>
        <div css={{ margin: rem(8, 48) }}>
          <PageHeader />
          <Banner />
          <Content />
        </div>
      </StyledContainer>
    </div>
  );
};

export default MainPage;
