import { rem } from "@project/core/lib/utils/theming";

import StyledContainer from "@/components/Container/StyledContainer";
import PageHeader from "@/components/PageHeader/PageHeader";
import Content from "@/components/MainContent/Content";
import Banner from "@/components/MainPageBanner/Banner";

export default function HomePage() {
  return (
    <StyledContainer>
      <div css={{ margin: rem(8, 48) }}>
        <PageHeader />
        <Banner />
        <Content />
      </div>
    </StyledContainer>
  );
}
