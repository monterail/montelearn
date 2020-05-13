import Link from "next/link";

import SvgLogo from "@/components/SvgLogo";

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
      <div className="flex-1">
        <ul className="flex justify-evenly md:justify-end font-roboto-mono mx-0 md:mx-4 my-5">
          <li className="mx-0 sm:mx-2 font-medium text-red-400">
            <Link href="/users/register">
              <a href="/users/register" className="flex px-8 py-4">
                Register
              </a>
            </Link>
          </li>
          <li className="mx-0 sm:mx-2 font-medium text-white bg-red-400 rounded-full">
            <Link href="/users/login">
              <a href="/users/login" className="flex px-8 py-4">
                Login
              </a>
            </Link>
          </li>
        </ul>
      </div>
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
