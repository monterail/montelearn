import { landingContent } from "@/constants/content";

export default {
  description: landingContent.subtitle,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://montelearn.monterail.com/",
    site_name: "Montelearn",
    title: landingContent.title,
    description: landingContent.subtitle,
    images: [
      {
        url: "https://montelearn.monterail.com/images/meta.png",
        width: 1200,
        height: 1200,
        alt: "Montelearn",
      },
    ],
  },
  twitter: {
    handle: "@monterail",
    site: "@monterail",
    cardType: "summary_large_image",
  },
};
