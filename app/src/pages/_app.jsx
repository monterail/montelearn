import Router from "next/router";
import NProgress from "nprogress";
import { DefaultSeo } from "next-seo";

import "nprogress/nprogress.css";

import "@/assets/css/tailwind.css";
import "@/assets/css/global.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { getAccessTokenOnServer } from "@/utils/helpers/auth";
import BASE_SEO from "@/constants/baseSEO";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps, isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <DefaultSeo {...BASE_SEO} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

App.getInitialProps = ({ ctx }) => {
  const accessToken = getAccessTokenOnServer(ctx);
  return { isLoggedIn: !!accessToken };
};
