import { FC } from "react";
import Link from "next/link";

import SvgLogo from "@/components/svg/SvgLogo";

type Props = {
  isLoggedIn: boolean;
};

const Header: FC<Props> = ({ isLoggedIn }) => {
  return (
    <header className="flex flex-col sm:flex-row items-center sm:justify-between my-4">
      <Link href="/">
        <a className="flex items-center">
          <SvgLogo />
          <p className="text-2xl">
            <strong className="text-red-monterail">monte</strong>
            <strong className="text-black">learn</strong>
          </p>
        </a>
      </Link>
      <div className="flex-1">
        <ul className="flex justify-end font-roboto-mono mx-0 md:mx-4 my-5">
          {isLoggedIn ? (
            <li className="mx-0 sm:mx-2 font-medium text-white bg-red-400 rounded-full">
              <Link href="/users/logout">
                <a className="flex px-8 py-4">Logout</a>
              </Link>
            </li>
          ) : (
            <>
              <li className="mx-0 sm:mx-2 font-medium text-red-400">
                <Link data-testid="register" href="/users/register">
                  <a className="flex px-8 py-4">Register</a>
                </Link>
              </li>
              <li className="mx-0 sm:mx-2 font-medium text-white bg-red-400 rounded-full">
                <Link data-testid="login" href="/users/login">
                  <a className="flex px-8 py-4">Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
