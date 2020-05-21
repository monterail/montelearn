import React, { ReactNode } from "react";
import auth from "@/components/Auth";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageFooter from "@/components/PageFooter/PageFooter";
import { rem } from "@project/core/lib/utils/theming";
import StyledContainer from "@/components/Container/StyledContainer";

export default function Layout({ children }: { children: ReactNode }) {
  const PageHeaderWithAuth = auth(PageHeader);

  return (
    <div>
      <StyledContainer>
        <div css={{ margin: rem(8, 48) }}>
          <PageHeaderWithAuth redirect={false} />
          {children}
          <PageFooter />
        </div>
      </StyledContainer>
    </div>
  );
}
