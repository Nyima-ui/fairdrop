"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

//chat gpt write the alt text for me
const Navbar = () => {
  const [isSignedIn, setisSignedIn] = useState(false);
  return (
    <header>
      <nav
        aria-label="Main navigation"
        className="flex justify-between text-sm gap-5 items-center sm:text-[17px]"
      >
        <Link href="/" aria-label="Home">
          <Image height={45} width={137} src="/logo.svg" alt="" />
        </Link>
        <ul className="flex gap-3.75 sm:gap-11.25 items-center shrink-0">
          <li className="inline-block relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-foreground after:-bottom-2 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-250 after:ease-out hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left">
            <Link href={""} className="flex gap-1.75 items-center">
              <Image
                height={25}
                width={25}
                src="/icons/track-icon.svg"
                alt=""
              />
              <span className="">Track</span>
            </Link>
          </li>
          <li className="inline-block relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-foreground after:-bottom-2 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-250 after:ease-out hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left">
            <Link href="/flights" className="flex gap-1.75 items-center">
              <Image height={28} width={28} src="/icons/airplane.svg" alt="" />
              <span>Search</span>
            </Link>
          </li>
          {isSignedIn ? (
            <li>
              <Link
                href={""}
                className="flex gap-1.75 items-center"
                aria-label="Account menu"
              >
                <Image
                  height={40}
                  width={40}
                  src="/Avatar3.png"
                  alt=""
                  className="rounded-full"
                />
              </Link>
            </li>
          ) : (
            <li className="inline-block relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-foreground after:-bottom-2 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-250 after:ease-out hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left">
              <Link href={""} className="flex gap-1.75 items-center">
                <Image
                  height={23}
                  width={23}
                  src="/icons/avatar-icon.svg"
                  alt=""
                />
                <span>Log in</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
