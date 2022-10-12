import React from "react";
import Link from "next/link";
import { navigationOptions } from "../../lib/navigation-options";

export interface NavBarProps {
  currentPage?: string;
}

const NavBar = ({ currentPage }: NavBarProps): JSX.Element => {
  return (
    <div className="flex flex-row items-center gap-12 bg-white my-3 mx-auto">
      <div className="flex w-full items-center space-x-4">
        {navigationOptions.map((item) =>
          item.name === currentPage ? (
            <Link key={item.name} href={item.navLink}>
              <a className="bg-gray-300 text-gray-500 cursor-default px-3 py-2 rounded-md text-sm font-bold">
                {item.name}
              </a>
            </Link>
          ) : (
            <Link key={item.name} href={item.navLink}>
              <a className="text-gray-500 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-bold">
                {item.name}
              </a>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export { NavBar };
