import React from "react";
import Router from "next/router";
import Link from "next/link";
import Head from "next/head";
import Cookie from "js-cookie";

import { COLOR_RED, COLOR_BLACK } from "@project/core/lib/const/theming";
import { rem } from "@project/core/lib/utils/theming";
import { logout } from "@/services/auth";
import { COOKIES } from "@/constants";
import StyledFlexContainer from "../Container/StyledFlexContainer";
import StyledButton from "../StyledButton/StyledButton";

const UserLogout = () => (
  <div>
    <span css={{ marginRight: rem(20) }}>Hi, {Cookie.get(COOKIES.firstName) || "User"}</span>
    <StyledButton
      css={{
        border: `${rem(2)} solid ${COLOR_BLACK}`,
        fontSize: rem(18),
        padding: rem(10, 20),
      }}
      onClick={logout}
    >
      Logout
    </StyledButton>
  </div>
);

const LoginRegister = () => (
  <div>
    <StyledButton
      css={{
        border: `${rem(2)} solid ${COLOR_BLACK}`,
        fontSize: rem(18),
        padding: rem(10, 20),
      }}
      onClick={() => Router.push("/login")}
    >
      Login
    </StyledButton>
    <StyledButton
      css={{
        border: `${rem(2)} solid ${COLOR_BLACK}`,
        fontSize: rem(18),
        padding: rem(10, 20),
        marginLeft: rem(20),
      }}
      onClick={() => Router.push("/register")}
    >
      Register
    </StyledButton>
  </div>
);

const PageHeader = ({ token }: { token: string }) => {
  return (
    <StyledFlexContainer css={{ justifyContent: "space-between", alignItems: "center" }}>
      <Head>
        <title>Monterail e-learning</title>
        <meta name="description" content="REST API for building custom e-learning software" />
      </Head>
      <Link href="/">
        <div css={{ display: "flex", alignItems: "center", height: rem(90), cursor: "pointer" }}>
          <img css={{ flexShrink: 0 }} alt="Logo" src="/images/monteLogo.svg" />
          <div>
            <span css={{ fontWeight: "bold", fontSize: rem(24) }}>monte</span>
            <span css={{ color: COLOR_RED, fontWeight: "bold", fontSize: rem(24) }}>learn</span>
          </div>
        </div>
      </Link>
      {token ? <UserLogout /> : <LoginRegister />}
    </StyledFlexContainer>
  );
};

export default PageHeader;
