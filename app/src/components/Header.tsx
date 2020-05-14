import Link from "next/link";
import SvgLogo from "@/components/svg/SvgLogo";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center sm:justify-between my-4">
      <Link href="/">
        <a href="/" className="flex items-center">
          <SvgLogo />
          <p className="text-2xl">
            <strong className="text-red-monterail">monte</strong>
            <strong className="text-black">learn</strong>
          </p>
        </a>
      </Link>
      <div className="flex font-roboto-mono text-base font-medium items-center">
        <p className="uppercase">
          Developed with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Monterail
        </p>
      </div>
    </header>
  );
}
