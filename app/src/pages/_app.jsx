import "@/assets/css/tailwind.css";
import "@/assets/css/global.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { getAccessTokenOnServer } from "@/utils/helpers/auth";

export default function App({ Component, pageProps, isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

App.getInitialProps = ({ ctx }) => {
  const accessToken = getAccessTokenOnServer(ctx);
  return { isLoggedIn: !!accessToken };
};
